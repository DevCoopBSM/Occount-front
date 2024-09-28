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

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (setGlobalLoading) setGlobalLoading(true);
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
    if (setGlobalLoading) setGlobalLoading(false);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (setGlobalLoading) setGlobalLoading(false);
    if (setGlobalError) setGlobalError(null);
    return response;
  },
  async (error: AxiosError) => {
    if (setGlobalError) setGlobalError(error.response);
    
    if (setGlobalLoading) {
      setTimeout(() => {
        setGlobalLoading(false);
        if (setGlobalError) setGlobalError(null);
      }, 3000);
    }

    if (error.response && error.response.status === 401) {
      const originalRequest = error.config;

      if (originalRequest.url === 'v2/auth/login') {
        return Promise.reject(error);
      }

      try {
        console.error('액세스 토큰이 만료되었습니다. 로그아웃을 수행합니다.');
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
  const promise = axiosInstance(config).then(response => response.data);
  pendingRequests.push(promise as Promise<void>);
  
  try {
    const data = await promise;
    return data;
  } finally {
    const index = pendingRequests.indexOf(promise as Promise<void>);
    if (index > -1) {
      pendingRequests.splice(index, 1);
    }
    if (pendingRequests.length === 0) {
      if (setGlobalLoading) setGlobalLoading(false);
    }
  }
};

export default axiosInstance;
