import styled from 'styled-components';
import CallLogo from 'assets/CallLogo.svg';
import { Link } from 'react-router-dom';

const MOBILE_BREAKPOINT = '480px';
const TABLET_BREAKPOINT = '768px';

// 미디어 쿼리 헬퍼 함수
const mediaQuery = (breakpoint: string): string => `@media (max-width: ${breakpoint})`;

export const MainContent = styled.div`
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  padding: 91px 180px 87px 180px;
  background: white;

  @media (max-width: 1560px) {
    padding: 91px 80px 87px 80px;
  }

  @media (max-width: 1200px) {
    padding: 91px 40px 87px 40px;
  }

  ${mediaQuery(TABLET_BREAKPOINT)} {
    padding: 91px 20px 87px 20px;
  }

  ${mediaQuery(MOBILE_BREAKPOINT)} {
    padding: 91px 20px 87px 20px;
  }
`;

// 상단 카드 컨테이너 (잔액 조회 + Ari-Pick)
export const TopCardsContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;

  ${mediaQuery(TABLET_BREAKPOINT)} {
    flex-direction: column;
    gap: 15px;
  }
`;

// 잔액 조회 카드
export const BalanceCard = styled.div`
  flex: 1;
  background: white;
  border: 1px solid #cccccc;
  border-radius: 16px;
  padding: 27px;
  min-height: 190px;
  position: relative;

  ${mediaQuery(TABLET_BREAKPOINT)} {
    padding: 20px;
  }
`;

export const BalanceTitle = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 5px;
  margin-bottom: 40px;

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

  ${mediaQuery(TABLET_BREAKPOINT)} {
    .name {
      font-size: 24px;
    }
    .suffix {
      font-size: 18px;
    }
  }
`;

export const BalanceAmount = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 5px;

  .amount {
    font-family: 'Pretendard', sans-serif;
    font-size: 50px;
    font-weight: 600;
    color: #111111;
  }

  .unit {
    font-family: 'Pretendard', sans-serif;
    font-size: 32px;
    font-weight: 600;
    color: #111111;
    padding-bottom: 5px;
  }

  ${mediaQuery(TABLET_BREAKPOINT)} {
    .amount {
      font-size: 36px;
    }
    .unit {
      font-size: 24px;
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

  ${mediaQuery(TABLET_BREAKPOINT)} {
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
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 30px;

  ${mediaQuery(TABLET_BREAKPOINT)} {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }

  ${mediaQuery(MOBILE_BREAKPOINT)} {
    grid-template-columns: 1fr;
  }
`;

// 메뉴 카드
export const MenuCard = styled.div`
  background: white;
  border: 1px solid #cccccc;
  border-radius: 16px;
  padding: 25px 27px;
  height: 120px;
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  ${mediaQuery(TABLET_BREAKPOINT)} {
    padding: 20px;
  }
`;

export const MenuCardTitle = styled.h3`
  font-family: 'Pretendard', sans-serif;
  font-size: 28px;
  font-weight: 600;
  color: #111111;
  margin: 0;

  ${mediaQuery(TABLET_BREAKPOINT)} {
    font-size: 24px;
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

  ${mediaQuery(TABLET_BREAKPOINT)} {
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

  ${mediaQuery(TABLET_BREAKPOINT)} {
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

  ${mediaQuery(TABLET_BREAKPOINT)} {
    font-size: 20px;
  }
`;

export const OccupancyStatus = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-size: 24px;
  font-weight: 600;
  color: #111111;
  margin: 0;

  ${mediaQuery(TABLET_BREAKPOINT)} {
    font-size: 20px;
  }
`;

// 이벤트/공지 섹션
export const EventNoticeContainer = styled.div`
  display: flex;
  gap: 70px;
  margin-bottom: 40px;

  ${mediaQuery(TABLET_BREAKPOINT)} {
    flex-direction: column;
    gap: 30px;
  }
`;

export const NoticeSection = styled.div`
  flex: 1;
`;

export const NoticeSectionTitle = styled.div`
  margin-bottom: 20px;

  h2 {
    font-family: 'Pretendard', sans-serif;
    font-size: 32px;
    font-weight: 600;
    color: #111111;
    margin: 0 0 10px 0;
  }

  ${mediaQuery(TABLET_BREAKPOINT)} {
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

  ${mediaQuery(TABLET_BREAKPOINT)} {
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
  gap: 2px;
`;

export const NoticeItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;

  .title {
    font-weight: 400;
    color: #111111;
  }

  .date {
    font-weight: 400;
    color: #666666;
  }

  ${mediaQuery(TABLET_BREAKPOINT)} {
    font-size: 16px;
  }
`;

// 매점상품 보기 섹션
export const ProductDisplaySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  width: 100%;
`;

export const ProductDisplayHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  ${mediaQuery(TABLET_BREAKPOINT)} {
    gap: 8px;
  }
`;

export const ProductDisplayTitle = styled.div`
  display: flex;
  height: 40px;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;

  h2 {
    font-family: 'Pretendard', sans-serif;
    font-size: 32px;
    font-weight: 600;
    color: #111111;
    margin: 0;
    line-height: normal;
  }

  ${mediaQuery(TABLET_BREAKPOINT)} {
    h2 {
      font-size: 24px;
    }
  }
`;

export const CategoryTabBar = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 780px;

  ${mediaQuery(TABLET_BREAKPOINT)} {
    overflow-x: auto;
    max-width: 100%;
  }
`;

export const CategoryTab = styled.div<{ active?: boolean }>`
  flex: 1 1 0;
  min-width: 0;
  padding: 10px;
  text-align: center;
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: ${props => props.active ? '#111111' : '#666666'};
  border-bottom: ${props => props.active ? '3px solid #f49e15' : 'none'};
  cursor: pointer;
  white-space: nowrap;
  line-height: normal;
  box-sizing: border-box;

  &:hover {
    color: #111111;
  }

  ${mediaQuery(TABLET_BREAKPOINT)} {
    font-size: 16px;
    padding: 8px;
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

  ${mediaQuery(TABLET_BREAKPOINT)} {
    flex-direction: column;
  }
`;

export const ProductCard = styled.div`
  flex: 1;
  background: white;
  border: 1px solid #cccccc;
  border-radius: 16px;
  height: 190px;
  position: relative;
  overflow: hidden;
  min-width: 0;

  ${mediaQuery(TABLET_BREAKPOINT)} {
    width: 100%;
  }
`;

export const ProductBadge = styled.div<{ type: 'new' | 'hot' }>`
  position: absolute;
  top: ${props => props.type === 'new' ? '70px' : '75px'};
  left: 20px;

  background: ${props => props.type === 'new' ? '#fcc800' : '#f49e15'};
  color: ${props => props.type === 'new' ? '#111111' : '#ffffff'};
  padding: 0 5px;
  border-radius: 8px;
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
  font-weight: 400;
  line-height: normal;
  display: flex;
  align-items: center;
  justify-content: center;

  ${mediaQuery(TABLET_BREAKPOINT)} {
    font-size: 16px;
  }
`;

export const ProductInfo = styled.div`
  position: absolute;
  bottom: 30px;
  left: 20px;
  max-width: 273px;

  h3 {
    font-family: 'Pretendard', sans-serif;
    font-size: 32px;
    font-weight: 600;
    color: #111111;
    margin: 0 0 5px 0;
    line-height: normal;
    white-space: nowrap;
  }

  .price {
    display: flex;
    gap: 5px;
    align-items: center;
    font-family: 'Pretendard', sans-serif;
    font-size: 18px;
    font-weight: 400;
    color: #666666;
    line-height: normal;
    white-space: nowrap;
  }

  ${mediaQuery(TABLET_BREAKPOINT)} {
    h3 {
      font-size: 24px;
    }
    .price {
      font-size: 16px;
    }
  }
`;

export const ProductImage = styled.div`
  position: absolute;
  right: -0.5px;
  top: 50%;
  transform: translateY(-50%);
  width: 300px;
  height: 190px;
  background: linear-gradient(270deg, #D9D9D9 0%, rgba(115, 115, 115, 0.00) 100%);

  ${mediaQuery(TABLET_BREAKPOINT)} {
    width: 200px;
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
export const CallLogoStyle = styled.img.attrs({ src: CallLogo, alt: 'Call Logo' })``;
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
export const BarcodeWrapper = styled.div``;
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
