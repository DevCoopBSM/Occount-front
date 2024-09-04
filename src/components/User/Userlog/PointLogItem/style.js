import styled from 'styled-components';

export const PointLogWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 5px;
  margin-bottom: 10px;
  padding: 10px 15px;
  width: 100%;
  max-width: 500px;
  height: auto;
  background-color: ${(props) => props.backgroundColor || '#eff0f2'};
  border: 1px solid ${(props) => props.borderColor || '#EFF0F2'};
  border-radius: 8px;
  cursor: pointer;
`;

export const DateText = styled.span`
  margin-left: 10px;
  text-align: left;
  font-size: 16px;
`;

export const AmountText = styled.span`
  margin-right: 10px;
  text-align: right;
  font-size: 16px;
`;

export const DetailWrap = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 15px;
  margin: 10px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
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

// 누락된 ChargeTypeText 정의 추가
export const ChargeTypeText = styled.span`
  font-size: 14px; // 글씨 크기를 약간 작게 설정
  color: #666; // 회색 톤으로 설정
  margin-left: 10px;
`;

export const ModalButton = styled.button`
  background-color: #f0ce00;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin: 10px 0;
  width: 100%;
  max-width: 300px;
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
