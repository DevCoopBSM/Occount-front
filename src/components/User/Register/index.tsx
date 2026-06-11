import React from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from 'api/client';
import { TermsAgreementStep } from './components/TermsAgreementStep';
import { VerificationStep } from './components/VerificationStep';
import { AccountStep } from './components/AccountStep';
import { useRegisterForm } from './hooks/useRegisterForm';
import { useVerification } from './hooks/useVerification';
import { useRegisterStep } from './hooks/useRegisterStep';
import { useEmailOtpVerification } from './hooks/useEmailOtpVerification';
import { STEPS } from './constants/steps';
import { RegisterRequest } from './types';
import { validateStep } from './utils/validation';
import * as RegisterStyle from './style';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [isPrivacyCollectionAgreed, setIsPrivacyCollectionAgreed] = React.useState(false);
  const [isPrivacyThirdPartyAgreed, setIsPrivacyThirdPartyAgreed] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [localErrors, setLocalErrors] = React.useState<{ [key: string]: string }>({});

  // Custom Hooks
  const { formData, passwordErrors, passwordMatch, handleInputChange } = useRegisterForm();

  const setError = (field: string, message: string) =>
    setLocalErrors((prev) => ({ ...prev, [field]: message }));
  const clearError = (field: string) => setLocalErrors((prev) => ({ ...prev, [field]: '' }));

  const {
    isEmailOtpSent,
    isEmailVerified,
    isSendingEmailOtp,
    isVerifyingEmailOtp,
    handleSendEmailOtp,
    handleVerifyEmailOtp,
  } = useEmailOtpVerification({
    getEmail: () => formData.userEmail,
    getOtpCode: () => formData.emailOtp,
    onEmailChange: () => {},
    setError,
    clearError,
  });

  const {
    isVerified,
    isVerifying,
    verificationError,
    userInfo,
    handleVerification,
    resetVerification,
  } = useVerification();

  const { step, errors, nextStep, prevStep } = useRegisterStep();

  const mergedErrors = { ...errors, ...localErrors };

  const handleAccountInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearError(e.target.name);
    handleInputChange(e);
  };

  // 회원가입 제출 처리
  const handleSubmit = async () => {
    if (isSubmitting) return;

    const stepErrors = validateStep(
      STEPS.ACCOUNT,
      formData,
      isVerified,
      isPrivacyCollectionAgreed,
      isPrivacyThirdPartyAgreed,
      isEmailVerified
    );

    if (Object.keys(stepErrors).length > 0) {
      setLocalErrors(stepErrors);
      return;
    }

    if (!userInfo) {
      setLocalErrors((prev) => ({ ...prev, verification: '본인인증을 완료해주세요.' }));
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: RegisterRequest = {
        user_ci_number: userInfo.userCiNumber,
        username: userInfo.userName,
        user_phone: userInfo.userPhone,
        user_email: formData.userEmail.trim(),
        password: formData.userPassword,
      };

      await apiClient.post('auth/register', payload);

      alert('회원가입이 완료되었습니다.');
      navigate('/login');
    } catch (error: any) {
      console.error('Register error:', error);
      setLocalErrors((prev) => ({
        ...prev,
        submit: error.response?.data?.message || '회원가입 중 오류가 발생했습니다.',
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  // 스텝별 컴포넌트 렌더링
  const renderStep = () => {
    switch (step) {
      case STEPS.TERMS_AGREEMENT:
        return (
          <TermsAgreementStep
            isPrivacyCollectionAgreed={isPrivacyCollectionAgreed}
            setIsPrivacyCollectionAgreed={setIsPrivacyCollectionAgreed}
            isPrivacyThirdPartyAgreed={isPrivacyThirdPartyAgreed}
            setIsPrivacyThirdPartyAgreed={setIsPrivacyThirdPartyAgreed}
            onNext={() =>
              nextStep(
                step,
                formData,
                isVerified,
                isPrivacyCollectionAgreed,
                isPrivacyThirdPartyAgreed,
                isEmailVerified
              )
            }
            onPrev={() => navigate('/')}
            errors={mergedErrors}
          />
        );

      case STEPS.VERIFICATION:
        return (
          <VerificationStep
            isVerified={isVerified}
            isVerifying={isVerifying}
            verificationError={verificationError}
            userInfo={userInfo}
            onVerify={handleVerification}
            onResetVerification={resetVerification}
            onNext={() =>
              nextStep(
                step,
                formData,
                isVerified,
                isPrivacyCollectionAgreed,
                isPrivacyThirdPartyAgreed,
                isEmailVerified
              )
            }
            onPrev={prevStep}
          />
        );

      case STEPS.ACCOUNT:
        return (
          <AccountStep
            formData={formData}
            passwordErrors={passwordErrors}
            passwordMatch={passwordMatch}
            isEmailOtpSent={isEmailOtpSent}
            isEmailVerified={isEmailVerified}
            isSendingEmailOtp={isSendingEmailOtp}
            isVerifyingEmailOtp={isVerifyingEmailOtp}
            isSubmitting={isSubmitting}
            errors={mergedErrors}
            onInputChange={handleAccountInputChange}
            onSendEmailOtp={handleSendEmailOtp}
            onVerifyEmailOtp={handleVerifyEmailOtp}
            onSubmit={handleSubmit}
            onPrev={prevStep}
          />
        );

      default:
        return null;
    }
  };

  return (
    <RegisterStyle.Container>
      <RegisterStyle.ContentContainer>
        {step !== STEPS.TERMS_AGREEMENT &&
          step !== STEPS.VERIFICATION &&
          step !== STEPS.ACCOUNT && (
            <RegisterStyle.LogoContainer>
              <RegisterStyle.LogoImg src="/assets/occount-logo.svg" alt="logo" />
              <RegisterStyle.LogoSubText>
                회원가입 후 오카운트의 더 다양한 기능을 만나보세요!
              </RegisterStyle.LogoSubText>
            </RegisterStyle.LogoContainer>
          )}
        {renderStep()}
      </RegisterStyle.ContentContainer>
    </RegisterStyle.Container>
  );
};

export default Register;
