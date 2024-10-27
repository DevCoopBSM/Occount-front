export enum UserType {
    TEACHER = "교사",
    STUDENT = "학생",
    PARENT = "학부모"
}

export enum Role {
    ROLE_DEACTIVATED = "비활성",
    ROLE_USER = "일반 사용자",
    ROLE_MEMBER = "조합원",
    ROLE_COOP = "매점부",
    ROLE_ADMIN = "관리자"
}

export interface UserInfo {
    userName: string;
    userEmail: string;
    userPassword: string;
    userAddress: string;
    userPin: string;
    userType: UserType;
    role: Role;
    userPhone: string;
    userBirthDate: string;
    investmentAmount: number;
}