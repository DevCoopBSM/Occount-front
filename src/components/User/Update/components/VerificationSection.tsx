import React from 'react';
import * as S from '../style';
import { UPDATE_MESSAGES } from '../constants/messages';

interface VerificationSectionProps {
    isVerified: boolean;
    currentPassword: string;
    setCurrentPassword: (value: string) => void;
    handleVerify: () => Promise<void>;
    verificationError?: string;
}

export const VerificationSection: React.FC<VerificationSectionProps> = ({
    isVerified,
    currentPassword,
    setCurrentPassword,
    handleVerify,
    verificationError
}) => {
    if (isVerified) return null;

    return (
        <>
            <S.InfoMessage>{UPDATE_MESSAGES.INFO.SECURITY}</S.InfoMessage>
            <S.AuthContainer>
                <S.InputContainer>
                    <S.InputLabel>현재 비밀번호</S.InputLabel>
                    <S.RegisterInput
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="현재 비밀번호"
                    />
                </S.InputContainer>
                <S.VerificationButton onClick={handleVerify} type="button">
                    인증하기
                </S.VerificationButton>
            </S.AuthContainer>
            {verificationError && (
                <S.ErrorMessage>{verificationError}</S.ErrorMessage>
            )}
        </>
    );
};
