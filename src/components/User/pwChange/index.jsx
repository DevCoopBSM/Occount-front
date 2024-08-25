import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import imgLogo from "assets/occpwChangeLogo.svg";
import { useAuth } from "context/authContext";
import * as L from "./style";
  
function PwChange() {
  const navigate = useNavigate();
  const { 
    unifiedLogin, 
    errorMessage
  } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await unifiedLogin(email, password, navigate);
    } catch (error) {
      console.error("PwChange component error:", error);
    }
  };

  return (
    <L.Container>
      <L.PwChangeWrap onSubmit={handleSubmit}>
        <L.LogoImg src={imgLogo} alt="logo image" />
        <L.InputContainer>
          <L.PwChangeInput
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            placeholder="이름을 입력해주세요"
          />
          <L.PwChangeEmailContainer>
            <L.PwChangeInput
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              placeholder="이메일 또는 전화번호를 입력해주세요"
            />
            <L.VerifyButton type="button">인증하기</L.VerifyButton>
          </L.PwChangeEmailContainer>
        </L.InputContainer>
        <L.PwChangeButton type="submit">본인확인</L.PwChangeButton>
      </L.PwChangeWrap>
      {errorMessage && (
        <L.ModalOverlay>
          <L.ModalContent>
            {errorMessage}
          </L.ModalContent>
        </L.ModalOverlay>
      )}
    </L.Container>
  );
}

export default PwChange;
