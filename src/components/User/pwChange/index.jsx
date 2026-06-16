import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from 'utils/Axios';
import Toast from 'common/Toast';
import * as L from './style';

const STEP = {
  EMAIL: 'EMAIL',
  OTP: 'OTP',
  SUCCESS: 'SUCCESS',
};

function PwChange() {
  const navigate = useNavigate();

  const [step, setStep] = useState(STEP.EMAIL);
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState('error');
  const [toastMessage, setToastMessage] = useState('');
  const [toastTitle, setToastTitle] = useState('');

  const handleCloseToast = React.useCallback(() => {
    setShowToast(false);
  }, []);

  const showError = (title, message) => {
    setToastType('error');
    setToastTitle(title);
    setToastMessage(message);
    setShowToast(true);
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axiosInstance.post('auth/email/send-otp', {
        email,
        purpose: 'PASSWORD_RESET',
      });
      setStep(STEP.OTP);
    } catch (error) {
      const status = error.response?.status;
      if (status === 429) {
        showError('요청 한도 초과', error.response?.data?.message || '잠시 후 다시 시도해주세요.');
      } else {
        showError('발송 실패', '인증번호 발송에 실패했습니다. 이메일을 확인해주세요.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showError('비밀번호 불일치', '새 비밀번호가 일치하지 않습니다.');
      return;
    }
    if (newPassword.length < 8) {
      showError('비밀번호 오류', '비밀번호는 8자 이상이어야 합니다.');
      return;
    }
    setIsSubmitting(true);
    try {
      await axiosInstance.post('auth/password/change', {
        email,
        otp_code: otpCode,
        new_password: newPassword,
      });
      setStep(STEP.SUCCESS);
    } catch (error) {
      const status = error.response?.status;
      if (status === 401) {
        showError('인증 실패', '인증번호가 올바르지 않습니다.');
      } else if (status === 404) {
        showError('인증번호 없음', '인증번호를 먼저 요청해주세요.');
      } else {
        showError('변경 실패', '비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === STEP.SUCCESS) {
    return (
      <L.Container>
        <L.SuccessContainer>
          <L.LogoWrapping onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <L.LogoImg src="/assets/occount-logo.svg" alt="logo" />
          </L.LogoWrapping>
          <L.SuccessMessage>비밀번호가 변경되었습니다!</L.SuccessMessage>
          <L.SuccessSubMessage>새 비밀번호로 로그인해주세요</L.SuccessSubMessage>
          <L.LoginButton onClick={() => navigate('/login')}>로그인하러가기</L.LoginButton>
        </L.SuccessContainer>
      </L.Container>
    );
  }

  return (
    <L.Container>
      <L.LogoAndForm>
        <L.LogoContainer>
          <L.LogoWrapping onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <L.LogoImg src="/assets/occount-logo.svg" alt="logo" />
          </L.LogoWrapping>
          <L.LogoSubText>비밀번호 찾기</L.LogoSubText>
        </L.LogoContainer>

        {step === STEP.EMAIL && (
          <L.PwChangeWrap onSubmit={handleSendOtp}>
            <L.FormContainer>
              <L.InputContainer>
                <L.PwChangeInput
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="이메일을 입력해주세요"
                  required
                />
              </L.InputContainer>
              <L.PwChangeButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? '발송 중...' : '인증번호 받기'}
              </L.PwChangeButton>
            </L.FormContainer>
          </L.PwChangeWrap>
        )}

        {step === STEP.OTP && (
          <L.PwChangeWrap onSubmit={handleChangePassword}>
            <L.FormContainer>
              <L.InputContainer>
                <L.PwChangeInput
                  type="text"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="인증번호 6자리"
                  maxLength={6}
                  required
                />
                <L.PwChangeInput
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="새 비밀번호 (8자 이상)"
                  required
                />
                <L.PwChangeInput
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="새 비밀번호 확인"
                  required
                />
              </L.InputContainer>
              <L.PwChangeButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? '변경 중...' : '비밀번호 변경'}
              </L.PwChangeButton>
            </L.FormContainer>
          </L.PwChangeWrap>
        )}
      </L.LogoAndForm>

      <Toast
        isVisible={showToast}
        message={toastMessage}
        title={toastTitle}
        type={toastType}
        onClose={handleCloseToast}
        duration={3000}
      />
    </L.Container>
  );
}

export default PwChange;
