import React, { useState, useCallback, useRef, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import imgLogo from "assets/occLoginlogo.svg";
import { useAuth } from "contexts/authContext";
import * as L from "./style";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { unifiedLogin, isLoggedIn, errorMessage, setErrorMessage, clearErrorMessage } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        clearErrorMessage();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage, clearErrorMessage]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await unifiedLogin(email, password, navigate);
    } catch (error: any) {
      console.error('Login failed:', error);
      // 에러 메시지는 이미 authContext에서 처리되므로 여기서는 추가 처리가 필요 없습니다.
    } finally {
      setIsLoading(false);
    }
  }, [email, password, unifiedLogin, navigate]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  }, [handleSubmit]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex items-center justify-center">
        <L.Container>
          <L.LoginWrap onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
            <L.LogoImg src={imgLogo} alt="logo image" />
            <L.LogoSubText>로그인 후 오카운트의 더다양한 기능을 만나보세요!</L.LogoSubText>
            <L.InputContainer>
              <L.LoginInput
                ref={emailInputRef}
                type="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                placeholder=" 이메일을 입력해주세요"
              />
              <L.LoginInput
                type="password"
                name="password"
                value={password}
                onChange={handleInputChange}
                placeholder=" 비밀번호를 입력해주세요"
              />
            </L.InputContainer>
            <L.ActionLinks>
              <L.ActionButton type="button" onClick={() => navigate('/register')}>회원가입하기</L.ActionButton>
              <L.Divider>|</L.Divider>
              <L.ActionButton type="button" onClick={() => navigate('/pwChange')}>비밀번호 찾기</L.ActionButton>
            </L.ActionLinks>
            <L.LoginButton type="submit" disabled={isLoading}>
              {isLoading ? '로그인 중...' : '로그인'}
            </L.LoginButton>
          </L.LoginWrap>
        </L.Container>
      </div>
      {isLoading && <L.LoadingOverlay />}
      {errorMessage && <L.ErrorMessage>{errorMessage}</L.ErrorMessage>}
    </div>
  );
};

export default Login;