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
  const [name, setName] = useState(""); // 추가된 이름 상태
  const [successMessage, setSuccessMessage] = useState(""); // 성공 메시지 상태

  const handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "name") { // 이름 입력 처리
      setName(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await unifiedLogin(email, password, navigate);
      
      if (response.data.success) {
        // 성공 시 메시지 설정
        setSuccessMessage(`${name} 님의 이메일로 비밀번호 재설정 링크가 전송되었어요!`);
      } else {
        alert("일치하는 정보 없음! - 혹시 회원가입이 되지 않은 것은 아닐까요?");
      }
    } catch (error) {
      console.error("PwChange component error:", error);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login'); // 로그인 페이지로 이동
  };

  return (
    <L.Container>
      <L.PwChangeWrap onSubmit={handleSubmit}>
        <L.LogoImg src={imgLogo} alt="logo image" />
        <L.InputContainer>
          <L.PwChangeInput
            type="text"
            name="name"
            value={name}
            onChange={handleInputChange}
            placeholder="이름을 입력해주세요"
          />
          <L.PwChangeEmailContainer>
            <L.PwChangeInput
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              placeholder="이메일 또는 전화번호를 입력해주세요"
            />
            <L.VerifyButton type="button">인증하기</L.VerifyButton>
          </L.PwChangeEmailContainer>
        </L.InputContainer>
        <L.PwChangeButton type="submit">본인확인</L.PwChangeButton>
        {successMessage && (
          <L.SuccessMessageContainer>
            <L.SuccessMessage>{successMessage}</L.SuccessMessage>
            <L.PwChangeButton onClick={handleBackToLogin}>로그인으로 돌아가기</L.PwChangeButton>
          </L.SuccessMessageContainer>
        )}
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
