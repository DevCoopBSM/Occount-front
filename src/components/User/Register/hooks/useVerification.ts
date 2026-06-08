import { useState } from 'react';
import { UserInfo } from '../types';
import { verifyUser } from '../utils/verification';

export const useVerification = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState('');
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const handleVerification = async () => {
    if (isVerifying) return;

    setIsVerifying(true);
    setVerificationError('');
    try {
      const result = await verifyUser();
      if (result.success) {
        setIsVerified(true);
        setUserInfo({
          userName: result.userName,
          userBirthDate: result.userBirthDate,
          userPhone: result.userPhone,
          userCiNumber: result.userCiNumber,
        });
      }
    } catch (error) {
      console.error('Verification error:', error);
      setVerificationError('본인인증에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsVerifying(false);
    }
  };

  const resetVerification = () => {
    setIsVerified(false);
    setVerificationError('');
    setUserInfo(null);
  };

  return {
    isVerified,
    isVerifying,
    verificationError,
    userInfo,
    handleVerification,
    resetVerification,
  };
};
