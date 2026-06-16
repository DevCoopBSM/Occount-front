import React from 'react';
import * as S from '../style';
import { usePinChange } from '../hooks/usePinChange';

interface PinChangeSectionProps {
  pinChange: ReturnType<typeof usePinChange>;
}

export const PinChangeSection: React.FC<PinChangeSectionProps> = ({ pinChange }) => {
  const {
    state,
    isLoading,
    isSubmitDisabled,
    pinWarning,
    confirmWarning,
    remainingSeconds,
    formatTime,
    handlePasswordChange,
    handleVerifyPassword,
    handlePinChange,
    handleConfirmPinChange,
    handleSubmit,
  } = pinChange;

  if (state.step === 'success') {
    return <S.SectionSuccessMessage>PIN이 변경되었습니다.</S.SectionSuccessMessage>;
  }

  if (state.step === 'passwordRequired') {
    return (
      <S.InputContainer>
        <S.InputLabel>오카운트 계정 PW로 인증해 주세요 (PIN 번호 X)</S.InputLabel>
        <S.AuthContainer>
          <S.RegisterInput
            type="password"
            value={state.password}
            onChange={handlePasswordChange}
            placeholder="계정 비밀번호 입력"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleVerifyPassword();
              }
            }}
          />
          <S.VerificationButton type="button" onClick={handleVerifyPassword} disabled={isLoading}>
            {isLoading ? '확인 중...' : '인증하기'}
          </S.VerificationButton>
        </S.AuthContainer>
        {state.error && <S.WarningMessage>{state.error}</S.WarningMessage>}
      </S.InputContainer>
    );
  }

  // step === 'passwordVerified'
  return (
    <>
      <S.ExpiryTimer>
        인증 유효 시간: <span>{formatTime(remainingSeconds)}</span>
      </S.ExpiryTimer>
      <S.InputContainer>
        <S.InputLabel>새 PIN</S.InputLabel>
        <S.RegisterInput
          type="password"
          inputMode="numeric"
          maxLength={6}
          value={state.newPin}
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
          value={state.confirmNewPin}
          onChange={handleConfirmPinChange}
          placeholder="새 PIN 확인"
        />
        {confirmWarning && <S.WarningMessage>{confirmWarning}</S.WarningMessage>}
      </S.InputContainer>
      {state.error && <S.WarningMessage>{state.error}</S.WarningMessage>}
      <S.SectionSubmitButton type="button" onClick={handleSubmit} disabled={isLoading || isSubmitDisabled}>
        {isLoading ? '변경 중...' : 'PIN 변경'}
      </S.SectionSubmitButton>
    </>
  );
};
