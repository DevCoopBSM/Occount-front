import { useState, useEffect } from 'react';
import axiosInstance from 'utils/Axios';
import { UserInfo, UserType, Role } from '../types';
import { UPDATE_MESSAGES } from '../constants/messages';

export const useUserInfo = () => {
    const [userInfo, setUserInfo] = useState<UserInfo>({
        userName: '',
        userEmail: '',
        userPassword: '',
        userAddress: '',
        userPin: '',
        userType: UserType.STUDENT,
        role: Role.ROLE_USER,
        userPhone: '',
        userBirthDate: '',
        investmentAmount: 0
    });
    const [error, setError] = useState('');

    const fetchUserInfo = async () => {
        try {
            const response = await axiosInstance.get('/v2/account/user/info');
            setUserInfo(response.data);
            setError('');
        } catch {
            setError(UPDATE_MESSAGES.FETCH.ERROR);
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    return { userInfo, setUserInfo, error, refetchUserInfo: fetchUserInfo };
};