import styled from 'styled-components';

export const PointLogWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr; /* 가운데 항목을 더 넓게 설정 */
  align-items: center;
  padding: 10px;
  margin-bottom: 8px;
  background-color: ${props => props.backgroundColor || '#fff'};
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  width: 100%; /* 아이템의 너비를 100%로 설정하여 부모에 맞춤 */

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1.5fr 1fr;
    padding: 8px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
`;

export const DateText = styled.span`
  font-size: 14px;
  color: #666;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const AmountText = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #000;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const ChargeTypeText = styled.span`
  font-size: 14px;
  color: #666;
  text-align: right;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const DetailWrap = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 15px;
  margin-top: -5px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const DetailLabel = styled.div`
  font-weight: bold;
  color: #333;
`;

export const DetailValue = styled.div`
  color: #666;
`;

export const DetailInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;

export const DetailSelect = styled.select`
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;

export const ModalButton = styled.button`
  background-color: #f0ce00;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
  
  &:hover {
    background-color: #d4b200;
  }
`;

export const ModalCloseButton = styled.button`
  background-color: #41434c;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin: 10px 0;
  width: 100%;
  max-width: 300px;
  &:hover {
    background-color: #313338;
  }
`;

export const ModalHeader = styled.h2`
  text-align: center;
`;

export const ModalContent = styled.div`
  padding: 20px;
  text-align: left;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  text-align: center;
`;

export const TypeText = styled.span`
  font-size: 14px;
  color: #666;
  flex: 1;
  text-align: right;
`;
