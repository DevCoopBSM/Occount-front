import React, { useState } from 'react';
import * as _ from './style';
import { PaymentCheckoutPage } from '../PaymentCheckout';

interface User {
  email: string;
  name: string;
  phone?: string;
  todayTotalPayment?: number;  // 오늘 총 결제액 (충전 + 출자금)
}

interface PaymentModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  user: User | null;
  type: 'charge' | 'investment';
  maxAmount: number;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onRequestClose,
  user,
  type,
  maxAmount,
}) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(type === 'charge' ? 1000 : 10000); // 초기 금액 설정
  const minAmount = type === 'charge' ? 1000 : 10000;
  const step = type === 'charge' ? 1000 : 10000;

  // 하루 최대 결제 가능 금액 계산
  const dailyMaxAmount = 50000 - (user?.todayTotalPayment || 0);
  // 실제 최대 결제 가능 금액 (maxAmount와 dailyMaxAmount 중 작은 값)
  const actualMaxAmount = Math.min(maxAmount, dailyMaxAmount);

  const handleClosePaymentModal = (): void => {
    setIsPaymentModalOpen(false);
    // 결제 모달만 닫고 충전하기 모달은 닫지 않음
  };

  const handlePaymentClick = (): void => {
    if (!user) {
      alert('로그인 후 이용해 주세요.');
      return;
    }

    if (amount < minAmount) {
      alert(`${type === 'charge' ? '충전' : '출자금'}은 ${minAmount.toLocaleString()}원 이상이어야 합니다.`);
    } else if (amount % step !== 0) {
      alert(`${type === 'charge' ? '충전 금액' : '출자금'}은 ${type === 'charge' ? '천 원' : '만 원'} 단위로 입력해야 합니다.`);
    } else if (amount > actualMaxAmount) {
      if (dailyMaxAmount <= 0) {
        alert('오늘 더 이상 결제할 수 없습니다. 하루 최대 결제 한도는 5만원입니다.');
      } else {
        alert(`현재 결제 가능한 최대 금액은 ${actualMaxAmount.toLocaleString()}원입니다.`);
      }
    } else {
      // 기존 모달을 닫고 결제 확인 모달 열기
      onRequestClose();
      setIsPaymentModalOpen(true);
    }
  };

  const increaseAmount = () => {
    setAmount(prevAmount => Math.min(prevAmount + step, actualMaxAmount));
  };

  const decreaseAmount = () => {
    setAmount(prevAmount => Math.max(prevAmount - step, minAmount));
  };

  const getModalContent = () => {
    if (type === 'charge') {
      return {
        title: '충전하기',
        highlightText: `현재 ${actualMaxAmount.toLocaleString()}원 충전 가능`,
        listItems: [
          '1. 아리페이란 공간 아리소리(이하 매점)에서 사용하는 포인트입니다.',
          {
            main: '2. 아리페이 충전에 대한 환불은 다음 조건을 모두 충족해야 가능합니다.',
            sub: [
              '2.1 환불하고자 하는 충전 금액 이상 포인트를 보유함',
              '2.2 충전이 이뤄진 시점으로부터 7일 이내에 환불 신청을 함'
            ]
          },
          '3. 아리페이의 일일 충전 한도는 5만원입니다.',
          '4. 아리페이는 환전, 조합원 간 양도 및 교환이 불가하며, 소유자가 직접 식품, 잡화 등 매점에서 판매하는 물품을 구매하는 용도로만 사용해야 합니다.',
          '5. 아리페이의 유지 기간은 충전한 시점부터 조합원 자격을 유지하는 동안 모두 소진하기 전까지이며 (최대 3년), 조합 탈퇴 및 졸업 등으로 조합원 자격 상실 시 포인트는 전액 소멸됩니다.'
        ]
      };
    } else {
      return {
        title: '출자금 납부',
        highlightText: `출자금 납부 가능 금액: ${actualMaxAmount.toLocaleString()}원`,
        listItems: [
          '1. 정식 조합원 가입을 위해서는 출자금이 필요합니다.',
          '2. 출자금은 매점 운영의 초기 비용을 마련하는데 사용됩니다.',
          '3. 추후 졸업 등의 학적변동 시 환급 또는 기부를 결정할 수 있습니다.',
          '4. 출자금은 만 원 단위로 납부 가능합니다.',
          '5. 최소 출자금은 만원입니다.'
        ]
      };
    }
  };

  return (
    <>
      <_.StyledModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
      >
        <_.CloseButton onClick={onRequestClose} aria-label="닫기">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </_.CloseButton>
        
        <_.ModalHeader>{type === 'charge' ? '아리페이 충전하기' : '출자금 납부'}</_.ModalHeader>
        
        <_.ModalContent>
          <_.HighlightText>
            <_.InfoIcon>
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#F49E15" strokeWidth="1.5" />
                <path d="M12 8V12M12 16H12.01" stroke="#F49E15" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </_.InfoIcon>
            <span>{getModalContent().highlightText}</span>
          </_.HighlightText>
          
          <_.ModalList>
            {getModalContent().listItems.map((item, index) => (
              typeof item === 'string' ? (
                <_.ModalListItem key={index}>{item}</_.ModalListItem>
              ) : (
                <_.ModalListItem key={index} className="has-sub-items">
                  <div>{item.main}</div>
                  <_.SubList>
                    {item.sub.map((subItem, subIndex) => (
                      <_.SubListItem key={subIndex}>{subItem}</_.SubListItem>
                    ))}
                  </_.SubList>
                </_.ModalListItem>
              )
            ))}
          </_.ModalList>
          
          <_.ModalInputWrapper>
            <_.InputGroup>
              <_.DecreaseButton onClick={decreaseAmount} aria-label="금액 감소">
                <svg viewBox="0 0 24 24" fill="#111111">
                  <path d="M5 12H19" stroke="#111111" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </_.DecreaseButton>
              <_.ModalInput
                type="number"
                value={amount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = parseInt(e.target.value, 10);
                  if (!isNaN(value) && value >= minAmount && value <= actualMaxAmount) {
                    setAmount(value);
                  }
                }}
                min={minAmount}
                max={actualMaxAmount}
                step={step}
              />
              <_.IncreaseButton onClick={increaseAmount} aria-label="금액 증가">
                <svg viewBox="0 0 24 24" fill="#111111">
                  <path d="M12 5V19M5 12H19" stroke="#111111" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </_.IncreaseButton>
            </_.InputGroup>
          </_.ModalInputWrapper>
        </_.ModalContent>
        
        <_.ButtonWrapper>
          <_.CancelButton onClick={onRequestClose}>
            취소
          </_.CancelButton>
          <_.ConfirmButton onClick={handlePaymentClick}>
            {type === 'charge' ? '결제진행' : '출자금 납부'}
          </_.ConfirmButton>
        </_.ButtonWrapper>
      </_.StyledModal>

      {isPaymentModalOpen && user && (
        <PaymentCheckoutPage
          customerEmail={user.email}
          customerName={user.name}
          customerPhone={user.phone || ''}
          rechargeAmount={amount}
          onRequestClose={handleClosePaymentModal}
          paymentType={type === 'charge' ? 'aripay' : 'investment'}
        />
      )}
    </>
  );
};

export default PaymentModal;
