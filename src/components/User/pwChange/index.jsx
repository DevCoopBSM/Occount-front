import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import imgLogo from "assets/occount-logo.svg";
import { useAuth } from "contexts/authContext";
import Toast from 'common/Toast';
import * as L from "./style";

function PwChange() {
  const navigate = useNavigate();
  const { requestEmailVerification } = useAuth();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState('error');
  const [toastMessage, setToastMessage] = useState('');
  const [toastTitle, setToastTitle] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [userName, setUserName] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "name") {
      setName(value);
    }

    // 입력 시 토스트 숨기기
    if (showToast) {
      setShowToast(false);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await requestEmailVerification(email, name);
      if (result.success) {
        setUserName(name);
        setToastType('success');
        setToastTitle('비밀번호 재설정 링크 발송');
        setToastMessage(`${name} 님의 메일로 재설정 링크가 발송되었어요.`);
        setShowToast(true);
        setShowSuccess(true);
      } else {
        setToastType('error');
        setToastTitle('일치하는 정보 없음');
        setToastMessage('계정이 존재하는지 다시 확인해 주세요.');
        setShowToast(true);
      }
    } catch (error) {
      console.error('PwChange component error:', error);
      setToastType('error');
      setToastTitle('일치하는 정보 없음');
      setToastMessage('계정이 존재하는지 다시 확인해 주세요.');
      setShowToast(true);
    }
  };

  if (showSuccess) {
    return (
      <L.Container>
        <L.SuccessContainer>
          <L.LogoWraping onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <L.LogoImg src={imgLogo} alt="logo" />
          </L.LogoWraping>
          <L.SuccessMessage>
            {userName} 님의 메일/전화번호로 재설정 링크가 전달되었어요!
          </L.SuccessMessage>
          <L.SuccessSubMessage>
            로그인 후에 OCCOUNT의 서비스를 이용해보세요
          </L.SuccessSubMessage>
          <L.LoginButton onClick={() => navigate('/login')}>
            로그인하러가기
          </L.LoginButton>
        </L.SuccessContainer>
      </L.Container>
    );
  }

  return (
    <L.Container>
      <L.LogoAndForm>
        <L.LogoContainer>
          <L.LogoWraping onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <L.LogoImg src={imgLogo} alt="logo" />
          </L.LogoWraping>
          <L.LogoSubText>비밀번호 찾기</L.LogoSubText>
        </L.LogoContainer>

        <L.PwChangeWrap onSubmit={handleSubmit}>
          <L.FormContainer>
            <L.InputContainer>
              <L.PwChangeInput
                type="text"
                name="name"
                value={name}
                onChange={handleInputChange}
                placeholder="이름을 입력해주세요"
                required
              />
              <L.PwChangeInput
                type="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                placeholder="이메일을 입력해주세요"
                required
              />
            </L.InputContainer>
            <L.PwChangeButton type="submit">본인확인</L.PwChangeButton>
          </L.FormContainer>
        </L.PwChangeWrap>
      </L.LogoAndForm>

      <Toast
        isVisible={showToast}
        message={toastMessage}
        title={toastTitle}
        type={toastType}
        onClose={() => setShowToast(false)}
      />
    </L.Container>
  );
}

export default PwChange;
