import React, { useState, useEffect, useCallback, useMemo } from 'react';
import * as _ from './style';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'contexts/authContext';
import PaymentModal from 'components/Pg/PaymentModal';
import InquiryModal from './InquiryModal';
import BarcodeModal from './BarcodeModal';
import InvestmentModal from './InvestmentModal';
import MoneyIcon from 'assets/Money.svg';
import DocumentIcon from 'assets/Document.svg';
import WayIcon from 'assets/Way.svg';
import QIcon from 'assets/Q.svg';
import OringInqSmile from 'assets/Oring_inq_smile.svg';
import { fetchNotices, Notice as ApiNotice } from './Notice/notices';
import { mockAnnouncements, mockNotices, mockProducts, NoticeItem, Product } from './mockData';

interface User {
  point: number;
  todayTotalPayment: number;
  email: string;
  name: string;
  phone?: string;
  role?: string;
  code: string;
}

const USE_MOCK_DATA = process.env.REACT_APP_USE_MOCK_DATA === 'true';

function Main() {
  const navigate = useNavigate();
  const { isLoggedIn, user, refetchUser } = useAuth();
  const [isChargeModalOpen, setIsChargeModalOpen] = useState<boolean>(false);
  const [formatPoint, setFormatPoint] = useState<string>('');
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState<boolean>(false);
  const [isBarcodeModalOpen, setIsBarcodeModalOpen] = useState<boolean>(false);
  const [showInvestmentModal, setShowInvestmentModal] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체보기');
  const [products, setProducts] = useState<Product[]>([]);
  const [eventNotices, setEventNotices] = useState<NoticeItem[]>([]);
  const [announcementNotices, setAnnouncementNotices] = useState<NoticeItem[]>([]);

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
    if (!isUserMember()) {
      alert('정식 조합원만 이용 가능한 기능입니다.');
      return;
    }
    setIsChargeModalOpen(true);
  }, [isUserMember]);

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

  const handleCloseBarcodeModal = useCallback((): void => {
    setIsBarcodeModalOpen(false);
  }, []);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  useEffect(() => {
    if (USE_MOCK_DATA) {
      setProducts(mockProducts);
      setEventNotices(mockNotices.filter(notice => notice.importance === 'HIGH'));
      setAnnouncementNotices(mockAnnouncements);
      return;
    }

    const loadNotices = async () => {
      try {
        const notices = await fetchNotices();
        const mapped = notices.map<NoticeItem>((notice: ApiNotice) => ({
          id: notice.id,
          title: notice.title,
          date: formatDate(notice.createdAt),
          importance: notice.importance,
        }));

        setEventNotices(mapped.filter(notice => notice.importance === 'HIGH'));
        setAnnouncementNotices(mapped.filter(notice => notice.importance !== 'HIGH'));
      } catch (error) {
        setEventNotices([]);
        setAnnouncementNotices([]);
      }
    };

    loadNotices();
  }, []);

  useEffect(() => {
    if (isLoggedIn && user?.role && !isUserMember()) {
      setShowInvestmentModal(true);
    }
  }, [isLoggedIn, user, isUserMember]);

  const handleCloseInvestmentModal = useCallback(() => {
    setShowInvestmentModal(false);
  }, []);

  const categories = ['전체보기', '과자', '아이스크림', '음료', '냉동식품', '빵류', '식품', '잡화'];

  const filteredProducts = useMemo(() => {
    if (selectedCategory === '전체보기') return products;
    return products.filter(product => product.category === selectedCategory);
  }, [products, selectedCategory]);

  const productRows = useMemo(() => {
    const rows: Product[][] = [];
    for (let i = 0; i < filteredProducts.length; i += 2) {
      rows.push(filteredProducts.slice(i, i + 2));
    }
    return rows;
  }, [filteredProducts]);

  return (
    <>
      <_.MainContent>
        {/* 상단 카드 영역 */}
        <_.TopCardsContainer>
          {/* 잔액 조회 카드 */}
          <_.BalanceCard>
            <_.BalanceTitle>
              <span className="name">{isLoggedIn ? user?.name || '사용자' : '사용자'}</span>
              <span className="suffix">님의 잔액</span>
            </_.BalanceTitle>
            <_.BalanceAmount>
              <span className="amount">{isLoggedIn ? formatPoint : '로그인 필요'}</span>
              {isLoggedIn && <span className="unit">원</span>}
            </_.BalanceAmount>
          </_.BalanceCard>

          {/* Ari-Pick 카드 */}
          <_.AriPickCard>
            <_.AriPickTitle>Ari-Pick</_.AriPickTitle>
            <_.AriPickDescription>아리소리가 당신의 소리를 기다립니다!</_.AriPickDescription>
            <_.AriPickIcon>
              <img src={OringInqSmile} alt="Ari-Pick" />
            </_.AriPickIcon>
          </_.AriPickCard>
        </_.TopCardsContainer>

        {/* 서비스 메뉴 */}
        <_.ServiceMenuContainer>
          <_.MenuCard onClick={handleOpenChargeModal}>
            <_.MenuCardTitle>충전하기</_.MenuCardTitle>
            <_.MenuCardIcon>
              <img src={MoneyIcon} alt="충전하기" />
            </_.MenuCardIcon>
          </_.MenuCard>

          <_.MenuCard onClick={() => navigate('/userlog')}>
            <_.MenuCardTitle>사용내역보기</_.MenuCardTitle>
            <_.MenuCardIcon>
              <img src={DocumentIcon} alt="사용내역보기" />
            </_.MenuCardIcon>
          </_.MenuCard>

          <_.MenuCard onClick={() => navigate('/howto')}>
            <_.MenuCardTitle>사용방법</_.MenuCardTitle>
            <_.MenuCardIcon>
              <img src={WayIcon} alt="사용방법" />
            </_.MenuCardIcon>
          </_.MenuCard>

          <_.MenuCard onClick={handleOpenInquiryModal}>
            <_.MenuCardTitle>문의하기</_.MenuCardTitle>
            <_.MenuCardIcon>
              <img src={QIcon} alt="문의하기" />
            </_.MenuCardIcon>
          </_.MenuCard>
        </_.ServiceMenuContainer>

        {/* 현재 매장 인원 체크 */}
        <_.CheckOccupancyBanner>
          <_.OccupancyInfo>
            <span className="regular">현재 매장 인원</span>
            <span className="bold">999</span>
            <span className="regular">명</span>
          </_.OccupancyInfo>
          <_.OccupancyStatus>현재 아무도 없어요!</_.OccupancyStatus>
        </_.CheckOccupancyBanner>

        {/* 이벤트 안내 & 변경/공지 사항 */}
        <_.EventNoticeContainer>
          {/* 이벤트 안내 */}
          <_.NoticeSection>
            <_.NoticeSectionTitle>
              <h2>이벤트 안내</h2>
              <_.ViewMoreButton>
                <span>전체보기</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="#666666" strokeWidth="2" />
                </svg>
              </_.ViewMoreButton>
            </_.NoticeSectionTitle>
            <_.NoticeList>
              {eventNotices.length ? (
                eventNotices.map(notice => (
                  <_.NoticeItem key={notice.id}>
                    <span className="title">{notice.title}</span>
                    <span className="date">{notice.date}</span>
                  </_.NoticeItem>
                ))
              ) : (
                <_.EmptyMessage>진행 중인 이벤트가 없습니다.</_.EmptyMessage>
              )}
            </_.NoticeList>
          </_.NoticeSection>

          {/* 변경/공지 사항 */}
          <_.NoticeSection>
            <_.NoticeSectionTitle>
              <h2>변경/공지 사항</h2>
              <_.ViewMoreButton>
                <span>전체보기</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="#666666" strokeWidth="2" />
                </svg>
              </_.ViewMoreButton>
            </_.NoticeSectionTitle>
            <_.NoticeList>
              {announcementNotices.length ? (
                announcementNotices.map(announcement => (
                  <_.NoticeItem key={announcement.id}>
                    <span className="title">{announcement.title}</span>
                    <span className="date">{announcement.date}</span>
                  </_.NoticeItem>
                ))
              ) : (
                <_.EmptyMessage>등록된 공지사항이 없습니다.</_.EmptyMessage>
              )}
            </_.NoticeList>
          </_.NoticeSection>
        </_.EventNoticeContainer>

        {/* 매점상품 보기 */}
        <_.ProductDisplaySection>
          <_.ProductDisplayHeader>
            <_.ProductDisplayTitle>
              <h2>매점상품 보기</h2>
              <_.ViewMoreButton onClick={() => {}}>
                <span>더보기</span>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M6.75 13.5L11.25 9L6.75 4.5" stroke="#666666" strokeWidth="2" />
                </svg>
              </_.ViewMoreButton>
            </_.ProductDisplayTitle>

            {/* 카테고리 탭 */}
            <_.CategoryTabBar>
              {categories.map(category => (
                <_.CategoryTab
                  key={category}
                  active={selectedCategory === category}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </_.CategoryTab>
              ))}
            </_.CategoryTabBar>
          </_.ProductDisplayHeader>

          {/* 상품 카드 그리드 */}
          <_.ProductCardsGrid>
            {productRows.length ? (
              productRows.map((row, rowIndex) => (
                <_.ProductCardRow key={rowIndex}>
                  {row.map(product => (
                    <_.ProductCard key={product.id}>
                      {product.badge && (
                        <_.ProductBadge type={product.badge}>
                          {product.badge === 'new' ? 'NEW' : 'HOT'}
                        </_.ProductBadge>
                      )}
                      <_.ProductImage />
                      <_.ProductInfo>
                        <h3>{product.title}</h3>
                        <div className="price">
                          <span>{product.price !== undefined ? product.price.toLocaleString() : '가격 정보 없음'}</span>
                          {product.price !== undefined && <span>원</span>}
                        </div>
                      </_.ProductInfo>
                    </_.ProductCard>
                  ))}
                </_.ProductCardRow>
              ))
            ) : (
              <_.EmptyMessage>표시할 상품이 없습니다.</_.EmptyMessage>
            )}
          </_.ProductCardsGrid>

          {/* 스크롤바 */}
          <_.ScrollBar>
            {Array.from({ length: Math.max(productRows.length, 1) }).map((_, index) => (
              <_.ScrollDot key={index} active={index === 0} />
            ))}
          </_.ScrollBar>
        </_.ProductDisplaySection>
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
