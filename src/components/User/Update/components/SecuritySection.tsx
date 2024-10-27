import React from 'react';
import * as S from '../style';

interface SecuritySectionProps {
    isVerified: boolean;
    isPasswordChangeMode: boolean;
    isPinChangeMode: boolean;
    setIsPasswordChangeMode: (value: boolean) => void;
    setIsPinChangeMode: (value: boolean) => void;
    passwordForm: {
        newPassword: string;
        confirmNewPassword: string;
    };
    pinForm: {
        newPin: string;
        confirmNewPin: string;
    };
    passwordWarnings: {
        password: string;
        confirm: string;
    };
    pinWarnings: {
        pin: string;
        confirm: string;
    };
    handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleConfirmPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handlePinChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleConfirmPinChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SecuritySection: React.FC<SecuritySectionProps> = ({
    isVerified,
    isPasswordChangeMode,
    isPinChangeMode,
    setIsPasswordChangeMode,
    setIsPinChangeMode,
    passwordForm,
    pinForm,
    passwordWarnings,
    pinWarnings,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handlePinChange,
    handleConfirmPinChange
}) => {
    if (!isVerified) return null;

    return (
        <>
            <S.CheckboxContainer>
                <input
                    type="checkbox"
                    checked={isPasswordChangeMode}
                    onChange={() => setIsPasswordChangeMode(!isPasswordChangeMode)}
                />
                <label>비밀번호 변경</label>
            </S.CheckboxContainer>
            
            {isPasswordChangeMode && (
                <S.SecuritySection>
                    <S.InputContainer>
                        <S.InputLabel>새 비밀번호</S.InputLabel>
                        <S.RegisterInput
                            type="password"
                            value={passwordForm.newPassword}
                            onChange={handlePasswordChange}
                            placeholder="새 비밀번호"
                        />
                        {passwordWarnings.password && (
                            <S.WarningMessage>{passwordWarnings.password}</S.WarningMessage>
                        )}
                    </S.InputContainer>
                    <S.InputContainer>
                        <S.InputLabel>새 비밀번호 확인</S.InputLabel>
                        <S.RegisterInput
                            type="password"
                            value={passwordForm.confirmNewPassword}
                            onChange={handleConfirmPasswordChange}
                            placeholder="새 비밀번호 확인"
                        />
                        {passwordWarnings.confirm && (
                            <S.WarningMessage>{passwordWarnings.confirm}</S.WarningMessage>
                        )}
                    </S.InputContainer>
                </S.SecuritySection>
            )}
            
            <S.CheckboxContainer>
                <input
                    type="checkbox"
                    checked={isPinChangeMode}
                    onChange={() => setIsPinChangeMode(!isPinChangeMode)}
                />
                <label>PIN 변경</label>
            </S.CheckboxContainer>
            
            {isPinChangeMode && (
                <S.SecuritySection>
                    <S.InputContainer>
                        <S.InputLabel>새 PIN</S.InputLabel>
                        <S.RegisterInput
                            type="password"
                            inputMode="numeric"
                            maxLength={8}
                            value={pinForm.newPin}
                            onChange={handlePinChange}
                            placeholder="새 PIN (4-8자리)"
                        />
                        {pinWarnings.pin && (
                            <S.WarningMessage>{pinWarnings.pin}</S.WarningMessage>
                        )}
                    </S.InputContainer>
                    <S.InputContainer>
                        <S.InputLabel>새 PIN 확인</S.InputLabel>
                        <S.RegisterInput
                            type="password"
                            inputMode="numeric"
                            maxLength={8}
                            value={pinForm.confirmNewPin}
                            onChange={handleConfirmPinChange}
                            placeholder="새 PIN 확인"
                        />
                        {pinWarnings.confirm && (
                            <S.WarningMessage>{pinWarnings.confirm}</S.WarningMessage>
                        )}
                    </S.InputContainer>
                </S.SecuritySection>
            )}
        </>
    );
};