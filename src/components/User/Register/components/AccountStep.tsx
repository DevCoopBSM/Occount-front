import React, { useState, type ChangeEvent } from 'react';
import { useSpring, animated } from 'react-spring';
import Icon from 'components/Icon';
import { ERROR_MESSAGES } from '../constants/privacy';
import * as AccountStepStyle from './AccountStep.style';

interface AccountStepProps {
  formData: {
    userEmail: string;
    emailOtp: string;
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
  isEmailOtpSent: boolean;
  isEmailVerified: boolean;
  isSendingEmailOtp: boolean;
  isVerifyingEmailOtp: boolean;
  isSubmitting: boolean;
  errors: { [key: string]: string };
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSendEmailOtp: () => void;
  onVerifyEmailOtp: () => void;
  onSubmit: () => void;
  onPrev: () => void;
}

export const AccountStep: React.FC<AccountStepProps> = ({
  formData,
  passwordErrors,
  passwordMatch,
  isEmailOtpSent,
  isEmailVerified,
  isSendingEmailOtp,
  isVerifyingEmailOtp,
  isSubmitting,
  errors,
  onInputChange,
  onSendEmailOtp,
  onVerifyEmailOtp,
  onSubmit,
  onPrev,
}) => {
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [passwordBlurred, setPasswordBlurred] = useState(false);

  const confirmPasswordSpring = useSpring({
    opacity: formData.userPassword ? 1 : 0,
    height: formData.userPassword ? 'auto' : 0,
    config: { tension: 300, friction: 20 },
  });

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordTouched(true);
    onInputChange(e);
  };

  const handlePasswordBlur = () => {
    setPasswordBlurred(true);
  };

  const shouldShowPasswordErrors = passwordBlurred || Boolean(errors.userPassword);

  const getRequirementState = (isRequirementMet: boolean) => {
    if (isRequirementMet) return 'success';
    if (shouldShowPasswordErrors) return 'error';
    return 'neutral';
  };

  const passwordRequirements = [
    { key: 'length', label: '8자 이상', isMet: !passwordErrors.length },
    { key: 'lowerCase', label: '소문자 포함', isMet: !passwordErrors.lowerCase },
    { key: 'number', label: '숫자 포함', isMet: !passwordErrors.number },
    { key: 'specialChar', label: '특수문자 포함', isMet: !passwordErrors.specialChar },
  ];

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
          <AccountStepStyle.StepTitle>계정 정보 입력</AccountStepStyle.StepTitle>

          <AccountStepStyle.InputContainer>
            <AccountStepStyle.InputLabel>이메일</AccountStepStyle.InputLabel>
            <AccountStepStyle.EmailContainer>
              <AccountStepStyle.EmailInput
                type="email"
                name="userEmail"
                value={formData.userEmail}
                onChange={onInputChange}
                placeholder="이메일을 입력해주세요"
                disabled={
                  isEmailVerified || isSendingEmailOtp || isVerifyingEmailOtp || isSubmitting
                }
                required
              />
              <AccountStepStyle.VerifyButton
                type="button"
                onClick={onSendEmailOtp}
                disabled={
                  !formData.userEmail || isEmailVerified || isSendingEmailOtp || isSubmitting
                }
              >
                {isSendingEmailOtp ? '발송 중' : isEmailOtpSent ? '재발송' : '인증'}
              </AccountStepStyle.VerifyButton>
            </AccountStepStyle.EmailContainer>
            <AccountStepStyle.HelperText>
              <Icon name="warning" size={18} color="#FCC800" />
              학교 이메일을 사용해주세요. 예: 26_00@bssm.hs.kr
            </AccountStepStyle.HelperText>
            {errors.userEmail && (
              <AccountStepStyle.ErrorMessage>{errors.userEmail}</AccountStepStyle.ErrorMessage>
            )}
            {isEmailOtpSent && !isEmailVerified && (
              <AccountStepStyle.SuccessMessage>
                인증번호를 발송했습니다.
              </AccountStepStyle.SuccessMessage>
            )}
            {isEmailVerified && (
              <AccountStepStyle.SuccessMessage>
                이메일 인증이 완료되었습니다.
              </AccountStepStyle.SuccessMessage>
            )}
          </AccountStepStyle.InputContainer>

          {isEmailOtpSent && !isEmailVerified && (
            <AccountStepStyle.InputContainer>
              <AccountStepStyle.InputLabel>인증번호</AccountStepStyle.InputLabel>
              <AccountStepStyle.EmailContainer>
                <AccountStepStyle.EmailInput
                  type="text"
                  inputMode="numeric"
                  name="emailOtp"
                  value={formData.emailOtp}
                  onChange={onInputChange}
                  placeholder="6자리 인증번호"
                  maxLength={6}
                  disabled={isVerifyingEmailOtp || isSubmitting}
                  required
                />
                <AccountStepStyle.VerifyButton
                  type="button"
                  onClick={onVerifyEmailOtp}
                  disabled={formData.emailOtp.length !== 6 || isVerifyingEmailOtp || isSubmitting}
                >
                  {isVerifyingEmailOtp ? '확인 중' : '확인'}
                </AccountStepStyle.VerifyButton>
              </AccountStepStyle.EmailContainer>
              {errors.emailOtp && (
                <AccountStepStyle.ErrorMessage>{errors.emailOtp}</AccountStepStyle.ErrorMessage>
              )}
            </AccountStepStyle.InputContainer>
          )}

          <AccountStepStyle.PasswordContainer>
            <AccountStepStyle.InputContainer>
              <AccountStepStyle.InputLabel>비밀번호</AccountStepStyle.InputLabel>
              <AccountStepStyle.RegisterInput
                type="password"
                name="userPassword"
                value={formData.userPassword}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                placeholder="8자 이상, 영문+숫자+특수문자 포함"
                disabled={isSubmitting}
                required
              />
              {errors.userPassword && (
                <AccountStepStyle.ErrorMessage>{errors.userPassword}</AccountStepStyle.ErrorMessage>
              )}

              {(formData.userPassword || passwordTouched) && (
                <AccountStepStyle.PasswordRequirements>
                  {passwordRequirements.map(({ key, label, isMet }) => {
                    const state = getRequirementState(isMet);
                    return (
                      <AccountStepStyle.RequirementItem key={key} $state={state}>
                        <AccountStepStyle.CheckIcon $state={state}>
                          {state === 'success' ? '✓' : state === 'error' ? '✗' : '•'}
                        </AccountStepStyle.CheckIcon>
                        {label}
                      </AccountStepStyle.RequirementItem>
                    );
                  })}
                </AccountStepStyle.PasswordRequirements>
              )}
            </AccountStepStyle.InputContainer>

            <animated.div style={confirmPasswordSpring}>
              <AccountStepStyle.InputContainer>
                <AccountStepStyle.InputLabel>비밀번호 확인</AccountStepStyle.InputLabel>
                <AccountStepStyle.RegisterInput
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={onInputChange}
                  placeholder="비밀번호를 다시 입력해주세요"
                  disabled={isSubmitting}
                  required
                />
              </AccountStepStyle.InputContainer>
            </animated.div>

            {formData.confirmPassword &&
              (passwordMatch ? (
                <AccountStepStyle.SuccessMessage>
                  비밀번호가 일치합니다.
                </AccountStepStyle.SuccessMessage>
              ) : (
                <AccountStepStyle.ErrorMessage>
                  {ERROR_MESSAGES.PASSWORD_MISMATCH}
                </AccountStepStyle.ErrorMessage>
              ))}
          </AccountStepStyle.PasswordContainer>

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
