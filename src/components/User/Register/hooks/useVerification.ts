import { useState } from 'react';
import { UserInfo } from '../types';
import { verifyUser } from '../utils/verification';

export const useVerification = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const handleVerification = async () => {
    try {
      const result = await verifyUser();
      if (result.success) {
        setIsVerified(true);
        setUserInfo({
          userName: result.userName,
          userBirthDate: result.userBirthDate,
          userPhone: result.userPhone,
          userCiNumber: result.userCiNumber
        });
        alert("본인인증이 완료되었습니다.");
      }
    } catch (error) {
      console.error("Verification error:", error);
      alert("본인인증에 실패했습니다.");
    }
  };

  const resetVerification = () => {
    setIsVerified(false);
    setUserInfo(null);
  };

  return {
    isVerified,
    userInfo,
    handleVerification,
    resetVerification
  };
};