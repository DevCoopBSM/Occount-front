import { AxiosError } from 'axios';
import { axiosInstance } from "utils/Axios";
import { LogItem, RefundAccount } from './types';

interface RefundResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export const handleRefundRequest = async (
  item: LogItem,
  refundAccount: RefundAccount | null,
  type: string,
  fetchUserLog: (type: string) => Promise<void>,
  refetchUser: () => Promise<void>,
  closeModal: () => void
): Promise<void> => {
  const itemType = parseInt(item.type, 10);

  if (itemType >= 2) {
    const chargeDate = new Date(item.date);
    const currentDate = new Date();
    const timeDiff = Math.abs(currentDate.getTime() - chargeDate.getTime());
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (dayDiff > 7) {
      alert("충전한지 1주일이 초과된 건은 환불할 수 없습니다.");
      return;
    }

    const confirmed = window.confirm(
      `일시: ${new Date(item.date).toLocaleString()} \n금액: ${parseInt(item.inner_point).toLocaleString()}원 \n\n환불을 신청하시겠습니까?`
    );

    if (confirmed) {
      try {
        const requestData: { chargeId: number; refundAccount?: RefundAccount } = { chargeId: item.chargeId };
        if (itemType === 3 && refundAccount) {
          requestData.refundAccount = refundAccount;
        }

        const response = await axiosInstance.post<RefundResponse>("v2/pg/refund", requestData);
        
        if (response.data.success) {
          alert(`환불 신청이 완료되었습니다: ${response.data.message}`);
          await fetchUserLog(type);
          await refetchUser();
          closeModal();
        } else {
          alert(`환불에 실패하였습니다. 다시 시도해주세요. 에러: ${response.data.error}`);
        }
      } catch (error) {
        console.error(error);
        const axiosError = error as AxiosError<RefundResponse>;
        const errorMessage = axiosError.response?.data?.error || axiosError.message;
        alert(`환불에 실패하였습니다. 다시 시도해주세요. 에러: ${errorMessage}`);
      }
    }
  } else {
    alert("온라인 결제가 아닌 항목은 환불할 수 없습니다.");
  }
};
