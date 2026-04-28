import styled from 'styled-components';

export const CompeleteWrap = styled.div`
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  padding: 34px 180px 85px;
  box-sizing: border-box;

  @media (max-width: 1600px) {
    padding: 34px 120px 85px;
  }

  @media (max-width: 1440px) {
    padding: 34px 80px 85px;
  }

  @media (max-width: 1200px) {
    padding: 34px 40px 85px;
  }

  @media (max-width: 768px) {
    padding: 20px 20px 50px;
  }
`;