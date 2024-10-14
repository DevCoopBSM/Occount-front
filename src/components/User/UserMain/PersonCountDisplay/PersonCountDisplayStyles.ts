import styled from 'styled-components';

export const Container = styled.div<{ color: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.color};
  padding: 15px 20px;
  border-radius: 12px;
  margin: 15px 0;
  width: 100%;
  box-sizing: border-box;
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Title = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #000000;
  font-family: 'Noto Sans KR', sans-serif;
`;

export const Count = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #000000;
  font-family: 'Noto Sans KR', sans-serif;
`;

export const Status = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #000000;
  font-family: 'Noto Sans KR', sans-serif;
`;