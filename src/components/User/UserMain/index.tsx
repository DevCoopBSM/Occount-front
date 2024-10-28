import React, { useState, useEffect, useCallback } from 'react';
import * as _ from './style';
import { Link } from 'react-router-dom';
import { useAuth } from 'contexts/authContext';
import PaymentModal from 'components/Pg/PaymentModal';
import How2Use from 'assets/How2useBT.svg';
import InquiryModal from './InquiryModal';
import PersonCountDisplay from './PersonCountDisplay';
import BarcodeModal from './BarcodeModal';
import InvestmentModal from './InvestmentModal';
import NoticeList from './Notice/NoticeList'; // 공지사항 목록 컴포넌트 임포트

interface User {
  point: number;
  todayTotalPayment: number;
  email: string;
  name: string;
  phone?: string;
  role?: string;  // role 추가
  code: string;   // barcode에 필요한 code도 추가
}

const Main: React.FC = () => {
  const { isLoggedIn, user, refetchUser } = useAuth();
  const [isChargeModalOpen, setIsChargeModalOpen] = useState<boolean>(false);
  const [chargeAmount, setChargeAmount] = useState<number>(1000);
  const [formatPoint, setFormatPoint] = useState<string>('');
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState<boolean>(false);
  const [isBarcodeModalOpen, setIsBarcodeModalOpen] = useState<boolean>(false);
  const [showInvestmentModal, setShowInvestmentModal] = useState<boolean>(false);

  const memberRoles = ['ROLE_MEMBER', 'ROLE_COOP', 'ROLE_ADMIN'];

  const isUserMember = (): boolean => {
    return isLoggedIn && user?.role && memberRoles.includes(user.role);
  };

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
      if (newAmount <= 50000 - ((user as User)?.todayTotalPayment || 0)) {
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

  const handleOpenBarcodeModal = useCallback((): void => {
    if (!isUserMember()) {
      setShowInvestmentModal(true); // 조합원이 아닐 경우 가입 권유 모달 열기
      return;
    }
    setIsBarcodeModalOpen(true);
  }, [isUserMember]); // isUserMember 추가

  const handleCloseBarcodeModal = useCallback((): void => {
    setIsBarcodeModalOpen(false);
  }, []);

  useEffect(() => {
    if (isLoggedIn && user?.role && !isUserMember()) {
      setShowInvestmentModal(true); // 조합원이 아닐 경우 모달 열기
    }
  }, [isLoggedIn, user, isUserMember]); // isUserMember 추가

  const handleCloseInvestmentModal = useCallback(() => {
    setShowInvestmentModal(false);
  }, []);

  const handleMoveToMyPage = useCallback(() => {
    window.location.href = '/update';
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

          <_.BottomBox isLoggedIn={isLoggedIn}>
            {isLoggedIn ? (
              <>
                <_.UserlogLink to="/userlog">
                  거래내역 및 환불
                </_.UserlogLink>
                {isUserMember() ? (
                  <_.BarcodeButton onClick={handleOpenBarcodeModal}>
                    바코드
                  </_.BarcodeButton>
                ) : (
                  <_.DisabledBarcodeButton onClick={() => alert('정식 조합원만 이용 가능한 기능입니다.')}>
                    바코드
                  </_.DisabledBarcodeButton>
                )}
              </>
            ) : (
              <_.DisabledUserlogLink>
                거래내역 및 환불
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
        {/* 공지사항 목록 표시 */}
        <NoticeList />
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

      <PaymentModal 
        type="charge"
        isOpen={isChargeModalOpen} 
        onRequestClose={handleCloseChargeModal}
        amount={chargeAmount}
        setAmount={setChargeAmount}
        user={user as User}
        maxAmount={50000}
        increaseAmount={increaseAmount}
        decreaseAmount={decreaseAmount}
      />

      <InquiryModal
        isOpen={isInquiryModalOpen}
        onRequestClose={handleCloseInquiryModal}
        user={user as User}
      />

      <BarcodeModal
        isOpen={isBarcodeModalOpen}
        onRequestClose={handleCloseBarcodeModal}
        userCode={user?.code || ''}
      />

      <InvestmentModal
        isOpen={showInvestmentModal}
        onRequestClose={handleCloseInvestmentModal}
        user={user as User}
        amount={10000} // 기본 출자금액
        setAmount={setChargeAmount} // 금액 설정 함수
      />
    </>
  );
};

export default Main;
