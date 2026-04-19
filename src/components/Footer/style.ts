import styled from 'styled-components';

export const FooterWrapper = styled.footer`
  background-color: #2b2b2b;
  padding: 32px 180px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 316px;
  justify-content: center;

  @media (max-width: 1200px) {
    padding: 32px 60px;
  }

  @media (max-width: 768px) {
    padding: 32px 20px;
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

  @media (max-width: 768px) {
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
`;

export const InfoLabelValue = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 25.6px;
  color: #ffffff;
  margin: 0;
`;

export const UtilityLinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 36px;
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

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
`;

export const PolicyLinks = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

export const PolicyLink = styled.p`
  font-family: 'Inter', 'Noto Sans KR', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 25.6px;
  color: #d1d5db;
  margin: 0;
  cursor: pointer;
`;

export const Copyright = styled.p`
  font-family: 'Inter', 'Noto Sans KR', sans-serif;
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
  color: #d1d5db;
  margin: 0;
`;
