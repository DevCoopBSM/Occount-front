export type PaymentType = 'aripay' | 'investment';

export interface CustomerInfo {
  phoneNumber: string;
  fullName: string;
  customerId: string;
  email: string;
}

export interface PaymentRequestOptions {
  storeId: string;
  paymentId: string;
  orderName: string;
  totalAmount: number;
  currency: string;
  channelKey: string;
  payMethod: string;
  customer: CustomerInfo;
  windowType: {
    pc: string;
    mobile: string;
  };
  redirectUrl: string;
  virtualAccount?: {
    accountExpiry: {
      validHours: number;
    };
  };
}

export interface PaymentCheckoutPageProps {
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  rechargeAmount: number;
  onRequestClose: () => void;
  paymentType: PaymentType;
}
