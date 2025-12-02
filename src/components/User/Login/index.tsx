import React, { useState, useCallback, useRef, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import imgLogo from "assets/occount-logo.svg";
import { useAuth } from "contexts/authContext";
import Toast from "common/Toast";
import * as L from "./style";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { unifiedLogin, isLoggedIn, errorMessage, setErrorMessage } = useAuth();
  
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);

  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isLoggedIn) {
      setErrorMessage('');
      navigate('/');
    }
  }, [isLoggedIn, navigate, setErrorMessage]);

  useEffect(() => {
    if (errorMessage) {
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
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M3.98014 8.22257C3.05704 9.31382 2.35263 10.596 1.93457 12.0015C3.22587 16.338 7.24332 19.5 11.9993 19.5C12.9919 19.5 13.9523 19.3623 14.8625 19.1049M6.22784 6.22763C7.8841 5.13558 9.86792 4.5 12.0002 4.5C16.7562 4.5 20.7736 7.66205 22.0649 11.9985C21.353 14.3919 19.8108 16.4277 17.7722 17.772M6.22784 6.22763L3.00021 3M6.22784 6.22763L9.87889 9.87868M17.7722 17.772L21.0002 21M17.7722 17.772L14.1215 14.1213M14.1215 14.1213C14.6644 13.5784 15.0002 12.8284 15.0002 12C15.0002 10.3431 13.6571 9 12.0002 9C11.1718 9 10.4218 9.33579 9.87889 9.87868M14.1215 14.1213L9.87889 9.87868"
                        stroke="#111111"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M2.03526 12.3224C1.96618 12.1151 1.96611 11.8907 2.03507 11.6834C3.42343 7.50972 7.3605 4.5 12.0005 4.5C16.6384 4.5 20.5739 7.50692 21.964 11.6776C22.0331 11.8849 22.0332 12.1093 21.9642 12.3166C20.5759 16.4903 16.6388 19.5 11.9988 19.5C7.3609 19.5 3.42535 16.4931 2.03526 12.3224Z"
                        stroke="#111111"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14.9997 12C14.9997 13.6569 13.6566 15 11.9997 15C10.3429 15 8.99971 13.6569 8.99971 12C8.99971 10.3431 10.3429 9 11.9997 9C13.6566 9 14.9997 10.3431 14.9997 12Z"
                        stroke="#111111"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
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
        message="아이디 혹은 비밀번호를 다시 확인해 주세요!"
        type="error"
        title="로그인 오류"
        onClose={handleCloseToast}
      />
    </L.Container>
  );
};

export default Login;
