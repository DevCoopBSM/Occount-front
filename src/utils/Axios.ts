import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig, AxiosHeaders } from 'axios';

const currentDomain = window.location.hostname;
const currentProtocol = window.location.protocol;

interface AxiosInstanceWithSuspense extends AxiosInstance {
  suspense: <T = any>(config: AxiosRequestConfig) => Promise<T>;
}

// 개발 모드 체크 함수
const isDevMode = (): boolean => {
  return process.env.NODE_ENV === 'development' && 
         (localStorage.getItem('DEV_MODE') === 'true' || 
          process.env.REACT_APP_DEV_MODE === 'true');
};

// 개발 모드용 Mock 응답 생성 함수
const createMockResponse = (config: InternalAxiosRequestConfig): AxiosResponse => {
  const url = config.url || '';
  
  // 기본 mock 응답
  let mockData: any = { success: true, message: '개발 모드: Mock 응답' };
  
  // 엔드포인트별 mock 응답
  if (url.includes('v2/account/user/info')) {
    mockData = {
      userPoint: 100000,
      userName: '개발자',
      userCode: 'DEV001',
      userEmail: 'dev@example.com',
      userPhone: '010-1234-5678',
      todayTotalPayment: 0,
      roles: 'ROLE_MEMBER'
    };
  } else if (url.includes('v2/auth/login')) {
    mockData = {
      success: true,
      accessToken: 'dev-mock-token',
      userCode: 'DEV001',
      userName: '개발자',
      userEmail: 'dev@example.com',
      userPoint: 100000,
      userPhone: '010-1234-5678',
      roles: 'ROLE_MEMBER'
    };
  } else if (url.includes('v2/notices')) {
    mockData = [
      {
        id: 1,
        title: '들어온 상품 안내',
        content: '새로운 상품이 입고되었습니다.',
        createdAt: [2025, 7, 12, 14, 30, 0],
        importance: 'HIGH',
        expirationDate: null
      },
      {
        id: 2,
        title: '매점 운영 시간 변경 안내',
        content: '매점 운영 시간이 변경되었습니다.',
        createdAt: [2025, 7, 10, 9, 0, 0],
        importance: 'MEDIUM',
        expirationDate: null
      },
      {
        id: 3,
        title: '시스템 점검 안내',
        content: '시스템 점검으로 인한 서비스 중단 안내입니다.',
        createdAt: [2025, 7, 8, 16, 45, 0],
        importance: 'LOW',
        expirationDate: null
      }
    ];
  }
  
  return {
    data: mockData,
    status: 200,
    statusText: 'OK',
    headers: {},
    config: config as any,
  } as AxiosResponse;
};

export const setAccessToken = (token: string): void => {
  sessionStorage.setItem('accessToken', token);
};

export const getAccessToken = (): string | null => {
  return sessionStorage.getItem('accessToken');
};

export const axiosInstance: AxiosInstanceWithSuspense = axios.create({
  baseURL: process.env.REACT_APP_API_URL || `${currentProtocol}//${currentDomain}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  // 개발 모드일 때 adapter를 오버라이드하여 실제 네트워크 요청 차단
  adapter: isDevMode() ? (config: any) => {
    console.log('개발 모드: 네트워크 요청 완전 차단', config.method?.toUpperCase(), config.url);
    return Promise.resolve(createMockResponse(config));
  } : undefined,
}) as AxiosInstanceWithSuspense;

type SetLoadingFunction = (isLoading: boolean) => void;
type SetErrorFunction = (error: any) => void;

let setGlobalLoading: SetLoadingFunction | null = null;
let setGlobalError: SetErrorFunction | null = null;

export const setLoadingFunction = (setLoadingFn: SetLoadingFunction): void => {
  setGlobalLoading = setLoadingFn;
};

export const setErrorFunction = (setErrorFn: SetErrorFunction): void => {
  setGlobalError = setErrorFn;
};

let activeRequestCount = 0;

const incrementActiveRequests = () => {
  activeRequestCount++;
  if (setGlobalLoading) setGlobalLoading(true);
};

const decrementActiveRequests = () => {
  activeRequestCount--;
  if (activeRequestCount === 0 && setGlobalLoading) {
    setGlobalLoading(false);
  }
};

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 개발 모드일 때는 adapter에서 처리하므로 여기서는 로딩만 관리
    if (!isDevMode()) {
      incrementActiveRequests();
    }
    
    const token = getAccessToken();
    if (token) {
      if (config.headers instanceof AxiosHeaders) {
        config.headers.set('Authorization', `Bearer ${token}`);
      } else {
        config.headers = new AxiosHeaders({
          Authorization: `Bearer ${token}`,
          ...(config.headers as Record<string, string> || {})
        });
      }
    }
    return config;
  },
  (error: AxiosError) => {
    if (!isDevMode()) {
      decrementActiveRequests();
    }
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (!isDevMode()) {
      decrementActiveRequests();
    }
    if (setGlobalError) setGlobalError(null);
    return response;
  },
  async (error: AxiosError) => {
    if (!isDevMode()) {
      decrementActiveRequests();
      if (setGlobalError) setGlobalError(error);
    }

    if (error.response && error.response.status === 401 && !isDevMode()) {
      const originalRequest = error.config;

      // 로그인과 비밀번호 확인 요청은 401 에러가 발생해도 로그아웃 처리하지 않음
      if (originalRequest && (originalRequest.url === 'v2/auth/login' || 
          originalRequest.url === 'v2/account/verify')) {
        return Promise.reject(error);
      }

      try {
        sessionStorage.clear();
        window.location.href = '/login';
      } catch (logoutError) {
        console.error('로그아웃 처리 중 오류 발생:', logoutError);
      }
    }

    return Promise.reject(error);
  }
);

axiosInstance.suspense = async <T = any>(config: AxiosRequestConfig): Promise<T> => {
  // 개발 모드일 때는 mock 응답 반환
  if (isDevMode()) {
    console.log('🚫 개발 모드: Suspense API 호출 차단됨', config.method?.toUpperCase(), config.url);
    const mockResponse = createMockResponse(config as InternalAxiosRequestConfig);
    return mockResponse.data as T;
  }
  
  incrementActiveRequests();
  try {
    const response = await axiosInstance(config);
    return response.data;
  } finally {
    decrementActiveRequests();
  }
};

export default axiosInstance;
