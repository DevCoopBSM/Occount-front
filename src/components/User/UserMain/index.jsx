import React, { useState, useEffect } from 'react';
import * as _ from './style';
import { useAuth } from 'context/authContext';
import RechargeModal from './Modals/RechargeModal';
import TossModal from './Modals/TossModal';

const Main = () => {
  const { isLoggedIn, user, refetchUser } = useAuth();  // user 정보를 가져옵니다.
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
      refetchUser(); // Toss 모달이 닫힐 때 사용자 정보를 다시 가져옵니다.
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
          <_.UserlogLink to="/userlog">
            거래 내역 및 충전 환불
          </_.UserlogLink>
        </_.BottomBox>
      </_.Maintop>

      <_.Mainbottom>
        <Link to ="/howto">
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
        </Link>

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

      <RechargeModal 
        isOpen={isModalOpen} 
        onRequestClose={handleCloseModal}
        rechargeAmount={rechargeAmount}
        setRechargeAmount={setRechargeAmount}
        user={user}
        handleRecharge={handleRecharge}
        increaseAmount={increaseAmount}
        decreaseAmount={decreaseAmount}
      />
      
      {user && (
        <TossModal 
          isOpen={isTossModalOpen}
          onRequestClose={handleCloseTossModal}
          user={user}
          rechargeAmount={rechargeAmount}
        />
      )}
    </>
  );
};

export default Main;
