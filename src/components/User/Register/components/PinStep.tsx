import React from 'react';
import * as AccountStepStyle from './AccountStep.style';

interface PinStepProps {
  formData: {
    pin: string;
    confirmPin: string;
  };
  pinMatch: boolean;
  isSubmitting: boolean;
  errors: { [key: string]: string };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onPrev: () => void;
}

export const PinStep: React.FC<PinStepProps> = ({
  formData,
  pinMatch,
  isSubmitting,
  errors,
  onInputChange,
  onSubmit,
  onPrev,
}) => {
  return (
    <AccountStepStyle.Container>
      <AccountStepStyle.LogoAndForm>
        <AccountStepStyle.LogoContainer>
          <AccountStepStyle.LogoWrapping>
            <AccountStepStyle.LogoImg src="/assets/occount-logo.svg" alt="logo" />
          </AccountStepStyle.LogoWrapping>
          <AccountStepStyle.LogoSubText>
            회원가입 후 오카운트의 더 다양한 기능을 만나보세요!
          </AccountStepStyle.LogoSubText>
        </AccountStepStyle.LogoContainer>

        <AccountStepStyle.FormContainer>
          <AccountStepStyle.StepTitle>PIN 번호 설정</AccountStepStyle.StepTitle>

          <AccountStepStyle.InputContainer>
            <AccountStepStyle.InputLabel>PIN 번호</AccountStepStyle.InputLabel>
            <AccountStepStyle.RegisterInput
              type="password"
              name="pin"
              value={formData.pin}
              onChange={onInputChange}
              placeholder="4~6자리 숫자"
              inputMode="numeric"
              maxLength={6}
              disabled={isSubmitting}
              required
            />
            {errors.pin && (
              <AccountStepStyle.ErrorMessage>{errors.pin}</AccountStepStyle.ErrorMessage>
            )}
          </AccountStepStyle.InputContainer>

          <AccountStepStyle.InputContainer>
            <AccountStepStyle.InputLabel>PIN 번호 확인</AccountStepStyle.InputLabel>
            <AccountStepStyle.RegisterInput
              type="password"
              name="confirmPin"
              value={formData.confirmPin}
              onChange={onInputChange}
              placeholder="PIN 번호를 다시 입력해주세요"
              inputMode="numeric"
              maxLength={6}
              disabled={isSubmitting}
              required
            />
            {formData.confirmPin &&
              (pinMatch ? (
                <AccountStepStyle.SuccessMessage>PIN이 일치합니다.</AccountStepStyle.SuccessMessage>
              ) : (
                <AccountStepStyle.ErrorMessage>
                  PIN이 일치하지 않습니다.
                </AccountStepStyle.ErrorMessage>
              ))}
            {errors.confirmPin && (
              <AccountStepStyle.ErrorMessage>{errors.confirmPin}</AccountStepStyle.ErrorMessage>
            )}
          </AccountStepStyle.InputContainer>

          {errors.submit && (
            <AccountStepStyle.ErrorMessage>{errors.submit}</AccountStepStyle.ErrorMessage>
          )}

          <AccountStepStyle.NavigationContainer>
            <AccountStepStyle.NavigationButton onClick={onPrev} $isPrev>
              이전
            </AccountStepStyle.NavigationButton>
            <AccountStepStyle.NavigationButton onClick={onSubmit} disabled={isSubmitting}>
              {isSubmitting ? '가입 중...' : '회원가입'}
            </AccountStepStyle.NavigationButton>
          </AccountStepStyle.NavigationContainer>
        </AccountStepStyle.FormContainer>
      </AccountStepStyle.LogoAndForm>
    </AccountStepStyle.Container>
  );
};
