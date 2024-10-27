import styled, { css, keyframes } from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85vh;
  background-color: #ffffff;
  padding: 0 20px;
`;

export const LogoImg = styled.img`
  height: 80px;
  margin-bottom: 40px;
`;

export const LogoSubText = styled.p`
  color: #000;
  font-style: normal;
  font-weight: 400;
  margin-bottom: 20px;
  text-align: center;
  width: 100%;
  font-size: clamp(14px, 2.5vw, 18px);
  line-height: 1.2;
  max-height: 2.4em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  transition: font-size 0.3s ease;

  @media (max-width: 768px) {
    font-size: clamp(12px, 2vw, 16px);
  }
`;

export const LoginWrap = styled.form`
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

export const LoginInput = styled.input`
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

export const ActionLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 20px 0;
`;

export const ActionButton = styled.button`
  flex: 1;
  background: none;
  border: none;
  cursor: pointer;
  color: #0085FF;
  font-style: normal;
  font-weight: 400;
  font-size: clamp(16px, 3vw, 22px);
  white-space: nowrap;
  padding: 0 10px;
  text-align: center;
  transition: font-size 0.3s ease;

  @media (max-width: 768px) {
    font-size: clamp(14px, 2.5vw, 18px);
  }
`;

export const Divider = styled.span`
  color: #000000;
  padding: 0 10px;
  flex: 0 0 auto;
`;

export const LoginButton = styled.button`
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

const fadeInUp = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(20px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
`;

const fadeOutDown = keyframes`
  from { 
    opacity: 1; 
    transform: translateY(0); 
  }
  to { 
    opacity: 0; 
    transform: translateY(20px); 
  }
`;

export const ErrorMessageWrapper = styled.div`
  position: absolute;
  bottom: 35%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1002;
`;

interface ErrorMessageProps {
  isVisible: boolean;
}

export const ErrorMessage = styled.div<ErrorMessageProps>`
  background-color: #ff6b6b;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 16px;
  text-align: center;
  width: 80%;
  max-width: 400px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  
  ${({ isVisible }) => isVisible
    ? css`
        animation: ${fadeInUp} 0.5s ease-in-out;
        opacity: 1;
        visibility: visible;
      `
    : css`
        animation: ${fadeOutDown} 0.5s ease-in-out;
        opacity: 0;
        visibility: hidden;
      `
  }
  
  transition: visibility 0.5s, opacity 0.5s;
`;

export const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
`;

export const RememberMeContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 20px;
`;

export const RememberMeCheckbox = styled.input`
  margin-right: 10px;
  cursor: pointer;
`;

export const RememberMeLabel = styled.label`
  font-size: clamp(14px, 2.5vw, 16px);
  color: #808080;
  cursor: pointer;
  user-select: none;

  @media (max-width: 768px) {
    font-size: clamp(12px, 2vw, 14px);
  }
`;
