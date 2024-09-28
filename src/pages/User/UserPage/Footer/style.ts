import styled from 'styled-components';

export const FooterWrapper = styled.footer`
  background-color: #4a4a4a;
  color: #ffffff;
  padding: 1rem;
  font-size: 0.9rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FooterLine = styled.p`
  margin: 0.3rem 0;
  line-height: 1.5;
`;