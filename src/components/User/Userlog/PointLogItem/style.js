import styled from "styled-components";

export const PointLogWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 5px;
  margin-bottom: 10px;
  padding-top: 15px;
  width: 440px;
  height: 70px;
  background-color: ${(props) => props.backgroundColor || "#eff0f2"};
  border: 1px solid ${(props) => props.borderColor || "#EFF0F2"};
  border-radius: 8px;
  cursor: pointer;
`;

export const DateText = styled.span`
  margin-left: 70px;
  text-align: left;
  font-size: 23px;
`;

export const AmountText = styled.span`
  margin-right: 50px;
  text-align: right;
  font-size: 23px;
`;

export const DetailWrap = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  margin: 10px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: expand 0.3s ease-out;
  @keyframes expand {
    from {
      max-height: 0;
      opacity: 0;
    }
    to {
      max-height: 1000px;
      opacity: 1;
    }
  }
`;

export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;  // 추가된 부분
  margin-bottom: 10px;
`;

export const DetailLabel = styled.div`
  font-weight: bold;
  color: #333;
`;

export const DetailValue = styled.div`
  color: #666;
`;
export const ChargeTypeText = styled.span`
  font-size: 14px;
  color: #666;
  margin-left: 10px;
`;

export const DetailInput = styled.input`
  width: 80%; 
  padding: 8px;
  margin-top: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;

export const DetailSelect = styled.select`
  width: 60%; // 150%로 확대
  padding: 8px;
  margin-top: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;

export const ModalButton = styled.button`
  background-color: #F0CE00;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin: 10px 0;
  width: 100%; // 너비를 100%로 설정하여 부모 요소에 맞게 확장
  max-width: 300px; // 최대 너비를 설정하여 너무 길어지지 않도록 제한
  &:hover {
    background-color: #d4b200;
  }
`;

export const ModalCloseButton = styled.button`
  background-color: #41434C;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin: 10px 0;
  width: 100%; // 너비를 100%로 설정하여 부모 요소에 맞게 확장
  max-width: 300px; // 최대 너비를 설정하여 너무 길어지지 않도록 제한
  &:hover {
    background-color: #313338;
  }
`;

export const ModalHeader = styled.h2`
  text-align: center;
`;

export const ModalContent = styled.div`
  padding: 20px;
  text-align: left; // 왼쪽 정렬
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between; // 양쪽 정렬
  padding: 20px;
  text-align: center;
`;
