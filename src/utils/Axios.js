import axios from 'axios';

const currentDomain = window.location.hostname;
const currentProtocol = window.location.protocol; // 현재 프로토콜(http: 또는 https:)

export const axiosInstance = axios.create({
  baseURL: `${currentProtocol}//${currentDomain}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 이렇게 설정하면 요청시에 자동으로 쿠키가 포함됩니다.
});

// Response interceptor: Handle token renewals.
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.response && error.response.status === 401) {
      const { access, refresh } = error.response.data;

      // If a new access or refresh token is provided, just retry the request.
      if (access || refresh) {
        // 엑세스 토큰 재발급 시도
        const retryOriginalRequest = new Promise((resolve) => {
          // 이전 요청의 구성 정보를 error.config에서 가져옴
          const originalRequest = error.config;

          // 새로 발급받은 엑세스 토큰을 요청 헤더에 적용
          originalRequest.headers.Authorization = `Bearer ${access}`;

          // 새로운 토큰으로 이전 요청을 재시도
          resolve(axiosInstance(originalRequest));
        });

        return retryOriginalRequest;
      }

      // If no tokens are provided, it's likely an authentication error.
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
