import React, { useState, useEffect } from 'react';
import * as _ from './style';
import { Link } from 'react-router-dom';
import { useAuth } from 'context/authContext';
import * as G from "../../../common/GlobalStyle"
import ChargeModal from './Modals/ChargeModal';
import { ReactComponent as How2Use } from 'assets/How2useBT.svg';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const { isLoggedIn, user, refetchUser } = useAuth();
  const [isChargeModalOpen, setIsChargeModalOpen] = useState(false);
  const [chargeAmount, setChargeAmount] = useState(1000);
  const [formatPoint, setFormatPoint] = useState('');
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

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
            
            {isLoggedIn ? (
              <>

                <_.TopBoxText>현재 사용 가능한 금액</_.TopBoxText>
                <_.TopBoxText2>{formatPoint}원</_.TopBoxText2>
                
                <_.ChargeButton onClick={handleOpenChargeModal}>
                  충전하기
                </_.ChargeButton>
              </>
            ) : (
              <>

              <p style={{ fontSize: '42px' }}>  <br/>
              <p style={{ paddingTop: '10px', fontSize: '24px', fontWeight: '400' }}>현재 사용 가능한 금액 </p>

              로그인 후 조회 가능합니다</p>
              </>
            )}
          </_.MainTopInBox>
        </_.TopBox>

        <_.BottomBox>
          <_.UserlogLink to="/userlog">거래 내역 및 충전 환불</_.UserlogLink>
        </_.BottomBox>
      </_.Maintop>

      <_.Mainbottom>
        <Link to="/howto">
          <_.UseBox>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
              <How2Use
                width={'90%'}
                height={'120px'}
                style={{ marginTop: '10px' }}
              />
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
              <p style={{ fontSize: '24px', fontWeight: '400' }}>아리페이 사용 중 문제가 발생했다면?</p>
              인스타로 문의하기
            </a>
          </_.AskInTop>
          <_.CallLogoStyle />
        </_.AskBox>
      </_.Mainbottom>

      <G.Footer>
        <G.FooterText>
          상호: 부산소마고 사회적협동조합
          대표: 김민경(이사장)
          사업자 등록번호: 214-82-16238<br/>
          주소: 부산광역시 강서구 가락대로 1393 부산소프트웨어마이스터고 융합관 공간-아리소리<br/>
          전화번호: 051-970-1709<br/>
          INSTA | GITHUB
        </G.FooterText>
      </G.Footer>

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
