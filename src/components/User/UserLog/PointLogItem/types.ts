export interface OrderLine {
  item_id: number;
  item_name_snapshot: string;
  unit_price: number;
  quantity: number;
  total_price: number;
}

export interface OrderPayment {
  payment_log_id: number;
  payment_status: string;
  points_used: number;
  card_amount: number;
  transaction_id: string | null;
  approval_number: string | null;
}

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
  orderStatus?: string;
  // v3 charge fields
  chargeReason?: string;
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
