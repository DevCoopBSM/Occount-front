export type OrderStatus = 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
export type PaymentStatus = 'SUCCEEDED' | 'FAILED' | 'CANCELLED';

export interface OrderLine {
  item_id: number;
  item_name_snapshot: string;
  unit_price: number;
  quantity: number;
  total_price: number;
}

export interface OrderPayment {
  payment_log_id: number;
  payment_status: PaymentStatus;
  points_used: number;
  card_amount: number;
  transaction_id: string | null;
  approval_number: string | null;
}

export interface Order {
  order_id: number;
  status: OrderStatus;
  order_date: string;
  total_amount: number;
  lines: OrderLine[];
  payment: OrderPayment | null;
}

export interface OrderHistoryListResponse {
  orders: Order[];
  total_count: number;
  total_pages: number;
  current_page: number;
  page_size: number;
}

export interface Charge {
  charge_id: number;
  charge_date: string;
  charge_reason: string;
  detail_reason: string;
  payment_id: number | null;
  before_point: number;
  change_amount: number;
  after_point: number;
}

export interface ChargeHistoryListResponse {
  charges: Charge[];
  total_count: number;
  total_pages: number;
  current_page: number;
  page_size: number;
}
