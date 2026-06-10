import { useState, type ChangeEvent } from 'react';
import axiosInstance from 'utils/Axios';
import { VALIDATION_PATTERNS } from '../constants/validation';
import { UPDATE_MESSAGES } from '../constants/messages';

export const usePinChange = () => {
  const [password, setPassword] = useState('');
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [confirmNewPin, setConfirmNewPin] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [pinWarning, setPinWarning] = useState('');
  const [confirmWarning, setConfirmWarning] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleVerifyPassword = async (): Promise<void> => {
    if (!password) {
      setPasswordError('현재 비밀번호를 입력해주세요.');
      return;
    }
    setIsVerifying(true);
    setPasswordError('');
    try {
      // TODO: POST /api/v3/auth/password/verify (백엔드 추가 예정)
      await axiosInstance.post('/auth/password/verify', { password });
      setIsPasswordVerified(true);
    } catch (error: any) {
      setPasswordError(error.response?.data?.message || '비밀번호가 올바르지 않습니다.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handlePinChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 6) {
      setNewPin(value);
      setPinWarning(
        value && !VALIDATION_PATTERNS.PIN.test(value) ? UPDATE_MESSAGES.VALIDATION.PIN : ''
      );
    }
  };

  const handleConfirmPinChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 6) {
      setConfirmNewPin(value);
      setConfirmWarning(value !== newPin ? UPDATE_MESSAGES.VALIDATION.PIN_MISMATCH : '');
    }
  };

  const handleSubmit = async (): Promise<void> => {
    if (!newPin || pinWarning || newPin !== confirmNewPin) return;

    setIsSubmitting(true);
    try {
      await axiosInstance.post('/users/pin/change', {
        password,
        new_pin: newPin,
      });
      setSuccessMessage('PIN이 변경되었습니다.');
      setPassword('');
      setIsPasswordVerified(false);
      setNewPin('');
      setConfirmNewPin('');
    } catch (error: any) {
      // 비밀번호 불일치 에러 시 인증 단계로 되돌림
      setIsPasswordVerified(false);
      setPasswordError(error.response?.data?.message || '비밀번호가 올바르지 않습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    password,
    setPassword,
    isPasswordVerified,
    isVerifying,
    newPin,
    confirmNewPin,
    passwordError,
    pinWarning,
    confirmWarning,
    isSubmitting,
    successMessage,
    handleVerifyPassword,
    handlePinChange,
    handleConfirmPinChange,
    handleSubmit,
  };
};
