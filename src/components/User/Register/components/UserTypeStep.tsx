import React from 'react';
import { useSpring } from 'react-spring';
import { UserType } from '../types';
import * as R from '../style';

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
  onPrev
}) => {
  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 }
  });

  return (
    <R.AnimatedContainer style={fadeIn}>
      <R.StepTitle>사용자 유형 선택</R.StepTitle>
      <R.ToggleButtonContainer>
        <R.ToggleButton 
          active={userType === UserType.STUDENT}
          onClick={() => setUserType(UserType.STUDENT)}
        > 
          학생 
        </R.ToggleButton>
        <R.ToggleButton 
          active={userType === UserType.PARENT}
          onClick={() => setUserType(UserType.PARENT)}
        >
          학부모
        </R.ToggleButton>
        <R.ToggleButton 
          active={userType === UserType.TEACHER}
          onClick={() => setUserType(UserType.TEACHER)}
        >
          교사
        </R.ToggleButton>
      </R.ToggleButtonContainer>
      <R.ButtonContainer>
        <R.NavigationButton onClick={onPrev} isPrev>
          취소
        </R.NavigationButton>
        <R.NavigationButton onClick={onNext}>
          다음
        </R.NavigationButton>
      </R.ButtonContainer>
    </R.AnimatedContainer>
  );
};