export enum UserType {
  STUDENT = 'STUDENT',
  PARENT = 'PARENT',
  TEACHER = 'TEACHER',
  OTHER = 'OTHER',
}

export interface FormData {
  userEmail: string;
  userPassword: string;
  confirmPassword?: string;
  emailOtp: string;
  pin: string;
  confirmPin: string;
}

export interface RegisterRequest {
  user_ci_number: string;
  username: string;
  user_phone?: string | null;
  user_email: string;
  password: string;
  pin: string;
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
