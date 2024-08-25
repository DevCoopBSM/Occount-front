import React, { useState, ChangeEvent, FormEvent, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import imgLogo from "assets/occLoginlogo.svg";
import { useAuth } from "context/authContext";
import * as L from "./style";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { unifiedLogin, errorMessage, clearErrorMessage } = useAuth();
  
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const emailInputRef = useRef<HTMLInputElement>(null);

  // 이메일 입력란에 포커스 설정
  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  // 에러 메시지 표시 후 3초 뒤에 자동으로 모달을 닫음
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        clearErrorMessage(); // 에러 메시지를 비우는 함수 호출
      }, 3000); // 3초 후에 실행

      return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 클리어
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await unifiedLogin(email, password, navigate);
    } catch (error) {
      console.error("Login component error:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e as unknown as FormEvent<HTMLFormElement>);
    }
  };

  return (
    <L.Container>
      <L.LoginWrap onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
        <L.LogoImg src={imgLogo} alt="logo image" />
        <L.LogoSubText>로그인 후 오카운트의 더 다양한 기능을 만나보세요!</L.LogoSubText>
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
          <L.ActionButton type="button" onClick={() => navigate('/register')}>회원가입하기</L.ActionButton> |
          <L.ActionButton type="button" onClick={() => navigate('/pwChange')}>비밀번호 찾기</L.ActionButton>
        </L.ActionLinks>
        <L.LoginButton type="submit">로그인</L.LoginButton>
      </L.LoginWrap>
      {errorMessage && (
        <L.ModalOverlay>
          <L.ModalContent>
            {errorMessage}
          </L.ModalContent>
        </L.ModalOverlay>
      )}
    </L.Container>
  );
};

export default Login;
