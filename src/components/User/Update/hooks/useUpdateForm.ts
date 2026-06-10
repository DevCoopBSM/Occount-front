import { useState, type FormEvent } from 'react';
import axios from 'axios';
import axiosInstance from 'utils/Axios';
import { UPDATE_MESSAGES } from '../constants/messages';
import type { UserInfo } from '../types';
import { useUserInfo } from './useUserInfo';
import { usePasswordChange } from './usePasswordChange';
import { usePinChange } from './usePinChange';
import { useAddressUpdate } from './useAddressUpdate';
import { useInvestment } from './useInvestment';

interface UserUpdatePayload {
  username: string;
  phone: string;
  user_type: UserInfo['user_type'];
  birth_date: string;
  cooperative_number: string | null;
  userAddress?: string;
}

export const useUpdateForm = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [isSuccessMessageVisible, setIsSuccessMessageVisible] = useState(false);

  const { userInfo, handlePhoneChange, error: fetchError, refetchUserInfo } = useUserInfo();
  const passwordChange = usePasswordChange();
  const pinChange = usePinChange();
  const addressUpdate = useAddressUpdate();
  const investment = useInvestment();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const updateData: UserUpdatePayload = {
        username: userInfo.username,
        phone: userInfo.phone,
        user_type: userInfo.user_type,
        birth_date: userInfo.birth_date,
        cooperative_number: userInfo.cooperative_number,
      };

      if (addressUpdate.addressDetail) {
        updateData.userAddress = `${addressUpdate.address} ${addressUpdate.addressDetail}`.trim();
      }

      await axiosInstance.put('/account/user/update', updateData);

      setSuccessMessage(UPDATE_MESSAGES.UPDATE.SUCCESS);
      setIsSuccessMessageVisible(true);
      setTimeout(() => {
        setIsSuccessMessageVisible(false);
        setSuccessMessage('');
      }, 3000);

      await refetchUserInfo();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setSuccessMessage(error.response.data.message || UPDATE_MESSAGES.UPDATE.ERROR);
      } else {
        setSuccessMessage(UPDATE_MESSAGES.UPDATE.ERROR);
      }
      setIsSuccessMessageVisible(true);
    }
  };

  return {
    userInfo,
    handlePhoneChange,
    fetchError,
    successMessage,
    isSuccessMessageVisible,
    passwordChange,
    pinChange,
    addressUpdate,
    investment,
    handleSubmit,
  };
};
