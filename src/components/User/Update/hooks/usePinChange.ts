import { useState, useEffect, useRef, type ChangeEvent } from 'react';
import axiosInstance from 'utils/Axios';
import { VALIDATION_PATTERNS } from '../constants/validation';
import { UPDATE_MESSAGES } from '../constants/messages';

const MAX_PIN_LENGTH = 6;
const DIGITS_ONLY = /[^0-9]/g;

type PinChangeState =
  | { step: 'passwordRequired'; password: string; error: string | null }
  | {
      step: 'passwordVerified';
      ticket: string;
      newPin: string;
      confirmNewPin: string;
      error: string | null;
    }
  | { step: 'success' };

const formatTime = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

export const usePinChange = () => {
  const [state, setState] = useState<PinChangeState>({
    step: 'passwordRequired',
    password: '',
    error: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [pinWarning, setPinWarning] = useState('');
  const [confirmWarning, setConfirmWarning] = useState('');
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startTimer = (seconds: number) => {
    clearTimer();
    setRemainingSeconds(seconds);
    timerRef.current = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearTimer();
          setState({
            step: 'passwordRequired',
            password: '',
            error: '인증 시간이 만료되었습니다. 다시 시도해주세요.',
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => clearTimer();
  }, []);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (state.step !== 'passwordRequired') return;
    setState({ ...state, password: e.target.value, error: null });
  };

  const handleVerifyPassword = async (): Promise<void> => {
    if (state.step !== 'passwordRequired') return;
    if (!state.password) {
      setState({ ...state, error: '현재 비밀번호를 입력해주세요.' });
      return;
    }
    setIsLoading(true);
    try {
      const response = await axiosInstance.post('/users/pin/change-ticket', {
        password: state.password,
      });
      startTimer(response.data.expires_in);
      setState({
        step: 'passwordVerified',
        ticket: response.data.ticket,
        newPin: '',
        confirmNewPin: '',
        error: null,
      });
    } catch (error: any) {
      const errorMessage = !error.response
        ? '서비스에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.'
        : error.response.status >= 500 || error.response.status === 404
          ? '서비스 준비 중입니다. 잠시 후 다시 시도해주세요.'
          : error.response?.data?.message || '비밀번호가 올바르지 않습니다.';
      setState({ ...state, error: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePinChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (state.step !== 'passwordVerified') return;
    const value = e.target.value.replace(DIGITS_ONLY, '');
    if (value.length <= MAX_PIN_LENGTH) {
      setPinWarning(
        value && !VALIDATION_PATTERNS.PIN.test(value) ? UPDATE_MESSAGES.VALIDATION.PIN : ''
      );
      setState({ ...state, newPin: value });
    }
  };

  const handleConfirmPinChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (state.step !== 'passwordVerified') return;
    const value = e.target.value.replace(DIGITS_ONLY, '');
    if (value.length <= MAX_PIN_LENGTH) {
      setConfirmWarning(value !== state.newPin ? UPDATE_MESSAGES.VALIDATION.PIN_MISMATCH : '');
      setState({ ...state, confirmNewPin: value });
    }
  };

  const handleSubmit = async (): Promise<void> => {
    if (state.step !== 'passwordVerified') return;
    if (!state.ticket) return;
    if (!state.newPin || pinWarning || state.newPin !== state.confirmNewPin) return;

    setIsLoading(true);
    try {
      await axiosInstance.put('/users/pin', {
        ticket: state.ticket,
        new_pin: state.newPin,
      });
      clearTimer();
      setState({ step: 'success' });
    } catch (error: any) {
      setState({
        ...state,
        error: error.response?.data?.message || 'PIN 변경에 실패했습니다.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isSubmitDisabled =
    state.step !== 'passwordVerified' ||
    !VALIDATION_PATTERNS.PIN.test(state.newPin) ||
    state.newPin !== state.confirmNewPin;

  return {
    state,
    isLoading,
    isSubmitDisabled,
    pinWarning,
    confirmWarning,
    remainingSeconds,
    formatTime,
    handlePasswordChange,
    handleVerifyPassword,
    handlePinChange,
    handleConfirmPinChange,
    handleSubmit,
  };
};
