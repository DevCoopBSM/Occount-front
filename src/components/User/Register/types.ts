export enum UserType {
  STUDENT = 'STUDENT',
  PARENT = 'PARENT',
  TEACHER = 'TEACHER',
  OTHER = 'OTHER',
}

// 스텝 관련 타입 추가
export const STEPS = {
  TERMS_AGREEMENT: 1,
  VERIFICATION: 2,
  ACCOUNT: 3,
} as const;

export type StepType = (typeof STEPS)[keyof typeof STEPS];

export interface FormData {
  userEmail: string;
  userPassword: string;
  confirmPassword?: string;
  emailOtp: string;
}

export interface RegisterRequest {
  user_ci_number: string;
  username: string;
  user_phone?: string | null;
  user_email: string;
  password: string;
}

export interface ErrorState extends Partial<FormData> {
  [key: string]: string;
  userType?: string;
  userEmail?: string;
  userPassword?: string;
  confirmPassword?: string;
  emailOtp?: string;
  verification?: string;
  privacyAgreement?: string;
  privacyThirdParty?: string;
}

export interface UserInfo {
  userName: string;
  userBirthDate: string;
  userPhone: string;
  userCiNumber: string;
}
