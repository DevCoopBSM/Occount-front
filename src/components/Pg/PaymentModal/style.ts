import styled from 'styled-components';
import Modal from 'components/Modal';

const MOBILE_BREAKPOINT = '480px';

export const StyledModal = styled(Modal).attrs((props) => ({
  style: {
    width: "800px",
    maxWidth: "90%",
    backgroundColor: "#fff",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
    borderRadius: "12px",
    padding: "40px",
    position: "relative",
    ...props.style,
  }
}))`
  @media (max-width: ${MOBILE_BREAKPOINT}) {
    ${props => props.style?.mobileFullScreen && `
      .modal-content {
        width: 100%;
        height: 100vh;
        margin: 0;
        border-radius: 0;
      }
    `}
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 40px;
  right: 20px;
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
  
  &:hover {
    opacity: 0.7;
  }

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const ModalHeader = styled.h2`
  font-size: 32px;
  font-weight: 600;
  color: #111111;
  margin: 0 0 20px 0;
  padding: 0;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;

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
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 25px;
  
  span {
    font-size: 18px;
    color: #F49E15;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 15px;
    
    span {
      font-size: 16px;
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
  gap: 25px;
  margin-bottom: 20px;
  font-size: 18px;
  line-height: 24px;
  color: #111111;
  list-style: none;
  padding: 0;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 16px;
    gap: 20px;
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
  margin: 20px 0 50px 0;
  gap: 20px;
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
  margin-top: 40px;
  width: 100%;
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
