import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MOBILE_BREAKPOINT = '480px';
const TABLET_BREAKPOINT = '768px';
const DESKTOP_BREAKPOINT = '1440px';
const FHD_BREAKPOINT = '1920px';

export const MainContent = styled.div`
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  padding: 40px 240px 87px 240px;
  background: white;

  /* 큰 화면 (1920px+) - 여백을 더 늘려서 콘텐츠가 너무 넓지 않게 */
  @media (min-width: ${FHD_BREAKPOINT}) {
    padding: 40px 300px 87px 300px;
  }

  /* FHD (1440px~1920px) - 적당한 여백 유지 */
  @media (max-width: 1920px) and (min-width: ${DESKTOP_BREAKPOINT}) {
    padding: 40px 120px 87px 120px;
  }

  /* 중간 화면 (1200px~1440px) */
  @media (max-width: ${DESKTOP_BREAKPOINT}) {
    padding: 40px 80px 87px 80px;
  }

  /* 작은 데스크톱 (1200px 이하) */
  @media (max-width: 1200px) {
    padding: 40px 40px 87px 40px;
  }

  /* 태블릿 */
  @media (max-width: ${TABLET_BREAKPOINT}) {
    padding: 40px 20px 87px 20px;
  }

  /* 모바일 */
  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 40px 20px 87px 20px;
  }
`;

// 상단 카드 컨테이너 (잔액 조회만)
export const TopCardsContainer = styled.div`
  display: flex;
  margin-bottom: 20px;

  @media (max-width: ${TABLET_BREAKPOINT}) {
    flex-direction: column;
  }
`;

// 잔액 조회 카드 (전체 너비)
export const BalanceCard = styled.div`
  width: 100%;
  background: white;
  border: 1px solid #cccccc;
  border-radius: 16px;
  padding: 32px;
  min-height: 160px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 20px;

  @media (max-width: ${TABLET_BREAKPOINT}) {
    padding: 24px;
    min-height: 140px;
    gap: 20px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const BalanceHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const BalanceContentLeft = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  padding-right: 40px;

  @media (max-width: ${TABLET_BREAKPOINT}) {
    padding-right: 0;
    margin-bottom: 20px;
  }
`;

export const BalanceTitle = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 5px;
  margin-bottom: 12px;

  .name {
    font-family: 'Pretendard', sans-serif;
    font-size: 32px;
    font-weight: 600;
    color: #111111;
  }

  .suffix {
    font-family: 'Pretendard', sans-serif;
    font-size: 24px;
    font-weight: 400;
    color: #111111;
  }

  @media (max-width: ${TABLET_BREAKPOINT}) {
    .name {
      font-size: 24px;
    }
    .suffix {
      font-size: 18px;
    }
  }
`;

export const BalanceInfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 8px;

  @media (max-width: ${TABLET_BREAKPOINT}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

export const BalanceInfo = styled.div`
  display: flex;
  align-items: baseline;
  gap: 4px;

  .amount {
    font-family: 'Pretendard', sans-serif;
    font-size: 48px;
    font-weight: 700;
    color: #f49e15;
  }

  .unit {
    font-family: 'Pretendard', sans-serif;
    font-size: 28px;
    font-weight: 600;
    color: #111111;
  }

  @media (max-width: ${TABLET_BREAKPOINT}) {
    .amount {
      font-size: 36px;
    }
    .unit {
      font-size: 20px;
    }
  }
`;

export const BalanceSubInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  color: #666666;

  .last-update {
    font-weight: 400;
  }

  @media (max-width: ${TABLET_BREAKPOINT}) {
    font-size: 13px;
  }
`;

export const BarcodeSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;

  @media (max-width: ${TABLET_BREAKPOINT}) {
    margin-top: 16px;
    width: 100%;
  }
`;

export const BarcodeLabel = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-size: 11px;
  font-weight: 500;
  color: #999999;
  margin-bottom: 8px;
  text-align: center;

  @media (max-width: ${TABLET_BREAKPOINT}) {
    font-size: 10px;
    margin-bottom: 6px;
  }
`;

export const BarcodeWrapper = styled.div`
  position: relative;
  background: transparent;
  padding: 0;

  svg {
    display: block;
    margin: 0 auto;
    border-radius: 8px;
    background: white;
    padding: 12px 16px;
    border: 1px solid #e8e8e8;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  }

  @media (max-width: ${TABLET_BREAKPOINT}) {
    svg {
      padding: 8px 12px;
    }
  }
`;


// Ari-Pick 카드
export const AriPickCard = styled.div`
  flex: 1;
  background: #ffedc6;
  border: 1px solid #cccccc;
  border-radius: 16px;
  padding: 27px;
  min-height: 190px;
  position: relative;
  overflow: hidden;

  @media (max-width: ${TABLET_BREAKPOINT}) {
    padding: 20px;
  }
`;

export const AriPickTitle = styled.h3`
  font-family: 'Pretendard', sans-serif;
  font-size: 28px;
  font-weight: 600;
  color: #111111;
  margin: 0 0 10px 0;
`;

export const AriPickDescription = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: #111111;
  margin: 0;
`;

export const AriPickIcon = styled.div`
  position: absolute;
  right: 30px;
  bottom: 20px;
  width: 120px;
  height: 120px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

// 서비스 메뉴 컨테이너
export const ServiceMenuContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin-bottom: 30px;

  /* FHD에서 더 큰 갭과 여유로운 레이아웃 */
  @media (max-width: 1920px) and (min-width: ${DESKTOP_BREAKPOINT}) {
    gap: 28px;
  }

  /* 중간 화면에서는 적당한 갭 */
  @media (max-width: ${DESKTOP_BREAKPOINT}) {
    gap: 24px;
  }

  /* 작은 데스크톱 */
  @media (max-width: 1200px) {
    gap: 20px;
  }

  /* 태블릿 */
  @media (max-width: ${TABLET_BREAKPOINT}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }

  /* 모바일 */
  @media (max-width: ${MOBILE_BREAKPOINT}) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

// 메뉴 카드
export const MenuCard = styled.div`
  background: white;
  border: 1px solid #cccccc;
  border-radius: 16px;
  padding: 32px 32px;
  height: 140px;
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  /* FHD에서 더 큰 카드 */
  @media (max-width: 1920px) and (min-width: ${DESKTOP_BREAKPOINT}) {
    padding: 28px 30px;
    height: 130px;
  }

  /* 중간 화면 */
  @media (max-width: ${DESKTOP_BREAKPOINT}) {
    padding: 25px 27px;
    height: 120px;
  }

  /* 태블릿 */
  @media (max-width: ${TABLET_BREAKPOINT}) {
    padding: 20px;
    height: 110px;
  }
`;

export const MenuCardTitle = styled.h3`
  font-family: 'Pretendard', sans-serif;
  font-size: 32px;
  font-weight: 600;
  color: #111111;
  margin: 0;

  /* FHD에서 더 큰 폰트 */
  @media (max-width: 1920px) and (min-width: ${DESKTOP_BREAKPOINT}) {
    font-size: 30px;
  }

  /* 중간 화면 */
  @media (max-width: ${DESKTOP_BREAKPOINT}) {
    font-size: 28px;
  }

  /* 태블릿 */
  @media (max-width: ${TABLET_BREAKPOINT}) {
    font-size: 24px;
  }

  /* 모바일 */
  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 22px;
  }
`;

export const MenuCardIcon = styled.div`
  position: absolute;
  right: 13px;
  top: 50%;
  transform: translateY(-50%);
  width: 106px;
  height: 99px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  @media (max-width: ${TABLET_BREAKPOINT}) {
    width: 80px;
    height: 75px;
  }
`;

// 현재 매장 인원 체크
export const CheckOccupancyBanner = styled.div`
  background: #dddddd;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;

  @media (max-width: ${TABLET_BREAKPOINT}) {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }
`;

export const OccupancyInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: 'Pretendard', sans-serif;
  font-size: 24px;
  color: #111111;

  .regular {
    font-weight: 400;
  }

  .bold {
    font-weight: 600;
  }

  @media (max-width: ${TABLET_BREAKPOINT}) {
    font-size: 20px;
  }
`;

export const OccupancyStatus = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-size: 24px;
  font-weight: 600;
  color: #111111;
  margin: 0;

  @media (max-width: ${TABLET_BREAKPOINT}) {
    font-size: 20px;
  }
`;

// 이벤트/공지 섹션
export const EventNoticeContainer = styled.div`
  display: flex;
  gap: 70px;
  margin-bottom: 40px;

  @media (max-width: ${TABLET_BREAKPOINT}) {
    flex-direction: column;
    gap: 30px;
  }
`;

export const NoticeSection = styled.div`
  width: 100%;
  padding: 28px 30px 24px;
  border-radius: 28px;
  background: linear-gradient(180deg, #ffffff 0%, #fafbfc 100%);
  border: 1px solid rgba(17, 17, 17, 0.06);
  box-shadow:
    0 8px 18px rgba(17, 17, 17, 0.035),
    0 2px 6px rgba(17, 17, 17, 0.025);

  @media (max-width: ${TABLET_BREAKPOINT}) {
    width: 100%;
    padding: 22px 18px 20px;
    border-radius: 22px;
  }
`;

export const NoticeSectionTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;

  h2 {
    font-family: 'Pretendard', sans-serif;
    font-size: 32px;
    font-weight: 600;
    color: #111111;
    margin: 0;
    line-height: 1.2;
  }

  @media (max-width: ${TABLET_BREAKPOINT}) {
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 14px;
    flex-direction: column;

    h2 {
      font-size: 24px;
    }
  }
`;

export const ViewMoreButton = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;

  span {
    font-family: 'Pretendard', sans-serif;
    font-size: 18px;
    font-weight: 400;
    color: #666666;
    line-height: normal;
  }

  svg {
    width: 20px;
    height: 20px;
  }

  img {
    width: 20px;
    height: 20px;
  }

  &:hover {
    opacity: 0.7;
  }

  @media (max-width: ${TABLET_BREAKPOINT}) {
    span {
      font-size: 16px;
    }
    svg, img {
      width: 18px;
      height: 18px;
    }
  }
`;

export const NoticeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 6px;
  margin-bottom: 4px;
`;

export const EmptyMessage = styled.div`
  padding: 12px 10px;
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  color: #666666;

  @media (max-width: ${TABLET_BREAKPOINT}) {
    font-size: 15px;
  }
`;

export const NoticeItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 6px;
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 48px;

  &:hover {
    background: rgba(248, 249, 250, 0.9);
    transform: translateX(2px);
  }

  .meta {
    display: flex;
    align-items: baseline;
    gap: 12px;
    min-width: 0;
    flex-wrap: wrap;
  }

  .title {
    font-weight: 400;
    color: #111111;
    min-width: 0;
    line-height: 1.45;
  }

  .date {
    font-weight: 400;
    color: #999999;
    font-size: 14px;
    white-space: nowrap;
  }

  @media (max-width: ${TABLET_BREAKPOINT}) {
    font-size: 16px;
    align-items: flex-start;
    padding: 10px 2px;

    .meta {
      gap: 8px;
    }

    .date {
      font-size: 13px;
    }
  }
`;

// 매점상품 보기 섹션
export const ProductDisplaySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  justify-content: center;
  margin-top: 60px;
  width: 100%;
  padding: 34px 28px 28px;
  border-radius: 28px;
  background: linear-gradient(180deg, rgba(248, 249, 250, 0.9) 0%, rgba(244, 246, 248, 0.75) 100%);

  @media (max-width: ${TABLET_BREAKPOINT}) {
    margin-top: 40px;
    gap: 12px;
    padding: 24px 18px 22px;
    border-radius: 22px;
  }
`;

export const ProductDisplayHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  @media (max-width: ${TABLET_BREAKPOINT}) {
    gap: 8px;
  }
`;

export const ProductDisplayTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;

  h2 {
    font-family: 'Pretendard', sans-serif;
    font-size: 32px;
    font-weight: 600;
    color: #111111;
    margin: 0;
    line-height: normal;
  }

  @media (max-width: ${TABLET_BREAKPOINT}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    h2 {
      font-size: 24px;
    }
  }
`;

export const CategoryTabBar = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;

  @media (max-width: ${TABLET_BREAKPOINT}) {
    overflow-x: auto;
    max-width: 100%;
    padding-bottom: 2px;
    flex-wrap: nowrap;
    gap: 8px;

    /* 스크롤바 숨기기 */
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const CategoryTab = styled.div<{ $active?: boolean }>`
  flex: 0 0 auto;
  min-width: fit-content;
  padding: 11px 18px;
  text-align: center;
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.$active ? '#111111' : '#5f6368'};
  border: 1px solid ${props => props.$active ? 'rgba(252, 200, 0, 0.45)' : 'rgba(17, 17, 17, 0.06)'};
  background: ${props => props.$active
    ? '#FCC800'
    : 'rgba(255, 255, 255, 0.72)'};
  border-radius: 999px;
  cursor: pointer;
  white-space: nowrap;
  line-height: normal;
  box-sizing: border-box;
  transition: all 0.2s ease;

  &:hover {
    color: #111111;
    border-color: rgba(17, 17, 17, 0.1);
    background: ${props => props.$active
      ? '#FCC800'
      : 'rgba(255, 255, 255, 0.92)'};
    transform: translateY(-1px);
  }

  @media (max-width: ${TABLET_BREAKPOINT}) {
    font-size: 14px;
    padding: 9px 14px;
    flex: 0 0 auto;
  }
`;

export const ProductCardsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

export const ProductCardRow = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  width: 100%;

  @media (max-width: ${TABLET_BREAKPOINT}) {
    flex-direction: column;
    gap: 12px;
  }
`;

export const ProductCard = styled.div`
  flex: 1;
  background: white;
  border: 1px solid rgba(17, 17, 17, 0.08);
  border-radius: 16px;
  min-height: 150px;
  position: relative;
  min-width: 0;
  padding: 24px 22px 20px;
  display: flex;
  align-items: flex-end;

  @media (max-width: ${TABLET_BREAKPOINT}) {
    width: 100%;
    min-height: 136px;
    padding: 20px 18px 18px;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    min-height: 124px;
    padding: 18px 16px 16px;
  }
`;

export const ProductBadge = styled.div<{ type: 'new' | 'hot' }>`
  position: absolute;
  top: 22px;
  left: 22px;

  background: ${props => props.type === 'new' ? '#fcc800' : '#f49e15'};
  color: ${props => props.type === 'new' ? '#111111' : '#ffffff'};
  padding: 3px 8px;
  border-radius: 999px;
  font-family: 'Pretendard', sans-serif;
  font-size: 15px;
  font-weight: 600;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${TABLET_BREAKPOINT}) {
    top: 18px;
    left: 18px;
    font-size: 13px;
  }
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  margin-top: 28px;

  h3 {
    font-family: 'Pretendard', sans-serif;
    font-size: 24px;
    font-weight: 600;
    color: #111111;
    margin: 0 0 6px 0;
    line-height: 1.2;
  }

  .price {
    display: flex;
    gap: 5px;
    align-items: center;
    font-family: 'Pretendard', sans-serif;
    font-size: 16px;
    font-weight: 500;
    color: #666666;
    line-height: 1.2;
    white-space: nowrap;
  }

  @media (max-width: ${TABLET_BREAKPOINT}) {
    margin-top: 22px;

    h3 {
      font-size: 20px;
    }
    .price {
      font-size: 14px;
    }
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    margin-top: 20px;

    h3 {
      font-size: 18px;
    }
    .price {
      font-size: 13px;
    }
  }
`;

export const ScrollBar = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
`;

export const ScrollDot = styled.div<{ active?: boolean }>`
  width: ${props => props.active ? '30px' : '6px'};
  height: 6px;
  border-radius: 6px;
  background: ${props => props.active ? '#666666' : '#dddddd'};
  flex-shrink: 0;
`;

// 레거시 스타일 유지 (기존 모달 등에서 사용)
export const TopBox = styled.div``;
export const BottomBox = styled.div<{ isLoggedIn?: boolean }>``;
export const Maintop = styled.div``;
export const BoxContainer = styled.div``;
export const UseBox = styled.div``;
export const UseBoxContent = styled.div``;
export const UseBoxText = styled.div``;
export const How2UseWrapper = styled.div``;
export const AskBox = styled.div``;
export const AskInTop = styled.div``;
export const CallLogoWrapper = styled.div``;
export const CallLogoStyle = styled.img.attrs({ src: '/assets/CallLogo.svg', alt: 'Call Logo' })``;
export const UserlogLink = styled(Link)``;
export const BarcodeButton = styled.button``;
export const DisabledUserlogLink = styled.span``;
export const MainTopInBox = styled.div``;
export const TopBoxTextWrapper = styled.div``;
export const TopBoxText = styled.p``;
export const TopBoxText2 = styled.p``;
export const ChargeButton = styled.button``;
export const DisabledChargeButton = styled.button``;
export const TopBoxContent = styled.div``;
export const PersonCountBoxWrapper = styled.div``;
export const PersonCountBox = styled.div``;
export const ModalContent = styled.div``;
export const CloseButton = styled.button``;
export const DisabledBarcodeButton = styled.button``;
export const ModalHeader = styled.h2``;
export const ModalList = styled.ul``;
export const ModalListItem = styled.li``;
export const ModalInputWrapper = styled.div``;
export const ModalInput = styled.input``;
export const InputWrapper = styled.div``;
export const IncreaseButton = styled.button``;
export const DecreaseButton = styled.button``;
export const ModalButtonWrapper = styled.div``;
export const ModalButton = styled.button``;
export const ButtonWrapper = styled.div``;
export const ModalFooterButton = styled.button``;

export const BalanceMetaInfo = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const MetaInfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MetaLabel = styled.span`
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #666666;
`;

export const MetaValue = styled.span`
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #333333;
`;

export const BalanceDivider = styled.div`
  width: 1px;
  background: linear-gradient(to bottom,
    transparent 0%,
    #E8E8E8 20%,
    #E8E8E8 80%,
    transparent 100%
  );
  margin: 0 16px;
  flex-shrink: 0;
  align-self: stretch;

  @media (max-width: ${TABLET_BREAKPOINT}) {
    display: none;
  }
`;

export const QuickActionButton = styled.button`
  margin-top: 12px;
  padding: 8px 16px;
  background-color: #FCC800;
  border: none;
  border-radius: 6px;
  color: #111111;
  font-family: 'Pretendard', sans-serif;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #F49E15;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const BarcodeCenterSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;

  @media (max-width: ${TABLET_BREAKPOINT}) {
    margin-top: 16px;
  }
`;

export const LargeBarcodeWrapper = styled.div`
  position: relative;
  background: #fafafa;
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  padding: 24px;
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.08),
    0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow:
      0 8px 20px rgba(0, 0, 0, 0.12),
      0 4px 8px rgba(0, 0, 0, 0.08);
    border-color: #d0d0d0;
  }

  svg {
    display: block;
    margin: 0 auto;
    border-radius: 8px;
    background: white;
    padding: 16px 20px;
    border: 1px solid #f0f0f0;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
  }

  @media (max-width: ${TABLET_BREAKPOINT}) {
    padding: 20px;
    border-radius: 14px;

    svg {
      padding: 12px 16px;
      border-radius: 6px;
    }
  }
`;

export const ActionSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 0 0 120px;
  min-width: 120px;

  @media (max-width: ${TABLET_BREAKPOINT}) {
    margin-top: 16px;
    width: 100%;
    flex: 1;
  }
`;

export const PrimaryActionButton = styled.button`
  padding: 16px 24px;
  background: linear-gradient(135deg, #FCC800 0%, #F49E15 100%);
  border: none;
  border-radius: 12px;
  color: #111111;
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(252, 200, 0, 0.3);
  min-width: 100px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;

  &:hover {
    background: linear-gradient(135deg, #F49E15 0%, #FCC800 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(252, 200, 0, 0.4);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(252, 200, 0, 0.3);
  }

  @media (max-width: ${TABLET_BREAKPOINT}) {
    width: 100%;
    height: 50px;
    font-size: 16px;
    padding: 16px 20px;
  }
`;

export const ActionLabel = styled.span`
  font-family: 'Pretendard', sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: #666666;
  margin-top: 8px;
  text-align: center;

  @media (max-width: ${TABLET_BREAKPOINT}) {
    font-size: 11px;
    margin-top: 6px;
  }
`;

export const InlineChargeButton = styled.button`
  padding: 10px 20px;
  background: linear-gradient(135deg, #FCC800 0%, #F49E15 100%);
  border: none;
  border-radius: 8px;
  color: #111111;
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(252, 200, 0, 0.3);
  white-space: nowrap;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: linear-gradient(135deg, #F49E15 0%, #FCC800 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(252, 200, 0, 0.4);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(252, 200, 0, 0.3);
  }

  @media (max-width: ${TABLET_BREAKPOINT}) {
    font-size: 14px;
    padding: 8px 16px;
    height: 40px;
  }
`;

export const VerticalDivider = styled.div`
  width: 1px;
  background: linear-gradient(to bottom,
    transparent 0%,
    #E8E8E8 20%,
    #E8E8E8 80%,
    transparent 100%
  );
  margin: 0 20px;
  flex-shrink: 0;
  align-self: stretch;

  @media (max-width: ${TABLET_BREAKPOINT}) {
    display: none;
  }
`;

export const BarcodeRightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  min-width: 280px;
  padding-left: 20px;

  @media (max-width: ${TABLET_BREAKPOINT}) {
    padding-left: 0;
    width: 100%;
    min-width: 0;
  }
`;

export const ImportantBadge = styled.span`
  background: #ff4757;
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
  flex-shrink: 0;
`;

// 새로운 공지사항과 퀵메뉴 컨테이너
export const NoticeAndMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px 0;
  gap: 0;

  @media (max-width: ${TABLET_BREAKPOINT}) {
    margin: 30px 0;
  }
`;

export const QuickMenuChipRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  margin-top: 18px;
  padding-top: 14px;
  border-top: 1px solid rgba(17, 17, 17, 0.08);

  @media (max-width: ${TABLET_BREAKPOINT}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
    margin-top: 14px;
    padding-top: 12px;
  }
`;

export const QuickMenuChip = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  padding: 13px 15px;
  border: 1px solid #fcc800;
  border-radius: 18px;
  background: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #ffffff;
    border-color: #f49e15;
    transform: translateY(-1px);
  }

  @media (max-width: ${TABLET_BREAKPOINT}) {
    padding: 12px 13px;
    border-radius: 16px;
  }
`;

export const QuickMenuChipLead = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
`;

export const QuickMenuSection = styled.div`
  flex: 0 0 40%;

  @media (max-width: ${TABLET_BREAKPOINT}) {
    flex: none;
    width: 100%;
  }
`;

export const QuickMenuTitle = styled.h3`
  font-family: 'Pretendard', sans-serif;
  font-size: 32px;
  font-weight: 600;
  color: #111111;
  margin: 0 0 20px 0;
  line-height: 1.2;
  display: flex;
  align-items: baseline;

  @media (max-width: ${TABLET_BREAKPOINT}) {
    font-size: 20px;
    margin: 0 0 16px 0;
  }
`;

export const QuickMenuGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;

  @media (max-width: ${TABLET_BREAKPOINT}) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 12px;
  }
`;

export const QuickMenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  gap: 14px;
  justify-content: space-between;
  width: 100%;

  &:hover {
    background: rgba(240, 206, 0, 0.08);
    transform: translateX(2px);

    span {
      color: #2c2c2c;
    }

    .chevron {
      color: #333333;
    }
  }

  @media (max-width: ${TABLET_BREAKPOINT}) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 16px 12px;
    background: #f8f9fa;
    gap: 8px;
    text-align: center;

    /* 데스크톱용 래퍼 숨기기 */
    > div {
      display: contents;
    }

    &:hover {
      background: #f0ce00;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(240, 206, 0, 0.15);

      span {
        color: #000;
      }
    }

    .chevron {
      display: none;
    }
  }
`;

export const QuickMenuIcon = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  flex-shrink: 0;

  img {
    width: 22px;
    height: 22px;
    object-fit: contain;
  }

  @media (max-width: ${TABLET_BREAKPOINT}) {
    width: 32px;
    height: 32px;
    margin-bottom: 8px;
    font-size: 24px;

    img {
      width: 24px;
      height: 24px;
    }
  }
`;

export const IconCircle = styled.div<{ $bgColor?: string }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${props => props.$bgColor || '#f0f0f0'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;

  @media (max-width: ${TABLET_BREAKPOINT}) {
    width: 34px;
    height: 34px;
    font-size: 16px;
  }
`;

export const QuickMenuText = styled.span`
  font-family: 'Pretendard', sans-serif;
  font-size: 15px;
  font-weight: 500;
  color: #2f2f2f;
  white-space: nowrap;

  @media (max-width: ${TABLET_BREAKPOINT}) {
    font-size: 14px;
    font-weight: 500;
  }
`;

export const QuickMenuChevron = styled.span`
  font-size: 15px;
  color: #f49e15;
  transition: all 0.2s ease;
  flex-shrink: 0;
`;

export const VerticalDividerLine = styled.div`
  width: 1px;
  min-height: 200px;
  background: linear-gradient(to bottom,
    transparent 0%,
    #E8E8E8 15%,
    #E8E8E8 85%,
    transparent 100%
  );
  margin-top: 48px;
  margin-bottom: 20px;
  flex-shrink: 0;

  @media (max-width: ${TABLET_BREAKPOINT}) {
    display: none;
  }
`;

export const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    position: 'relative',
    top: 'auto',
    left: 'auto',
    right: 'auto',
    bottom: 'auto',
    border: 'none',
    background: 'white',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px',
    maxWidth: '90%',
    maxHeight: '90%',
  },
};
