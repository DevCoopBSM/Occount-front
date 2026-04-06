import styled from 'styled-components';

const MOBILE_BREAKPOINT = '480px';
const TABLET_BREAKPOINT = '768px';

const mediaQuery = (breakpoint: string): string => `@media (max-width: ${breakpoint})`;

export const EventNoticeContainer = styled.div`
  position: relative;
  min-height: 100vh;
  background-color: #fff;
  padding: 0px 20px 80px;

  ${mediaQuery(TABLET_BREAKPOINT)} {
    padding: 30px 20px;
  }

  ${mediaQuery(MOBILE_BREAKPOINT)} {
    padding: 20px 15px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 760px;
  margin-bottom: 50px;
  position: relative;

  ${mediaQuery(TABLET_BREAKPOINT)} {
    margin-bottom: 40px;
  }

  ${mediaQuery(MOBILE_BREAKPOINT)} {
    margin-bottom: 30px;
  }
`;

export const Title = styled.h1`
  font-family: 'Pretendard', sans-serif;
  font-size: 32px;
  font-weight: 600;
  color: #111111;
  text-align: center;
  margin: 0;

  ${mediaQuery(TABLET_BREAKPOINT)} {
    font-size: 28px;
  }

  ${mediaQuery(MOBILE_BREAKPOINT)} {
    font-size: 24px;
  }
`;

export const EventBannersWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 760px;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${mediaQuery(TABLET_BREAKPOINT)} {
    max-width: 90%;
  }
`;

export const EventBannersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;

  ${mediaQuery(MOBILE_BREAKPOINT)} {
    gap: 12px;
  }
`;

export const EventBannerCard = styled.div`
  width: 100%;
  height: 150px;
  background-color: #d9d9d9;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  ${mediaQuery(TABLET_BREAKPOINT)} {
    height: 130px;
    border-radius: 12px;
  }

  ${mediaQuery(MOBILE_BREAKPOINT)} {
    height: 110px;
    border-radius: 10px;
  }
`;

export const NavigationButtons = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  position: absolute;
  right: 0;

  ${mediaQuery(MOBILE_BREAKPOINT)} {
    position: relative;
    margin-top: 15px;
  }
`;

export const NavButton = styled.button<{ disabled?: boolean }>`
  width: 30px;
  height: 30px;
  border: none;
  background-color: transparent;
  color: ${props => props.disabled ? '#ccc' : '#111'};
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  opacity: ${props => props.disabled ? 0.5 : 1};
  padding: 0;

  &:hover {
    color: ${props => props.disabled ? '#ccc' : '#f0ce00'};
    transform: ${props => props.disabled ? 'none' : 'scale(1.2)'};
  }

  &:active {
    transform: ${props => props.disabled ? 'none' : 'scale(0.95)'};
  }

  ${mediaQuery(MOBILE_BREAKPOINT)} {
    width: 28px;
    height: 28px;
    font-size: 24px;
  }
`;

