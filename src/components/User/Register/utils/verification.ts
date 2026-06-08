import { UserInfo } from '../types';
import * as PortOne from '@portone/browser-sdk/v2';
import { apiClient } from 'api/client';

interface IdentityVerifyResponse {
  name?: string;
  username?: string;
  user_name?: string;
  birth?: string;
  birth_date?: string;
  user_birth_date?: string;
  phone?: string;
  user_phone?: string;
  ci_number?: string;
  user_ci_number?: string;
  verificationId?: string;
}

const mapIdentityVerifyResponse = (
  data: IdentityVerifyResponse,
  identityVerificationId: string
): UserInfo => ({
  userName: data.name || data.username || data.user_name || '',
  userBirthDate: data.birth || data.birth_date || data.user_birth_date || '',
  userPhone: data.phone || data.user_phone || '',
  userCiNumber: data.ci_number || data.user_ci_number || data.verificationId || identityVerificationId,
});

export const verifyUser = async (): Promise<UserInfo & { success: boolean }> => {
  try {
    if (
      process.env.NODE_ENV === 'development' &&
      process.env.REACT_APP_MOCK_IDENTITY_VERIFICATION === 'true'
    ) {
      return {
        success: true,
        userName: '개발자',
        userBirthDate: '2000-01-01',
        userPhone: '010-1234-5678',
        userCiNumber: 'DEV-CI-001',
      };
    }

    if (!process.env.REACT_APP_STORE_ID || !process.env.REACT_APP_CHANNEL_KEY_AUTH) {
      throw new Error('본인인증 설정값이 없습니다. STORE_ID와 본인인증 채널키를 확인해주세요.');
    }

    const identityVerificationId = `identity-verification-${crypto.randomUUID()}`;
    const response = await PortOne.requestIdentityVerification({
      storeId: process.env.REACT_APP_STORE_ID,
      identityVerificationId,
      channelKey: process.env.REACT_APP_CHANNEL_KEY_AUTH,
      windowType: {
        pc: 'POPUP',
        mobile: 'REDIRECTION',
      },
      redirectUrl: `${window.location.origin}/identity-verification-redirect`,
    });

    if (response.code !== undefined) {
      alert(response.message);
      throw new Error(response.message);
    }

    const data = await apiClient.post<
      IdentityVerifyResponse,
      { identity_verification_id: string }
    >('auth/identity/verify', {
      identity_verification_id: identityVerificationId,
    });

    const userInfo = mapIdentityVerifyResponse(data, identityVerificationId);

    return {
      success: true,
      ...userInfo,
    };
  } catch (error) {
    alert(error instanceof Error ? error.message : '인증에 실패했습니다');
    throw error;
  }
};
