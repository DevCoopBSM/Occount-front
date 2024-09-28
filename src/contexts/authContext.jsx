import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { axiosInstance, setAccessToken, getAccessToken } from 'utils/Axios';

const AuthContext = createContext();

const initialState = {
  isLoggedIn: !!getAccessToken(),
  isAdminLoggedIn: !!sessionStorage.getItem('isAdminLoggedIn'),
  user: null,
  errorMessage: '',
};

const actionTypes = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_USER: 'SET_USER',
};

const authReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      sessionStorage.setItem('isAdminLoggedIn', action.isAdmin);
      return {
        ...state,
        isLoggedIn: true,
        isAdminLoggedIn: action.isAdmin,
        errorMessage: '',
      };
    case actionTypes.LOGOUT:
      sessionStorage.removeItem('isAdminLoggedIn');
      return {
        ...state,
        isLoggedIn: false,
        isAdminLoggedIn: false,
        user: null,
      };
    case actionTypes.SET_ERROR:
      return { ...state, errorMessage: action.payload };
    case actionTypes.CLEAR_ERROR:
      return { ...state, errorMessage: '' };
    case actionTypes.SET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const unifiedLogin = useCallback(async (email, password, navigate, admin = false) => {
    try {
      const response = await axiosInstance.post('v2/auth/login', { userEmail: email, userPassword: password });
      
      if (response.data.status === "REDIRECT") {
        navigate(response.data.redirectUrl);
        return;
      }

      const { accessToken, user, roles } = response.data;
      const isAdmin = roles.includes('ROLE_ADMIN');

      if (admin && !isAdmin) {
        throw new Error('권한이 없습니다.');
      }

      setAccessToken(accessToken);
      dispatch({ type: actionTypes.LOGIN_SUCCESS, isAdmin });
      await fetchUserInformation();
      navigate(admin ? '/admin' : '/');
      dispatch({ type: actionTypes.CLEAR_ERROR });
      return { email, ...user };
    } catch (error) {
      let errMsg = '내부 서버 오류';
      if (error.message === '권한이 없습니다.') {
        errMsg = error.message;
      } else if (error.response?.status === 401) {
        errMsg = '아이디 또는 암호가 잘못되었습니다.';
      }
      dispatch({ type: actionTypes.SET_ERROR, payload: errMsg });
      setTimeout(() => dispatch({ type: actionTypes.CLEAR_ERROR }), 2000);
    }
  }, []);

  const fetchUserInformation = useCallback(async () => {
    try {
      const response = await axiosInstance.get('v2/account/userinfo');
      const userInfo = {
        point: response.data.userPoint,
        name: response.data.userName,
        code: response.data.userCode,
        email: response.data.userEmail,
        todayTotalCharge: response.data.userTotalCharge,
      };
      dispatch({ type: actionTypes.SET_USER, payload: userInfo });
      return userInfo;
    } catch (error) {
      console.error('Error fetching user information:', error);
      return null;
    }
  }, []);

  const logout = useCallback(async (navigate) => {
    try {
      dispatch({ type: actionTypes.LOGOUT });
      setAccessToken(null);
      sessionStorage.clear();
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }, []);

  const registerStudent = useCallback(async (userName, userEmail, userPassword) => {
    try {
      const response = await axiosInstance.post('v2/auth/register', {
        userName,
        userEmail,
        userPassword
      });
      
      if (response.data.message) {
        return { success: true, message: response.data.message };
      } else {
        throw new Error('회원가입 실패');
      }
    } catch (error) {
      console.error('Student registration error:', error);
      let errorMessage = '회원가입 중 오류가 발생했습니다.';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      dispatch({ type: actionTypes.SET_ERROR, payload: errorMessage });
      setTimeout(() => dispatch({ type: actionTypes.CLEAR_ERROR }), 2000);
      return { success: false, message: errorMessage };
    }
  }, []);

  const requestEmailVerification = useCallback(async (email, name) => {
    try {
      const response = await axiosInstance.post('v2/verify/send', { userEmail: email, userName: name });
      if (response.data.success) {
        return { success: true, message: response.data.message };
      } else {
        throw new Error(response.data.message || '이메일 인증 요청에 실패했습니다.');
      }
    } catch (error) {
      console.error('Email verification request failed:', error);
      let errorMessage = '이메일 인증 요청에 실패했습니다.';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      return { success: false, message: errorMessage };
    }
  }, []);

  const changePassword = useCallback(async (jwtToken, newPassword) => {
    try {
      const response = await axiosInstance.post(`v2/auth/pwChange/${jwtToken}`, {
        newPassword
      });
      
      // 서버 응답에서 메시지를 직접 사용
      return { success: true, message: response.data.message };
    } catch (error) {
      console.error('Password change error:', error);
      let errorMessage;
      
      if (error.response?.data) {
        // 서버에서 보낸 에러 메시지를 그대로 사용
        errorMessage = typeof error.response.data === 'string' ? error.response.data : error.response.data.message;
      } else {
        errorMessage = '비밀번호 변경 중 오류가 발생했습니다.';
      }
      return { success: false, message: errorMessage };
    }
  }, []);

  useEffect(() => {
    if (state.isLoggedIn) {
      fetchUserInformation();
    }
  }, [state.isLoggedIn, fetchUserInformation]);

  const contextValue = {
    ...state,
    unifiedLogin,
    logout,
    setErrorMessage: (msg) => dispatch({ type: actionTypes.SET_ERROR, payload: msg }),
    clearErrorMessage: () => dispatch({ type: actionTypes.CLEAR_ERROR }),
    refetchUser: fetchUserInformation,
    requestEmailVerification,
    registerStudent,
    changePassword,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


