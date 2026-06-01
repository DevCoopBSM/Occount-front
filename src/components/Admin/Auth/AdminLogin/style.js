import styled from 'styled-components';

export const LogoImg = styled.img`
  margin-top: 41px;
  height: 90px;
  margin-bottom: 30px;
`;

export const LoginWrap = styled.form`
  margin: 0 auto;
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 600px;
`;

export const LoginInput = styled.input`
  width: 500px;
  height: 50px;
  border: none;
  border-bottom: 2px solid #d3d3d3;
  border-radius: 0%;
`;

export const LoginButton = styled.button`
  width: 500px;
  margin-top: 20px;
  background-color: #41434C;
`;

export const ModalOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border: 1px solid #888;
  width: 300px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const PageTitle = styled.div`
  font-size: 32px;
  margin-top: 20px;
  text-align: center;
  font-weight: 600;
`;
