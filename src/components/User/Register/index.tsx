import React from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from 'utils/Axios';
import { TermsAgreementStep } from './components/TermsAgreementStep';
import { VerificationStep } from './components/VerificationStep';
import { AccountStep } from './components/AccountStep';
import { useRegisterForm } from './hooks/useRegisterForm';
import { useVerification } from './hooks/useVerification';
import { useRegisterStep } from './hooks/useRegisterStep';
import { STEPS } from './constants/steps';
import { RegisterRequest } from './types';
import { validateEmail, validateStep } from './utils/validation';
import * as R from './style';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [isPrivacyCollectionAgreed, setIsPrivacyCollectionAgreed] = React.useState(false);
  const [isPrivacyThirdPartyAgreed, setIsPrivacyThirdPartyAgreed] = React.useState(false);
  const [isEmailOtpSent, setIsEmailOtpSent] = React.useState(false);
  const [isEmailVerified, setIsEmailVerified] = React.useState(false);
  const [isSendingEmailOtp, setIsSendingEmailOtp] = React.useState(false);
  const [isVerifyingEmailOtp, setIsVerifyingEmailOtp] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [localErrors, setLocalErrors] = React.useState<{ [key: string]: string }>({});

  // Custom Hooks
  const { formData, passwordErrors, passwordMatch, handleInputChange } = useRegisterForm();

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
    if (e.target.name === 'userEmail') {
      setIsEmailOtpSent(false);
      setIsEmailVerified(false);
    }
    setLocalErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    handleInputChange(e);
  };

  const handleSendEmailOtp = async () => {
    if (isSendingEmailOtp || isEmailVerified) return;

    const email = formData.userEmail.trim();
    const emailError = validateEmail(email);
    if (emailError) {
      setLocalErrors((prev) => ({ ...prev, userEmail: emailError }));
      return;
    }

    setIsSendingEmailOtp(true);
    try {
      await axiosInstance.post('auth/email/send-otp', {
        email,
      });
      setIsEmailOtpSent(true);
      setLocalErrors((prev) => ({ ...prev, userEmail: '', emailOtp: '' }));
    } catch (error: any) {
      setLocalErrors((prev) => ({
        ...prev,
        userEmail:
          error.response?.data?.message ||
          '인증번호 발송에 실패했습니다. 잠시 후 다시 시도해주세요.',
      }));
    } finally {
      setIsSendingEmailOtp(false);
    }
  };

  const handleVerifyEmailOtp = async () => {
    if (isVerifyingEmailOtp || isEmailVerified) return;

    const email = formData.userEmail.trim();
    const otpCode = formData.emailOtp.trim();

    if (otpCode.length !== 6) {
      setLocalErrors((prev) => ({ ...prev, emailOtp: '6자리 인증번호를 입력해주세요.' }));
      return;
    }

    setIsVerifyingEmailOtp(true);
    try {
      await axiosInstance.post('auth/email/verify-otp', {
        email,
        otp_code: otpCode,
      });
      setIsEmailVerified(true);
      setLocalErrors((prev) => ({ ...prev, emailOtp: '' }));
    } catch (error: any) {
      setLocalErrors((prev) => ({
        ...prev,
        emailOtp:
          error.response?.data?.message ||
          '인증번호 확인에 실패했습니다. 번호를 확인하고 다시 시도해주세요.',
      }));
    } finally {
      setIsVerifyingEmailOtp(false);
    }
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

      await axiosInstance.post('auth/register', payload);

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
    <R.Container>
      <R.ContentContainer>
        {step !== STEPS.TERMS_AGREEMENT && step !== STEPS.VERIFICATION && step !== STEPS.ACCOUNT && (
          <R.LogoContainer>
            <R.LogoImg src="/assets/occount-logo.svg" alt="logo" />
            <R.LogoSubText>회원가입 후 오카운트의 더 다양한 기능을 만나보세요!</R.LogoSubText>
          </R.LogoContainer>
        )}
        {renderStep()}
      </R.ContentContainer>
    </R.Container>
  );
};

export default Register;
