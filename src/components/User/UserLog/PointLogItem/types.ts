export interface LogItem {
  chargeId: number;
  payId?: number;
  type: string;
  date: string;
  inner_point: string;
  chargeDate?: number[];
  payDate?: number[];
  chargedPoint?: number;
  payedPoint?: number;
  chargeType?: string;
  payType?: string;
  refundState?: boolean;
  reason?: string;
}

export interface RefundAccount {
  bank: string;
  accountNumber: string;
  holderName: string;
  holderPhoneNumber?: string;
}

export interface PointLogItemProps {
  type: number;
  data: LogItem[];
  fetchUserLog: (type: string) => Promise<void>;
}
