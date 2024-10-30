import { useState } from 'react';
import { FormData, UserType } from '../types';
import { 
  isLengthValid, 
  hasLowerCase, 
  hasNumbers, 
  hasSpecialChar,
  validateEmail, 
  validatePassword, 
} from '../utils/validation';

interface PasswordValidationState {
  length: boolean;
  lowerCase: boolean;
  number: boolean;
  specialChar: boolean;
}

export const useRegisterForm = () => {
  const [formData, setFormData] = useState<FormData>({
    userName: "",
    userEmail: "",
    userPassword: "",
    userAddress: "",
    userPin: "",
    userCode: "",
    addressDetail: "",
    confirmPassword: "",
  });
  const [emailPrefix, setEmailPrefix] = useState('');
  const [passwordErrors, setPasswordErrors] = useState<PasswordValidationState>({
    length: false,
    lowerCase: false,
    number: false,
    specialChar: false
  });
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleEmailChange = (value: string, userType: UserType) => {
    if (userType === UserType.STUDENT || userType === UserType.TEACHER) {
      setEmailPrefix(value);
      const fullEmail = `${value}@bssm.hs.kr`;
      setFormData(prev => ({ ...prev, userEmail: fullEmail }));
      
      const emailError = validateEmail(fullEmail, userType);
      if (emailError) {
        // 이메일 에러 처리 로직
      }
    }
  };

  const handlePasswordChange = (name: string, value: string) => {
    const currentPassword = name === 'userPassword' ? value : formData.userPassword;
    const currentConfirmPassword = name === 'confirmPassword' ? value : formData.confirmPassword;
    
    setPasswordMatch(() => currentPassword === currentConfirmPassword);
    
    if (name === 'userPassword') {
      setPasswordErrors(() => ({
        length: isLengthValid(value),
        lowerCase: hasLowerCase(value),
        number: hasNumbers(value),
        specialChar: hasSpecialChar(value)
      }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, userType: UserType) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'userEmail') {
      handleEmailChange(value, userType);
    }
    
    if (name === 'userPassword' || name === 'confirmPassword') {
      handlePasswordChange(name, value);
    }
    
    if (name === 'userPassword') {
      const validationResult = validatePassword(value);
      setPasswordErrors(validationResult);
    }
  };

  return {
    formData,
    setFormData,
    emailPrefix,
    passwordErrors,
    passwordMatch,
    handleInputChange
  };
};
