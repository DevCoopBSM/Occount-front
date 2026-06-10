import { useState, type ChangeEvent } from 'react';
import axiosInstance from 'utils/Axios';
import { VALIDATION_PATTERNS } from '../constants/validation';
import { UPDATE_MESSAGES } from '../constants/messages';

type PinStatus = 'idle' | 'verifying' | 'submitting';

export const usePinChange = () => {
  const [status, setStatus] = useState<PinStatus>('idle');
  const [password, setPassword] = useState('');
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [ticket, setTicket] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmNewPin, setConfirmNewPin] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [pinWarning, setPinWarning] = useState('');
  const [confirmWarning, setConfirmWarning] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleVerifyPassword = async (): Promise<void> => {
    if (!password) {
      setPasswordError('현재 비밀번호를 입력해주세요.');
      return;
    }
    setStatus('verifying');
    setPasswordError('');
    try {
      const response = await axiosInstance.post('/users/pin/change-ticket', { password });
      setTicket(response.data.ticket);
      setIsPasswordVerified(true);
    } catch (error: any) {
      if (!error.response) {
        setPasswordError('서비스에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.');
      } else if (error.response.status >= 500 || error.response.status === 404) {
        setPasswordError('서비스 준비 중입니다. 잠시 후 다시 시도해주세요.');
      } else {
        setPasswordError(error.response?.data?.message || '비밀번호가 올바르지 않습니다.');
      }
    } finally {
      setStatus('idle');
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

    setStatus('submitting');
    try {
      await axiosInstance.put('/users/pin', {
        ticket,
        new_pin: newPin,
      });
      setSuccessMessage('PIN이 변경되었습니다.');
      setPassword('');
      setTicket('');
      setIsPasswordVerified(false);
      setNewPin('');
      setConfirmNewPin('');
    } catch (error: any) {
      setPasswordError(error.response?.data?.message || 'PIN 변경에 실패했습니다.');
    } finally {
      setStatus('idle');
    }
  };

  return {
    status,
    password,
    setPassword,
    isPasswordVerified,
    newPin,
    confirmNewPin,
    passwordError,
    pinWarning,
    confirmWarning,
    successMessage,
    handleVerifyPassword,
    handlePinChange,
    handleConfirmPinChange,
    handleSubmit,
  };
};
