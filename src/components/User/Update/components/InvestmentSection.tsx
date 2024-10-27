import React from 'react';
import * as S from '../style';
import { FaMoneyBillWave } from 'react-icons/fa';
import { UserInfo } from '../types';

interface InvestmentSectionProps {
    userInfo: UserInfo;
    maxInvestmentAmount: number;
    handleOpenInvestmentModal: () => void;
}

export const InvestmentSection: React.FC<InvestmentSectionProps> = ({
    userInfo,
    maxInvestmentAmount,
    handleOpenInvestmentModal
}) => {
    return (
        <S.InputContainer>
            <S.InputLabel>출자금</S.InputLabel>
            <S.InvestmentContainer>
                <S.InvestmentInput
                    type="text"
                    value={`${userInfo.investmentAmount}원`}
                    disabled
                />
                <S.InvestmentButton 
                    type="button" 
                    onClick={handleOpenInvestmentModal}
                    disabled={maxInvestmentAmount <= 0}
                >
                    <FaMoneyBillWave />
                    출자금 납부
                </S.InvestmentButton>
            </S.InvestmentContainer>
        </S.InputContainer>
    );
};