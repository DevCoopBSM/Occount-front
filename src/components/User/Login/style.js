import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85vh;
  background-color: #ffffff;
`;

export const LogoImg = styled.img`
  height: 100px;
  margin-bottom: 50px;
`;

export const LogoSubText = styled.p`
  color: #000;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  margin-bottom: 10px;
`;

export const LoginWrap = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
`;

export const InputContainer = styled.div`
  width: 50%;
  padding: 20px;
  margin-bottom: 20px;
`;

export const LoginInput = styled.input`
  width: 100%;
  height: 60px;
  border: none;
  margin-bottom: 5px;
  padding: 10px;
  border-radius: 4px;
  background: #F2F2F2;

  color: #808080;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
`;

export const ActionLinks = styled.div`
  display: flex;
  justify-content: space-between;
  width: 20%;
  height: 100px;
  margin-bottom: 20px;
`;

export const ActionButton = styled.button`
  width: 100%;
  background: none;
  border: none;
  cursor: pointer;
  color: #0085FF;
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
`;

export const LoginButton = styled.button`
  width: 48%;
  height: 80px;
  background-color: #41434C;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  color: #FFF;
  font-size: 32px;
  font-style: normal;
  font-weight: 800;
  line-height: 40px; /* 125% */
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  width: 300px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  text-align: center;
`;
