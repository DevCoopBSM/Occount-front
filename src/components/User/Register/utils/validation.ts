import { UserType } from '../types';

interface PasswordValidation {
  length: boolean;
  lowerCase: boolean;
  number: boolean;
  specialChar: boolean;
}

export const isLengthValid = (password: string): boolean => password.length >= 8;
export const hasLowerCase = (password: string): boolean => /[a-z]/.test(password);
export const hasNumbers = (password: string): boolean => /\d/.test(password);
export const hasSpecialChar = (password: string): boolean => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

export const validatePassword = (password: string): PasswordValidation => ({
  length: isLengthValid(password),
  lowerCase: hasLowerCase(password),
  number: hasNumbers(password),
  specialChar: hasSpecialChar(password)
});

export const isPasswordValid = (password: string): boolean => 
  isLengthValid(password) && 
  hasLowerCase(password) && 
  hasNumbers(password) && 
  hasSpecialChar(password);

export const validateEmail = (email: string, userType: UserType): string => {
  const [localPart] = email.split('@');
  if (userType === UserType.TEACHER && !/[a-zA-Z]/.test(localPart)) {
    return "교사 계정이 아닙니다.";
  }
  if (userType === UserType.STUDENT && /[a-zA-Z]/.test(localPart)) {
    return "학생 계정이 아닙니다.";
  }
  return "";
};

export const validateStep = (
  currentStep: number, 
  formData: any, 
  userType: UserType,
  isVerified: boolean,
  isPrivacyCollectionAgreed: boolean,
  isPrivacyThirdPartyAgreed: boolean
): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};

  switch(currentStep) {
    case 1:
      if (!userType) {
        errors.userType = "사용자 유형을 선택해주세요.";
      }
      break;
    case 2:
      if (!isPrivacyCollectionAgreed) {
        errors.privacyAgreement = "개인정보 수집 및 이용에 동의해주세요.";
      }
      if (!isPrivacyThirdPartyAgreed) {
        errors.privacyThirdParty = "개인정보 제3자 제공에 동의해주세요.";
      }
      break;
    // ... 다른 스텝 검증 로직 ...
  }

  return errors;
};
