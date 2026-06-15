import { axiosInstance } from 'utils/Axios';
import type { Charge, Order } from 'types/order';

export const fetchAllOrders = async (): Promise<Order[]> => {
  const size = 100;
  const allOrders: Order[] = [];
  let page = 0;
  while (true) {
    const response = await axiosInstance.get('orders', {
      params: { page, size, sort: 'orderId,desc' },
    });
    const data = response.data;
    allOrders.push(...data.orders);
    if (page >= data.total_pages - 1) break;
    page++;
  }
  return allOrders;
};

export const fetchAllCharges = async (): Promise<Charge[]> => {
  const size = 100;
  const allCharges: Charge[] = [];
  let page = 0;
  while (true) {
    const response = await axiosInstance.get('wallet/charges', {
      params: { page, size, sort: 'chargeId,desc' },
    });
    const data = response.data;
    allCharges.push(...data.charges.filter((c: Charge) => c.change_amount > 0));
    if (page >= data.total_pages - 1) break;
    page++;
  }
  return allCharges;
};
