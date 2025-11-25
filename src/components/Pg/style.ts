// style.ts
import styled from 'styled-components';

const MOBILE_BREAKPOINT = '480px';

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

export const BoxSection = styled.div`
  width: 800px;
  max-width: 90%;
  margin: 0 auto;
  
  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 95%;
  }
`;

export const PaymentModal = styled.div`
  background: white;
  border-radius: 12px;
  padding: 40px;
  width: 100%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  position: relative;
  
  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 24px;
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
  
  &:hover {
    opacity: 0.7;
  }

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 600;
  color: #111111;
  margin: 0 0 20px 0;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  
  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 24px;
  }
`;

export const HighlightBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: #FFF3D8;
  padding: 10px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  
  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 10px 15px;
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

export const HighlightText = styled.p`
  font-size: 18px;
  color: #F49E15;
  margin: 0;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  
  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 16px;
  }
`;

export const NoticeBox = styled.div`
  margin-bottom: 20px;
`;

export const NoticeText = styled.p`
  font-size: 18px;
  line-height: 24px;
  color: #111111;
  margin: 0 0 14px 0;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  
  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 16px;
  }
`;

export const InfoTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 40px;
  font-size: 18px;
  color: #111111;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  
  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 16px;
    gap: 20px;
    flex-direction: column;
  }
`;

export const InfoLabel = styled.span`
  font-weight: 600;
  white-space: nowrap;
`;

export const InfoValue = styled.span`
  line-height: 24px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 40px;
  
  @media (max-width: ${MOBILE_BREAKPOINT}) {
    flex-direction: column-reverse;
    gap: 12px;
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

export const PaymentButton = styled.button`
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

export const LoadingModalWrapper = styled.div`
  padding: 24px;
  width: 90%;
  max-width: 300px;
  margin: 0 auto;
  text-align: center;
  
  @media (max-width: 480px) {
    width: 95%;
    padding: 20px;
    border-radius: 12px;
  }
`;

export const LoadingText = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #1a1a1a;  // 글자색을 더 진하게
  margin: 0;
  line-height: 1.5;
  word-break: keep-all;
  text-align: center;
  
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;
