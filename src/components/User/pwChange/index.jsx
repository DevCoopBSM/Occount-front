import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import imgLogo from "assets/occpwChangeLogo.svg";
import { useAuth } from "contexts/authContext";
import * as L from "./style";

function PwChange() {
  const navigate = useNavigate();
  const { 
    requestEmailVerification,
    errorMessage,
  } = useAuth();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

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
      const result = await requestEmailVerification(email, name);
      if (result.success) {
        alert(`${name} 님의 이메일로 비밀번호 재설정 링크가 전송되었습니다.`);
        navigate("/");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("PwChange component error:", error);
      alert('비밀번호 재설정 요청 중 오류가 발생했습니다.');
    }
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
          <L.PwChangeInput
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            placeholder="이메일을 입력해주세요"
          />
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
