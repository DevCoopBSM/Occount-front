// style.js
import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); // 배경 어둡게
`;

export const BoxSection = styled.div`
  width: 90%;
  max-width: 400px;
  margin: 0 auto;
`;

export const PaymentModal = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 16px;
  color: #1a1a1a;
`;

export const SubTitle = styled.h2`
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 8px;
  color: #333;
`;

export const Description = styled.p`
  font-size: 14px;
  text-align: center;
  color: #666;
  margin-bottom: 24px;
`;

export const NoticeBox = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
`;

export const NoticeText = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #495057;
  margin-bottom: 16px;
`;

export const InfoTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

export const InfoLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #495057;
  min-width: 80px;
`;

export const InfoValue = styled.span`
  font-size: 14px;
  color: #495057;
  flex: 1;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

export const PaymentButton = styled.button`
  flex: 1;
  padding: 14px;
  border-radius: 8px;
  border: none;
  background: #ffd43b;
  color: #1a1a1a;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #fcc419;
  }
`;

export const CancelButton = styled.button`
  flex: 1;
  padding: 14px;
  border-radius: 8px;
  border: 1px solid #dee2e6;
  background: white;
  color: #495057;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f8f9fa;
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
