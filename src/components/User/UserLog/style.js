import styled from "styled-components";

export const CompeleteWrap = styled.div`
  width: 100%;
  max-width: 1560px;
  margin: 0 auto;
  padding: 34px 180px 85px;
  box-sizing: border-box;
`;

export const PageTitle = styled.h1`
  font-family: 'Pretendard', sans-serif;
  font-size: 32px;
  font-weight: 600;
  color: #111111;
  margin-bottom: 25px;
  line-height: 1.4;
`;

export const TabContainerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
  width: 100%;
`;

export const TabContainer = styled.div`
  display: flex;
  gap: 20px;
  width: 350px;
  align-items: center;
`;

export const TabButton = styled.button`
  flex: 1;
  padding: 5px 10px;
  border-radius: 0;
  height: 31px;
  background: transparent;
  border: none;
  border-bottom: ${props => props.active ? '2px solid #fcc800' : 'none'};
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
  font-weight: ${props => props.active ? '400' : '400'};
  color: #111111;
  line-height: 21px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    opacity: ${props => props.active ? '1' : '0.7'};
  }
`;

export const TabNavigationContainer = styled.div`
  display: flex;
  gap: 0;
  align-items: center;
`;

export const TabNavigationArrow = styled.button`
  width: 30px;
  height: 30px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: all 0.3s ease;

  svg path {
    fill: #CCCCCC;
    transition: fill 0.3s ease;
  }

  &:hover svg path {
    fill: #111111;
  }
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
  font-size: 18px;
  color: #495057;
`;

export const Exchange = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #343a40;
`;

export const UseLogWrap = styled.div`
  position: relative;
`;

export const LogTitles = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

export const LogTitle = styled.div`
  width: 48%;
  padding: 10px;
  background-color: #F0CE00;
  color: white;
  text-align: center;
  border-radius: 8px 8px 0 0;
  font-weight: bold;
`;

export const LogContainer = styled.div`
  display: flex;
  gap: 24px;
  width: 100%;
`;

export const LogColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const LogContent = styled.div`
  display: flex;
  width: 100%;
`;

export const LogPage = styled.div`
  display: flex;
  width: 100%;
`;

export const LogSubTitle = styled.h3`
  text-align: center;
  margin-bottom: 10px;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  background-color: #f8f9fa;
`;

export const PageNumber = styled.button`
  background-color: #F0CE00;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const PageIndicator = styled.span`
  margin: 0 10px;
  font-size: 16px;
  color: #495057;
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

export const LogSection = styled.div`
  width: 100%;
`;

// PointLogItem 컴포넌트의 스타일을 조정하여 사용 내역과 충전 내역의 배경색을 다르게 설정하세요
