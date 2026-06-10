import { useState, type ChangeEvent } from 'react';
import axiosInstance from 'utils/Axios';
import { VALIDATION_PATTERNS } from '../constants/validation';
import { UPDATE_MESSAGES } from '../constants/messages';

export const usePasswordChange = () => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [otpError, setOtpError] = useState('');
  const [passwordWarning, setPasswordWarning] = useState('');
  const [confirmWarning, setConfirmWarning] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSendOtp = async (email: string): Promise<void> => {
    setIsSending(true);
    setOtpError('');
    try {
      await axiosInstance.post('/auth/email/send-otp', {
        email,
        purpose: 'PASSWORD_RESET',
      });
      setIsOtpSent(true);
      setIsOtpVerified(false);
      setOtpCode('');
    } catch {
      setOtpError('인증 코드 발송에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSending(false);
    }
  };

  const handleVerifyOtp = async (email: string): Promise<void> => {
    if (!otpCode) {
      setOtpError('인증 코드를 입력해주세요.');
      return;
    }
    setIsVerifying(true);
    setOtpError('');
    try {
      await axiosInstance.post('/auth/email/verify-otp', {
        email,
        otp_code: otpCode,
      });
      setIsOtpVerified(true);
    } catch (error: any) {
      setOtpError(error.response?.data?.message || '인증 코드가 올바르지 않거나 만료되었습니다.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewPassword(value);
    setPasswordWarning(
      value && !VALIDATION_PATTERNS.PASSWORD.test(value)
        ? UPDATE_MESSAGES.VALIDATION.PASSWORD
        : ''
    );
    if (confirmNewPassword) {
      setConfirmWarning(
        value !== confirmNewPassword ? UPDATE_MESSAGES.VALIDATION.PASSWORD_MISMATCH : ''
      );
    }
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setConfirmNewPassword(value);
    setConfirmWarning(
      value !== newPassword ? UPDATE_MESSAGES.VALIDATION.PASSWORD_MISMATCH : ''
    );
  };

  const handleSubmit = async (email: string): Promise<void> => {
    if (!newPassword || passwordWarning || newPassword !== confirmNewPassword) return;

    setIsSubmitting(true);
    setOtpError('');
    try {
      await axiosInstance.post('/auth/password/change', {
        email,
        otp_code: otpCode,
        new_password: newPassword,
      });
      setSuccessMessage('비밀번호가 변경되었습니다.');
      setIsOtpSent(false);
      setIsOtpVerified(false);
      setOtpCode('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (error: any) {
      setOtpError(error.response?.data?.message || '비밀번호 변경에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isOtpSent,
    isOtpVerified,
    isSending,
    isVerifying,
    isSubmitting,
    otpCode,
    setOtpCode,
    newPassword,
    confirmNewPassword,
    otpError,
    passwordWarning,
    confirmWarning,
    successMessage,
    handleSendOtp,
    handleVerifyOtp,
    handleNewPasswordChange,
    handleConfirmPasswordChange,
    handleSubmit,
  };
};
