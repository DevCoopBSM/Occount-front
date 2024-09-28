import styled from "styled-components";

export const CompeleteWrap = styled.div`
  width: 100%;
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
  width: 100%;
`;

export const PointContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 20px; // 1. 간격을 조금 늘려 사용 내역과 충전 내역 구분을 명확히 함
`;

export const LogColumn = styled.div`
  width: 40%; // 2. 너비를 더 줄여 전체적인 가로 길이 감소
  max-width: 350px; // 3. 최대 너비 설정
  display: flex;
  flex-direction: column;
`;

export const LogContainer = styled.div`
  display: flex;
  justify-content: center; /* 내역들을 가운데 정렬 */
  gap: 50px; /* 사용 내역과 충전 내역 사이 간격 조정 */
  margin-top: 20px;
`;

export const LogTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
  text-align: center;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  flex-wrap: wrap;

  .pagination {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    flex-wrap: wrap;
    justify-content: center;

    li {
      margin: 2px;

      a {
        padding: 6px 10px;
        border: 1px solid #f0ce00;
        border-radius: 4px;
        color: #f0ce00;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 14px;

        &:hover {
          background-color: #f0ce00;
          color: white;
        }
      }

      &.selected a {
        background-color: #f0ce00;
        color: white;
      }

      @media (max-width: 576px) {
        a {
          padding: 4px 8px;
          font-size: 12px;
        }
      }
    }
  }

  @media (max-width: 576px) {
    margin-top: 10px;
  }
`;

export const PointLogWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-bottom: 8px;
  background-color: ${props => props.backgroundColor || '#fff'};
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  cursor: pointer;

  @media (max-width: 576px) {
    padding: 8px;
  }
`;

export const DateText = styled.span`
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
`;

export const AmountText = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #000;
  margin-bottom: 4px;
`;

export const ChargeTypeText = styled.span`
  font-size: 12px;
  color: #666;
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
