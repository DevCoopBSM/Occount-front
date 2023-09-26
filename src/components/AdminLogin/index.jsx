import React from "react";
import imgLogo from "../../assets/DevCoopL.svg";
import { useAdminAuth } from "../../hooks/useAdminAuth.jsx";
import * as L from "./style";

function AdminLogin() {
  const {
    email,
    password,
    handleInputId,
    handleInputPw,
    handleSubmit,
    errorMessage
  } = useAdminAuth();

  return (
    <div>
      <L.LoginWrap onSubmit={handleSubmit}>
        <L.LogoImg src={imgLogo} alt="logo image" />
        <L.LoginInput
          type="email"
          name="email"
          value={email}
          onChange={handleInputId}
          placeholder="아이디를 입력해주세요"
        />
        <L.LoginInput
          type="password"
          name="password"
          value={password}
          onChange={handleInputPw}
          placeholder="비밀번호를 입력해주세요"
        />
        <L.LoginButton>로그인</L.LoginButton>
      </L.LoginWrap>
      {errorMessage && (
        <L.ModalOverlay>
          <L.ModalContent>
            {errorMessage}
          </L.ModalContent>
        </L.ModalOverlay>
      )}
    </div>
  );
}

export default AdminLogin;
