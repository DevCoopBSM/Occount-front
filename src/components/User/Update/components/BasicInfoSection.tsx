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
  handleChange,
}) => {
  return (
    <S.InputGrid>
      <S.InputContainer>
        <S.InputLabel>이름</S.InputLabel>
        <S.RegisterInput type="text" name="username" value={userInfo.username} disabled />
      </S.InputContainer>

      <S.InputContainer>
        <S.InputLabel>생년월일</S.InputLabel>
        <S.RegisterInput type="text" name="birth_date" value={userInfo.birth_date} disabled />
      </S.InputContainer>

      <S.InputContainer>
        <S.InputLabel>이메일</S.InputLabel>
        <S.RegisterInput type="email" name="email" value={userInfo.email} disabled />
      </S.InputContainer>

      <S.InputContainer>
        <S.InputLabel>전화번호</S.InputLabel>
        <S.RegisterInput
          type="tel"
          name="phone"
          value={userInfo.phone}
          onChange={handleChange}
          disabled={!isVerified}
        />
      </S.InputContainer>
    </S.InputGrid>
  );
};
