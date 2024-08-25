import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import imgLogo from "assets/occregisterLogo.svg";
import { useAuth } from "context/authContext";
import * as R from "./style";
  
function Register() {
  const navigate = useNavigate();
  const { 
    unifiedRegister, 
    errorMessage
  } = useAuth();
  
  const [userType, setUserType] = useState("student"); // 학생 / 일반 회원가입 상태 조절
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await unifiedRegister(formData, navigate);
    } catch (error) {
      console.error("Register component error:", error);
    }
  };

  return (
    <R.Container>
      <R.RegisterWrap onSubmit={handleSubmit}>
        <R.LogoImg src={imgLogo} alt="logo image" />
        <R.ToggleButtonContainer>
          <R.ToggleButton 
            active={userType === "student"}
            onClick={() => setUserType("student")}
          >
            학생 회원가입
          </R.ToggleButton>
          <R.ToggleButton 
            active={userType === "general"}
            onClick={() => setUserType("general")}
          >
            일반 회원가입
          </R.ToggleButton>
        </R.ToggleButtonContainer>
        <R.InputContainer>
          <R.RegisterInput
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="이름을 입력해주세요"
          />
          <R.EmailContainer>
            <R.RegisterInput
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder={
                userType === "student" ? "학교 이메일을 입력해주세요" : "이메일을 입력해주세요"
              }
            />
            <R.VerifyButton>인증하기</R.VerifyButton>
          </R.EmailContainer>
          {userType === "general" && (
            <R.EmailContainer>
              <R.RegisterInput
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="전화번호를 입력해주세요"
              />
              <R.VerifyButton>인증하기</R.VerifyButton>
            </R.EmailContainer>
          )}
          <R.RegisterInput
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="비밀번호를 입력해주세요"
          />
          <R.RegisterInput
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="비밀번호를 다시 입력해주세요"
          />
        </R.InputContainer>
        <R.RegisterButton type="submit">회원가입</R.RegisterButton>
      </R.RegisterWrap>
      {errorMessage && (
        <R.ModalOverlay>
          <R.ModalContent>
            {errorMessage}
          </R.ModalContent>
        </R.ModalOverlay>
      )}
    </R.Container>
  );
}

export default Register;
