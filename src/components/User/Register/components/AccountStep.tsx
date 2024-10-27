import React from 'react';
import { useSpring, animated } from 'react-spring';
import { UserType } from '../types';
import { ERROR_MESSAGES } from '../constants/privacy';
import * as R from '../style';

interface AccountStepProps {
  userType: UserType;
  emailPrefix: string;
  formData: {
    userEmail: string;
    userPassword: string;
    confirmPassword?: string;
  };
  passwordErrors: {
    length: boolean;
    lowerCase: boolean;
    number: boolean;
    specialChar: boolean;
  };
  passwordMatch: boolean;
  errors: { [key: string]: string };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const AccountStep: React.FC<AccountStepProps> = ({
  userType,
  emailPrefix,
  formData,
  passwordErrors,
  passwordMatch,
  errors,
  onInputChange,
  onNext,
  onPrev,
}) => {
  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 }
  });

  const confirmPasswordSpring = useSpring({
    opacity: formData.userPassword ? 1 : 0,
    height: formData.userPassword ? 'auto' : 0,
    config: { tension: 300, friction: 20 }
  });

  return (
    <R.AnimatedContainer style={fadeIn}>
      <R.StepTitle>계정 정보 입력</R.StepTitle>
      
      <R.InputContainer>
        <R.InputLabel>이메일</R.InputLabel>
        {userType === UserType.STUDENT || userType === UserType.TEACHER ? (
          <R.EmailContainer>
            <R.EmailInput
              type="text"
              name="userEmail"
              value={emailPrefix}
              onChange={onInputChange}
              placeholder={userType === UserType.STUDENT ? "학생 학교 계정명" : "교사 학교 계정명"}
              required
            />
            <R.EmailDomain>@bssm.hs.kr</R.EmailDomain>
          </R.EmailContainer>
        ) : (
          <R.RegisterInput
            type="email"
            name="userEmail"
            value={formData.userEmail}
            onChange={onInputChange}
            placeholder="이메일을 입력해주세요"
            required
          />
        )}
        {errors.userEmail && 
          <R.ErrorMessage isVisible={true}>{errors.userEmail}</R.ErrorMessage>
        }
      </R.InputContainer>

      <R.PasswordContainer>
        <R.InputContainer>
          <R.InputLabel>비밀번호</R.InputLabel>
          <R.RegisterInput
            type="password"
            name="userPassword"
            value={formData.userPassword}
            onChange={onInputChange}
            placeholder="8자 이상, 소문자, 숫자, 특수문자 포함"
            required
          />
          <R.ErrorMessage isVisible={!!passwordErrors.length}>
            {ERROR_MESSAGES.PASSWORD_LENGTH}
          </R.ErrorMessage>
          <R.ErrorMessage isVisible={!!passwordErrors.lowerCase}>
            {ERROR_MESSAGES.PASSWORD_LOWERCASE}
          </R.ErrorMessage>
          <R.ErrorMessage isVisible={!!passwordErrors.number}>
            {ERROR_MESSAGES.PASSWORD_NUMBER}
          </R.ErrorMessage>
          <R.ErrorMessage isVisible={!!passwordErrors.specialChar}>
            {ERROR_MESSAGES.PASSWORD_SPECIAL}
          </R.ErrorMessage>
        </R.InputContainer>

        <animated.div style={confirmPasswordSpring}>
          <R.InputContainer>
            <R.InputLabel>비밀번호 확인</R.InputLabel>
            <R.RegisterInput
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={onInputChange}
              placeholder="비밀번호를 다시 입력해주세요"
              required
            />
          </R.InputContainer>
        </animated.div>

        {formData.confirmPassword && (
          passwordMatch ? (
            <R.SuccessMessage isVisible={true}>
              비밀번호가 일치합니다.
            </R.SuccessMessage>
          ) : (
            <R.ErrorMessage isVisible={true}>
              {ERROR_MESSAGES.PASSWORD_MISMATCH}
            </R.ErrorMessage>
          )
        )}
      </R.PasswordContainer>

      <R.ButtonContainer>
        <R.NavigationButton onClick={onPrev} isPrev>
          이전
        </R.NavigationButton>
        <R.NavigationButton onClick={onNext}>
          다음
        </R.NavigationButton>
      </R.ButtonContainer>
    </R.AnimatedContainer>
  );
};