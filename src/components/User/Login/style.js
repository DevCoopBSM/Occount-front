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
  height: 80px;  // 기존 100px에서 80%로 줄임
  margin-bottom: 40px;
`;

export const LogoSubText = styled.p`
  color: #000;
  font-style: normal;
  font-weight: 400;
  margin-bottom: 20px;
  text-align: center;
  width: 100%;
  font-size: clamp(14px, 2.5vw, 18px);  // 최대 글꼴 크기를 18px로 제한
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
  color: #000000; // 검은색으로 변경
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

export const ErrorMessage = styled.div`
  position: fixed;
  bottom: 30%; // 화면 하단에서 20px 위에 위치
  left: 50%;
  transform: translateX(-50%);
  background-color: #ffcccc;
  color: #ff0000;
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 1002; // LoadingOverlay보다 위에 오도록 z-index 증가
  font-size: clamp(14px, 2.5vw, 18px);
  text-align: center;
  max-width: 80%;
  animation: fadeInUp 0.5s ease-in-out;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

  @keyframes fadeInUp {
    from { 
      opacity: 0; 
      transform: translateX(-50%) translateY(20px); 
    }
    to { 
      opacity: 1; 
      transform: translateX(-50%) translateY(0); 
    }
  }

  @media (max-width: 768px) {
    font-size: clamp(12px, 2vw, 16px);
  }
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
