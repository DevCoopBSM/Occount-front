import styled from 'styled-components';
import CallLogo from 'assets/CallLogo.svg';
import { Link } from 'react-router-dom';

const MOBILE_BREAKPOINT = '480px';
const TABLET_BREAKPOINT = '768px';

// 미디어 쿼리 헬퍼 함수
const mediaQuery = (breakpoint: string): string => `@media (max-width: ${breakpoint})`;

export const Maintop = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1000px;
  padding: 10px 0;

  ${mediaQuery(TABLET_BREAKPOINT)} {
    padding: 8px 0;
  }

  ${mediaQuery(MOBILE_BREAKPOINT)} {
    padding: 5px 0;
  }
`;

export const Mainbottom = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  max-width: 1000px;
  background: #fff;
`;

export const MainContent = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 30px;

  ${mediaQuery(TABLET_BREAKPOINT)} {
    padding: 0 20px;
  }

  ${mediaQuery(MOBILE_BREAKPOINT)} {
    padding: 0 15px;
  }
`;

export const TopBox = styled.div`
  margin: 0 auto;
  padding: 15px;
  width: 100%;
  max-width: 970px;
  background: #41434c;
  border-radius: 50px 50px 0 0;

  ${mediaQuery(TABLET_BREAKPOINT)} {
    width: 100%;
    padding: 10px;
    border-radius: 25px 25px 0 0;
  }
`;

export const BottomBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 15px;
  width: 100%;
  max-width: 970px;
  background: #34343c;
  border-radius: 0 0 50px 50px;

  ${mediaQuery(TABLET_BREAKPOINT)} {
    width: 100%;
    padding: 10px;
    border-radius: 0 0 25px 25px;
  }
`;

export const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 970px;
  margin: 10px auto 0;
  gap: 15px;

  @media (min-width: 769px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  ${mediaQuery(TABLET_BREAKPOINT)} {
    width: 100%;
    margin: 10px auto 0;
  }

  ${mediaQuery(MOBILE_BREAKPOINT)} {
    width: 100%;
    margin: 10px auto 0;
    align-items: center;
  }
`;

export const UseBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 10px 0;
  padding: 15px;
  width: 100%;
  min-height: 200px;
  background: #f0ce00;
  border-radius: 12px;
  color: #fff;
  font-weight: 700;
  font-size: clamp(24px, 5vw, 40px);

  @media (min-width: 769px) {
    width: calc(50% - 10px);
    min-height: 270px;
  }
`;

export const UseBoxContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 15px;
`;

export const UseBoxText = styled.div`
  p {
    font-size: 15px;
    margin-top: 10px;
  }
`;

export const How2UseWrapper = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

export const AskBox = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  margin: 0 0 10px 0;
  width: 100%;
  min-height: 200px;
  background: #FFF4B2;
  border-radius: 12px;
  overflow: hidden;
  position: relative;

  @media (min-width: 769px) {
    width: calc(50% - 10px);
    min-height: 270px;
  }
`;

export const AskInTop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  padding: 20px;
  background-color: #FFF4B2;

  p {
    font-size: clamp(16px, 2.5vw, 24px);
    font-weight: 400;
    margin-bottom: 10px;
    line-height: 1.2;
  }

  span {
    font-size: clamp(20px, 3vw, 30px);
    font-weight: 600;
  }
`;

export const CallLogoWrapper = styled.div`
  width: 100%;
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  background-color: transparent;
`;

export const CallLogoStyle = styled.img.attrs({
  src: CallLogo,
  alt: 'Call Logo'
})`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: right bottom;
`;

export const UserlogLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 25px;
  color: #fff;
  text-align: center;
  border-radius: 10px;
  font-size: 24px; 
  font-weight: 400;
  text-decoration: none;
  background-color: rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  ${mediaQuery(MOBILE_BREAKPOINT)} {
    font-size: 20px;
    padding: 12px 20px;
  }
`;

export const DisabledUserlogLink = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 25px;
  color: #888;
  text-align: center;
  border-radius: 10px;
  font-size: 24px; 
  font-weight: 400;
  text-decoration: none;
  background-color: rgba(255, 255, 255, 0.1);
  cursor: not-allowed;

  ${mediaQuery(MOBILE_BREAKPOINT)} {
    font-size: 20px;
    padding: 12px 20px;
  }
`;

export const MainTopInBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  min-height: 150px;
  padding: 30px 20px;
  max-width: 800px;
  margin: 0 auto;
  gap: 20px;

  ${mediaQuery(TABLET_BREAKPOINT)} {
    flex-direction: column;
    align-items: center;
    padding: 20px;
    text-align: center;
  }
`;

export const TopBoxTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  ${mediaQuery(TABLET_BREAKPOINT)} {
    align-items: center;
    margin-bottom: 20px;
  }
`;

export const TopBoxText = styled.p`
  padding-top: 10px;
  font-size: clamp(16px, 2.7vw, 28.8px);
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TopBoxText2 = styled.p`
  font-size: clamp(24px, 5.4vw, 50.4px);
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ChargeButton = styled.button`
  font-size: clamp(24px, 3vw, 36px);
  background-color: rgb(240, 206, 0);
  border: none;
  border-radius: 75px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
  text-align: center;
  white-space: nowrap;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 300px;
  height: auto;
  aspect-ratio: 3 / 1;
  padding: 0;

  &:hover {
    background-color: rgb(250, 216, 10);
    transform: translateY(-3px);
    box-shadow: 0 9px 21px rgba(0, 0, 0, 0.25);
  }

  ${mediaQuery(TABLET_BREAKPOINT)} {
    font-size: clamp(20px, 2.5vw, 30px);
    max-width: 250px;
    aspect-ratio: 4 / 1;
  }

  ${mediaQuery(MOBILE_BREAKPOINT)} {
    font-size: clamp(18px, 2vw, 24px);
    max-width: 200px;
    aspect-ratio: 5 / 1;
  }
`;

export const ModalHeader = styled.h2`
  text-align: center;
  font-size: 24px;

  ${mediaQuery(MOBILE_BREAKPOINT)} {
    font-size: 20px;
  }
`;

export const ModalList = styled.ul`
  text-align: left;
  line-height: 1.6;
  padding-left: 20px;
  font-size: 16px;

  ${mediaQuery(MOBILE_BREAKPOINT)} {
    font-size: 14px;
    padding-left: 15px;
  }
`;

export const ModalListItem = styled.li`
  margin-bottom: 10px;

  ${mediaQuery(MOBILE_BREAKPOINT)} {
    margin-bottom: 8px;
  }
`;

export const ModalInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  ${mediaQuery(MOBILE_BREAKPOINT)} {
    flex-direction: column;
  }
`;

export const ModalInput = styled.input`
  font-size: 24px;
  padding: 8px;
  width: 60%;
  text-align: center;
  -webkit-appearance: none;
  margin: 0 10px;
  border: 1px solid #ccc;
  border-radius: 5px;

  ${mediaQuery(MOBILE_BREAKPOINT)} {
    font-size: 20px;
    width: 80%;
    margin: 10px 0;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  ${mediaQuery(MOBILE_BREAKPOINT)} {
    width: 100%;
    justify-content: space-between;
  }
`;

export const IncreaseButton = styled.button`
  font-size: 24px;
  padding: 8px 12px;
  margin-left: 10px;
  cursor: pointer;
  background-color: #f0ce00;
  border: none;
  border-radius: 5px;
  color: white;

  ${mediaQuery(MOBILE_BREAKPOINT)} {
    font-size: 20px;
    padding: 6px 10px;
  }
`;

export const DecreaseButton = styled(IncreaseButton)`
  margin-left: 0;
  margin-right: 10px;
`;

export const ModalButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  ${mediaQuery(MOBILE_BREAKPOINT)} {
    flex-direction: column;
    align-items: center;
  }
`;

export const ModalButton = styled.button`
  font-size: 20px;
  padding: 10px 20px;
  margin: 0 10px;
  width: 150px;
  background-color: #f0ce00;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;

  ${mediaQuery(MOBILE_BREAKPOINT)} {
    font-size: 18px;
    width: 80%;
    margin: 5px 0;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  ${mediaQuery(MOBILE_BREAKPOINT)} {
    flex-direction: column;
  }
`;

export const ModalFooterButton = styled(ModalButton)`
  font-size: 20 px;
  padding: 10px 20px;
  width: 48%;
  background-color: #f0ce00;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  ${mediaQuery(MOBILE_BREAKPOINT)} {
    font-size: 18px;
    width: 100%;
    margin-bottom: 10px;
  }
`;

export const TopBoxContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  ${mediaQuery(TABLET_BREAKPOINT)} {
    align-items: center;
  }
`;

export const PersonCountBoxWrapper = styled.div`
  width: 100%;
  background-color: transparent; // 배경색 제거
  padding: 0; // 패딩 제거
  margin: 0; // 마진 제거
`;

export const PersonCountBox = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0;

  ${mediaQuery(TABLET_BREAKPOINT)} {
    width: 100%;
  }

  ${mediaQuery(MOBILE_BREAKPOINT)} {
    width: 100%;
  }
`;