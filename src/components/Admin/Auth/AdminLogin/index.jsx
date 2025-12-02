import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import imgLogo from "assets/DevCoopL.svg";
import { useAuth } from "contexts/authContext";
import * as L from "./style";
import { PageTitle } from "./style";

function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
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
      await unifiedLogin(email, password, navigate, true); // <-- AdminLogin이므로 admin을 true로 설정
    } catch (error) {
      console.error("AdminLogin component error:", error);
    }
  };

  return (
    <div>
      <L.LoginWrap onSubmit={handleSubmit}>
        <PageTitle>Admin 로그인 페이지</PageTitle>
        <L.LogoImg src={imgLogo} alt="logo image" />
        <L.LoginInput
          type="email"
          name="email"
          value={email}
          onChange={handleInputChange}
          placeholder="아이디를 입력해주세요"
        />
        <L.LoginInput
          type="password"
          name="password"
          value={password}
          onChange={handleInputChange}
          placeholder="비밀번호를 입력해주세요"
        />
        <L.LoginButton>로그인</L.LoginButton>
      </L.LoginWrap>
      {errorMessage && location.pathname === '/admin/login' && (
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
