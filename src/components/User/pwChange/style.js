import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85vh;
  background-color: #ffffff;
  padding: 0 20px;
`;


export const LogoImg = styled.img`
  height: 64px; 
  margin-bottom: 32px; 
`;

export const PwChangeWrap = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  max-width: 500px;
`;

export const InputContainer = styled.div`
  width: 100%;
  padding: 20px;
  margin-bottom: 20px;
`;

export const PwChangeInput = styled.input`
  width: 100%;
  height: 60px;
  border: none;
  margin-bottom: 5px;
  padding: 10px;
  border-radius: 4px;
  background: #F2F2F2;
  color: #808080;
  font-style: normal;
  font-weight: 400;
  font-size: clamp(16px, 3vw, 24px);
`;

export const PwChangeEmailContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const VerifyButton = styled.button`
  width: 20%;
  height: 60px;
  margin-left: 5px;
  outline: 2px solid var(--Gray, #999);
  background-color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  color: #808080;
  font-size: 24px;
  font-weight: 400;
`;

export const PwChangeButton = styled.button`
  width: 100%;
  max-width: 400px;
  height: clamp(50px, 8vw, 80px);
  background-color: #41434C;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-style: normal;
  font-weight: 800;
  line-height: 40px;
  font-size: clamp(20px, 4vw, 32px);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    max-width: 80%;
    height: clamp(40px, 6vw, 60px);
    font-size: clamp(16px, 3vw, 24px);
  }
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

export const SuccessMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

export const SuccessMessage = styled.div`
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 400;
  color: #4CAF50; /* 성공 메시지 색상 */
`;