import { UserInfo } from '../types';
import * as PortOne from "@portone/browser-sdk/v2";
import axiosInstance from 'utils/Axios';

export const verifyUser = async (): Promise<UserInfo & { success: boolean }> => {
  try {
    const identityVerificationId = `identity-verification-${crypto.randomUUID()}`;
    const response = await PortOne.requestIdentityVerification({
      storeId: process.env.REACT_APP_STORE_ID,
      identityVerificationId,
      channelKey: process.env.REACT_APP_CHANNEL_KEY_AUTH,
    });

    if (response.code !== undefined) {
      alert(response.message);
      throw new Error(response.message);
    }

    console.log(response)
    const { data } = await axiosInstance.post(
      "/v2/verify/identity",
      { identityVerificationId }
    );
    return {
      success: true,
      userName: data.name,
      userBirthDate: data.birth,
      userPhone: data.phone,
      userCiNumber: data.verificationId
    };
  } catch (error) {
    alert(error instanceof Error ? error.message : "인증에 실패했습니다");
    throw error;
  }
};