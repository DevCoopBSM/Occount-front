import React, { useState, useEffect } from 'react';
import Modal from 'components/Modal';
import * as _ from './style';
import { PaymentCheckoutPage } from 'components/Pg/PaymentCheckout';

const ChargeModal = ({
  isOpen,
  onRequestClose,
  chargeAmount,
  setChargeAmount,
  user,
  increaseAmount,
  decreaseAmount,
}) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [modalStyle, setModalStyle] = useState({});

  useEffect(() => {
    const updateModalStyle = () => {
      const width = window.innerWidth;
      if (width <= 480) {
        setModalStyle({
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '95%',
            maxWidth: '95%',
            padding: '15px',
            maxHeight: '80vh',
            overflow: 'auto',
          },
        });
      } else {
        setModalStyle({
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: '500px',
            padding: '20px',
            maxHeight: '90vh',
            overflow: 'auto',
          },
        });
      }
    };

    updateModalStyle();
    window.addEventListener('resize', updateModalStyle);
    return () => window.removeEventListener('resize', updateModalStyle);
  }, []);

  const handleChargeClick = () => {
    if (!user) {
      alert('로그인 후 이용해 주세요.');
      return;
    }

    if (chargeAmount < 1000) {
      alert('충전 금액은 천 원 이상 입력해야 합니다.');
    } else if (chargeAmount % 1000 !== 0) {
      alert('충전 금액은 천 원 단위로 입력해야 합니다.');
    } else if (chargeAmount > 50000 - (user.todayTotalCharge || 0)) {
      alert('하루 충전 금액은 5만원을 넘을 수 없습니다.');
    } else {
      setIsPaymentModalOpen(true);
    }
  };

  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false);
    onRequestClose(); // 부모 모달도 닫기
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={modalStyle}
      >
        <_.ModalHeader>충전하기</_.ModalHeader>
        <_.HighlightText>
          현재 {(50000 - (user?.todayTotalCharge || 0)).toLocaleString()}원 충전
          가능
        </_.HighlightText>
        <_.ModalList>
          <_.ModalListItem>
            1. 아리페이란 공간 아리소리(이하 매점)에서 사용하는 포인트입니다.
          </_.ModalListItem>
          <_.ModalListItem>
            2. 아리페이 충전에 대한 환불은 다음 조건을 모두 충족해야 가능합니다.
            <br />
            2.1-환불하고자 하는 충전 금액 이상 포인트를 보유함
            <br />
            2.2-충전이 이뤄진 시점으로부터 7일 이내에 환불 신청을 함
          </_.ModalListItem>
          <_.ModalListItem>
            3. 아리페이의 일일 충전 한도는 5만원입니다.
          </_.ModalListItem>
          <_.ModalListItem>
            4. 아리페이는 환전, 조합원 간 양도 및 교환이 불가하며,
            <br />
            소유자가 직접 식품, 잡화 등 매점에서 판매하는 물품을 구매하는
            용도로만 사용해야 합니다.
          </_.ModalListItem>
          <_.ModalListItem>
            5. 아리페이의 유지 기간은 충전한 시점부터 조합원 자격을 유지하는
            동안 모두 소진하기 전까지이며 (최대 3년),
            <br />
            조합 탈퇴 및 졸업 등으로 조합원 자격 상실 시 포인트는 전액
            소멸됩니다.
          </_.ModalListItem>
        </_.ModalList>
        <_.InputWrapper>
          <_.ModalInput
            type="number"
            value={chargeAmount}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              if (
                value >= 1000 &&
                value <= 50000 - (user?.todayTotalCharge || 0) &&
                value % 1000 === 0
              ) {
                setChargeAmount(value);
              } else if (value < 1000) {
                alert('충전 금액은 천 원 이상 입력해야 합니다.');
              } else if (value > 50000 - (user?.todayTotalCharge || 0)) {
                alert('하루 충전 금액은 5만원을 넘을 수 없습니다.');
              } else if (value % 1000 !== 0) {
                alert('충전 금액은 천 원 단위로 입력해야 합니다.');
              }
            }}
            placeholder="충전 금액 (천 원 단위)"
            step="1000"
            min="1000"
            max={50000 - (user?.todayTotalCharge || 0)}
          />
          <_.IncreaseButton onClick={increaseAmount}>▲</_.IncreaseButton>
          <_.DecreaseButton onClick={decreaseAmount}>▼</_.DecreaseButton>
        </_.InputWrapper>
        <_.ButtonWrapper>
          <_.ModalFooterButton onClick={handleChargeClick}>
            결제진행
          </_.ModalFooterButton>
          <_.ModalFooterButton onClick={onRequestClose}>
            닫기
          </_.ModalFooterButton>
        </_.ButtonWrapper>
      </Modal>

      <Modal
        isOpen={isPaymentModalOpen}
        onRequestClose={handleClosePaymentModal}
        style={modalStyle}
      >
        <PaymentCheckoutPage
          customerEmail={user?.email}
          customerName={user?.name}
          rechargeAmount={chargeAmount}
          onRequestClose={handleClosePaymentModal}
        />
      </Modal>
    </>
  );
};

export default ChargeModal;
