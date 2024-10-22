import React, { useState } from 'react';
import * as _ from './style';
import { PaymentCheckoutPage } from 'components/Pg/PaymentCheckout';

interface User {
  email: string;
  name: string;
  phone?: string;
  todayTotalCharge?: number;
}

interface ChargeModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  chargeAmount: number;
  setChargeAmount: (amount: number) => void;
  increaseAmount: () => void;
  decreaseAmount: () => void;
  user: User | null;
}

const ChargeModal: React.FC<ChargeModalProps> = ({
  isOpen,
  onRequestClose,
  chargeAmount,
  setChargeAmount,
  increaseAmount,
  decreaseAmount,
  user,
}) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const maxChargeAmount: number = 50000 - (user?.todayTotalCharge || 0);

  const handleChargeClick = (): void => {
    if (!user) {
      alert('로그인 후 이용해 주세요.');
      return;
    }

    if (chargeAmount < 1000) {
      alert('충전 금액은 천 원 이상 입력해야 합니다.');
    } else if (chargeAmount % 1000 !== 0) {
      alert('충전 금액은 천 원 단위로 입력해야 합니다.');
    } else if (chargeAmount > maxChargeAmount) {
      alert('하루 충전 금액은 5만원을 넘을 수 없습니다.');
    } else {
      setIsPaymentModalOpen(true);
    }
  };

  const handleClosePaymentModal = (): void => {
    setIsPaymentModalOpen(false);
    onRequestClose();
  };

  return (
    <>
      <_.StyledModal isOpen={isOpen} onRequestClose={onRequestClose}>
        <_.ModalHeader>충전하기</_.ModalHeader>
        <_.ModalContent>
          <_.HighlightText>
            현재 <span>{maxChargeAmount.toLocaleString()}</span>원 충전 가능
          </_.HighlightText>
          <_.ModalList>
            <_.ModalListItem>
              1. 아리페이란 공간 아리소리(이하 매점)에서 사용하는 포인트입니다.
            </_.ModalListItem>
            <_.ModalListItem>
              2. 아리페이 충전에 대한 환불은 다음 조건을 모두 충족해야 가능합니다.
              <_.SubList>
                <_.SubListItem>2.1 환불하고자 하는 충전 금액 이상 포인트를 보유함</_.SubListItem>
                <_.SubListItem>2.2 충전이 이뤄진 시점으로부터 7일 이내에 환불 신청을 함</_.SubListItem>
              </_.SubList>
            </_.ModalListItem>
            <_.ModalListItem>
              3. 아리페이의 일일 충전 한도는 5만원입니다.
            </_.ModalListItem>
            <_.ModalListItem>
              4. 아리페이는 환전, 조합원 간 양도 및 교환이 불가하며, 소유자가 직접 식품, 잡화 등 매점에서 판매하는 물품을 구매하는 용도로만 사용해야 합니다.
            </_.ModalListItem>
            <_.ModalListItem>
              5. 아리페이의 유지 기간은 충전한 시점부터 조합원 자격을 유지하는 동안 모두 소진하기 전까지이며 (최대 3년), 조합 탈퇴 및 졸업 등으로 조합원 자격 상실 시 포인트는 전액 소멸됩니다.
            </_.ModalListItem>
          </_.ModalList>
          <_.ModalInputWrapper>
            <_.InputGroup>
              <_.DecreaseButton onClick={decreaseAmount}>-</_.DecreaseButton>
              <_.ModalInput
                type="number"
                value={chargeAmount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = parseInt(e.target.value, 10);
                  if (!isNaN(value) && value >= 0 && value <= maxChargeAmount) {
                    setChargeAmount(value);
                  }
                }}
                min="1000"
                max={maxChargeAmount}
                step="1000"
              />
              <_.IncreaseButton onClick={increaseAmount}>+</_.IncreaseButton>
            </_.InputGroup>
          </_.ModalInputWrapper>
        </_.ModalContent>
        <_.ButtonWrapper>
          <_.ModalFooterButton onClick={handleChargeClick}>결제진행</_.ModalFooterButton>
          <_.ModalFooterButton onClick={onRequestClose}>닫기</_.ModalFooterButton>
        </_.ButtonWrapper>
      </_.StyledModal>

      <_.StyledModal
        isOpen={isPaymentModalOpen}
        onRequestClose={handleClosePaymentModal}
      >
        {user && (
          <PaymentCheckoutPage
            customerEmail={user.email}
            customerName={user.name}
            customerPhone={user.phone || ''}
            rechargeAmount={chargeAmount}
            onRequestClose={handleClosePaymentModal}
            paymentType="aripay"
          />
        )}
      </_.StyledModal>
    </>
  );
};

export default ChargeModal;
