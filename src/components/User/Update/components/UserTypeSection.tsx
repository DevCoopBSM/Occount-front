import React from 'react';
import * as S from '../style';
import { UserInfo, UserType, Role } from '../types';

interface UserTypeSectionProps {
    userInfo: UserInfo;
}

export const UserTypeSection: React.FC<UserTypeSectionProps> = ({ userInfo }) => (
    <>
        <S.InputContainer>
            <S.InputLabel>회원 유형</S.InputLabel>
            <S.RegisterInput
                type="text"
                value={UserType[userInfo.userType]}
                disabled
            />
        </S.InputContainer>
        <S.InputContainer>
            <S.InputLabel>권한</S.InputLabel>
            <S.RegisterInput
                type="text"
                value={Role[userInfo.role]}
                disabled
            />
        </S.InputContainer>
    </>
);