import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

export const ModalContent = styled.div`
  position: absolute;
  width: 90%; // 퍼센트로 변경
  max-width: 600px; // 최대 너비 설정
  max-height: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 95%;
    padding: 15px;
  }

  @media (max-width: 480px) {
    width: 100%;
    height: 100%;
    max-height: none;
    border-radius: 0;
    padding: 10px;
  }
`;
