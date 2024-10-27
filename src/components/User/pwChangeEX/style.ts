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
  height: 50px;
  border: 1px solid #E0E0E0;
  margin-bottom: 5px;
  padding: 10px;
  border-radius: 4px;
  background: #FFFFFF;
  color: #333333;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #41434C;
    box-shadow: 0 0 0 2px rgba(65, 67, 76, 0.2);
  }
`;

export const PwChangeButton = styled.button`
  width: 100%;
  max-width: 400px;
  height: 50px;
  background-color: #41434C;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #2E303A;
  }

  &:disabled {
    background-color: #CCCCCC;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    font-size: 16px;
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

export const ErrorMessage = styled.p`
  color: #f44336;
  font-size: 14px;
  margin-top: 5px;
  margin-bottom: 10px;
  text-align: left;
  width: 100%;
`;

export const InputWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;
