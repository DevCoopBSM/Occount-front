export type ApiRequestOptions = {
  headers?: Record<string, string>;
  searchParams?: Record<string, string | number | boolean | null | undefined>;
  skipGlobalError?: boolean;
  skipAuthRedirect?: boolean;
};

export type ApiClient = {
  get: <T>(path: string, options?: ApiRequestOptions) => Promise<T>;
  post: <T, B = unknown>(path: string, body?: B, options?: ApiRequestOptions) => Promise<T>;
  put: <T, B = unknown>(path: string, body?: B, options?: ApiRequestOptions) => Promise<T>;
  patch: <T, B = unknown>(path: string, body?: B, options?: ApiRequestOptions) => Promise<T>;
  delete: <T>(path: string, options?: ApiRequestOptions) => Promise<T>;
};

export type SetLoadingFunction = (isLoading: boolean) => void;
export type SetErrorFunction = (error: unknown) => void;
