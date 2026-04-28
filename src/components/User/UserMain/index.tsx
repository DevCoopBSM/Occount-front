import React, { useState, useEffect, useCallback, useMemo } from 'react';
import * as S from './style';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'contexts/authContext';
import PaymentModal from 'components/Pg/PaymentModal';
import InquiryModal from './InquiryModal';
import InvestmentModal from './InvestmentModal';
import Barcode from 'react-barcode';
import Toast from 'common/Toast';
import Icon from 'components/Icon';
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
  const [showInvestmentModal, setShowInvestmentModal] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체보기');
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [allNotices, setAllNotices] = useState<NoticeItem[]>([]);
  const [showLoginToast, setShowLoginToast] = useState<boolean>(false);

  const memberRoles = useMemo(() => ['ROLE_MEMBER', 'ROLE_COOP', 'ROLE_ADMIN'], []);

  const isUserMember = useCallback((): boolean => {
    return isLoggedIn && user?.role && memberRoles.includes(user.role);
  }, [isLoggedIn, user, memberRoles]);

  useEffect(() => {
    if (user && user.point !== undefined) {
      setFormatPoint(user.point.toLocaleString());
    }
  }, [user]);

  const handleCloseChargeModal = useCallback((): void => {
    setIsChargeModalOpen(false);
    refetchUser();
  }, [refetchUser]);

  const handleOpenInquiryModal = useCallback((): void => {
    if (isLoggedIn) {
      setIsInquiryModalOpen(true);
    } else {
      setShowLoginToast(true);
    }
  }, [isLoggedIn]);

  const handleNavigateToProtectedPage = useCallback((path: string): void => {
    if (isLoggedIn) {
      navigate(path);
    } else {
      setShowLoginToast(true);
    }
  }, [isLoggedIn, navigate]);

  const handleCloseLoginToast = useCallback((): void => {
    setShowLoginToast(false);
  }, []);

  const handleCloseInquiryModal = useCallback((): void => {
    setIsInquiryModalOpen(false);
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
      // 모든 공지사항을 하나로 통합 (중요도 높은 것부터 표시)
      const combinedNotices = [...mockNotices, ...mockAnnouncements]
        .sort((a, b) => {
          // 중요도가 높은 것 먼저, 그 다음 최신순
          if (a.importance === 'HIGH' && b.importance !== 'HIGH') return -1;
          if (a.importance !== 'HIGH' && b.importance === 'HIGH') return 1;
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
      setAllNotices(combinedNotices);
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

        // 모든 공지사항을 중요도순으로 정렬
        const sortedNotices = mapped.sort((a, b) => {
          if (a.importance === 'HIGH' && b.importance !== 'HIGH') return -1;
          if (a.importance !== 'HIGH' && b.importance === 'HIGH') return 1;
          return 0;
        });

        setAllNotices(sortedNotices);
      } catch (error) {
        console.error('공지사항 로딩 에러:', error)
        setAllNotices([]);
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
      <S.MainContent>
        {/* 상단 카드 영역 */}
        <S.TopCardsContainer>
          {/* 잔액 조회 카드 */}
          <S.BalanceCard>
            <S.BalanceContentLeft>
              <S.BalanceTitle>
                <span className="name">{isLoggedIn ? user?.name || '사용자' : '사용자'}</span>
                <span className="suffix">님의 잔액</span>
              </S.BalanceTitle>
              <S.BalanceInfo>
                <span className="amount">{isLoggedIn ? formatPoint : '로그인 필요'}</span>
                {isLoggedIn && <span className="unit">원</span>}
              </S.BalanceInfo>
            </S.BalanceContentLeft>

            {isLoggedIn && user?.code && (
              <S.VerticalDivider />
            )}

            {isLoggedIn && user?.code && (
              <S.BarcodeRightSection>
                <S.BarcodeLabel>결제 바코드</S.BarcodeLabel>
                <S.LargeBarcodeWrapper>
                  <Barcode
                    value={user.code}
                    format="CODE128"
                    width={2.5}
                    height={75}
                    displayValue={false}
                    margin={0}
                  />
                </S.LargeBarcodeWrapper>
              </S.BarcodeRightSection>
            )}
          </S.BalanceCard>

        </S.TopCardsContainer>

        {/* 현재 매장 인원 체크 */}
        <S.CheckOccupancyBanner>
          <S.OccupancyInfo>
            <span className="regular">현재 매장 인원</span>
            <span className="bold">999</span>
            <span className="regular">명</span>
          </S.OccupancyInfo>
          <S.OccupancyStatus>현재 아무도 없어요!</S.OccupancyStatus>
        </S.CheckOccupancyBanner>


        {/* 공지사항과 퀵메뉴 */}
        <S.NoticeAndMenuContainer>
          <S.NoticeSection>
            <S.NoticeSectionTitle>
              <h2>공지사항</h2>
              <S.ViewMoreButton onClick={() => navigate('/notice')}>
                <span>전체보기</span>
                <Icon name="chevronForward" size={20} color="#666666" />
              </S.ViewMoreButton>
            </S.NoticeSectionTitle>
            <S.NoticeList>
              {allNotices.length ? (
                allNotices.slice(0, 5).map(notice => (
                  <S.NoticeItem key={notice.id}>
                    <span className="meta">
                      <span className="title">
                        {notice.title}
                      </span>
                      <span className="date">{notice.date}</span>
                    </span>
                  </S.NoticeItem>
                ))
              ) : (
                <S.EmptyMessage>등록된 공지사항이 없습니다.</S.EmptyMessage>
              )}
            </S.NoticeList>
            <S.QuickMenuChipRow>
              <S.QuickMenuChip onClick={() => handleNavigateToProtectedPage('/userlog')}>
                <S.QuickMenuChipLead>
                  <S.QuickMenuIcon>
                    <S.IconCircle $bgColor="#FCC800">
                      <Icon name="history" size={18} color="#FFFFFF" />
                    </S.IconCircle>
                  </S.QuickMenuIcon>
                  <S.QuickMenuText>사용내역</S.QuickMenuText>
                </S.QuickMenuChipLead>
                <S.QuickMenuChevron>›</S.QuickMenuChevron>
              </S.QuickMenuChip>
              <S.QuickMenuChip onClick={() => navigate('/howto')}>
                <S.QuickMenuChipLead>
                  <S.QuickMenuIcon>
                    <S.IconCircle $bgColor="#F49E15">
                      <Icon name="menuBook" size={18} color="#FFFFFF" />
                    </S.IconCircle>
                  </S.QuickMenuIcon>
                  <S.QuickMenuText>사용방법</S.QuickMenuText>
                </S.QuickMenuChipLead>
                <S.QuickMenuChevron>›</S.QuickMenuChevron>
              </S.QuickMenuChip>
              <S.QuickMenuChip onClick={() => navigate('/item-list')}>
                <S.QuickMenuChipLead>
                  <S.QuickMenuIcon>
                    <S.IconCircle $bgColor="#FCC800">
                      <Icon name="inventory" size={18} color="#FFFFFF" />
                    </S.IconCircle>
                  </S.QuickMenuIcon>
                  <S.QuickMenuText>상품목록</S.QuickMenuText>
                </S.QuickMenuChipLead>
                <S.QuickMenuChevron>›</S.QuickMenuChevron>
              </S.QuickMenuChip>
              <S.QuickMenuChip onClick={handleOpenInquiryModal}>
                <S.QuickMenuChipLead>
                  <S.QuickMenuIcon>
                    <S.IconCircle $bgColor="#F49E15">
                      <Icon name="mail" size={18} color="#FFFFFF" />
                    </S.IconCircle>
                  </S.QuickMenuIcon>
                  <S.QuickMenuText>문의하기</S.QuickMenuText>
                </S.QuickMenuChipLead>
                <S.QuickMenuChevron>›</S.QuickMenuChevron>
              </S.QuickMenuChip>
            </S.QuickMenuChipRow>
          </S.NoticeSection>
        </S.NoticeAndMenuContainer>

        {/* 매점상품 보기 */}
        <S.ProductDisplaySection>
          <S.ProductDisplayHeader>
            <S.ProductDisplayTitle>
              <h2>매점상품 보기</h2>
              <S.ViewMoreButton onClick={() => navigate('/item-list')}>
                <span>더보기</span>
                <Icon name="chevronForward" size={18} color="#666666" />
              </S.ViewMoreButton>
            </S.ProductDisplayTitle>

            {/* 카테고리 탭 */}
            <S.CategoryTabBar>
              {categories.map(category => (
                <S.CategoryTab
                  key={category}
                  $active={selectedCategory === category}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </S.CategoryTab>
              ))}
            </S.CategoryTabBar>
          </S.ProductDisplayHeader>

          {/* 상품 카드 그리드 */}
          <S.ProductCardsGrid>
            {productRows.length ? (
              productRows.map((row, rowIndex) => (
                <S.ProductCardRow key={rowIndex}>
                  {row.map(product => (
                    <S.ProductCard key={product.id}>
                      {product.badge && (
                        <S.ProductBadge type={product.badge}>
                          {product.badge === 'new' ? 'NEW' : 'HOT'}
                        </S.ProductBadge>
                      )}
                      <S.ProductInfo>
                        <h3>{product.title}</h3>
                        <div className="price">
                          <span>{product.price !== undefined ? product.price.toLocaleString() : '가격 정보 없음'}</span>
                          {product.price !== undefined && <span>원</span>}
                        </div>
                      </S.ProductInfo>
                    </S.ProductCard>
                  ))}
                </S.ProductCardRow>
              ))
            ) : (
              <S.EmptyMessage>표시할 상품이 없습니다.</S.EmptyMessage>
            )}
          </S.ProductCardsGrid>

          {/* 스크롤바 */}
          <S.ScrollBar>
            {Array.from({ length: Math.max(productRows.length, 1) }).map((_, index) => (
              <S.ScrollDot key={index} active={index === 0} />
            ))}
          </S.ScrollBar>
        </S.ProductDisplaySection>
      </S.MainContent>

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


      <InvestmentModal
        isOpen={showInvestmentModal}
        onRequestClose={handleCloseInvestmentModal}
        user={user as User}
      />

      <Toast
        isVisible={showLoginToast}
        message="로그인이 필요한 기능입니다."
        type="info"
        title="알림"
        onClose={handleCloseLoginToast}
      />
    </>
  );
};

export default Main;
