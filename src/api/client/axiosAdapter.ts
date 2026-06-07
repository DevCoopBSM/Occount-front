import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
import { getAccessToken } from 'utils/Axios';
import { ApiClient, ApiRequestOptions, SetErrorFunction, SetLoadingFunction } from './types';

const currentDomain = window.location.hostname;
const currentProtocol = window.location.protocol;

let setGlobalLoading: SetLoadingFunction | null = null;
let setGlobalError: SetErrorFunction | null = null;
let activeRequestCount = 0;

export const setApiClientLoadingFunction = (setLoadingFn: SetLoadingFunction): void => {
  setGlobalLoading = setLoadingFn;
};

export const setApiClientErrorFunction = (setErrorFn: SetErrorFunction): void => {
  setGlobalError = setErrorFn;
};

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

const getApiV3BaseURL = (): string => {
  if (process.env.REACT_APP_API_V3_URL) {
    return process.env.REACT_APP_API_V3_URL;
  }

  if (process.env.REACT_APP_API_URL) {
    const apiURL = process.env.REACT_APP_API_URL.replace(/\/$/, '');
    return apiURL.endsWith('/api/v3') || apiURL.endsWith('/v3') ? apiURL : `${apiURL}/v3`;
  }

  return `${currentProtocol}//${currentDomain}/api/v3`;
};

const axiosClient = axios.create({
  baseURL: getApiV3BaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    incrementActiveRequests();

    const token = getAccessToken();
    if (token) {
      if (config.headers instanceof AxiosHeaders) {
        config.headers.set('Authorization', `Bearer ${token}`);
      } else {
        config.headers = new AxiosHeaders({
          Authorization: `Bearer ${token}`,
          ...((config.headers as Record<string, string>) || {}),
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

axiosClient.interceptors.response.use(
  (response) => {
    decrementActiveRequests();
    if (setGlobalError) setGlobalError(null);
    return response;
  },
  async (error: AxiosError) => {
    decrementActiveRequests();

    const config = error.config as AxiosRequestConfig & ApiRequestOptions;
    if (!config?.skipGlobalError && setGlobalError) {
      setGlobalError(error);
    }

    if (error.response?.status === 401) {
      if (config?.skipAuthRedirect) {
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

const buildConfig = (options?: ApiRequestOptions): AxiosRequestConfig & ApiRequestOptions => {
  return {
    headers: options?.headers,
    params: options?.searchParams,
    skipGlobalError: options?.skipGlobalError,
    skipAuthRedirect: options?.skipAuthRedirect,
  };
};

export const apiClient: ApiClient = {
  get: async <T>(path: string, options?: ApiRequestOptions): Promise<T> => {
    const response = await axiosClient.get<T>(path, buildConfig(options));
    return response.data;
  },

  post: async <T, B = unknown>(path: string, body?: B, options?: ApiRequestOptions): Promise<T> => {
    const response = await axiosClient.post<T>(path, body, buildConfig(options));
    return response.data;
  },

  put: async <T, B = unknown>(path: string, body?: B, options?: ApiRequestOptions): Promise<T> => {
    const response = await axiosClient.put<T>(path, body, buildConfig(options));
    return response.data;
  },

  patch: async <T, B = unknown>(
    path: string,
    body?: B,
    options?: ApiRequestOptions
  ): Promise<T> => {
    const response = await axiosClient.patch<T>(path, body, buildConfig(options));
    return response.data;
  },

  delete: async <T>(path: string, options?: ApiRequestOptions): Promise<T> => {
    const response = await axiosClient.delete<T>(path, buildConfig(options));
    return response.data;
  },
};
