import React, { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import imgLogo from "assets/occount-logo.svg";
import { useAuth } from "contexts/authContext";
import Toast from "common/Toast";
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
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastType, setToastType] = useState<"success" | "error">("error");
  const [toastTitle, setToastTitle] = useState<string>("");

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
        setToastType("success");
        setToastTitle("비밀번호 변경완료");
        setToastMessage("비밀번호가 정상적으로 설정되었어요");
        setShowToast(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setToastType("error");
        setToastTitle("! 비밀번호 설정 오류");
        setToastMessage(
          "비밀번호가 맞는지, 이전과 같진 않은지 다시 확인해주세요."
        );
        setShowToast(true);
      }
    } catch (error) {
      console.error("PwChangeEX component error:", error);
      setToastType("error");
      setToastTitle("! 비밀번호 설정 오류");
      if (error instanceof Error && error.message === "JWT 토큰이 없습니다.") {
        setToastMessage(
          "토큰이 유효하지 않습니다. 새로운 비밀번호 변경 링크를 요청해주세요."
        );
      } else if (error instanceof Error && error.message.includes("401")) {
        setToastMessage(
          "토큰이 만료되었습니다. 새로운 비밀번호 변경 링크를 요청해주세요."
        );
      } else {
        setToastMessage(
          "비밀번호가 맞는지, 이전과 같진 않은지 다시 확인해주세요."
        );
      }
      setShowToast(true);
    }
  };

  return (
    <L.Container>
      <L.LogoAndForm>
        <L.LogoContainer>
          <L.LogoWraping>
            <L.LogoImg src={imgLogo} alt="logo" />
          </L.LogoWraping>
          <L.Title>비밀번호 재설정</L.Title>
        </L.LogoContainer>

        <L.PwChangeWrap onSubmit={handleSubmit}>
          <L.FormContainer>
            <L.InputContainer>
              <div>
                <L.PwChangeInput
                  type="password"
                  name="newPassword"
                  value={newPassword}
                  onChange={handleInputChange}
                  placeholder="비밀번호를 입력해주세요"
                  required
                />
                {passwordError && (
                  <L.ErrorMessage>{passwordError}</L.ErrorMessage>
                )}
              </div>
              <div>
                <L.PwChangeInput
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleInputChange}
                  placeholder="비밀번호를 다시 입력해주세요"
                  required
                />
                {confirmError && (
                  <L.ErrorMessage>{confirmError}</L.ErrorMessage>
                )}
              </div>
            </L.InputContainer>
            <L.PwChangeButton type="submit">비밀번호 재설정</L.PwChangeButton>
          </L.FormContainer>
        </L.PwChangeWrap>
      </L.LogoAndForm>

      {errorMessage && (
        <L.ModalOverlay>
          <L.ModalContent>{errorMessage}</L.ModalContent>
        </L.ModalOverlay>
      )}

      <Toast
        isVisible={showToast}
        message={toastMessage}
        type={toastType}
        title={toastTitle}
        duration={3000}
        onClose={() => setShowToast(false)}
      />
    </L.Container>
  );
}

export default PwChangeEX;
