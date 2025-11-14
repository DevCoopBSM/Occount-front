import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { axiosInstance, setAccessToken, getAccessToken, setErrorFunction } from 'utils/Axios';

interface User {
  point: number;
  name: string;
  code: string;
  email: string;
  phone: string;
  todayTotalPayment?: number;
  role?: string;  // 역할 추가
  isFullMember?: boolean;  // 정식 조합원 여부 추가
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

// 개발 모드 체크 (환경 변수 또는 localStorage로 제어)
const isDevMode = () => {
  const devMode = process.env.NODE_ENV === 'development' && 
         (localStorage.getItem('DEV_MODE') === 'true' || 
          process.env.REACT_APP_DEV_MODE === 'true');
  
  // 디버깅용 로그
  if (devMode) {
    console.log('✅ 개발 모드 활성화:', {
      NODE_ENV: process.env.NODE_ENV,
      REACT_APP_DEV_MODE: process.env.REACT_APP_DEV_MODE,
      localStorage_DEV_MODE: localStorage.getItem('DEV_MODE')
    });
  }
  
  return devMode;
};

// 개발 모드용 Mock 사용자 데이터
const getMockUser = (): User => ({
  point: 100000,
  name: '개발자',
  code: 'DEV001',
  email: 'dev@example.com',
  phone: '010-1234-5678',
  todayTotalPayment: 0,
  role: 'ROLE_MEMBER', // 조합원 역할로 설정하여 충전 기능 활성화
  isFullMember: true,
});

const initialState: AuthState = {
  isLoggedIn: isDevMode() || !!getAccessToken(),
  isAdminLoggedIn: !!sessionStorage.getItem('isAdminLoggedIn'),
  user: isDevMode() ? getMockUser() : null,
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

  // 컴포넌트 마운트 시 개발 모드 초기화
  useEffect(() => {
    const devMode = isDevMode();
    console.log('🔍 AuthProvider 마운트 - 개발 모드:', devMode);
    
    if (devMode) {
      console.log('🔧 개발 모드 활성화 - Mock 사용자 설정 중');
      const mockUser = getMockUser();
      console.log('👤 Mock 사용자:', mockUser);
      
      // 개발 모드일 때 로그인 상태 강제 설정
      dispatch({ type: actionTypes.LOGIN_SUCCESS, isAdmin: false });
      // 개발 모드일 때 mock 사용자 설정
      dispatch({ type: actionTypes.SET_USER, payload: mockUser });
      
      console.log('✅ 개발 모드 초기화 완료');
    }
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
      console.log('Login response roles:', roles); // 디버깅용 로그 추가

      const isAdmin = roles === 'ROLE_ADMIN';
      if (admin && !isAdmin) {
        throw new Error('권한이 없습니다.');
      }

      setAccessToken(accessToken);
      dispatch({ type: actionTypes.LOGIN_SUCCESS, isAdmin });
      const userInfo: User = { 
        point: userPoint, 
        name: userName, 
        code: userCode, 
        email: userEmail, 
        phone: userPhone,
        role: roles  // roles 문자열을 그대로 저장
      };
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
    // 개발 모드일 때는 mock 사용자 반환
    if (isDevMode()) {
      const mockUser = getMockUser();
      dispatch({ type: actionTypes.SET_USER, payload: mockUser });
      return mockUser;
    }

    try {
      const response = await axiosInstance.get('v2/account/user/info');
      
      const userInfo: User = {
        point: response.data.userPoint,
        name: response.data.userName,
        code: response.data.userCode,
        email: response.data.userEmail,
        phone: response.data.userPhone,
        todayTotalPayment: response.data.todayTotalPayment,
        role: response.data.roles  // roles 필드 추가
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
    // 개발 모드가 아닐 때만 사용자 정보 가져오기
    if (!isDevMode() && state.isLoggedIn) {
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
