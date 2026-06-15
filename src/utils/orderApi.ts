import { axiosInstance } from 'utils/Axios';
import type { ChargeHistoryListResponse, OrderHistoryListResponse } from 'types/order';

export const fetchOrders = async (page = 0, size = 100): Promise<OrderHistoryListResponse> => {
  const response = await axiosInstance.get('orders', {
    params: { page, size, sort: 'orderId,desc' },
  });
  return response.data;
};

export const fetchCharges = async (page = 0, size = 100): Promise<ChargeHistoryListResponse> => {
  const response = await axiosInstance.get('wallet/charges', {
    params: { page, size, sort: 'chargeId,desc' },
  });
  return response.data;
};
