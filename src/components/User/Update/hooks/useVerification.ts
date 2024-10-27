import { useState } from 'react';
import axiosInstance from 'utils/Axios';
import { UPDATE_MESSAGES } from '../constants/messages';

export const useVerification = () => {
    const [isVerified, setIsVerified] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [verificationError, setVerificationError] = useState('');
    const [temporaryToken, setTemporaryToken] = useState('');

    const handleVerify = async (): Promise<void> => {
        try {
            const response = await axiosInstance.post('/v2/account/verify', {
                userPassword: currentPassword,
            });
            
            if (response.data.success) {
                setIsVerified(true);
                setTemporaryToken(response.data.token);
                setVerificationError('');
            } else {
                setVerificationError(UPDATE_MESSAGES.VERIFY.FAIL);
            }
        } catch {
            setVerificationError(UPDATE_MESSAGES.VERIFY.ERROR);
        }
    };

    return {
        isVerified,
        currentPassword,
        setCurrentPassword,
        verificationError,
        temporaryToken,
        handleVerify
    };
};
