import { axiosInstance } from 'utils/Axios';

export const handleCharge = async ({ userCode, chargedPoint }) => {
  try {
    const response = await axiosInstance.post(`v2/transaction/charge`, {
      chargedPoint,
      userCode,
    });
    return response.data; // 충전 데이터를 반환합니다.
  } catch (error) {
    console.error(error);
    throw error; // 에러를 던져 상위 컴포넌트에서 처리할 수 있게 합니다.
  }
};

