import { useState } from 'react';
import { apiClient } from 'api/client';
import { validateEmail } from '../utils/validation';

interface UseEmailOtpVerificationProps {
  getEmail: () => string;
  getOtpCode: () => string;
  onEmailChange: () => void;
  setError: (field: string, message: string) => void;
  clearError: (field: string) => void;
}

interface UseEmailOtpVerificationReturn {
  isEmailOtpSent: boolean;
  isEmailVerified: boolean;
  isSendingEmailOtp: boolean;
  isVerifyingEmailOtp: boolean;
  handleSendEmailOtp: () => Promise<void>;
  handleVerifyEmailOtp: () => Promise<void>;
}

export const useEmailOtpVerification = ({
  getEmail,
  getOtpCode,
  onEmailChange,
  setError,
  clearError,
}: UseEmailOtpVerificationProps): UseEmailOtpVerificationReturn => {
  const [isEmailOtpSent, setIsEmailOtpSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isSendingEmailOtp, setIsSendingEmailOtp] = useState(false);
  const [isVerifyingEmailOtp, setIsVerifyingEmailOtp] = useState(false);

  const handleSendEmailOtp = async (): Promise<void> => {
    if (isSendingEmailOtp || isEmailVerified) return;

    const email = getEmail().trim();
    const emailError = validateEmail(email);
    if (emailError) {
      setError('userEmail', emailError);
      return;
    }

    setIsSendingEmailOtp(true);
    try {
      await apiClient.post('auth/email/send-otp', { email });
      setIsEmailOtpSent(true);
      clearError('userEmail');
      clearError('emailOtp');
    } catch (error: any) {
      setError(
        'userEmail',
        error.response?.data?.message || '인증번호 발송에 실패했습니다. 잠시 후 다시 시도해주세요.'
      );
    } finally {
      setIsSendingEmailOtp(false);
    }
  };

  const handleVerifyEmailOtp = async (): Promise<void> => {
    if (isVerifyingEmailOtp || isEmailVerified) return;

    const email = getEmail().trim();
    const otpCode = getOtpCode().trim();

    if (otpCode.length !== 6) {
      setError('emailOtp', '6자리 인증번호를 입력해주세요.');
      return;
    }

    setIsVerifyingEmailOtp(true);
    try {
      await apiClient.post('auth/email/verify-otp', { email, otp_code: otpCode });
      setIsEmailVerified(true);
      clearError('emailOtp');
    } catch (error: any) {
      setError(
        'emailOtp',
        error.response?.data?.message ||
          '인증번호 확인에 실패했습니다. 번호를 확인하고 다시 시도해주세요.'
      );
    } finally {
      setIsVerifyingEmailOtp(false);
    }
  };

  return {
    isEmailOtpSent,
    isEmailVerified,
    isSendingEmailOtp,
    isVerifyingEmailOtp,
    handleSendEmailOtp,
    handleVerifyEmailOtp,
  };
};
