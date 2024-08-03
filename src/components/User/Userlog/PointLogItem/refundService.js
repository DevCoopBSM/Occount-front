import { axiosInstance } from "utils/Axios";

export const handleRefundRequest = async (item, refundAccount, type, fetchUserLog, refetchUser, closeModal) => {
  if (item?.charger_id === "Online") {
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
        const requestData = { charge_num: item.charge_num };
        if (item.type === "3") {
          // 계좌 충전의 경우 추가 계좌 정보 포함
          requestData.refundAccount = refundAccount;
        }
        const response = await axiosInstance.post("/pg/refund", requestData);
        if (response.data.success) {
          alert(`환불 신청이 완료되었습니다: ${response.data.data.message}`);
          await fetchUserLog(type); // 환불이 완료된 후 유저 로그를 다시 불러옵니다
          await refetchUser(); // 유저 정보를 다시 불러옵니다
          closeModal(); // 모달 닫기
        } else {
          alert(`환불에 실패하였습니다. 다시 시도해주세요. 에러: ${response.data.error}`);
        }
      } catch (error) {
        console.error(error);
        alert(`환불에 실패하였습니다. 다시 시도해주세요. 에러: ${error.response.data.message}, ${error.response.data.details}`);
      }
    }
  }
};
