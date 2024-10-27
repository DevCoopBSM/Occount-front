export enum UserType {
    STUDENT = 'STUDENT',
    PARENT = 'PARENT',
    TEACHER = 'TEACHER',
    OTHER = 'OTHER'
}

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
