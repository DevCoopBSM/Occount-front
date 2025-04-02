import { UserInfo } from '../types';
import * as PortOne from "@portone/browser-sdk/v2";

export const verifyUser = async (): Promise<UserInfo & { success: boolean }> => {
  try {
    const identityVerificationId = `identity-verification-${crypto.randomUUID()}`;
    const response = await PortOne.requestIdentityVerification({
      storeId: "store-bac037ce-3bdb-4f38-acee-d91419f3e882",
      identityVerificationId,
      channelKey: "channel-key-2205f8cc-70e7-4a88-b0f2-e2f1f21baa36",
    });

    if (response.code !== undefined) {
      alert(response.message);
      throw new Error(response.message);
    }

    console.log(response)
    // 백엔드로 포스트 하는 과정으로 대체할것
    const verificationResult = await fetch("http://localhost:8080/api/v2/verify/identity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        identityVerificationId,
      }),
    });

    const data:UserInfo & { success: boolean } = await verificationResult.json();

    return { ...data, success: true };
  } catch (error) {
    alert(error instanceof Error ? error.message : "인증에 실패했습니다");
    throw error;
  }
};