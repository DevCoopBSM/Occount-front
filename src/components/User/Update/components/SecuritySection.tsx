import React from 'react';
import * as S from '../style';
import { usePasswordChange } from '../hooks/usePasswordChange';
import { usePinChange } from '../hooks/usePinChange';
import { PasswordChangeSection } from './PasswordChangeSection';
import { PinChangeSection } from './PinChangeSection';

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
  return (
    <>
      <S.SubSectionTitle>비밀번호 변경</S.SubSectionTitle>
      <S.SecuritySection>
        <PasswordChangeSection userEmail={userEmail} passwordChange={passwordChange} />
      </S.SecuritySection>

      <S.SubSectionTitle>PIN 변경</S.SubSectionTitle>
      <S.SecuritySection>
        <PinChangeSection pinChange={pinChange} />
      </S.SecuritySection>
    </>
  );
};
