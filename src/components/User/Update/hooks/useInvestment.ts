import { useState } from 'react';
import { useAuth } from 'contexts/authContext';
import { InvestmentState } from '../types';

export const useInvestment = (): InvestmentState => {
    const { user, refetchUser } = useAuth();
    const [isInvestmentModalOpen, setIsInvestmentModalOpen] = useState(false);
    const [investmentAmount, setInvestmentAmount] = useState(10000);

    const maxInvestmentAmount = 50000 - (user?.todayTotalPayment || 0);

    const increaseAmount = () => {
        setInvestmentAmount(prev => {
            const newAmount = prev + 10000;
            return Math.min(newAmount, maxInvestmentAmount, 50000);
        });
    };

    const decreaseAmount = () => {
        setInvestmentAmount(prev => Math.max(prev - 10000, 10000));
    };

    const handleOpenInvestmentModal = () => {
        setIsInvestmentModalOpen(true);
    };

    const handleCloseInvestmentModal = () => {
        setIsInvestmentModalOpen(false);
        refetchUser();
    };

    return {
        isInvestmentModalOpen,
        investmentAmount,
        maxInvestmentAmount,
        setInvestmentAmount,
        increaseAmount,
        decreaseAmount,
        handleOpenInvestmentModal,
        handleCloseInvestmentModal
    };
};