import styled from 'styled-components';

interface PointLogWrapProps {
  backgroundColor?: string;
}

export const PointLogWrap = styled.div<PointLogWrapProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  background-color: ${props => props.backgroundColor || '#fff'};
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  width: 100%;

  @media (max-width: 620px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const DateText = styled.span`
  font-size: clamp(14px, 2vw, 16px);
  color: #666;
  width: 30%;
  text-align: center;

  @media (max-width: 620px) {
    width: 100%;
    margin-bottom: 5px;
  }
`;

export const AmountText = styled.span`
  font-size: clamp(16px, 2.5vw, 20px);
  font-weight: 600;
  color: #000;
  width: 40%;
  text-align: center;

  @media (max-width: 620px) {
    width: 100%;
    margin-bottom: 5px;
  }
`;

export const ChargeTypeText = styled.span`
  font-size: clamp(12px, 1.8vw, 14px);
  color: #666;
  width: 30%;
  text-align: center;

  @media (max-width: 620px) {
    width: 100%;
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
  margin-bottom: 8px;
  font-size: 14px;
`;

export const DetailLabel = styled.div`
  font-weight: bold;
  color: #333;
  width: 40%;
`;

export const DetailValue = styled.div`
  color: #666;
  width: 60%;
  text-align: right;
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
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
  width: 100%;
  
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
  font-size: 18px;
  font-weight: bold;
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
`;
