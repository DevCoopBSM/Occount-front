import React from 'react';
import { UserInfo } from '../types';
import * as S from './VerificationStep.style';

interface VerificationStepProps {
  isVerified: boolean;
  isVerifying: boolean;
  verificationError: string;
  userInfo: UserInfo | null;
  onVerify: () => Promise<void>;
  onResetVerification: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const VerificationStep: React.FC<VerificationStepProps> = ({
  isVerified,
  isVerifying,
  verificationError,
  userInfo,
  onVerify,
  onResetVerification,
  onNext,
  onPrev,
}) => {
  return (
    <S.Container>
      <S.LogoAndForm>
        <S.LogoContainer>
          <S.LogoWrapping>
            <S.LogoImg src="/assets/occount-logo.svg" alt="logo" />
          </S.LogoWrapping>
          <S.LogoSubText>회원가입 후 오카운트의 더 다양한 기능을 만나보세요!</S.LogoSubText>
        </S.LogoContainer>

        <S.FormContainer>
          <S.StepTitle>본인 인증</S.StepTitle>

          <S.VerificationContainer>
            {isVerified && userInfo ? (
              <>
                <S.UserInfoContainer>
                  <S.InputContainer>
                    <S.InputLabel>이름</S.InputLabel>
                    <S.RegisterInput type="text" value={userInfo.userName} disabled />
                  </S.InputContainer>
                  <S.InputContainer>
                    <S.InputLabel>생년월일</S.InputLabel>
                    <S.RegisterInput type="text" value={userInfo.userBirthDate} disabled />
                  </S.InputContainer>
                  <S.InputContainer>
                    <S.InputLabel>핸드폰 번호</S.InputLabel>
                    <S.RegisterInput type="text" value={userInfo.userPhone} disabled />
                  </S.InputContainer>
                </S.UserInfoContainer>

                <S.ReVerificationButton onClick={onResetVerification} disabled={isVerifying}>
                  재인증
                </S.ReVerificationButton>
              </>
            ) : (
              <S.VerificationButton
                onClick={onVerify}
                disabled={isVerified || isVerifying}
                $isVerifying={isVerifying}
                $isVerified={isVerified}
              >
                {isVerifying ? '인증 진행 중...' : isVerified ? '본인인증 완료' : '본인인증'}
              </S.VerificationButton>
            )}

            {isVerifying && (
              <S.StatusMessage>
                인증 창에서 본인인증을 완료해주세요. 창이 보이지 않으면 팝업 차단을 확인해주세요.
              </S.StatusMessage>
            )}

            {verificationError && <S.ErrorMessage>{verificationError}</S.ErrorMessage>}
          </S.VerificationContainer>

          <S.NavigationContainer>
            <S.NavigationButton onClick={onPrev} $isPrev>
              이전
            </S.NavigationButton>
            <S.NavigationButton onClick={onNext} disabled={!isVerified}>
              다음
            </S.NavigationButton>
          </S.NavigationContainer>
        </S.FormContainer>
      </S.LogoAndForm>
    </S.Container>
  );
};
