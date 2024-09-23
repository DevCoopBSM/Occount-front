import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { axiosInstance, setAccessToken, getAccessToken } from 'utils/Axios';

// AuthContext 생성
const AuthContext = createContext();

// 초기 상태 정의
const initialState = {
  isLoggedIn: !!getAccessToken(), // 세션 스토리지에 토큰이 있으면 로그인 상태로 간주
  isAdminLoggedIn: !!sessionStorage.getItem('isAdminLoggedIn'), // 세션 스토리지에서 isAdminLoggedIn 상태 로드
  user: null, // 사용자 정보
  errorMessage: '', // 에러 메시지
};

// 액션 타입 정의
const actionTypes = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_USER: 'SET_USER',
};

// 리듀서 함수 정의
const authReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      sessionStorage.setItem('isAdminLoggedIn', action.isAdmin || false); // 로그인 성공 시 isAdminLoggedIn 상태를 세션 스토리지에 저장
      return {
        ...state,
        isLoggedIn: true,
        isAdminLoggedIn: action.isAdmin || false,
        errorMessage: '',
      };
    case actionTypes.LOGOUT:
      sessionStorage.removeItem('isAdminLoggedIn'); // 로그아웃 시 isAdminLoggedIn 상태를 세션 스토리지에서 제거
      return {
        ...state,
        isLoggedIn: false,
        isAdminLoggedIn: false,
        user: null,
      };
    case actionTypes.SET_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case actionTypes.CLEAR_ERROR:
      return {
        ...state,
        errorMessage: '',
      };
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

// AuthProvider 컴포넌트
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const unifiedLogin = async (email, password, navigate, admin = false) => {
    try {
      const url = 'v2/auth/login';
      const response = await axiosInstance.post(url, {
        userEmail: email,
        userPassword: password,
      });

      const { accessToken, user, roles } = response.data;

      // roles 값이 'ROLE_ADMIN'인지 확인하여 어드민 여부 설정
      const isAdmin = roles.includes('ROLE_ADMIN');

      // admin 변수가 true로 전달되었지만, 로그인한 사용자가 어드민이 아닌 경우
      if (admin && !isAdmin) {
        throw new Error('권한이 없습니다.');
      }

      // 액세스 토큰을 세션 스토리지에 저장
      setAccessToken(accessToken);

      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        isAdmin: isAdmin, // 서버에서 받은 roles에 따라 상태 설정
      });

      await fetchUserInformation();

      // admin 변수가 true면 어드민 페이지로 리디렉션, 그렇지 않으면 일반 페이지로 리디렉션
      navigate(admin ? '/admin' : '/');

      dispatch({ type: actionTypes.CLEAR_ERROR });
      return { email, ...user };
    } catch (error) {
      let errMsg = '내부 서버 오류';
      if (error.message === '권한이 없습니다.') {
        errMsg = error.message; // 권한이 없을 때의 오류 메시지
      } else if (error.response) {
        if (error.response.status === 401) {
          errMsg = '아이디 또는 암호가 잘못되었습니다.';
        }
      }
      dispatch({ type: actionTypes.SET_ERROR, payload: errMsg });
      setTimeout(() => dispatch({ type: actionTypes.CLEAR_ERROR }), 2000);
    }
  };

  const fetchUserInformation = async () => {
    try {
      const response = await axiosInstance.get('v2/account/userinfo');
      const userInfo = {
        point: response.data.userPoint, // 서버 응답에 맞게 필드명 수정
        name: response.data.userName, // 서버 응답에 맞게 필드명 수정
        code: response.data.userCode, // 서버 응답에 맞게 필드명 수정
        email: response.data.userEmail, // 서버 응답에 맞게 필드명 수정
        todayTotalCharge: response.data.userTotalCharge, // 서버 응답에 맞게 필드명 수정
      };
      dispatch({ type: actionTypes.SET_USER, payload: userInfo });
      return userInfo;
    } catch (error) {
      console.error('Error fetching user information:', error);
      return null;
    }
  };

  const logout = async (navigate) => {
    try {
      // 상태 업데이트
      dispatch({ type: actionTypes.LOGOUT });

      // 세션 스토리지에서 토큰 제거
      setAccessToken(null);

      // 모든 세션 스토리지 항목을 지우고 리디렉션
      sessionStorage.clear();
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const requestEmailVerification = async (email) => { // 이메일 인증 요청
    try {
      const response = await axiosInstance.post('v2/auth/request-password-reset', {
        userEmail: email
      });
      
      if (response.data.success) {
        return { success: true, message: '인증 이메일 전송이 성공적으로 완료되었습니다.' };
      } else {
        throw new Error('이메일 인증 요청 실패');
      }
    } catch (error) {
      console.error('Email verification request error:', error);
      let errorMessage = '이메일 인증 요청 중 오류가 발생했습니다.';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      dispatch({ type: actionTypes.SET_ERROR, payload: errorMessage });
      setTimeout(() => dispatch({ type: actionTypes.CLEAR_ERROR }), 3000);
      return { success: false, message: errorMessage };
    }
  };

  useEffect(() => {
    if (state.isLoggedIn) {
      fetchUserInformation();
    }
  }, [state.isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        unifiedLogin,
        logout,
        setErrorMessage: (msg) =>
          dispatch({ type: actionTypes.SET_ERROR, payload: msg }),
        clearErrorMessage: () => dispatch({ type: actionTypes.CLEAR_ERROR }),
        refetchUser: fetchUserInformation,
        requestEmailVerification, // 이메일 인증 요청
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

// Verify

