import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { axiosInstance, setAccessToken, getAccessToken, setErrorFunction } from 'utils/Axios';

interface User {
  point: number;
  name: string;
  code: string;
  email: string;
  phone: string;
  todayTotalCharge?: number;
}

interface AuthState {
  isLoggedIn: boolean;
  isAdminLoggedIn: boolean;
  user: User | null;
  errorMessage: string;
}

interface AuthContextType extends AuthState {
  unifiedLogin: (email: string, password: string, navigate: NavigateFunction, admin?: boolean) => Promise<User | void>;
  logout: (navigate: NavigateFunction) => Promise<void>;
  setErrorMessage: (msg: string) => void;
  clearErrorMessage: () => void;
  refetchUser: () => Promise<User | null>;
  requestEmailVerification: (email: string, name: string) => Promise<{ success: boolean; message: string }>;
  registerStudent: (userName: string, userEmail: string, userPassword: string) => Promise<{ success: boolean; message: string }>;
  changePassword: (jwtToken: string, newPassword: string) => Promise<{ success: boolean; message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialState: AuthState = {
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
} as const;

type ActionType = 
  | { type: typeof actionTypes.LOGIN_SUCCESS; isAdmin: boolean }
  | { type: typeof actionTypes.LOGOUT }
  | { type: typeof actionTypes.SET_ERROR; payload: string }
  | { type: typeof actionTypes.CLEAR_ERROR }
  | { type: typeof actionTypes.SET_USER; payload: User };

const authReducer = (state: AuthState, action: ActionType): AuthState => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      sessionStorage.setItem('isAdminLoggedIn', String(action.isAdmin));
      return { ...state, isLoggedIn: true, isAdminLoggedIn: action.isAdmin, errorMessage: '' };
    case actionTypes.LOGOUT:
      sessionStorage.removeItem('isAdminLoggedIn');
      return { ...state, isLoggedIn: false, isAdminLoggedIn: false, user: null };
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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    setErrorFunction((error: any) => {
      const errMsg = error?.response?.data?.message || error?.message || '알 수 없는 오류가 발생했습니다.';
      dispatch({ type: actionTypes.SET_ERROR, payload: errMsg });
    });
  }, []);

  const unifiedLogin = useCallback(async (email: string, password: string, navigate: NavigateFunction, admin = false) => {
    try {
      const response = await axiosInstance.post('v2/auth/login', { userEmail: email, userPassword: password });
      
      if (!response.data.success) {
        if (response.data.status === "REDIRECT") {
          navigate(response.data.redirectUrl);
          return;
        }
        throw new Error(response.data.message || '로그인에 실패했습니다.');
      }

      const { accessToken, userCode, userName, userEmail, userPoint, userPhone, roles } = response.data;
      const isAdmin = roles?.includes('ROLE_ADMIN');

      if (admin && !isAdmin) {
        throw new Error('권한이 없습니다.');
      }

      setAccessToken(accessToken);
      dispatch({ type: actionTypes.LOGIN_SUCCESS, isAdmin });
      const userInfo: User = { point: userPoint, name: userName, code: userCode, email: userEmail, phone: userPhone };
      dispatch({ type: actionTypes.SET_USER, payload: userInfo });
      navigate(admin ? '/admin' : '/');
      dispatch({ type: actionTypes.CLEAR_ERROR });
      return userInfo;
    } catch (error: any) {
      console.error('Login error:', error);
      const errMsg = error.response?.data?.message || error.message || '로그인 중 오류가 발생했습니다.';
      dispatch({ type: actionTypes.SET_ERROR, payload: errMsg });
      throw error;
    }
  }, []);

  const fetchUserInformation = useCallback(async (): Promise<User | null> => {
    try {
      const response = await axiosInstance.get('v2/account/userinfo');
      const userInfo: User = {
        point: response.data.userPoint,
        name: response.data.userName,
        code: response.data.userCode,
        email: response.data.userEmail,
        phone: response.data.userPhone,
        todayTotalCharge: response.data.userTotalCharge,
      };
      dispatch({ type: actionTypes.SET_USER, payload: userInfo });
      return userInfo;
    } catch (error) {
      console.error('Error fetching user information:', error);
      return null;
    }
  }, []);

  const logout = useCallback(async (navigate: NavigateFunction) => {
    try {
      dispatch({ type: actionTypes.LOGOUT });
      setAccessToken(null);
      sessionStorage.clear();
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }, []);

  const registerStudent = useCallback(async (userName: string, userEmail: string, userPassword: string) => {
    try {
      const response = await axiosInstance.post('v2/auth/register', { userName, userEmail, userPassword });
      return { success: true, message: response.data.message || '회원가입에 성공했습니다.' };
    } catch (error: any) {
      console.error('Student registration error:', error);
      const errorMessage = error.response?.data?.message || '회원가입 중 오류가 발생했습니다.';
      dispatch({ type: actionTypes.SET_ERROR, payload: errorMessage });
      setTimeout(() => dispatch({ type: actionTypes.CLEAR_ERROR }), 3000);
      return { success: false, message: errorMessage };
    }
  }, []);

  const requestEmailVerification = useCallback(async (email: string, name: string) => {
    try {
      const response = await axiosInstance.post('v2/verify/send', { userEmail: email, userName: name });
      return { success: true, message: response.data.message || '이메일 인증 요청이 성공했습니다.' };
    } catch (error: any) {
      console.error('Email verification request failed:', error);
      return { success: false, message: error.response?.data?.message || '이메일 인증 요청에 실패했습니다.' };
    }
  }, []);

  const changePassword = useCallback(async (jwtToken: string, newPassword: string) => {
    try {
      const response = await axiosInstance.post(`v2/auth/pwChange/${jwtToken}`, { newPassword });
      return { success: true, message: response.data.message || '비밀번호가 성공적으로 변경되었습니다.' };
    } catch (error: any) {
      console.error('Password change error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || '비밀번호 변경 중 오류가 발생했습니다.' 
      };
    }
  }, []);

  useEffect(() => {
    if (state.isLoggedIn) {
      fetchUserInformation();
    }
  }, [state.isLoggedIn, fetchUserInformation]);

  const contextValue: AuthContextType = {
    ...state,
    unifiedLogin,
    logout,
    setErrorMessage: (msg: string) => dispatch({ type: actionTypes.SET_ERROR, payload: msg }),
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

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
