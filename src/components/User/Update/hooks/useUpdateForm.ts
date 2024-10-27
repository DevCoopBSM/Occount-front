import { useState } from 'react';
import axios from 'axios';
import axiosInstance from 'utils/Axios';
import { UPDATE_MESSAGES } from '../constants/messages';
import { useUserInfo } from './useUserInfo';
import { useVerification } from './useVerification';
import { usePasswordUpdate } from './usePasswordUpdate';
import { usePinUpdate } from './usePinUpdate';
import { useAddressUpdate } from './useAddressUpdate';
import { useInvestment } from './useInvestment';
import { UpdateFormReturn } from '../types';

export const useUpdateForm = (): UpdateFormReturn => {
    const [successMessage, setSuccessMessage] = useState('');
    const [isSuccessMessageVisible, setIsSuccessMessageVisible] = useState(false);

    const { userInfo, error: fetchError, refetchUserInfo } = useUserInfo();
    const verification = useVerification();
    const passwordUpdate = usePasswordUpdate();
    const pinUpdate = usePinUpdate();
    const addressUpdate = useAddressUpdate();
    const investment = useInvestment();

    // 폼 제출 처리
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            const updateData: any = { ...userInfo };
            
            if (addressUpdate.addressDetail) {
                updateData.userAddress = `${addressUpdate.address} ${addressUpdate.addressDetail}`.trim();
            }
            
            if (passwordUpdate.isPasswordChangeMode) {
                if (!verification.isVerified) {
                    throw new Error(UPDATE_MESSAGES.VERIFY.REQUIRED);
                }
                updateData.newPassword = passwordUpdate.passwordForm.newPassword;
                updateData.temporaryToken = verification.temporaryToken;
            }
            
            if (pinUpdate.isPinChangeMode) {
                if (!verification.isVerified) {
                    throw new Error(UPDATE_MESSAGES.VERIFY.REQUIRED);
                }
                updateData.newPin = pinUpdate.pinForm.newPin;
                updateData.temporaryToken = verification.temporaryToken;
            }
            
            await axiosInstance.put('/v2/account/update', updateData);
            
            setSuccessMessage(UPDATE_MESSAGES.UPDATE.SUCCESS);
            setIsSuccessMessageVisible(true);
            
            setTimeout(() => {
                setIsSuccessMessageVisible(false);
                setSuccessMessage('');
            }, 3000);
            
            passwordUpdate.setIsPasswordChangeMode(false);
            pinUpdate.setIsPinChangeMode(false);
            await refetchUserInfo();
            
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setSuccessMessage(error.response.data.message || UPDATE_MESSAGES.UPDATE.ERROR);
            } else if (error instanceof Error) {
                setSuccessMessage(error.message);
            } else {
                setSuccessMessage(UPDATE_MESSAGES.UPDATE.ERROR);
            }
            setIsSuccessMessageVisible(true);
        }
    };

    return {
        formData: {
            userInfo,
            currentPassword: verification.currentPassword,
            passwordForm: passwordUpdate.passwordForm,
            pinForm: pinUpdate.pinForm,
            addressDetail: addressUpdate.addressDetail,
            investmentAmount: investment.investmentAmount,
            maxInvestmentAmount: investment.maxInvestmentAmount
        },
        status: {
            isVerified: verification.isVerified,
            isPasswordChangeMode: passwordUpdate.isPasswordChangeMode,
            isPinChangeMode: pinUpdate.isPinChangeMode,
            isAddressSearched: addressUpdate.isAddressSearched,
            isInvestmentModalOpen: investment.isInvestmentModalOpen,
            isScriptLoaded: addressUpdate.isScriptLoaded,
            isSuccessMessageVisible
        },
        messages: {
            fetchError,
            verificationError: verification.verificationError,
            successMessage,
            passwordWarnings: passwordUpdate.passwordWarnings,
            pinWarnings: pinUpdate.pinWarnings
        },
        handlers: {
            handleVerify: verification.handleVerify,
            handleSubmit,
            handlePasswordChange: passwordUpdate.handlePasswordChange,
            handleConfirmPasswordChange: passwordUpdate.handleConfirmPasswordChange,
            handlePinChange: pinUpdate.handlePinChange,
            handleConfirmPinChange: pinUpdate.handleConfirmPinChange,
            handleAddressDetailChange: addressUpdate.handleAddressDetailChange,
            openAddressSearch: addressUpdate.openAddressSearch,
            handleOpenInvestmentModal: investment.handleOpenInvestmentModal,
            handleCloseInvestmentModal: investment.handleCloseInvestmentModal,
            increaseAmount: investment.increaseAmount,
            decreaseAmount: investment.decreaseAmount
        },
        setters: {
            setCurrentPassword: verification.setCurrentPassword,
            setIsPasswordChangeMode: passwordUpdate.setIsPasswordChangeMode,
            setIsPinChangeMode: pinUpdate.setIsPinChangeMode,
            setInvestmentAmount: investment.setInvestmentAmount
        }
    };
};