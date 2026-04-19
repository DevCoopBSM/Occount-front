import React, { useState, useCallback, useRef, useEffect, ChangeEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import imgLogo from "assets/occount-logo.svg";
import { useAuth } from "contexts/authContext";
import Toast from "common/Toast";
import Icon from "components/Icon";
import * as L from "./style";

interface LocationState {
  from?: string;
  message?: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as LocationState | null;
  
  const { unifiedLogin, isLoggedIn, errorMessage, setErrorMessage } = useAuth();
  
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastType, setToastType] = useState<'error' | 'info'>('error');
  const [toastTitle, setToastTitle] = useState<string>('로그인 오류');

  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (locationState?.message) {
      setToastMessage(locationState.message);
      setToastType('info');
      setToastTitle('알림');
      setShowToast(true);
      window.history.replaceState({}, document.title);
    }
  }, [locationState]);

  useEffect(() => {
    if (isLoggedIn) {
      setErrorMessage('');
      const redirectTo = locationState?.from || '/';
      navigate(redirectTo);
    }
  }, [isLoggedIn, navigate, setErrorMessage, locationState]);

  useEffect(() => {
    if (errorMessage) {
      setToastMessage(errorMessage);
      setToastType('error');
      setToastTitle('로그인 오류');
      setShowToast(true);
      setErrorMessage('');
    }
  }, [errorMessage, setErrorMessage]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }

    if (showToast) {
      setShowToast(false);
    }
  };

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await unifiedLogin(email, password, navigate);
    } catch (error: any) {
      console.error('Login failed:', error);
      const errMsg = error.response?.data?.message || error.message || '로그인에 실패했습니다.';
      setErrorMessage(errMsg);
    }
  }, [email, password, unifiedLogin, navigate, setErrorMessage]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  }, [handleSubmit]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseToast = useCallback(() => {
    setShowToast(false);
    setErrorMessage('');
  }, [setShowToast, setErrorMessage]);

  return (
    <L.Container>
      <L.LoginWrap onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
        <L.LogoAndForm>
          <L.LogoContainer>
            <L.LogoWrapping onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
              <L.LogoImg src={imgLogo} alt="logo" />
            </L.LogoWrapping>
            <L.LogoSubText>
              로그인 후 오카운트의 더 다양한 기능을 만나보세요!
            </L.LogoSubText>
          </L.LogoContainer>
          <L.FormContainer>
            <L.InputContainer>
              <L.LoginInput
                ref={emailInputRef}
                type="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                placeholder="이메일을 입력해주세요"
              />
              <L.PasswordContainer>
                <L.PasswordInput
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={password}
                  onChange={handleInputChange}
                  placeholder="비밀번호를 입력해주세요"
                />
                <L.PasswordToggleButton
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <Icon name="eyeOff" size={24} color="#111111" strokeWidth={1.5} />
                  ) : (
                    <Icon name="eye" size={24} color="#111111" strokeWidth={1.5} />
                  )}
                </L.PasswordToggleButton>
              </L.PasswordContainer>
            </L.InputContainer>
            <L.LoginButton type="submit">로그인</L.LoginButton>
          </L.FormContainer>
        </L.LogoAndForm>
        <L.ActionLinks>
          <L.ActionButton type="button" onClick={() => navigate('/pwChange')}>
            비밀번호 찾기
          </L.ActionButton>
          <L.Divider>|</L.Divider>
          <L.ActionButton type="button" onClick={() => navigate('/register')}>
            회원가입하기
          </L.ActionButton>
        </L.ActionLinks>
      </L.LoginWrap>
      <Toast
        isVisible={showToast}
        message={toastMessage || "아이디 혹은 비밀번호를 다시 확인해 주세요!"}
        type={toastType}
        title={toastTitle}
        onClose={handleCloseToast}
      />
    </L.Container>
  );
};

export default Login;
