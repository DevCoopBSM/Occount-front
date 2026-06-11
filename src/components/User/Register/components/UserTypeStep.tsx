import React from 'react';
import { useSpring } from 'react-spring';
import { UserType } from '../types';
import * as UserTypeStepStyle from '../style';

interface UserTypeStepProps {
  userType: UserType;
  setUserType: (type: UserType) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const UserTypeStep: React.FC<UserTypeStepProps> = ({
  userType,
  setUserType,
  onNext,
  onPrev,
}) => {
  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  return (
    <UserTypeStepStyle.AnimatedContainer style={fadeIn}>
      <UserTypeStepStyle.StepTitle>사용자 유형 선택</UserTypeStepStyle.StepTitle>
      <UserTypeStepStyle.ToggleButtonContainer>
        <UserTypeStepStyle.ToggleButton
          active={userType === UserType.STUDENT}
          onClick={() => setUserType(UserType.STUDENT)}
        >
          학생
        </UserTypeStepStyle.ToggleButton>
        <UserTypeStepStyle.ToggleButton
          active={userType === UserType.PARENT}
          onClick={() => setUserType(UserType.PARENT)}
        >
          학부모
        </UserTypeStepStyle.ToggleButton>
        <UserTypeStepStyle.ToggleButton
          active={userType === UserType.TEACHER}
          onClick={() => setUserType(UserType.TEACHER)}
        >
          교사
        </UserTypeStepStyle.ToggleButton>
      </UserTypeStepStyle.ToggleButtonContainer>
      <UserTypeStepStyle.ButtonContainer>
        <UserTypeStepStyle.NavigationButton onClick={onPrev} isPrev>
          취소
        </UserTypeStepStyle.NavigationButton>
        <UserTypeStepStyle.NavigationButton onClick={onNext}>
          다음
        </UserTypeStepStyle.NavigationButton>
      </UserTypeStepStyle.ButtonContainer>
    </UserTypeStepStyle.AnimatedContainer>
  );
};
