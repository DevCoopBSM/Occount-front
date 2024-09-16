import styled from 'styled-components';
import { ReactComponent as CallLogo } from 'assets/CallLogo.svg';
import { Link } from 'react-router-dom';

export const Maintop = styled.div`
  margin: 0 auto;
  width: 100%;
  height: auto;
  padding: 20px 0;

  @media (max-width: 480px) {
    padding: 10px 0;
  }
`;

export const Mainbottom = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  max-width: 1000px;
  height: auto;
  background: #fff;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const TopBox = styled.div`
  margin: 0 auto;
  padding: 20px;
  width: 100%;
  max-width: 970px;
  height: auto;
  background: #41434c;
  border-radius: 50px 50px 0 0;

  @media (max-width: 480px) {
    width: 90%;
    padding: 15px;
    border-radius: 25px 25px 0 0;
  }
`;

export const BottomBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 20px;
  width: 100%;
  max-width: 970px;
  height: auto;
  background: #34343c;
  border-radius: 0 0 50px 50px;

  @media (max-width: 480px) {
    width: 90%;
    padding: 15px;
    border-radius: 0 0 25px 25px;
    flex-direction: column;
  }
`;

export const UseBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px 10px 15px 15px;
  padding: 20px;
  width: 400px;
  height: 270px;
  background: #f0ce00;
  border-radius: 12px;
  color: #fff;
  font-weight: 700;
  font-size: 40px;

  @media (max-width: 480px) {
    width: 90%;
    margin: 10px 0;
    font-size: 30px;
    height: auto;
  }
`;

export const UseBoxContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
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
  display: flex;
  flex-direction: column;
  margin: 15px 10px 15px 10px;
  width: 550px;
  height: 270px;
  background: #FFF4B2;
  border-radius: 12px;

  @media (max-width: 480px) {
    width: 90%;
    margin: 10px 0;
    height: auto;
  }
`;

export const AskInTop = styled.div`
  display: flex;
  width: 100%;
  height: 150px;
  background-color: #FFF4B2;
  border-radius: 12px;

  a {
    display: block;
    width: 100%;
    height: 50px;
    margin: 20px;
    font-size: 30px;
    font-weight: 600;
    color: #000;
  }

  @media (max-width: 480px) {
    a {
      font-size: 20px;
    }
    p {
      font-size: 18px !important;
    }
  }
`;

export const CallLogoStyle = styled(CallLogo)`
  width: 550px;
  height: 300px;
  border-radius: 12px;

  @media (max-width: 480px) {
    width: 100%;
    height: auto;
    max-height: 150px;
  }
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

  @media (max-width: 480px) {
    font-size: 20px;
    padding: 12px 20px;
  }
`;

export const MainTopInBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  color: #fff;
  height: 150px; // 고정 높이 추가

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    height: auto;
  }
`;

export const TopBoxTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 480px) {
    align-items: center;
    margin-bottom: 20px;
  }
`;

export const TopBoxText = styled.p`
  padding-top: 10px;
  font-size: 24px;
  font-weight: 400;

  @media (max-width: 480px) {
    font-size: 20px;
    padding-top: 5px;
  }
`;

export const TopBoxText2 = styled.p`
  font-size: 40px;
  font-weight: 600;

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

export const ChargeButton = styled.button`
  font-size: 28px;

  width: 20%;
  background-color: rgb(240, 206, 0);
  border: none;
  border-radius: 15px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;

  @media (max-width: 480px) {
    font-size: 16px;
    font-weight: 400;
    width: 30%;
  }
`;

export const ModalHeader = styled.h2`
  text-align: center;
  font-size: 24px;

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

export const ModalList = styled.ul`
  text-align: left;
  line-height: 1.6;
  padding-left: 20px;
  font-size: 16px;

  @media (max-width: 480px) {
    font-size: 14px;
    padding-left: 15px;
  }
`;

export const ModalListItem = styled.li`
  margin-bottom: 10px;

  @media (max-width: 480px) {
    margin-bottom: 8px;
  }
`;

export const ModalInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 480px) {
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

  @media (max-width: 480px) {
    font-size: 20px;
    width: 80%;
    margin: 10px 0;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 480px) {
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

  @media (max-width: 480px) {
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

  @media (max-width: 480px) {
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

  @media (max-width: 480px) {
    font-size: 18px;
    width: 80%;
    margin: 5px 0;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 480px) {
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
  @media (max-width: 480px) {
    font-size: 18px;
    width: 100%;
    margin-bottom: 10px;
  }
`;
