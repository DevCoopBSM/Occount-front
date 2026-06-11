import { useState, type ChangeEvent } from 'react';
import axiosInstance from 'utils/Axios';
import { VALIDATION_PATTERNS } from '../constants/validation';
import { UPDATE_MESSAGES } from '../constants/messages';

type PasswordChangeStep = 'idle' | 'otpSent' | 'success';

export const usePasswordChange = () => {
  const [step, setStep] = useState<PasswordChangeStep>('idle');
  const [isLoading, setIsLoading] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordWarning, setPasswordWarning] = useState('');
  const [confirmWarning, setConfirmWarning] = useState('');

  const handleSendOtp = async (email: string): Promise<void> => {
    setIsLoading(true);
    setError('');
    try {
      await axiosInstance.post('/auth/email/send-otp', {
        email,
        purpose: 'PASSWORD_RESET',
      });
      setStep('otpSent');
      setOtpCode('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch {
      setError('인증 코드 발송에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewPassword(value);
    setPasswordWarning(
      value && !VALIDATION_PATTERNS.PASSWORD.test(value) ? UPDATE_MESSAGES.VALIDATION.PASSWORD : ''
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
    setConfirmWarning(value !== newPassword ? UPDATE_MESSAGES.VALIDATION.PASSWORD_MISMATCH : '');
  };

  const handleSubmit = async (email: string): Promise<void> => {
    if (!otpCode) {
      setError('인증 코드를 입력해주세요.');
      return;
    }
    if (!newPassword || passwordWarning || newPassword !== confirmNewPassword) return;

    setIsLoading(true);
    setError('');
    try {
      await axiosInstance.post('/auth/password/change', {
        email,
        otp_code: otpCode,
        new_password: newPassword,
      });
      setStep('success');
    } catch (error: any) {
      setError(error.response?.data?.message || '비밀번호 변경에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    step,
    isLoading,
    otpCode,
    setOtpCode,
    newPassword,
    confirmNewPassword,
    error,
    passwordWarning,
    confirmWarning,
    handleSendOtp,
    handleNewPasswordChange,
    handleConfirmPasswordChange,
    handleSubmit,
  };
};
