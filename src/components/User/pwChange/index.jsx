import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import imgLogo from "assets/occpwChangeLogo.svg";
import { useAuth } from "context/authContext";
import * as L from "./style";

function PwChange() {
  const navigate = useNavigate();
  const { 
    requestEmailVerification,
    errorMessage,
  } = useAuth();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "name") {
      setName(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await requestEmailVerification(email);
      if (result.success) {
        setSuccessMessage(`${name} 님의 이메일로 비밀번호 재설정 링크가 전송되었어요!`);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("PwChange component error:", error);
      alert('비밀번호 재설정 요청 중 오류가 발생했습니다.');
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
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
              placeholder="이메일을 입력해주세요"
            />
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
