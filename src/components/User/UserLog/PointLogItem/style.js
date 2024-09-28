import styled from 'styled-components';

export const PointLogWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px; // 4. 패딩을 조금 늘려 내용이 더 잘 보이게 함
  margin-bottom: 10px;
  background-color: ${props => props.backgroundColor || '#fff'};
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  width: 100%;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center; // 중앙 정렬로 변경
  }
`;

export const DateText = styled.span`
  font-size: 14px; // 5. 글꼴 크기 증가
  color: #666;
  width: 30%;
  text-align: left;

  @media (max-width: 480px) {
    width: 100%;
    margin-bottom: 5px;
    text-align: center; // 중앙 정렬
  }
`;

export const AmountText = styled.span`
  font-size: 16px; // 5. 글꼴 크기 증가
  font-weight: 600;
  color: #000;
  width: 40%;
  text-align: center;

  @media (max-width: 480px) {
    width: 100%;
    margin-bottom: 5px;
  }
`;

export const ChargeTypeText = styled.span`
  font-size: 12px; // 9. 폰트 크기 줄임
  color: #666;
  width: 30%;
  text-align: right;

  @media (max-width: 480px) {
    width: 100%;
    text-align: center; // 중앙 정렬
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
  font-size: 18px; /* 글꼴 크기를 18px로 증가 */
  font-weight: bold; /* 글꼴 두께를 bold로 설정 */
  margin-top: 10px;
  width: 100%; /* 가로 길이를 100%로 설정여 부모 요소에 맞춤 */
  
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
  font-size: 18px; /* 글꼴 크기를 18px로 증가 */
  font-weight: bold; /* 글꼴 두께를 bold로 설정 */
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

