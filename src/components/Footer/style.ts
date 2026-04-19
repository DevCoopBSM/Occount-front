import styled from 'styled-components';

export const FooterWrapper = styled.footer`
  background-color: #2b2b2b;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const FooterContainer = styled.div`
  width: 100%;
  max-width: 1920px;
  padding: 32px 180px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 316px;

  @media (max-width: 1560px) {
    padding: 32px 80px;
  }

  @media (max-width: 1200px) {
    padding: 32px 40px;
  }

  @media (max-width: 768px) {
    padding: 32px 20px;
  }

  @media (max-width: 900px) {
    padding: 40px 20px;
  }
`;

export const Logo = styled.div`
  width: 144px;
  height: 28px;
  margin-bottom: 8px;
  margin-left: -10px;
  align-self: flex-start;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 24px;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
`;

export const AddressText = styled.p`
  font-family: 'Inter', 'Noto Sans KR', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 25.6px;
  color: #ffffff;
  margin: 0;
  margin-bottom: 8px;

  @media (max-width: 600px) {
    font-size: 14px;
    line-height: 20px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    line-height: 18px;
  }
`;

export const InfoLabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const InfoLabel = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

export const InfoLabelTitle = styled.p`
  font-family: 'Inter', 'Noto Sans KR', sans-serif;
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
  color: #ffffff;
  margin: 0;
  white-space: nowrap;

  @media (max-width: 600px) {
    font-size: 14px;
    line-height: 21px;
  }
`;

export const InfoLabelValue = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 25.6px;
  color: #ffffff;
  margin: 0;

  @media (max-width: 600px) {
    font-size: 14px;
    line-height: 22px;
  }
`;

export const UtilityLinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 36px;

  @media (max-width: 900px) {
    margin-top: 0;
  }
`;

export const UtilityLink = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
`;

export const UtilityLinkText = styled.p`
  font-family: 'Inter', 'Noto Sans KR', sans-serif;
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
  color: #ffffff;
  margin: 0;
  white-space: nowrap;
  display: flex;
  align-items: center;

  @media (max-width: 600px) {
    font-size: 16px;
    line-height: 24px;
  }
`;

export const FooterDivider = styled.div`
  border-top: 1px solid #6b7280;
  width: 100%;
  margin: 4px 0;
`;

export const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
`;

export const PolicyLinks = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;

  @media (max-width: 600px) {
    gap: 12px;
  }
`;

export const PolicyLink = styled.p`
  font-family: 'Inter', 'Noto Sans KR', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 25.6px;
  color: #d1d5db;
  margin: 0;
  cursor: pointer;

  @media (max-width: 600px) {
    font-size: 14px;
    line-height: 22px;
  }
`;

export const Copyright = styled.p`
  font-family: 'Inter', 'Noto Sans KR', sans-serif;
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
  color: #d1d5db;
  margin: 0;

  @media (max-width: 600px) {
    font-size: 16px;
    line-height: 24px;
  }
`;
