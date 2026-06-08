import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import Icon from 'components/Icon';
import { ERROR_MESSAGES } from '../constants/privacy';
import * as S from './AccountStep.style';

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
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordTouched(true);
    onInputChange(e);
  };

  const handlePasswordBlur = () => {
    setPasswordBlurred(true);
  };

  // 각 조건별로 성공/실패 상태 결정
  const getRequirementState = (isValid: boolean) => {
    if (isValid) return 'success'; // 조건 충족 시 즉시 보상
    if (passwordBlurred || errors.userPassword) return 'error'; // blur 후 또는 기존 에러가 있을 때만 에러 표시
    return 'neutral'; // 입력 중이거나 아직 체크하지 않은 상태
  };

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
          <S.StepTitle>계정 정보 입력</S.StepTitle>

          <S.InputContainer>
            <S.InputLabel>이메일</S.InputLabel>
            <S.EmailContainer>
              <S.EmailInput
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
              <S.VerifyButton
                type="button"
                onClick={onSendEmailOtp}
                disabled={
                  !formData.userEmail || isEmailVerified || isSendingEmailOtp || isSubmitting
                }
              >
                {isSendingEmailOtp ? '발송 중' : isEmailOtpSent ? '재발송' : '인증'}
              </S.VerifyButton>
            </S.EmailContainer>
            <S.HelperText>
              <Icon name="warning" size={18} color="#FCC800" />
              학교 이메일을 사용해주세요. 예: 26_00@bssm.hs.kr
            </S.HelperText>
            {errors.userEmail && <S.ErrorMessage>{errors.userEmail}</S.ErrorMessage>}
            {isEmailOtpSent && !isEmailVerified && (
              <S.SuccessMessage>인증번호를 발송했습니다.</S.SuccessMessage>
            )}
            {isEmailVerified && <S.SuccessMessage>이메일 인증이 완료되었습니다.</S.SuccessMessage>}
          </S.InputContainer>

          {isEmailOtpSent && !isEmailVerified && (
            <S.InputContainer>
              <S.InputLabel>인증번호</S.InputLabel>
              <S.EmailContainer>
                <S.EmailInput
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
                <S.VerifyButton
                  type="button"
                  onClick={onVerifyEmailOtp}
                  disabled={formData.emailOtp.length !== 6 || isVerifyingEmailOtp || isSubmitting}
                >
                  {isVerifyingEmailOtp ? '확인 중' : '확인'}
                </S.VerifyButton>
              </S.EmailContainer>
              {errors.emailOtp && <S.ErrorMessage>{errors.emailOtp}</S.ErrorMessage>}
            </S.InputContainer>
          )}

          <S.PasswordContainer>
            <S.InputContainer>
              <S.InputLabel>비밀번호</S.InputLabel>
              <S.RegisterInput
                type="password"
                name="userPassword"
                value={formData.userPassword}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                placeholder="8자 이상, 영문+숫자+특수문자 포함"
                disabled={isSubmitting}
                required
              />
              {errors.userPassword && <S.ErrorMessage>{errors.userPassword}</S.ErrorMessage>}

              {(formData.userPassword || passwordTouched) && (
                <S.PasswordRequirements>
                  <S.RequirementItem $state={getRequirementState(!passwordErrors.length)}>
                    <S.CheckIcon $state={getRequirementState(!passwordErrors.length)}>
                      {getRequirementState(!passwordErrors.length) === 'success'
                        ? '✓'
                        : getRequirementState(!passwordErrors.length) === 'error'
                          ? '✗'
                          : '•'}
                    </S.CheckIcon>
                    8자 이상
                  </S.RequirementItem>

                  <S.RequirementItem $state={getRequirementState(!passwordErrors.lowerCase)}>
                    <S.CheckIcon $state={getRequirementState(!passwordErrors.lowerCase)}>
                      {getRequirementState(!passwordErrors.lowerCase) === 'success'
                        ? '✓'
                        : getRequirementState(!passwordErrors.lowerCase) === 'error'
                          ? '✗'
                          : '•'}
                    </S.CheckIcon>
                    소문자 포함
                  </S.RequirementItem>

                  <S.RequirementItem $state={getRequirementState(!passwordErrors.number)}>
                    <S.CheckIcon $state={getRequirementState(!passwordErrors.number)}>
                      {getRequirementState(!passwordErrors.number) === 'success'
                        ? '✓'
                        : getRequirementState(!passwordErrors.number) === 'error'
                          ? '✗'
                          : '•'}
                    </S.CheckIcon>
                    숫자 포함
                  </S.RequirementItem>

                  <S.RequirementItem $state={getRequirementState(!passwordErrors.specialChar)}>
                    <S.CheckIcon $state={getRequirementState(!passwordErrors.specialChar)}>
                      {getRequirementState(!passwordErrors.specialChar) === 'success'
                        ? '✓'
                        : getRequirementState(!passwordErrors.specialChar) === 'error'
                          ? '✗'
                          : '•'}
                    </S.CheckIcon>
                    특수문자 포함
                  </S.RequirementItem>
                </S.PasswordRequirements>
              )}
            </S.InputContainer>

            <animated.div style={confirmPasswordSpring}>
              <S.InputContainer>
                <S.InputLabel>비밀번호 확인</S.InputLabel>
                <S.RegisterInput
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={onInputChange}
                  placeholder="비밀번호를 다시 입력해주세요"
                  disabled={isSubmitting}
                  required
                />
              </S.InputContainer>
            </animated.div>

            {formData.confirmPassword &&
              (passwordMatch ? (
                <S.SuccessMessage>비밀번호가 일치합니다.</S.SuccessMessage>
              ) : (
                <S.ErrorMessage>{ERROR_MESSAGES.PASSWORD_MISMATCH}</S.ErrorMessage>
              ))}
          </S.PasswordContainer>

          {errors.submit && <S.ErrorMessage>{errors.submit}</S.ErrorMessage>}

          <S.NavigationContainer>
            <S.NavigationButton onClick={onPrev} $isPrev>
              이전
            </S.NavigationButton>
            <S.NavigationButton onClick={onSubmit} disabled={isSubmitting}>
              {isSubmitting ? '가입 중...' : '회원가입'}
            </S.NavigationButton>
          </S.NavigationContainer>
        </S.FormContainer>
      </S.LogoAndForm>
    </S.Container>
  );
};
