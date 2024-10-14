import React, { useState, useEffect, useCallback } from 'react';
import * as _ from './style';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from 'contexts/authContext';
import ChargeModal from './ChargeModal';
import How2Use from 'assets/How2useBT.svg';
import InquiryModal from './InquiryModal';
import PersonCountDisplay from './PersonCountDisplay'; // 이 줄을 추가하세요

interface User {
  point: number;
  todayTotalCharge: number;
}

const Main: React.FC = () => {
  const { isLoggedIn, user, refetchUser } = useAuth();
  const [isChargeModalOpen, setIsChargeModalOpen] = useState<boolean>(false);
  const [chargeAmount, setChargeAmount] = useState<number>(1000);
  const [formatPoint, setFormatPoint] = useState<string>('');
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.point !== undefined) {
      setFormatPoint(user.point.toLocaleString());
    }
  }, [user]);

  const handleOpenChargeModal = useCallback((): void => {
    setIsChargeModalOpen(true);
  }, []);

  const handleCloseChargeModal = useCallback((): void => {
    setIsChargeModalOpen(false);
    refetchUser();
  }, [refetchUser]);

  const increaseAmount = useCallback((): void => {
    setChargeAmount(prevAmount => {
      const newAmount = prevAmount + 1000;
      if (newAmount <= 50000 - ((user as User)?.todayTotalCharge || 0)) {
        return newAmount;
      }
      alert('하루 충전 금액은 5만원을 넘을 수 없습니다.');
      return prevAmount;
    });
  }, [user]);

  const decreaseAmount = useCallback((): void => {
    setChargeAmount(prevAmount => {
      if (prevAmount - 1000 >= 1000) {
        return prevAmount - 1000;
      }
      alert('충전 금액은 천 원 이상 입력해야 합니다.');
      return prevAmount;
    });
  }, []);

  const handleOpenInquiryModal = useCallback((): void => {
    if (isLoggedIn) {
      setIsInquiryModalOpen(true);
    } else {
      alert('로그인 후 이용해 주세요.');
    }
  }, [isLoggedIn]);

  const handleCloseInquiryModal = useCallback((): void => {
    setIsInquiryModalOpen(false);
  }, []);

  return (
    <>
      <_.MainContent>
        <_.Maintop>
          <_.TopBox>
            <_.MainTopInBox>
              <_.TopBoxContent>
                <_.TopBoxText>현재 사용 가능한 금액</_.TopBoxText>
                <_.TopBoxText2>
                  {isLoggedIn ? `${formatPoint}원` : "로그인 후 조회 가능합니다"}
                </_.TopBoxText2>
              </_.TopBoxContent>
              {isLoggedIn && (
                <_.ChargeButton onClick={handleOpenChargeModal}>
                  충전하기
                </_.ChargeButton>
              )}
            </_.MainTopInBox>
          </_.TopBox>

          <_.BottomBox>
            {isLoggedIn ? (
              <_.UserlogLink to="/userlog">
                거래 내역 및 충전 환불
              </_.UserlogLink>
            ) : (
              <_.DisabledUserlogLink>
                거래 내역 및 충전 환불
              </_.DisabledUserlogLink>
            )}
          </_.BottomBox>
        </_.Maintop>

        {/* PersonCountDisplay 컴포넌트를 여기로 이동 */}
        <_.PersonCountBoxWrapper>
          <_.PersonCountBox>
            <PersonCountDisplay />
          </_.PersonCountBox>
        </_.PersonCountBoxWrapper>

        <_.BoxContainer>
          <_.UseBox>
            <Link to="/howto" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <_.UseBoxContent>
                <_.UseBoxText>
                  How To Use?
                  <p>
                    아리페이를 더 똑똑하게
                    사용하는 법
                  </p>
                </_.UseBoxText>
                <_.How2UseWrapper>
                  <img src={How2Use} alt="How to use" width="90%" height="120px" />
                </_.How2UseWrapper>
              </_.UseBoxContent>
            </Link>
          </_.UseBox>

          <_.AskBox onClick={handleOpenInquiryModal}>
            <_.AskInTop>
              <p>아리페이 사용 중 문제가 발생했다면?</p>
              <span>문의하기</span>
            </_.AskInTop>
            <_.CallLogoWrapper>
              <_.CallLogoStyle />
            </_.CallLogoWrapper>
          </_.AskBox>
        </_.BoxContainer>

      </_.MainContent>

      <ChargeModal 
        isOpen={isChargeModalOpen} 
        onRequestClose={handleCloseChargeModal}
        chargeAmount={chargeAmount}
        setChargeAmount={setChargeAmount}
        user={user as User}
        increaseAmount={increaseAmount}
        decreaseAmount={decreaseAmount}
      />

      <InquiryModal
        isOpen={isInquiryModalOpen}
        onRequestClose={handleCloseInquiryModal}
        user={user as User}
      />
    </>
  );
};

export default Main;