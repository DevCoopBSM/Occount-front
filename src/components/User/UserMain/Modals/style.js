import styled from 'styled-components';
import { ReactComponent as CallLogo } from 'assets/CallLogo.svg';
import { Link } from 'react-router-dom';

export const Maintop = styled.div`
  margin: 0 auto;
  width: 1000px;
  height: 400px;
`;

export const Mainbottom = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: 1000px;
  height: 300px;
  background: #e3e5e7;
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
  margin-top: 20px;
  font-size: 20px;
  color: #fff;
  p {
    margin-top: 10px;
    font-size: 50px;
    font-weight: 600;
  }
`;

export const ChargeButton = styled.button`
  font-size: 24px;
  padding: 10px 10px;
  margin-top: 20px;
  background-color: rgb(240, 206, 0);
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 90px;
  height: 90px;
`;

export const ModalHeader = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

export const ModalList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
`;

export const ModalListItem = styled.li`
  background-color: #f1f1f1;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 10px;
  font-size: 16px;
  line-height: 1.5;

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 10px;
  }
`;

export const HighlightText = styled.span`
  color: red;
  font-weight: bold;
  font-size: 24px;
  display: block;
  text-align: center;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

export const ModalInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const ModalInput = styled.input`
  font-size: 24px;
  padding: 8px;
  width: 60%;
  text-align: center;
  -webkit-appearance: none;
  margin: 0;
  border: 1px solid #ccc;
  border-radius: 5px;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  & {
    -moz-appearance: textfield;
  }

  @media (max-width: 480px) {
    font-size: 20px;
    width: 80%;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;

  @media (max-width: 480px) {
    flex-direction: column;
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
    margin: 10px 0 0 0;
  }
`;

export const DecreaseButton = styled(IncreaseButton)`
  margin-left: 10px;

  @media (max-width: 480px) {
    margin: 10px 0 0 0;
  }
`;

export const ModalButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    flex-direction: column;
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
    width: 100%;
    margin: 5px 0;
  }
`;

export const ModalFooterButton = styled(ModalButton)`
  flex: 1;

  @media (max-width: 480px) {
    width: 100%;
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
