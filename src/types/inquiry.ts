export type InquiryCategory = 'PAYMENT' | 'ACCOUNT' | 'SERVICE' | 'OTHER';

export type InquiryStatus = 'RECEIVED' | 'IN_PROGRESS' | 'COMPLETED';

export interface InquiryListItem {
  inquiry_id: number;
  title: string;
  category: InquiryCategory;
  status: InquiryStatus;
  created_at: string;
}

export interface InquiryDetail {
  inquiry_id: number;
  title: string;
  content: string;
  category: InquiryCategory;
  status: InquiryStatus;
  created_at: string;
  updated_at: string;
}

export interface CreateInquiryRequest {
  title: string;
  content: string;
  category: InquiryCategory;
}

export interface CreateInquiryResponse {
  inquiry_id: number;
  status: InquiryStatus;
  created_at: string;
}
