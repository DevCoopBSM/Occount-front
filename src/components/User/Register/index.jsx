import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import imgLogo from "assets/occregisterLogo.svg";
import { useAuth } from "contexts/authContext";
import * as R from "./style";

function Register() {
  const navigate = useNavigate();
  const { register, errorMessage } = useAuth();

  const [userType, setUserType] = useState("student");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      const result = await register(formData.name, formData.email, formData.password, userType);
      if (result.success) {
        alert("회원가입이 완료되었습니다.");
        navigate('/');
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Register component error:", error);
      alert('회원가입 중 오류가 발생했습니다.');
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
            type="button"
          >
            학생 회원가입
          </R.ToggleButton>
          <R.ToggleButton 
            active={userType === "general"}
            onClick={() => setUserType("general")}
            type="button"
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
          <R.RegisterInput
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder={userType === "student" ? "학교 이메일을 입력해주세요" : "이메일을 입력해주세요"}
            required
          />
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
