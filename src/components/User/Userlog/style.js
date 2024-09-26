import styled from "styled-components";

export const CompeleteWrap = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
`;

export const ExChangeDetailWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const InfoText = styled.div`
  font-size: 20px;
  color: #333;
  font-weight: 600;
`;

export const Exchange = styled.p`
  font-size: 28px;
  font-weight: 700;
  color: #333;
`;

export const UseLogWrap = styled.div`
  margin-top: 20px;
`;

export const PointContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 30px; /* 두 내역 사이의 간격을 늘림 */
  margin: 0 auto;
  width: 90%; /* 전체 컨테이너의 너비를 넓게 설정 */

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%; /* 모바일에서는 100% 너비 사용 */
  }
`;

export const LogColumn = styled.div`
  flex: 1;
  width: 48%; /* 좌우 칸이 적당한 비율로 배분되도록 설정 */
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%; /* 모바일에서는 100% 너비 사용 */
  }
`;

export const LogContainer = styled.div`
  display: flex;
  justify-content: center; /* 내역들을 가운데 정렬 */
  gap: 50px; /* 사용 내역과 충전 내역 사이 간격 조정 */
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const LogTitle = styled.h2`
  font-size: 22px;
  margin-bottom: 15px;
  color: #000;
  font-weight: 600;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;

  .pagination {
    display: flex;
    list-style: none;
    padding: 0;
    flex-wrap: wrap;

    li {
      margin: 5px;

      a {
        padding: 8px 12px;
        border: 1px solid #f0ce00;
        border-radius: 4px;
        color: #f0ce00;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          background-color: #f0ce00;
          color: white;
        }
      }

      &.selected a {
        background-color: #f0ce00;
        color: white;
      }
    }
  }

  @media (max-width: 768px) {
    .pagination li a {
      padding: 6px 10px;
      font-size: 14px;
    }
  }
`;

export const PointLogWrap = styled.div`
  width: 100%; /* 부모 요소의 너비를 100% 사용 */
  padding: 15px;
  margin-bottom: 12px;
  background-color: ${props => props.backgroundColor || '#fff'};
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }

  @media (max-width: 768px) {
    width: 100%; /* 모바일에서도 100% 너비 유지 */
  }
`;

export const DateText = styled.span`
  font-size: 16px;
  color: #333;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const AmountText = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #000;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 16px;
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
  margin-bottom: 10px;
`;

export const DetailLabel = styled.div`
  font-weight: bold;
  color: #333;
`;

export const DetailValue = styled.div`
  color: #666;
`;

export const ModalButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 20px;
  cursor: pointer;
  width: 200px;
  display: flex;
  justify-content: center;
`;
