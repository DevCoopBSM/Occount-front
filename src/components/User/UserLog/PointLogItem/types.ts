import type { OrderLine, OrderPayment, OrderStatus } from 'types/order';

export type { OrderLine, OrderPayment };

export interface LogItem {
  chargeId?: number;
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
  // v3 order fields
  orderLines?: OrderLine[];
  orderPayment?: OrderPayment | null;
  orderStatus?: OrderStatus;
  // v3 charge fields
  chargeReason?: string;
  detailReason?: string;
}

export interface MockLogItem extends LogItem {
  chargeAmount?: number;
  paymentAmount?: number;
  storeName?: string;
  paymentMethod?: string;
  chargeMethod?: string;
  status?: string;
}

export type UserLogItem = LogItem | MockLogItem;

export interface RefundAccount {
  bank: string;
  accountNumber: string;
  holderName: string;
  holderPhoneNumber?: string;
}

export interface PointLogItemProps {
  type: number;
  data: UserLogItem[];
  fetchUserLog: (type: string) => Promise<void>;
}
