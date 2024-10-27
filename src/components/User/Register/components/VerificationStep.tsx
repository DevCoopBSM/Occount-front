import React from 'react';
import { useSpring } from 'react-spring';
import { UserInfo } from '../types';
import * as R from '../style';

interface VerificationStepProps {
  isVerified: boolean;
  userInfo: UserInfo | null;
  onVerify: () => Promise<void>;
  onResetVerification: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const VerificationStep: React.FC<VerificationStepProps> = ({
  isVerified,
  userInfo,
  onVerify,
  onResetVerification,
  onNext,
  onPrev,
}) => {
  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 }
  });

  return (
    <R.AnimatedContainer style={fadeIn}>
      <R.StepTitle>본인 인증</R.StepTitle>
      {isVerified && userInfo ? (
        <>
          <R.InputContainer>
            <R.InputLabel>이름</R.InputLabel>
            <R.RegisterInput
              type="text"
              value={userInfo.userName}
              disabled
            />
          </R.InputContainer>
          <R.InputContainer>
            <R.InputLabel>생년월일</R.InputLabel>
            <R.RegisterInput
              type="text"
              value={userInfo.userBirthDate}
              disabled
            />
          </R.InputContainer>
          <R.InputContainer>
            <R.InputLabel>핸드폰 번호</R.InputLabel>
            <R.RegisterInput
              type="text"
              value={userInfo.userPhone}
              disabled
            />
          </R.InputContainer>
          <R.Button 
            onClick={onResetVerification}
            style={{backgroundColor: '#F49E15', color: 'white', marginTop: '20px'}}
          >
            재인증
          </R.Button>
        </>
      ) : (
        <R.Button 
          onClick={onVerify} 
          disabled={isVerified}
          style={{backgroundColor: isVerified ? '#D9D9D9' : '#F49E15', color: isVerified ? '#333' : 'white'}}
        >
          {isVerified ? "본인인증 완료" : "본인인증"}
        </R.Button>
      )}
      <R.ButtonContainer>
        <R.NavigationButton onClick={onPrev} isPrev>
          이전
        </R.NavigationButton>
        <R.NavigationButton onClick={onNext} disabled={!isVerified}>
          다음
        </R.NavigationButton>
      </R.ButtonContainer>
    </R.AnimatedContainer>
  );
};