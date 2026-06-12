import React from 'react';
import { UserInfo } from '../types';
import * as VerificationStepStyle from './VerificationStep.style';

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
    <VerificationStepStyle.Container>
      <VerificationStepStyle.LogoAndForm>
        <VerificationStepStyle.LogoContainer>
          <VerificationStepStyle.LogoWrapping>
            <VerificationStepStyle.LogoImg src="/assets/occount-logo.svg" alt="logo" />
          </VerificationStepStyle.LogoWrapping>
          <VerificationStepStyle.LogoSubText>
            회원가입 후 오카운트의 더 다양한 기능을 만나보세요!
          </VerificationStepStyle.LogoSubText>
        </VerificationStepStyle.LogoContainer>

        <VerificationStepStyle.FormContainer>
          <VerificationStepStyle.StepTitle>본인 인증</VerificationStepStyle.StepTitle>

          <VerificationStepStyle.VerificationContainer>
            {isVerified && userInfo ? (
              <>
                <VerificationStepStyle.UserInfoContainer>
                  <VerificationStepStyle.InputContainer>
                    <VerificationStepStyle.InputLabel>이름</VerificationStepStyle.InputLabel>
                    <VerificationStepStyle.RegisterInput
                      type="text"
                      value={userInfo.userName}
                      disabled
                    />
                  </VerificationStepStyle.InputContainer>
                  <VerificationStepStyle.InputContainer>
                    <VerificationStepStyle.InputLabel>생년월일</VerificationStepStyle.InputLabel>
                    <VerificationStepStyle.RegisterInput
                      type="text"
                      value={userInfo.userBirthDate}
                      disabled
                    />
                  </VerificationStepStyle.InputContainer>
                  <VerificationStepStyle.InputContainer>
                    <VerificationStepStyle.InputLabel>핸드폰 번호</VerificationStepStyle.InputLabel>
                    <VerificationStepStyle.RegisterInput
                      type="text"
                      value={userInfo.userPhone}
                      disabled
                    />
                  </VerificationStepStyle.InputContainer>
                </VerificationStepStyle.UserInfoContainer>

                <VerificationStepStyle.ReVerificationButton
                  onClick={onResetVerification}
                  disabled={isVerifying}
                >
                  재인증
                </VerificationStepStyle.ReVerificationButton>
              </>
            ) : (
              <VerificationStepStyle.VerificationButton
                onClick={onVerify}
                disabled={isVerified || isVerifying}
                $isVerifying={isVerifying}
                $isVerified={isVerified}
              >
                {isVerifying ? '인증 진행 중...' : isVerified ? '본인인증 완료' : '본인인증'}
              </VerificationStepStyle.VerificationButton>
            )}

            {isVerifying && (
              <VerificationStepStyle.StatusMessage>
                인증 창에서 본인인증을 완료해주세요. 창이 보이지 않으면 팝업 차단을 확인해주세요.
              </VerificationStepStyle.StatusMessage>
            )}

            {verificationError && (
              <VerificationStepStyle.ErrorMessage>
                {verificationError}
              </VerificationStepStyle.ErrorMessage>
            )}
          </VerificationStepStyle.VerificationContainer>

          <VerificationStepStyle.NavigationContainer>
            <VerificationStepStyle.NavigationButton onClick={onPrev} $isPrev>
              이전
            </VerificationStepStyle.NavigationButton>
            <VerificationStepStyle.NavigationButton onClick={onNext} disabled={!isVerified}>
              다음
            </VerificationStepStyle.NavigationButton>
          </VerificationStepStyle.NavigationContainer>
        </VerificationStepStyle.FormContainer>
      </VerificationStepStyle.LogoAndForm>
    </VerificationStepStyle.Container>
  );
};
