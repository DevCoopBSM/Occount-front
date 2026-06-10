import { useState, useEffect, type ChangeEvent } from 'react';
import axiosInstance from 'utils/Axios';
import { UserInfo } from '../types';
import { UPDATE_MESSAGES } from '../constants/messages';

export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    username: '',
    email: '',
    phone: '',
    user_type: 'STUDENT',
    role: 'ROLE_USER',
    birth_date: '',
    cooperative_number: null,
    // v3 미제공 - 추후 API 추가 요청 예정
    userAddress: '',
    investmentAmount: 0,
  });
  const [error, setError] = useState('');

  const fetchUserInfo = async () => {
    try {
      const response = await axiosInstance.get('/users/me');
      setUserInfo((prev) => ({
        ...prev,
        ...response.data,
      }));
      setError('');
    } catch {
      setError(UPDATE_MESSAGES.FETCH.ERROR);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInfo((prev) => ({ ...prev, phone: e.target.value }));
  };

  return { userInfo, setUserInfo, handlePhoneChange, error, refetchUserInfo: fetchUserInfo };
};
