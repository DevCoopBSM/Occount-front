import axiosInstance from 'utils/Axios';
import type {
  CreateInquiryRequest,
  CreateInquiryResponse,
  InquiryDetail,
  InquiryListItem,
} from 'types/inquiry';

export const fetchInquiryList = async (): Promise<InquiryListItem[]> => {
  const response = await axiosInstance.suspense<{ inquiries: InquiryListItem[] }>({
    url: 'inquiries',
    method: 'GET',
  });
  return Array.isArray(response?.inquiries) ? response.inquiries : [];
};

export const fetchInquiryDetail = async (inquiryId: number): Promise<InquiryDetail> => {
  return axiosInstance.suspense<InquiryDetail>({
    url: `inquiries/${inquiryId}`,
    method: 'GET',
  });
};

export const createInquiry = async (body: CreateInquiryRequest): Promise<CreateInquiryResponse> => {
  return axiosInstance.suspense<CreateInquiryResponse>({
    url: 'inquiries',
    method: 'POST',
    data: body,
  });
};
