import React, { useState, useEffect } from 'react';
import * as _ from './style';
import { Link } from 'react-router-dom';
import { useAuth } from 'context/authContext';
import ChargeModal from './Modals/ChargeModal';

const Main = () => {
  const { isLoggedIn, user, refetchUser } = useAuth();
  const [isChargeModalOpen, setIsChargeModalOpen] = useState(false);
  const [chargeAmount, setChargeAmount] = useState(1000);
  const [formatPoint, setFormatPoint] = useState("");

  useEffect(() => {
    if (user && user.point !== undefined) {
      setFormatPoint(user.point.toLocaleString());
    }
  }, [user]);

  useEffect(() => {
    if (!isChargeModalOpen) {
      refetchUser();
    }
  }, [isChargeModalOpen]);

  const handleOpenChargeModal = () => {
    setIsChargeModalOpen(true);
  };

  const handleCloseChargeModal = () => {
    setIsChargeModalOpen(false);
  };

  const increaseAmount = () => {
    if (chargeAmount + 1000 <= 50000 - user.todayTotalCharge) {
      setChargeAmount(chargeAmount + 1000);
    } else {
      alert('하루 충전 금액은 5만원을 넘을 수 없습니다.');
    }
  };

  const decreaseAmount = () => {
    if (chargeAmount - 1000 >= 1000) {
      setChargeAmount(chargeAmount - 1000);
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
                <_.ChargeButton onClick={handleOpenChargeModal}>
                  충전하기
                </_.ChargeButton>
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
        <Link to="/howto">
          <_.UseBox>
            <div>
              How
              To
              Use?
              <br />
              <p>
                아리페이를 더 똑똑하게
                사용하는 법
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
              인스타로 문의하기
            </a>
          </_.AskInTop>
          <_.CallLogoStyle />
        </_.AskBox>
      </_.Mainbottom>

      <ChargeModal 
        isOpen={isChargeModalOpen} 
        onRequestClose={handleCloseChargeModal}
        chargeAmount={chargeAmount}
        setChargeAmount={setChargeAmount}
        user={user}
        increaseAmount={increaseAmount}
        decreaseAmount={decreaseAmount}
      />
    </>
  );
};

export default Main;
