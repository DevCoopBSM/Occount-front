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
  /** @deprecated v3 미제공 - 추후 API 추가 요청 예정 */
  userAddress: string;
  /** @deprecated v3 미제공 - 추후 API 추가 요청 예정 */
  investmentAmount: number;
  /** @deprecated v3 미제공 - 추후 API 추가 요청 예정 */
  todayTotalPayment?: number;
}

// 폼 관련 인터페이스
export interface FormData {
  userInfo: UserInfo;
  currentPassword: string;
  passwordForm: {
    newPassword: string;
    confirmNewPassword: string;
  };
  pinForm: {
    newPin: string;
    confirmNewPin: string;
  };
  addressDetail: string;
  investmentAmount: number;
  maxInvestmentAmount: number;
}

// 상태 관련 인터페이스
export interface Status {
  isPinVerified: boolean;
  isOtpSent: boolean;
  isOtpVerified: boolean;
  isAddressSearched: boolean;
  isInvestmentModalOpen: boolean;
  isScriptLoaded: boolean;
  isSuccessMessageVisible: boolean;
  isSendingOtp: boolean;
}

// 메시지 관련 인터페이스
export interface Messages {
  fetchError: string;
  verificationError: string;
  otpError: string;
  otpCode: string;
  successMessage: string;
  passwordWarnings: {
    password: string;
    confirm: string;
  };
  pinWarnings: {
    pin: string;
    confirm: string;
  };
}

// 핸들러 관련 인터페이스
export interface Handlers {
  handleVerify: () => Promise<void>;
  handleSendOtp: () => Promise<void>;
  handleVerifyOtp: () => Promise<void>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleConfirmPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePinChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleConfirmPinChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddressDetailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  openAddressSearch: () => void;
  handleOpenInvestmentModal: () => void;
  handleCloseInvestmentModal: () => void;
  increaseAmount: () => void;
  decreaseAmount: () => void;
}

// Setter 관련 인터페이스
export interface Setters {
  setCurrentPassword: (value: string) => void;
  setOtpCode: (value: string) => void;
  setIsPasswordChangeMode: (value: boolean) => void;
  setIsPinChangeMode: (value: boolean) => void;
  setInvestmentAmount: (amount: number) => void;
}

// 컴포넌트 Props 인터페이스
export interface SecuritySectionProps {
  // 비밀번호 변경 - OTP 인증
  isOtpSent: boolean;
  isOtpVerified: boolean;
  otpCode: string;
  otpError: string;
  isSendingOtp: boolean;
  handleSendOtp: () => Promise<void>;
  handleVerifyOtp: () => Promise<void>;
  setOtpCode: (value: string) => void;
  passwordForm: {
    newPassword: string;
    confirmNewPassword: string;
  };
  passwordWarnings: {
    password: string;
    confirm: string;
  };
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleConfirmPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // PIN 변경 - 비밀번호 인증
  isPinVerified: boolean;
  currentPassword: string;
  setCurrentPassword: (value: string) => void;
  verificationError: string;
  handleVerify: () => Promise<void>;
  pinForm: {
    newPin: string;
    confirmNewPin: string;
  };
  pinWarnings: {
    pin: string;
    confirm: string;
  };
  handlePinChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleConfirmPinChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// 훅 반환 타입
export interface UpdateFormReturn {
  formData: FormData;
  status: Status;
  messages: Messages;
  handlers: Handlers;
  setters: Setters;
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
