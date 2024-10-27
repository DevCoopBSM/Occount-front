import { UserInfo } from '../types';

export const verifyUser = async (): Promise<UserInfo & { success: boolean }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        userName: "지금은 테스트 중입니다.",
        userPhone: "010-1234-5678",
        userBirthDate: "1990-01-01",
        userCiNumber: "abcdefghijklmnop1234567890",
      });
    }, 1000);
  });
};