import React, { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import imgLogo from "assets/occpwChangeLogo.svg";
import { useAuth } from "context/authContext";
import * as L from "./style";

function PwChangeEX() {
  const navigate = useNavigate();
  const { jwtToken } = useParams();
  const { 
    changePassword,
    errorMessage,
  } = useAuth();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "newPassword") {
      setNewPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      const result = await changePassword(jwtToken, newPassword);
      if (result.success) {
        setSuccessMessage(result.message);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("PwChangeEX component error:", error);
      alert('비밀번호 변경 중 오류가 발생했습니다.');
    }
  };

  return (
    <L.Container>
      <L.PwChangeWrap onSubmit={handleSubmit}>
        <L.LogoImg src={imgLogo} alt="logo image" />
        <L.InputContainer>
          <L.PwChangeInput
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={handleInputChange}
            placeholder="새 비밀번호를 입력해주세요"
          />
          <L.PwChangeInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleInputChange}
            placeholder="새 비밀번호를 다시 입력해주세요"
          />
        </L.InputContainer>
        <L.PwChangeButton type="submit">비밀번호 변경</L.PwChangeButton>
        {successMessage && (
          <L.SuccessMessageContainer>
            <L.SuccessMessage>{successMessage}</L.SuccessMessage>
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

export default PwChangeEX;
