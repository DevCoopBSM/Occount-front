import styled from 'styled-components';
import Modal from 'components/Modal';

const MOBILE_BREAKPOINT = '480px';
const TABLET_BREAKPOINT = '768px';
const LAPTOP_BREAKPOINT = '1440px';

// Modal에 전달할 스타일 객체들
export const getModalStyle = () => {
  const baseStyle = {
    width: "600px",
    maxWidth: "90%",
    maxHeight: "95vh",
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "32px"
  };

  const laptopStyle = {
    ...baseStyle,
    width: "500px",
    maxHeight: "85vh",
    padding: "28px"
  };

  const tabletStyle = {
    ...baseStyle,
    width: "500px",
    maxHeight: "85vh",
    padding: "24px"
  };

  const mobileStyle = {
    ...baseStyle,
    width: "95%",
    maxHeight: "90vh",
    padding: "20px"
  };

  // 현재 화면 크기에 따라 스타일 반환
  if (window.innerWidth <= 480) {
    return mobileStyle;
  } else if (window.innerWidth <= 768) {
    return tabletStyle;
  } else if (window.innerWidth <= 1440) {
    return laptopStyle;
  }
  return baseStyle;
};

export const StyledModal = styled.div`
  position: relative;

  .modal-content {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
`;

export const ModalHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;

  @media (max-width: ${LAPTOP_BREAKPOINT}) {
    margin-bottom: 18px;
  }

  @media (max-width: ${TABLET_BREAKPOINT}) {
    margin-bottom: 16px;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    margin-bottom: 14px;
  }
`;

export const CloseButton = styled.button`
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #111111;
  font-size: 24px;
  line-height: 1;
  flex-shrink: 0;

  &:hover {
    opacity: 0.7;
  }

  svg {
    width: 100%;
    height: 100%;
  }

  @media (max-width: ${TABLET_BREAKPOINT}) {
    width: 20px;
    height: 20px;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 18px;
    height: 18px;
  }
`;

export const ModalHeader = styled.h2`
  font-size: 32px;
  font-weight: 600;
  color: #111111;
  margin: 0;
  padding: 0;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: ${LAPTOP_BREAKPOINT}) {
    font-size: 28px;
  }

  @media (max-width: ${TABLET_BREAKPOINT}) {
    font-size: 26px;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 24px;
  }
`;

export const ModalContent = styled.div`
  padding: 0;
  font-size: 18px;
  color: #111111;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 16px;
  }
`;

export const HighlightText = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: #FFF3D8;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 20px;

  span {
    font-size: 16px;
    color: #F49E15;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  }

  @media (max-width: ${LAPTOP_BREAKPOINT}) {
    padding: 14px;
    margin-bottom: 16px;

    span {
      font-size: 15px;
    }
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 12px;

    span {
      font-size: 14px;
    }
  }
`;

export const InfoIcon = styled.div`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  color: #F49E15;
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

export const ModalList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
  font-size: 16px;
  line-height: 22px;
  color: #111111;
  list-style: none;
  padding: 0;

  @media (max-width: ${LAPTOP_BREAKPOINT}) {
    gap: 12px;
    font-size: 15px;
    line-height: 20px;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 14px;
    gap: 10px;
  }
`;

export const ModalListItem = styled.div`
  line-height: 24px;
  
  &.has-sub-items {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
`;

export const SubList = styled.ul`
  list-style-type: disc;
  padding-left: 27px;
  margin: 5px 0 0 0;
  display: block;
  
  li {
    line-height: 24px;
    margin-bottom: 0;
    display: list-item;
    list-style-type: disc;
    list-style-position: outside;
  }
`;

export const SubListItem = styled.li`
  line-height: 24px;
  display: list-item;
  list-style-type: disc;
  list-style-position: outside;
`;

export const ModalInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 16px 0 32px 0;
  gap: 20px;

  @media (max-width: ${LAPTOP_BREAKPOINT}) {
    margin: 14px 0 28px 0;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 250px;
  gap: 10px;
`;

export const ModalInput = styled.input`
  font-size: 28px;
  line-height: 24px;
  text-align: center;
  border: none;
  background: transparent;
  color: #111111;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: textfield;
  margin: 0;
  padding: 0;
  flex: 1;

  &:focus {
    outline: none;
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    appearance: none;
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const AmountButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background-color: #FCC800;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #F49E15;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  color: #111111;

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const DecreaseButton = styled(AmountButton)``;
export const IncreaseButton = styled(AmountButton)``;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-top: 24px;
  width: 100%;

  @media (max-width: ${LAPTOP_BREAKPOINT}) {
    margin-top: 20px;
  }
`;

export const CancelButton = styled.button`
  flex: 1;
  font-size: 18px;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  padding: 8px 10px;
  background-color: #F3F3F3;
  border: 1px solid #CCCCCC;
  border-radius: 8px;
  color: #111111;
  cursor: pointer;
  transition: all 0.2s ease;
  line-height: 1.4;

  &:hover {
    background-color: #E8E8E8;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 16px;
  }
`;

export const ConfirmButton = styled.button`
  flex: 1;
  font-size: 18px;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  padding: 8px 10px;
  background-color: #FCC800;
  border: none;
  border-radius: 8px;
  color: #111111;
  cursor: pointer;
  transition: all 0.2s ease;
  line-height: 1.4;

  &:hover {
    background-color: #F49E15;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 16px;
  }
`;
