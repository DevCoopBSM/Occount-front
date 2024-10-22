import React, { useState } from 'react';
import * as _ from './style';
import { PaymentCheckoutPage } from 'components/Pg/PaymentCheckout';

const InvestmentModal = ({
  isOpen,
  onRequestClose,
  investmentAmount,
  setInvestmentAmount,
  user,
  increaseAmount,
  decreaseAmount,
}) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const minInvestmentAmount = 10000; // 최소 출자금 금액
  const maxInvestmentAmount = 1000000; // 최대 출자금 금액 (예시)

  const handleInvestmentClick = () => {
    if (!user) {
      alert('로그인 후 이용해 주세요.');
      return;
    }

    if (investmentAmount < minInvestmentAmount) {
      alert(`출자금은 최소 ${minInvestmentAmount.toLocaleString()}원 이상이어야 합니다.`);
    } else if (investmentAmount % 10000 !== 0) {
      alert('출자금은 만 원 단위로 입력해야 합니다.');
    } else if (investmentAmount > maxInvestmentAmount) {
      alert(`출자금은 최대 ${maxInvestmentAmount.toLocaleString()}원을 넘을 수 없습니다.`);
    } else {
      setIsPaymentModalOpen(true);
    }
  };

  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false);
    onRequestClose();
  };

  return (
    <>
      <_.StyledModal isOpen={isOpen} onRequestClose={onRequestClose}>
        <_.ModalHeader>출자금 납부</_.ModalHeader>
        <_.ModalContent>
          <_.HighlightText>
            출자금 납부 금액: <span>{investmentAmount.toLocaleString()}</span>원
          </_.HighlightText>
          <_.ModalList>
            <_.ModalListItem>
              1. 정식 조합원 가입을 위해서는 출자금이 필요합니다.
            </_.ModalListItem>
            <_.ModalListItem>
              2. 출자금은 매점 운영의 초기 비용을 마련하는데 사용됩니다.
            </_.ModalListItem>
            <_.ModalListItem>
              3. 추후 졸업 등의 학적변동 시 환급 또는 기부를 결정할 수 있습니다.
            </_.ModalListItem>
            <_.ModalListItem>
              4. 출자금은 만 원 단위로 납부 가능합니다.
            </_.ModalListItem>
            <_.ModalListItem>
              5. 최소 출자금은 만원입니다.
            </_.ModalListItem>
          </_.ModalList>
          <_.ModalInputWrapper>
            <_.InputGroup>
              <_.DecreaseButton onClick={decreaseAmount}>-</_.DecreaseButton>
              <_.ModalInput
                type="number"
                value={investmentAmount}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  if (!isNaN(value) && value >= minInvestmentAmount && value <= maxInvestmentAmount) {
                    setInvestmentAmount(value);
                  }
                }}
                min={minInvestmentAmount}
                max={maxInvestmentAmount}
                step="10000"
              />
              <_.IncreaseButton onClick={increaseAmount}>+</_.IncreaseButton>
            </_.InputGroup>
          </_.ModalInputWrapper>
        </_.ModalContent>
        <_.ButtonWrapper>
          <_.ModalFooterButton onClick={handleInvestmentClick}>출자금 납부</_.ModalFooterButton>
          <_.ModalFooterButton onClick={onRequestClose}>닫기</_.ModalFooterButton>
        </_.ButtonWrapper>
      </_.StyledModal>

      <_.StyledModal
        isOpen={isPaymentModalOpen}
        onRequestClose={handleClosePaymentModal}
      >
        <PaymentCheckoutPage
          customerEmail={user?.email}
          customerName={user?.name}
          rechargeAmount={investmentAmount}
          onRequestClose={handleClosePaymentModal}
          isInvestment={true}
        />
      </_.StyledModal>
    </>
  );
};

export default InvestmentModal;