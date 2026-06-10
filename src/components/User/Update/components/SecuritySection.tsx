import React from 'react';
import * as S from '../style';
import { usePasswordChange } from '../hooks/usePasswordChange';
import { usePinChange } from '../hooks/usePinChange';

interface SecuritySectionProps {
  userEmail: string;
  passwordChange: ReturnType<typeof usePasswordChange>;
  pinChange: ReturnType<typeof usePinChange>;
}

export const SecuritySection: React.FC<SecuritySectionProps> = ({
  userEmail,
  passwordChange,
  pinChange,
}) => {
  const {
    isOtpSent,
    isOtpVerified,
    isSending,
    isVerifying: isOtpVerifying,
    isSubmitting: isPasswordSubmitting,
    otpCode,
    setOtpCode,
    newPassword,
    confirmNewPassword,
    otpError,
    passwordWarning,
    confirmWarning,
    successMessage: passwordSuccess,
    handleSendOtp,
    handleVerifyOtp,
    handleNewPasswordChange,
    handleConfirmPasswordChange,
    handleSubmit: handlePasswordSubmit,
  } = passwordChange;

  const {
    password,
    setPassword,
    isPasswordVerified,
    isVerifying: isPinVerifying,
    newPin,
    confirmNewPin,
    passwordError: pinPasswordError,
    pinWarning,
    confirmWarning: pinConfirmWarning,
    isSubmitting: isPinSubmitting,
    successMessage: pinSuccess,
    handleVerifyPassword,
    handlePinChange,
    handleConfirmPinChange,
    handleSubmit: handlePinSubmit,
  } = pinChange;

  return (
    <>
      {/* ── 비밀번호 변경 ── */}
      <S.SubSectionTitle>비밀번호 변경</S.SubSectionTitle>
      <S.SecuritySection>
        {passwordSuccess ? (
          <S.SectionSuccessMessage>{passwordSuccess}</S.SectionSuccessMessage>
        ) : !isOtpSent ? (
          /* 1단계: 인증 코드 발송 */
          <>
            <S.InfoMessage>등록된 이메일({userEmail})로 인증 코드를 발송합니다.</S.InfoMessage>
            <S.VerificationButton
              type="button"
              onClick={() => handleSendOtp(userEmail)}
              disabled={isSending}
            >
              {isSending ? '발송 중...' : '인증 코드 발송'}
            </S.VerificationButton>
          </>
        ) : !isOtpVerified ? (
          /* 2단계: 코드 입력 후 인증 */
          <>
            <S.InfoMessage>이메일로 발송된 6자리 코드를 입력해주세요.</S.InfoMessage>
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
                  onKeyDown={(e) => e.key === 'Enter' && handleVerifyOtp(userEmail)}
                />
                <S.VerificationButton
                  type="button"
                  onClick={() => handleVerifyOtp(userEmail)}
                  disabled={isOtpVerifying}
                >
                  {isOtpVerifying ? '확인 중...' : '인증하기'}
                </S.VerificationButton>
              </S.AuthContainer>
              {otpError && <S.WarningMessage>{otpError}</S.WarningMessage>}
            </S.InputContainer>
            <S.ResendButton
              type="button"
              onClick={() => handleSendOtp(userEmail)}
              disabled={isSending}
            >
              코드 재발송
            </S.ResendButton>
          </>
        ) : (
          /* 3단계: 새 비밀번호 입력 */
          <>
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
            <S.SectionSubmitButton
              type="button"
              onClick={() => handlePasswordSubmit(userEmail)}
              disabled={isPasswordSubmitting}
            >
              {isPasswordSubmitting ? '변경 중...' : '비밀번호 변경'}
            </S.SectionSubmitButton>
          </>
        )}
      </S.SecuritySection>

      {/* ── PIN 변경 ── */}
      <S.SubSectionTitle>PIN 변경</S.SubSectionTitle>
      <S.SecuritySection>
        {pinSuccess ? (
          <S.SectionSuccessMessage>{pinSuccess}</S.SectionSuccessMessage>
        ) : !isPasswordVerified ? (
          /* 1단계: 현재 비밀번호 인증 */
          <>
            <S.InputContainer>
              <S.InputLabel>현재 비밀번호</S.InputLabel>
              <S.AuthContainer>
                <S.RegisterInput
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="현재 비밀번호"
                  onKeyDown={(e) => e.key === 'Enter' && handleVerifyPassword()}
                />
                <S.VerificationButton
                  type="button"
                  onClick={handleVerifyPassword}
                  disabled={isPinVerifying}
                >
                  {isPinVerifying ? '확인 중...' : '인증하기'}
                </S.VerificationButton>
              </S.AuthContainer>
              {pinPasswordError && <S.WarningMessage>{pinPasswordError}</S.WarningMessage>}
            </S.InputContainer>
          </>
        ) : (
          /* 2단계: 새 PIN 입력 */
          <>
            <S.InputContainer>
              <S.InputLabel>새 PIN</S.InputLabel>
              <S.RegisterInput
                type="password"
                inputMode="numeric"
                maxLength={6}
                value={newPin}
                onChange={handlePinChange}
                placeholder="새 PIN (4-6자리 숫자)"
              />
              {pinWarning && <S.WarningMessage>{pinWarning}</S.WarningMessage>}
            </S.InputContainer>
            <S.InputContainer>
              <S.InputLabel>새 PIN 확인</S.InputLabel>
              <S.RegisterInput
                type="password"
                inputMode="numeric"
                maxLength={6}
                value={confirmNewPin}
                onChange={handleConfirmPinChange}
                placeholder="새 PIN 확인"
              />
              {pinConfirmWarning && <S.WarningMessage>{pinConfirmWarning}</S.WarningMessage>}
            </S.InputContainer>
            <S.SectionSubmitButton
              type="button"
              onClick={handlePinSubmit}
              disabled={isPinSubmitting}
            >
              {isPinSubmitting ? '변경 중...' : 'PIN 변경'}
            </S.SectionSubmitButton>
          </>
        )}
      </S.SecuritySection>
    </>
  );
};
