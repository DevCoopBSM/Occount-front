import styled from 'styled-components';

export const FooterWrapper = styled.footer`
  background-color: #4a4a4a;
  color: #ffffff;
  padding: 28px 10px;
  width: 100%;
`;

export const FooterContent = styled.div`
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const FooterInfo = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  line-height: 1.6;
  
  p {
    margin: 0;
  }
  
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const FooterSocial = styled.p`
  font-family: 'NanumSquareOTF', sans-serif;
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const FooterLine = styled.p`
  margin: 0;
  line-height: 1.5;
`;
