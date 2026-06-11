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
    pinWarning,
    confirmWarning,
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
        <S.InputLabel>현재 비밀번호</S.InputLabel>
        <S.AuthContainer>
          <S.RegisterInput
            type="password"
            value={state.password}
            onChange={handlePasswordChange}
            placeholder="현재 비밀번호"
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
      <S.SectionSubmitButton type="button" onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? '변경 중...' : 'PIN 변경'}
      </S.SectionSubmitButton>
    </>
  );
};
