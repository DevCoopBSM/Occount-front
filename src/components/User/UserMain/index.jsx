import React, { useState, useEffect } from 'react';
import * as _ from './style';
import { useAuth } from 'context/authContext';
import { useUser } from 'hooks/getUserInfo';
import Modal from 'components/Modal';
import { PaymentCheckoutPage } from 'components/Toss/PaymentCheckout';

const Main = () => {
  const { isLoggedIn } = useAuth();
  const { user, refetch } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rechargeAmount, setRechargeAmount] = useState(1000);
  const [isTossModalOpen, setIsTossModalOpen] = useState(false);
  const [formatPoint, setFormatPoint] = useState("");

  useEffect(() => {
    if (user) {
      setFormatPoint(user.point.toLocaleString());
    }
  }, [user]);

  useEffect(() => {
    if (!isTossModalOpen) {
      refetch();
    }
  }, [isTossModalOpen]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenTossModal = () => {
    setIsTossModalOpen(true);
  };

  const handleCloseTossModal = () => {
    setIsTossModalOpen(false);
  };

  const handleRecharge = () => {
    if (rechargeAmount < 1000) {
      alert('충전 금액은 천 원 이상 입력해야 합니다.');
    } else if (rechargeAmount % 1000 !== 0) {
      alert('충전 금액은 천 원 단위로 입력해야 합니다.');
    } else if (rechargeAmount > 50000 - (user?.todayTotalCharge || 0)) {
      alert('하루 충전 금액은 5만원을 넘을 수 없습니다.');
    } else {
      handleCloseModal();
      handleOpenTossModal();
    }
  };
  const increaseAmount = () => {
    if (rechargeAmount + 1000 <= 50000 - user.todayTotalCharge) {
      setRechargeAmount(rechargeAmount + 1000);
    } else {
      alert('하루 충전 금액은 5만원을 넘을 수 없습니다.');
    }
  };
  
  const decreaseAmount = () => {
    if (rechargeAmount - 1000 >= 1000) {
      setRechargeAmount(rechargeAmount - 1000);
    } else {
      alert('충전 금액은 천 원 이상 입력해야 합니다.');
    }
  };

  return (
    <>
      <_.Maintop>
        <_.TopBox>
          <_.MainTopInBox>
            <p style={{ paddingTop: '10px', fontSize: '30px' }}>
              현재 사용 가능한 금액
            </p>
            {isLoggedIn ? (
              <>
                <p style={{ fontSize: '70px' }}>{formatPoint}원</p>
                <_.RechargeButton onClick={handleOpenModal}>
                  충전하기
                </_.RechargeButton>
              </>
            ) : (
              <p style={{ fontSize: '42px' }}>로그인 후 조회 가능합니다</p>
              
            )}
          </_.MainTopInBox>
        </_.TopBox>

        <_.BottomBox>
          <_.Infotext>사용 내역이 궁금하다면?</_.Infotext>
          <_.UserlogLink to="/userlog">보러가기</_.UserlogLink>
        </_.BottomBox>
      </_.Maintop>

      <_.Mainbottom>
        <a
          href="https://www.instagram.com/p/Cxc21Z0Plc5/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA=="
          target="_blank"
        >
          <_.UseBox>
            <div>
              How
              <br />
              To
              <br />
              Use?
              <br />
              <p>
                아리페이를 더 똑똑하게
                <br />
                사용하는 방법
              </p>
            </div>
          </_.UseBox>
        </a>

        <_.AskBox>
          <_.AskInTop>
            <a
              href="https://www.instagram.com/bsm_devcoop/"
              target="_blank"
              rel="noreferrer"
            >
              문의하기
            </a>
          </_.AskInTop>
          <_.CallLogoStyle />
        </_.AskBox>
      </_.Mainbottom>

      <Modal 
        isOpen={isModalOpen} 
        onRequestClose={handleCloseModal}
        style={{ content: { width: '90%', maxWidth: '500px', margin: '0 auto', overflow: 'auto', maxHeight: '90vh' } }}
      >
        <_.ModalHeader>충전하기</_.ModalHeader>
        <_.ModalList>
          <_.ModalListItem> 현재 {(50000 - (user?.todayTotalCharge || 0)).toLocaleString()} 충전가능</_.ModalListItem>
          <_.ModalListItem>1. 아리페이는 매점에서 사용하는 포인트 입니다.</_.ModalListItem>
          <_.ModalListItem>
            2.아리페이의 환불은 충전 후 1주일 이내로 가능하며 충전했던 잔액 이상 <br />
            포인트가 남아있는 경우에 환불을 원하는 결재를 취소하는 방식으로 이뤄집니다.<br />
            (매점에 방문하여 직접 신청)
          </_.ModalListItem>
          <_.ModalListItem>3.아리페이는 1일 최대 5만원까지만 충전이 가능합니다.<br /></_.ModalListItem>
          <_.ModalListItem>
            4.아리페이의 환전, 조합원간 양도 및 교환은 불가능하며, 소유자 본인이 직접  <br />
            식품, 잡화 등 매점에서 판매하는 물품을 구매하는 용도로 사용해야합니다.<br />
          </_.ModalListItem>
          <_.ModalListItem>
            5.아리페이의 유지기간은 충전한 시점부터 조합원 자격을 유지하는 동안 모두 소진하기 전까지이며<br />
            탈퇴 및 졸업 등으로 조합원 자격 상실시에는 환불 사유에 해당하는 내용 이외에는 소멸됩니다.<br />
            (최대 3년)
          </_.ModalListItem>
        </_.ModalList>
        <_.InputWrapper>
        <_.ModalInput 
          type="number" 
          value={rechargeAmount} 
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            if (value >= 1000 && value <= 50000 - user.todayTotalCharge && value % 1000 === 0) {
              setRechargeAmount(value);
            } else if (value < 1000) {
              alert('충전 금액은 천 원 이상 입력해야 합니다.');
            } else if (value > 50000 - user.todayTotalCharge) {
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
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <_.ModalFooterButton onClick={handleRecharge}>
            결재진행
          </_.ModalFooterButton>
          <_.ModalFooterButton onClick={handleCloseModal}>
            닫기
          </_.ModalFooterButton>
        </div>
      </Modal>
      
      {user ? (
        <Modal 
          isOpen={isTossModalOpen}
          onRequestClose={handleCloseTossModal}
          style={{ content: { width: '100%', maxWidth: '800px', margin: '0 auto', overflow: 'auto', maxHeight: '100vh' } }}
        >
          <PaymentCheckoutPage customerEmail={user.email} customerName={user.name} rechargeAmount={rechargeAmount} todayTotalCharge={user.todayTotalCharge} />
          <_.ModalFooterButton onClick={handleCloseTossModal} style={{ fontSize: '20px', padding: '10px 20px', marginTop: '20px' }}>
            닫기
          </_.ModalFooterButton>
        </Modal>
      ) : ("")}
    </>
  );
};

export default Main;
