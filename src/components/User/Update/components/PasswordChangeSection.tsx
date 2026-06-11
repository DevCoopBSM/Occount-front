import React from 'react';
import * as S from '../style';
import { usePasswordChange } from '../hooks/usePasswordChange';

interface PasswordChangeSectionProps {
  userEmail: string;
  passwordChange: ReturnType<typeof usePasswordChange>;
}

export const PasswordChangeSection: React.FC<PasswordChangeSectionProps> = ({
  userEmail,
  passwordChange,
}) => {
  const {
    step,
    isLoading,
    otpCode,
    setOtpCode,
    newPassword,
    confirmNewPassword,
    error,
    passwordWarning,
    confirmWarning,
    handleSendOtp,
    handleNewPasswordChange,
    handleConfirmPasswordChange,
    handleSubmit,
  } = passwordChange;

  if (step === 'success') {
    return <S.SectionSuccessMessage>비밀번호가 변경되었습니다.</S.SectionSuccessMessage>;
  }

  if (step === 'idle') {
    return (
      <S.AuthContainer>
        <S.InfoMessage>등록된 이메일({userEmail})로 인증 코드를 발송합니다.</S.InfoMessage>
        <S.VerificationButton
          type="button"
          onClick={() => handleSendOtp(userEmail)}
          disabled={isLoading}
        >
          {isLoading ? '발송 중...' : '인증 코드 발송'}
        </S.VerificationButton>
      </S.AuthContainer>
    );
  }

  // step === 'otpSent'
  return (
    <>
      <S.InputContainer>
        <S.InputLabel>인증 코드</S.InputLabel>
        <S.AuthContainer>
          <S.RegisterInput
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
            placeholder="인증 코드 6자리"
          />
          <S.ResendButton
            type="button"
            onClick={() => handleSendOtp(userEmail)}
            disabled={isLoading}
          >
            재발송
          </S.ResendButton>
        </S.AuthContainer>
      </S.InputContainer>
      <S.InputContainer>
        <S.InputLabel>새 비밀번호</S.InputLabel>
        <S.RegisterInput
          type="password"
          value={newPassword}
          onChange={handleNewPasswordChange}
          placeholder="새 비밀번호 (8자 이상, 문자·숫자·특수문자 포함)"
        />
        {passwordWarning && <S.WarningMessage>{passwordWarning}</S.WarningMessage>}
      </S.InputContainer>
      <S.InputContainer>
        <S.InputLabel>새 비밀번호 확인</S.InputLabel>
        <S.RegisterInput
          type="password"
          value={confirmNewPassword}
          onChange={handleConfirmPasswordChange}
          placeholder="새 비밀번호 확인"
        />
        {confirmWarning && <S.WarningMessage>{confirmWarning}</S.WarningMessage>}
      </S.InputContainer>
      {error && <S.WarningMessage>{error}</S.WarningMessage>}
      <S.SectionSubmitButton
        type="button"
        onClick={() => handleSubmit(userEmail)}
        disabled={isLoading}
      >
        {isLoading ? '변경 중...' : '비밀번호 변경'}
      </S.SectionSubmitButton>
    </>
  );
};
