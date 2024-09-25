import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import imgLogo from "assets/occregisterLogo.svg";
import { useAuth } from "context/authContext";
import * as R from "./style";

function Register() {
  const navigate = useNavigate();
  const { 
    registerStudent, 
    errorMessage,
    setErrorMessage,
    clearErrorMessage
  } = useAuth();
  
  const [userType, setUserType] = useState("student");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearErrorMessage();

    if (userType === "general") {
      setErrorMessage("일반 회원가입은 현재 지원되지 않습니다.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const result = await registerStudent(formData.name, formData.email, formData.password);
      if (result.success) {
        setSuccessMessage(result.message);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      console.error("Register component error:", error);
      setErrorMessage("회원가입 중 오류가 발생했습니다.");
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
            required
          />
          <R.EmailContainer>
            <R.RegisterInput
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder={userType === "student" ? "학교 이메일을 입력해주세요" : "이메일을 입력해주세요"}
              required
            />
          </R.EmailContainer>
          <R.RegisterInput
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="비밀번호를 입력해주세요"
            required
          />
          <R.RegisterInput
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="비밀번호를 다시 입력해주세요"
            required
          />
        </R.InputContainer>
        <R.RegisterButton type="submit" disabled={userType === "general"}>
          회원가입
        </R.RegisterButton>
      </R.RegisterWrap>
      {(errorMessage || successMessage) && (
        <R.ModalOverlay>
          <R.ModalContent>
            {errorMessage || successMessage}
          </R.ModalContent>
        </R.ModalOverlay>
      )}
    </R.Container>
  );
}

export default Register;
