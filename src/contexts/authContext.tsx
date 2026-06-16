import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { NavigateFunction } from 'react-router-dom';
import axios from 'axios';
import { axiosInstance, setAccessToken, getAccessToken } from 'utils/Axios';
import { isDevMode } from 'utils/DevMode';

interface User {
  point: number;
  name: string;
  code: string;
  email: string;
  phone: string;
  todayTotalPayment?: number;
  role?: string; // 역할 추가
  isFullMember?: boolean; // 정식 조합원 여부 추가
}

interface AuthState {
  isLoggedIn: boolean;
  isAdminLoggedIn: boolean;
  user: User | null;
  errorMessage: string;
}

interface AuthContextType extends AuthState {
  isInitializing: boolean;
  unifiedLogin: (
    email: string,
    password: string,
    navigate: NavigateFunction,
    admin?: boolean
  ) => Promise<User | void>;
  logout: (navigate: NavigateFunction) => Promise<void>;
  setErrorMessage: (msg: string) => void;
  clearErrorMessage: () => void;
  refetchUser: () => Promise<void>;
  requestEmailVerification: (
    email: string,
    name: string
  ) => Promise<{ success: boolean; message: string }>;
  registerStudent: (
    userName: string,
    userEmail: string,
    userPassword: string
  ) => Promise<{ success: boolean; message: string }>;
  changePassword: (
    jwtToken: string,
    newPassword: string
  ) => Promise<{ success: boolean; message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getTokenExpiry = (token: string): number | null => {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(atob(base64));
    return typeof payload.exp === 'number' ? payload.exp : null;
  } catch {
    return null;
  }
};

const isTokenExpired = (token: string): boolean => {
  const exp = getTokenExpiry(token);
  if (exp === null) return true;
  return Date.now() / 1000 >= exp;
};

const isTokenValid = (): boolean => {
  const token = getAccessToken();
  if (!token) return false;
  return !isTokenExpired(token);
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

// 글로벌 인터셉터를 우회하는 별도의 Axios 인스턴스 생성
const createBypassAxios = () => {
  return axios.create({
    baseURL: axiosInstance.defaults.baseURL,
    headers: axiosInstance.defaults.headers,
  });
};

const initialState: AuthState = {
  isLoggedIn: isDevMode() || isTokenValid(),
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
  | { type: typeof actionTypes.SET_USER; payload: Partial<User> };

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
    case actionTypes.SET_USER: {
      const currentUser = state.user ?? {
        point: 0,
        name: '',
        code: '',
        email: '',
        phone: '',
      };

      return {
        ...state,
        user: {
          ...currentUser,
          ...action.payload,
          code: action.payload.code ?? currentUser.code,
        },
      };
    }
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [isInitializing, setIsInitializing] = React.useState(!isDevMode() && isTokenValid());

  // 컴포넌트 마운트 시 개발 모드 초기화
  useEffect(() => {
    if (isDevMode()) {
      const mockUser = getMockUser();
      // 개발 모드일 때 로그인 상태 강제 설정
      dispatch({ type: actionTypes.LOGIN_SUCCESS, isAdmin: false });
      dispatch({ type: actionTypes.SET_USER, payload: mockUser });
    }
  }, []);

  const unifiedLogin = useCallback(
    async (email: string, password: string, navigate: NavigateFunction, admin = false) => {
      try {
        // 로그인 요청만을 위한 별도 axios 인스턴스 생성 (전역 인터셉터 우회)
        const loginAxios = createBypassAxios();

        const response = await loginAxios.post('auth/login', {
          email: email,
          password: password,
        });

        if (
          (response.status === 200 || response.status === 201) &&
          (!response.data || Object.keys(response.data).length === 0)
        ) {
          const authHeader = response.headers['authorization'] || response.headers['Authorization'];
          if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring(7);

            let role = 'ROLE_USER';
            try {
              const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
              const payload = JSON.parse(atob(base64));
              role = payload.roles || payload.role || payload.authority || 'ROLE_USER';
            } catch {
              // 디코딩 실패 시 기본값 유지
            }

            const isAdmin = role === 'ROLE_ADMIN';
            if (admin && !isAdmin) {
              throw new Error('권한이 없습니다.');
            }

            setAccessToken(token);

            const userInfo: User = {
              point: 0,
              name: email.split('@')[0] || '사용자',
              code: email.split('@')[0] || 'USER',
              email: email,
              phone: '',
              role,
            };

            dispatch({ type: actionTypes.LOGIN_SUCCESS, isAdmin });
            dispatch({ type: actionTypes.SET_USER, payload: userInfo });
            navigate(admin ? '/admin' : '/');
            dispatch({ type: actionTypes.CLEAR_ERROR });
            return userInfo;
          } else {
            throw new Error('서버에서 인증 토큰을 반환하지 않았습니다.');
          }
        }

        if (!response.data.success) {
          if (response.data.status === 'REDIRECT') {
            navigate(response.data.redirectUrl);
            return;
          }
          throw new Error(response.data.message || '로그인에 실패했습니다.');
        }

        const { accessToken, userCode, userName, userEmail, userPoint, userPhone, roles } =
          response.data;

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
          role: roles, // roles 문자열을 그대로 저장
        };
        dispatch({ type: actionTypes.SET_USER, payload: userInfo });
        navigate(admin ? '/admin' : '/');
        dispatch({ type: actionTypes.CLEAR_ERROR });
        return userInfo;
      } catch (error: any) {
        console.error('Login error:', error);
        const errMsg =
          error.response?.data?.message || error.message || '로그인 중 오류가 발생했습니다.';
        dispatch({ type: actionTypes.SET_ERROR, payload: errMsg });
        throw error;
      }
    },
    []
  );

  const fetchUserInformation = useCallback(async (): Promise<void> => {
    // 개발 모드일 때는 mock 사용자 반환
    if (isDevMode()) {
      const mockUser = getMockUser();
      dispatch({ type: actionTypes.SET_USER, payload: mockUser });
      return;
    }

    try {
      const skipOpts = { skipAuthRedirect: true, skipGlobalError: true } as any;
      const [infoRes, pointRes, barcodeRes] = await Promise.all([
        axiosInstance.get('users/pre-order-info', skipOpts),
        axiosInstance.get('wallet/point', skipOpts),
        axiosInstance.get('users/barcode', skipOpts),
      ]);

      const userUpdates: Partial<User> = {};

      if (typeof pointRes.data.point === 'number') {
        userUpdates.point = pointRes.data.point;
      }
      if (typeof infoRes.data.username === 'string') {
        userUpdates.name = infoRes.data.username;
      }
      if (typeof barcodeRes.data.user_barcode === 'string') {
        userUpdates.code = barcodeRes.data.user_barcode;
      }

      dispatch({ type: actionTypes.SET_USER, payload: userUpdates });
    } catch (error: any) {
      if (error.response?.status === 401) {
        dispatch({ type: actionTypes.LOGOUT });
        setAccessToken(null);
        sessionStorage.clear();
        window.location.href = '/login';
        return;
      }
      console.error('Error fetching user information:', error);
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

  const registerStudent = useCallback(
    async (userName: string, userEmail: string, userPassword: string) => {
      try {
        const response = await axiosInstance.post('auth/register', {
          userName,
          userEmail,
          userPassword,
        });
        return {
          success: true,
          message: response.data.message || '회원가입에 성공했습니다.',
        };
      } catch (error: any) {
        console.error('Student registration error:', error);
        const errorMessage = error.response?.data?.message || '회원가입 중 오류가 발생했습니다.';
        dispatch({ type: actionTypes.SET_ERROR, payload: errorMessage });
        setTimeout(() => dispatch({ type: actionTypes.CLEAR_ERROR }), 3000);
        return { success: false, message: errorMessage };
      }
    },
    []
  );

  const requestEmailVerification = useCallback(async (email: string, name: string) => {
    try {
      // 비밀번호 재설정 요청만을 위한 별도 axios 인스턴스 생성 (전역 인터셉터 우회)
      const pwResetAxios = createBypassAxios();

      const response = await pwResetAxios.post('verify/send', {
        userEmail: email,
        userName: name,
      });
      return {
        success: true,
        message: response.data.message || '이메일 인증 요청이 성공했습니다.',
      };
    } catch (error: any) {
      console.error('Email verification request failed:', error);
      return {
        success: false,
        message: error.response?.data?.message || '이메일 인증 요청에 실패했습니다.',
      };
    }
  }, []);

  const changePassword = useCallback(async (jwtToken: string, newPassword: string) => {
    try {
      // 비밀번호 변경 요청만을 위한 별도 axios 인스턴스 생성 (전역 인터셉터 우회)
      const pwChangeAxios = createBypassAxios();

      const response = await pwChangeAxios.post(`auth/pwChange/${jwtToken}`, { newPassword });
      return {
        success: true,
        message: response.data.message || '비밀번호가 성공적으로 변경되었습니다.',
      };
    } catch (error: any) {
      console.error('Password change error:', error);
      return {
        success: false,
        message: error.response?.data?.message || '비밀번호 변경 중 오류가 발생했습니다.',
      };
    }
  }, []);

  useEffect(() => {
    // 개발 모드가 아닐 때만 사용자 정보 가져오기
    if (!isDevMode() && state.isLoggedIn) {
      fetchUserInformation().finally(() => {
        setIsInitializing(false);
      });
    }
  }, [state.isLoggedIn, fetchUserInformation]);

  // JWT 만료 시 자동 로그아웃
  useEffect(() => {
    if (!state.isLoggedIn || isDevMode()) return;

    const token = getAccessToken();
    if (!token) return;

    const exp = getTokenExpiry(token);
    if (exp === null) return;

    const msUntilExpiry = exp * 1000 - Date.now();

    if (msUntilExpiry <= 0) {
      dispatch({ type: actionTypes.LOGOUT });
      setAccessToken(null);
      sessionStorage.clear();
      window.location.href = '/login';
      return;
    }

    const timer = setTimeout(() => {
      dispatch({ type: actionTypes.LOGOUT });
      setAccessToken(null);
      sessionStorage.clear();
      window.location.href = '/login';
    }, msUntilExpiry);

    return () => clearTimeout(timer);
  }, [state.isLoggedIn]);

  const contextValue: AuthContextType = {
    ...state,
    isInitializing,
    unifiedLogin,
    logout,
    setErrorMessage: (msg: string) => dispatch({ type: actionTypes.SET_ERROR, payload: msg }),
    clearErrorMessage: () => dispatch({ type: actionTypes.CLEAR_ERROR }),
    refetchUser: fetchUserInformation,
    requestEmailVerification,
    registerStudent,
    changePassword,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
