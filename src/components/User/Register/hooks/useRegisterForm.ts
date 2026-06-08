import { useState } from 'react';
import { FormData } from '../types';
import { validatePassword } from '../utils/validation';

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
  });
  const [passwordErrors, setPasswordErrors] = useState<PasswordValidationState>({
    length: false,
    lowerCase: false,
    number: false,
    specialChar: false,
  });
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const value =
      name === 'emailOtp' ? e.target.value.replace(/\D/g, '').slice(0, 6) : e.target.value;

    setFormData((prev) => {
      const newFormData = { ...prev, [name]: value };

      if (name === 'userPassword') {
        setPasswordErrors(validatePassword(value));
        setPasswordMatch(value === newFormData.confirmPassword);
      } else if (name === 'confirmPassword') {
        setPasswordMatch(newFormData.userPassword === value);
      }

      return newFormData;
    });
  };

  return {
    formData,
    setFormData,
    passwordErrors,
    passwordMatch,
    handleInputChange,
  };
};
