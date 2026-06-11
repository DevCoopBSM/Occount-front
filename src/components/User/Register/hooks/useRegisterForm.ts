import { useState } from 'react';
import { FormData } from '../types';
import { validatePassword } from '../utils/validation';

const DIGITS_ONLY = /\D/g;
const OTP_MAX_LENGTH = 6;
const PIN_MAX_LENGTH = 6;

interface PasswordValidationState {
  length: boolean;
  lowerCase: boolean;
  number: boolean;
  specialChar: boolean;
}

export const useRegisterForm = () => {
  const [formData, setFormData] = useState<FormData>({
    userEmail: '',
    userPassword: '',
    confirmPassword: '',
    emailOtp: '',
    pin: '',
    confirmPin: '',
  });
  const [pinMatch, setPinMatch] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<PasswordValidationState>(
    { length: true, lowerCase: true, number: true, specialChar: true }
  );
  const [passwordMatch, setPasswordMatch] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const value =
      name === 'emailOtp'
        ? e.target.value.replace(DIGITS_ONLY, '').slice(0, OTP_MAX_LENGTH)
        : name === 'pin' || name === 'confirmPin'
          ? e.target.value.replace(DIGITS_ONLY, '').slice(0, PIN_MAX_LENGTH)
          : e.target.value;

    setFormData((prev) => {
      const newFormData = { ...prev, [name]: value };

      if (name === 'userPassword') {
        setPasswordErrors(validatePassword(value));
        setPasswordMatch(value === newFormData.confirmPassword);
      } else if (name === 'confirmPassword') {
        setPasswordMatch(newFormData.userPassword === value);
      } else if (name === 'pin') {
        setPinMatch(value === newFormData.confirmPin);
      } else if (name === 'confirmPin') {
        setPinMatch(newFormData.pin === value);
      }

      return newFormData;
    });
  };

  return {
    formData,
    setFormData,
    passwordErrors,
    passwordMatch,
    pinMatch,
    handleInputChange,
  };
};
