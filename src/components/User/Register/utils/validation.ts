interface PasswordValidation {
  length: boolean;
  lowerCase: boolean;
  number: boolean;
  specialChar: boolean;
}

export const isLengthValid = (password: string): boolean => password.length >= 8;
export const hasLowerCase = (password: string): boolean => /[a-z]/.test(password);
export const hasNumbers = (password: string): boolean => /\d/.test(password);
export const hasSpecialChar = (password: string): boolean =>
  /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

export const validatePassword = (password: string): PasswordValidation => ({
  length: !isLengthValid(password),
  lowerCase: !hasLowerCase(password),
  number: !hasNumbers(password),
  specialChar: !hasSpecialChar(password),
});

export const isPasswordValid = (password: string): boolean =>
  isLengthValid(password) &&
  hasLowerCase(password) &&
  hasNumbers(password) &&
  hasSpecialChar(password);

const SCHOOL_EMAIL_REGEX = /^(24|25|26)[._]\d{2,3}@bssm\.hs\.kr$/i;

export const validateEmail = (email: string): string => {
  const normalizedEmail = email.trim();
  if (!normalizedEmail) return '이메일을 입력해주세요.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return '올바른 이메일 형식이 아닙니다.';
  }
  if (!SCHOOL_EMAIL_REGEX.test(normalizedEmail)) {
    return '학교 이메일만 사용할 수 있습니다.';
  }
  return '';
};

export const validateStep = (
  currentStep: number,
  formData: any,
  isVerified: boolean,
  isPrivacyCollectionAgreed: boolean,
  isPrivacyThirdPartyAgreed: boolean,
  isEmailVerified = false
): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};

  switch (currentStep) {
    case 1:
      if (!isPrivacyCollectionAgreed) {
        errors.privacyAgreement = '개인정보 수집 및 이용에 동의해주세요.';
      }
      if (!isPrivacyThirdPartyAgreed) {
        errors.privacyThirdParty = '개인정보 제3자 제공에 동의해주세요.';
      }
      break;
    case 2:
      if (!isVerified) {
        errors.verification = '본인인증을 완료해주세요.';
      }
      break;
    case 3:
      {
        const emailError = validateEmail(formData.userEmail || '');
        if (emailError) errors.userEmail = emailError;
        if (!isEmailVerified) errors.emailOtp = '이메일 인증을 완료해주세요.';
        if (!isPasswordValid(formData.userPassword || '')) {
          errors.userPassword = '비밀번호 조건을 확인해주세요.';
        }
        if (formData.userPassword !== formData.confirmPassword) {
          errors.confirmPassword = '비밀번호가 일치하지 않습니다.';
        }
      }
      break;
  }

  return errors;
};
