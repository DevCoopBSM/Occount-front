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
        alert(result.message);
        navigate('/');
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("PwChangeEX component error:", error);
      if (error.response && error.response.status === 401) {
        alert('토큰이 만료되었습니다. 새로운 비밀번호 변경 링크를 요청해주세요.');
        navigate('/pwchange');
      } else {
        alert('비밀번호 변경 중 오류가 발생했습니다.');
      }
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
