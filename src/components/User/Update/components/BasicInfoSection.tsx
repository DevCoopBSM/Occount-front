import React from 'react';
import * as S from '../style';
import { UserInfo } from '../types';

interface BasicInfoSectionProps {
    userInfo: UserInfo;
    isVerified: boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
    userInfo,
    isVerified,
    handleChange
}) => {
    return (
        <>
            <S.InputContainer>
                <S.InputLabel>이름</S.InputLabel>
                <S.RegisterInput
                    type="text"
                    name="userName"
                    value={userInfo.userName}
                    disabled
                />
            </S.InputContainer>
            
            <S.InputContainer>
                <S.InputLabel>생년월일</S.InputLabel>
                <S.RegisterInput
                    type="text"
                    name="userBirthDate"
                    value={userInfo.userBirthDate}
                    disabled
                />
            </S.InputContainer>
            
            <S.InputContainer>
                <S.InputLabel>이메일</S.InputLabel>
                <S.RegisterInput
                    type="email"
                    name="userEmail"
                    value={userInfo.userEmail}
                    disabled
                />
            </S.InputContainer>
            
            <S.InputContainer>
                <S.InputLabel>전화번호</S.InputLabel>
                <S.RegisterInput
                    type="tel"
                    name="userPhone"
                    value={userInfo.userPhone}
                    onChange={handleChange}
                    disabled={!isVerified}
                />
            </S.InputContainer>
        </>
    );
};