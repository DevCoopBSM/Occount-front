// 기본 열거형
export enum UserType {
  STUDENT = '학생',
  PARENT = '학부모',
  TEACHER = '교사',
  OTHER = '기타',
}

export enum Role {
  ROLE_DEACTIVATED = '비활성',
  ROLE_USER = '일반 사용자',
  ROLE_MEMBER = '조합원',
  ROLE_COOP = '매점부',
  ROLE_ADMIN = '관리자',
}

// 기본 인터페이스
export interface UserInfo {
  username: string;
  email: string;
  phone: string;
  user_type: keyof typeof UserType;
  role: keyof typeof Role;
  birth_date: string;
  cooperative_number: string | null;
  // v3 미제공으로 기존 camelCase 임시 유지 - API 추가 시 snake_case로 통일 예정
  userAddress: string;
  investmentAmount: number;
  todayTotalPayment?: number;
}

// 투자 관련 인터페이스
export interface InvestmentState {
  isInvestmentModalOpen: boolean;
  investmentAmount: number;
  maxInvestmentAmount: number;
  setInvestmentAmount: (amount: number) => void;
  increaseAmount: () => void;
  decreaseAmount: () => void;
  handleOpenInvestmentModal: () => void;
  handleCloseInvestmentModal: () => void;
}
