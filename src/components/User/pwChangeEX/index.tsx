import React, { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import imgLogo from "assets/occpwChangeLogo.svg";
import { useAuth } from "contexts/authContext";
import * as L from "./style";

interface ChangePasswordResult {
  success: boolean;
  message: string;
}

function PwChangeEX(): JSX.Element {
  const navigate = useNavigate();
  const { jwtToken } = useParams<{ jwtToken: string }>();
  const { 
    changePassword,
    errorMessage,
  } = useAuth();

  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmError, setConfirmError] = useState<string>("");

  const isPasswordValid = (password: string): string => {
    if (password.length < 8) return "비밀번호는 8자 이상이어야 합니다.";
    if (!/[a-z]/.test(password)) return "비밀번호는 소문자를 포함해야 합니다.";
    if (!/\d/.test(password)) return "비밀번호는 숫자를 포함해야 합니다.";
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) return "비밀번호는 특수문자를 포함해야 합니다.";
    return "";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    if (name === "newPassword") {
      setNewPassword(value);
      setPasswordError(isPasswordValid(value));
      if (confirmPassword) {
        setConfirmError(value === confirmPassword ? "" : "비밀번호가 일치하지 않습니다.");
      }
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
      setConfirmError(newPassword === value ? "" : "비밀번호가 일치하지 않습니다.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const passwordValidationError = isPasswordValid(newPassword);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }
    if (newPassword !== confirmPassword) {
      setConfirmError("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      if (!jwtToken) {
        throw new Error("JWT 토큰이 없습니다.");
      }
      const result: ChangePasswordResult = await changePassword(jwtToken, newPassword);
      if (result.success) {
        alert(result.message);
        navigate('/');
      } else {
        setPasswordError(result.message);
      }
    } catch (error) {
      console.error("PwChangeEX component error:", error);
      if (error instanceof Error && error.message === "JWT 토큰이 없습니다.") {
        setPasswordError('토큰이 유효하지 않습니다. 새로운 비밀번호 변경 링크를 요청해주세요.');
      } else if (error instanceof Error && error.message.includes("401")) {
        setPasswordError('토큰이 만료되었습니다. 새로운 비밀번호 변경 링크를 요청해주세요.');
        setTimeout(() => navigate('/pwchange'), 3000);
      } else {
        setPasswordError('비밀번호 변경 중 오류가 발생했습니다.');
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
          {passwordError && <L.ErrorMessage>{passwordError}</L.ErrorMessage>}
          <L.PwChangeInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleInputChange}
            placeholder="새 비밀번호를 다시 입력해주세요"
          />
          {confirmError && <L.ErrorMessage>{confirmError}</L.ErrorMessage>}
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
