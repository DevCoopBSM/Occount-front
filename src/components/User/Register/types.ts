export enum UserType {
    STUDENT = 'STUDENT',
    PARENT = 'PARENT',
    TEACHER = 'TEACHER',
    OTHER = 'OTHER'
}

// 스텝 관련 타입 추가
export const STEPS = {
    USER_TYPE: 1,
    PRIVACY: 2,
    VERIFICATION: 3,
    ACCOUNT: 4,
    ADDITIONAL_INFO: 5,
} as const;

export type StepType = typeof STEPS[keyof typeof STEPS];

export interface FormData {
    userName: string;
    userEmail: string;
    userPassword: string;
    confirmPassword?: string;
    userAddress: string;
    userPin: string;
    confirmPin?: string;
    userCode?: string;
    addressDetail: string;
}

export interface RegisterRequest {
    userName: string;
    userEmail: string;
    userPassword: string;
    userAddress: string;
    userPin: string;
    userType: UserType;
    userCiNumber: string;
    userPhone: string;
    userBirthDate: string;
}

export interface ErrorState extends Partial<FormData> {
    [key: string]: string;  
    userType?: string;
    userEmail?: string;
    userPassword?: string;
    confirmPassword?: string;
    userAddress?: string;
    userPin?: string;
    confirmPin?: string;
    userCode?: string;
    verification?: string;
    privacyAgreement?: string;
    privacyThirdParty?: string;
    addressDetail?: string;
}

export interface UserInfo {
    userName: string;
    userBirthDate: string;
    userPhone: string;
    userCiNumber: string;
}
