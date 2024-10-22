import styled from 'styled-components';
import { ReactComponent as CallLogo } from 'assets/CallLogo.svg';
import { Link } from 'react-router-dom';
import Modal from 'components/Modal';  // 프로젝트의 Modal 컴포넌트 경로에 맞게 수정해주세요

const MOBILE_BREAKPOINT = '480px';
const TABLET_BREAKPOINT = '768px';

export const Maintop = styled.div`
  margin: 0 auto;
  width: 1000px;
  height: 400px;
`;

export const Mainbottom = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  max-width: 1000px;
  background: #fff;
`;

export const TopBox = styled.div`
  margin: 0 auto;
  padding: 70px;
  width: 970px;
  height: 250px;
  background: #41434c;
  border-radius: 50px 50px 0 0;
`;

export const BottomBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding: 70px;

  width: 970px;
  height: 100px;
  background: #34343c;
  border-radius: 0 0 50px 50px;
`;

export const UseBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 15px 10px 15px 15px;
  padding: 20px;

  width: 400px;
  height: 270px;

  background: #f0ce00;
  border-radius: 12px;

  color: #fff;
  font-weight: 700;
  font-size: 40px;

  p {
    display: block;
    width: 200px;
    font-size: 15px;
  }
`;

export const AskBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px 10px 15px 10px;
  width: 550px;
  height: 270px;
  background: #fff;
  border-radius: 12px;
`;

export const Infotext = styled.p`
  font-size: 20px;
  text-align: center;
  color: #fff;
`;

export const AskInTop = styled.div`
  display: flex;
  width: 100%;
  height: 150px;
  background-color: #fff;
  border-radius: 12px;

  a {
    display: block;
    width: 150px;
    height: 50px;

    margin: 20px;
    font-size: 30px;
    font-weight: 600;
    color: #8a8a8a;
  }
`;

export const CallLogoStyle = styled(CallLogo)`
  width: 550px;
  height: 300px;
  border-radius: 12px;
`;

export const UserlogLink = styled(Link)`
  color: #fff;
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

  @media (max-width: ${TABLET_BREAKPOINT}) {
    flex-direction: column;
    align-items: center;
    padding: 20px;
    text-align: center;
  }
`;

export const TopBoxContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: ${TABLET_BREAKPOINT}) {
    align-items: center;
  }
`;

export const TopBoxText = styled.p`
  padding-top: 10px;
  font-size: clamp(20px, 3vw, 32px);
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TopBoxText2 = styled.p`
  font-size: clamp(32px, 6vw, 56px);
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ChargeButton = styled.button`
  font-size: clamp(20px, 2.5vw, 28px);
  min-width: 140px;
  padding: 14px 28px;
  background-color: rgb(240, 206, 0);
  border: none;
  border-radius: 50px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  text-align: center;
  white-space: nowrap;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: rgb(250, 216, 10);
    transform: translateY(-2px);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.25);
  }

  @media (max-width: ${TABLET_BREAKPOINT}) {
    margin-top: 20px;
    padding: 12px 24px;
  }
`;

export const ModalHeader = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 16px;
  }
`;

export const ModalContent = styled.div`
  padding: 15px;
  font-size: 14px;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 10px;
    font-size: 12px;
  }
`;

export const ModalList = styled.ul`
  text-align: left;
  line-height: 1.6;
  padding-left: 20px;
  font-size: clamp(12px, 2vw, 16px);
  margin-bottom: 20px;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: clamp(10px, 2.5vw, 14px);
  }
`;

export const ModalListItem = styled.li`
  margin-bottom: clamp(8px, 1.5vw, 10px);
`;

export const ModalInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 300px;
  background-color: white;
  border-radius: 5px;
  padding: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

export const ModalInput = styled.input`
  font-size: clamp(18px, 2.5vw, 24px);
  padding: 8px;
  width: 60%;
  text-align: center;
  border: none;
  -webkit-appearance: none;
  margin: 0;

  &:focus {
    outline: none;
  }
`;

export const IncreaseButton = styled.button`
  font-size: clamp(18px, 2.5vw, 24px);
  padding: 8px 12px;
  cursor: pointer;
  background-color: #f0ce00;
  border: none;
  border-radius: 5px;
  color: white;
  margin-left: 5px;
`;

export const DecreaseButton = styled(IncreaseButton)`
  margin-right: 5px;
  margin-left: 0;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  width: 100%;
`;

export const ModalFooterButton = styled.button`
  font-size: 18px; /* 글꼴 크기를 18px로 증가 */
  font-weight: bold; /* 글꼴 두께를 bold로 설정 */
  padding: 10px 20px;
  width: 40%;
  max-width: 200px;
  background-color: #f0ce00;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #e0be00;
    transform: translateY(-2px);
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 16px; /* 모바일에서 글꼴 크기를 16px로 설정 */
    padding: 8px 16px;
    width: 45%;
  }
`;

export const BoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  max-width: 1000px;

  @media (max-width: ${TABLET_BREAKPOINT}) {
    flex-direction: column;
    align-items: center;
  }
`;

export const HighlightText = styled.p`
  font-size: clamp(14px, 2.5vw, 20px);
  font-weight: bold;
  color: #000;
  text-align: center;
  margin-bottom: 20px;
  padding: 10px;
  background-color: rgba(240, 206, 0, 0.3);
  border-radius: 5px;
  word-break: keep-all;
  line-height: 1.4;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: clamp(12px, 3vw, 16px);
    padding: 8px;
  }

  span {
    color: red;
  }
`;

export const SubList = styled.ul`
  list-style-type: none;
  padding-left: 20px;
  margin-top: 10px;
`;

export const SubListItem = styled.li`
  font-size: clamp(12px, 1.8vw, 14px);
  margin-bottom: 5px;
  
  &:before {
    content: "•";
    color: #f0ce00;
    font-weight: bold;
    display: inline-block;
    width: 1em;
    margin-left: -1em;
  }
`;

export const StyledModal = styled(Modal)`
  .modal-content {
    width: 90%;
    max-width: none; // 최대 너비 제한 제거
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    
    @media (max-width: ${TABLET_BREAKPOINT}) {
      width: 95%;
      padding: 15px;
    }

    @media (max-width: ${MOBILE_BREAKPOINT}) {
      width: 100%;
      padding: 10px;
      border-radius: 0; // 모바일에서는 전체 화면으로
    }
  }
`;
