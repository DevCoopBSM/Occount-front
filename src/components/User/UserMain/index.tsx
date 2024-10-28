import React, { useState, useEffect, useCallback, useMemo } from 'react';
import * as _ from './style';
import { Link } from 'react-router-dom';
import { useAuth } from 'contexts/authContext';
import PaymentModal from 'components/Pg/PaymentModal';
import How2Use from 'assets/How2useBT.svg';
import InquiryModal from './InquiryModal';
import PersonCountDisplay from './PersonCountDisplay';
import BarcodeModal from './BarcodeModal';
import InvestmentModal from './InvestmentModal';
import NoticeList from './Notice/NoticeList';

interface User {
  point: number;
  todayTotalPayment: number;
  email: string;
  name: string;
  phone?: string;
  role?: string;
  code: string;
}

const Main: React.FC = () => {
  const { isLoggedIn, user, refetchUser } = useAuth();
  const [isChargeModalOpen, setIsChargeModalOpen] = useState<boolean>(false);
  const [formatPoint, setFormatPoint] = useState<string>('');
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState<boolean>(false);
  const [isBarcodeModalOpen, setIsBarcodeModalOpen] = useState<boolean>(false);
  const [showInvestmentModal, setShowInvestmentModal] = useState<boolean>(false);

  const memberRoles = useMemo(() => ['ROLE_MEMBER', 'ROLE_COOP', 'ROLE_ADMIN'], []);

  const isUserMember = useCallback((): boolean => {
    return isLoggedIn && user?.role && memberRoles.includes(user.role);
  }, [isLoggedIn, user, memberRoles]);

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
      setShowInvestmentModal(true);
      return;
    }
    setIsBarcodeModalOpen(true);
  }, [isUserMember]);

  const handleCloseBarcodeModal = useCallback((): void => {
    setIsBarcodeModalOpen(false);
  }, []);

  useEffect(() => {
    if (isLoggedIn && user?.role && !isUserMember()) {
      setShowInvestmentModal(true);
    }
  }, [isLoggedIn, user, isUserMember]);

  const handleCloseInvestmentModal = useCallback(() => {
    setShowInvestmentModal(false);
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
              {isLoggedIn && isUserMember() && ( // 조합원인 경우에만 충전 버튼 활성화
                <_.ChargeButton onClick={handleOpenChargeModal}>
                  충전하기
                </_.ChargeButton>
              )}
              {isLoggedIn && !isUserMember() && ( // 조합원이 아닌 경우 비활성화된 버튼 표시
                <_.DisabledChargeButton onClick={() => alert('정식 조합원만 이용 가능한 기능입니다.')}>
                  충전하기
                </_.DisabledChargeButton>
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

        <_.PersonCountBoxWrapper>
          <_.PersonCountBox>
            <PersonCountDisplay />
          </_.PersonCountBox>
        </_.PersonCountBoxWrapper>
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
        user={user as User}
        maxAmount={50000}
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
      />
    </>
  );
};

export default Main;
