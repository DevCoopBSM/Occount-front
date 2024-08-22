import axios from 'axios';

const currentDomain = window.location.hostname;
const currentProtocol = window.location.protocol; // 현재 프로토콜(http: 또는 https:)

export const setAccessToken = (token) => {
  sessionStorage.setItem('accessToken', token);
};

export const getAccessToken = () => {
  return sessionStorage.getItem('accessToken');
};

export const axiosInstance = axios.create({
  baseURL: `${currentProtocol}//${currentDomain}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: 요청에 액세스 토큰을 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 401 에러를 처리
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      const originalRequest = error.config;

      // 401 응답을 받은 경우 로그아웃 처리
      try {
        console.error('액세스 토큰이 만료되었습니다. 로그아웃을 수행합니다.');
        
        // 로그아웃 요청을 서버로 전송 (필요에 따라 로그아웃 API 경로 수정 가능)
        // await axiosInstance.post('v2/auth/logout');

        // 세션 스토리지에서 토큰 제거
        sessionStorage.clear();

        // 로그인 페이지로 리디렉션
        window.location.href = '/login';

        return Promise.reject(error);
      } catch (logoutError) {
        console.error('로그아웃 처리 중 오류 발생:', logoutError);
        return Promise.reject(logoutError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
