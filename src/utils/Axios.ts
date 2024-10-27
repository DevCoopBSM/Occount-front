import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig, AxiosHeaders } from 'axios';

const currentDomain = window.location.hostname;
const currentProtocol = window.location.protocol;

interface AxiosInstanceWithSuspense extends AxiosInstance {
  suspense: <T = any>(config: AxiosRequestConfig) => Promise<T>;
}

export const setAccessToken = (token: string): void => {
  sessionStorage.setItem('accessToken', token);
};

export const getAccessToken = (): string | null => {
  return sessionStorage.getItem('accessToken');
};

export const axiosInstance: AxiosInstanceWithSuspense = axios.create({
  baseURL: `${currentProtocol}//${currentDomain}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
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

const pendingRequests: Promise<void>[] = [];

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
    incrementActiveRequests();
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
    decrementActiveRequests();
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    decrementActiveRequests();
    if (setGlobalError) setGlobalError(null);
    return response;
  },
  async (error: AxiosError) => {
    decrementActiveRequests();
    if (setGlobalError) setGlobalError(error);

    if (error.response && error.response.status === 401) {
      const originalRequest = error.config;

      // 로그인과 비밀번호 확인 요청은 401 에러가 발생해도 로그아웃 처리하지 않음
      if (originalRequest.url === 'v2/auth/login' || 
          originalRequest.url === 'v2/account/verify') {
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
  incrementActiveRequests();
  try {
    const response = await axiosInstance(config);
    return response.data;
  } finally {
    decrementActiveRequests();
  }
};

export default axiosInstance;
