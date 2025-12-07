import styled from 'styled-components';

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: clamp(300px, 20.83vw, 400px); // 400px / 1920px = 20.83%
  width: 100%;
  overflow: hidden;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: clamp(20px, 1.04vw, 20px) clamp(20px, 1.04vw, 20px) 0 clamp(20px, 1.04vw, 20px);
  border-bottom: none;
`;

export const ModalTitle = styled.h2`
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: clamp(24px, 1.67vw, 32px); // 32px / 1920px = 1.67%
  color: #111111;
  margin: 0;
  line-height: 1.4;
  flex: 1;
  text-align: left;

  @media (max-width: 768px) {
    font-size: clamp(20px, 4vw, 24px);
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: clamp(20px, 1.25vw, 24px); // 24px / 1920px = 1.25%
  height: clamp(20px, 1.25vw, 24px);
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
  }

  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
  }
`;

export const CloseIcon = styled.span`
  font-size: clamp(14px, 0.83vw, 16px); // 16px / 1920px = 0.83%
  color: #111111;
  font-weight: normal;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const ModalContent = styled.div`
  flex: 1;
  padding: clamp(10px, 0.52vw, 10px) clamp(20px, 1.04vw, 20px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: clamp(15px, 0.78vw, 15px);

  @media (max-width: 768px) {
    padding: 15px 20px;
  }
`;

export const NoticeMetadata = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: clamp(10px, 0.52vw, 10px);
  border-bottom: 1px solid #eeeeee;
  margin-bottom: clamp(10px, 0.52vw, 10px);

  @media (max-width: 768px) {
    align-items: flex-start;
  }
`;

export const NoticeDate = styled.span`
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: clamp(12px, 0.73vw, 14px); // 14px / 1920px = 0.73%
  color: #666666;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;


export const NoticeContentText = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: clamp(14px, 0.94vw, 18px); // 18px / 1920px = 0.94%
  color: #111111;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
  flex: 1;

  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 1.5;
  }

  br {
    display: block;
    margin: clamp(4px, 0.21vw, 4px) 0;
  }

  p {
    margin: 0 0 clamp(8px, 0.42vw, 8px) 0;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const ModalFooter = styled.div`
  padding: clamp(15px, 0.78vw, 15px) clamp(20px, 1.04vw, 20px) clamp(20px, 1.04vw, 20px);
  border-top: none;
  display: flex;
  justify-content: center;
  width: 100%;

  @media (max-width: 768px) {
    padding: 15px 20px 20px;
  }
`;

export const CloseFooterButton = styled.button`
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: clamp(14px, 0.94vw, 18px); // 18px / 1920px = 0.94%
  color: #111111;
  background-color: #f3f3f3;
  border: 1px solid #cccccc;
  border-radius: clamp(6px, 0.42vw, 8px);
  padding: clamp(6px, 0.42vw, 8px) clamp(8px, 0.52vw, 10px);
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  max-width: clamp(300px, 39.58vw, 760px); // 760px / 1920px = 39.58%
  min-height: clamp(35px, 2.08vw, 40px); // 40px / 1920px = 2.08%
  line-height: 1.4;
  text-align: center;

  &:hover {
    background-color: #e9e9e9;
    border-color: #bbbbbb;
  }

  &:active {
    background-color: #dddddd;
    transform: translateY(1px);
  }

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 10px;
    min-height: 44px;
  }
`;