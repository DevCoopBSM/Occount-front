import React, { useState, useCallback, useRef, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import imgLogo from "assets/occLoginlogo.svg";
import { useAuth } from "contexts/authContext";
import * as L from "./style";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { unifiedLogin, isLoggedIn, errorMessage, setErrorMessage } = useAuth();
  const [isErrorVisible, setIsErrorVisible] = useState<boolean>(false);
  
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const emailInputRef = useRef<HTMLInputElement>(null);
  const errorTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (errorMessage) {
      setIsErrorVisible(true);
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
      errorTimeoutRef.current = setTimeout(() => {
        setIsErrorVisible(false);
      }, 2000); // 4초 동안 에러 메시지 표시
    }

    return () => {
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
    };
  }, [errorMessage]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
    
    if (isErrorVisible) {
      setIsErrorVisible(false);
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
            <L.LoginButton type="submit">
              로그인
            </L.LoginButton>
            <L.ErrorMessageWrapper>
              <L.ErrorMessage isVisible={isErrorVisible}>
                {errorMessage}
              </L.ErrorMessage>
            </L.ErrorMessageWrapper>
          </L.LoginWrap>
        </L.Container>
      </div>
    </div>
  );
};

export default Login;