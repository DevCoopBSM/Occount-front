import styled, { keyframes } from 'styled-components';

const mediaQuery = (breakpoint: string): string =>
  `@media (max-width: ${breakpoint})`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
`;

interface ToastContainerProps {
  $isVisible: boolean;
  $type: 'error' | 'success' | 'warning' | 'info';
}

const getAccentColor = (type: string) => {
  switch (type) {
    case 'error':
      return '#FF6666';
    case 'success':
      return '#66A8FF';
    case 'warning':
      return '#f49e15';
    case 'info':
    default:
      return '#2196f3';
  }
};

export const ToastOverlay = styled.div`
  position: fixed;
  top: 80px;
  right: 0;
  z-index: 9999;
  pointer-events: none;
  display: flex;
  justify-content: flex-end;

  ${mediaQuery('768px')} {
    top: 70px;
  }

  ${mediaQuery('480px')} {
    top: 60px;
  }
`;

export const ToastContainer = styled.div<ToastContainerProps>`
  display: flex;
  align-items: flex-start;
  width: auto;
  max-width: min(600px, 90vw);
  background: white;
  border: 2px solid #dddddd;
  border-radius: 0;
  overflow: hidden;
  animation: ${(props) => (props.$isVisible ? slideIn : slideOut)} 0.3s
    ease-in-out;
  pointer-events: auto;

  ${mediaQuery('768px')} {
    max-width: min(500px, 92vw);
  }

  ${mediaQuery('480px')} {
    max-width: calc(100vw - 24px);
  }
`;

export const AccentBar = styled.div<{ $type: string }>`
  width: clamp(20px, 2.08vw, 40px);
  background: ${(props) => getAccentColor(props.$type)};
  flex-shrink: 0;
  align-self: stretch;

  ${mediaQuery('480px')} {
    width: 20px;
  }
`;

export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: clamp(12px, 1.46vw, 28px) clamp(16px, 1.67vw, 32px);
  gap: clamp(12px, 8.44vw, 162px);
  background: white;
  min-width: 0;

  ${mediaQuery('480px')} {
    padding: 12px 16px;
    gap: 12px;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(3px, 0.4vw, 5px);
  color: #111111;
  flex: 1;
  min-width: 0;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 4px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 800;
  font-size: clamp(16px, 1.67vw, 32px);
  line-height: 1.3;
  white-space: nowrap;

  ${mediaQuery('480px')} {
    font-size: 16px;
  }
`;

export const ExclamationMark = styled.span`
  color: inherit;
  flex-shrink: 0;
`;

export const Title = styled.span`
  color: inherit;
  word-break: keep-all;
`;

export const Message = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: clamp(13px, 1.25vw, 24px);
  line-height: 1.4;
  color: #111111;
  margin: 0;
  white-space: nowrap;

  ${mediaQuery('480px')} {
    font-size: 13px;
  }
`;

export const CloseButton = styled.button`
  width: clamp(28px, 2.5vw, 48px);
  height: clamp(28px, 2.5vw, 48px);
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease;
  flex-shrink: 0;

  &:hover {
    opacity: 0.7;
  }

  svg {
    width: clamp(18px, 2.08vw, 40px);
    height: clamp(18px, 2.08vw, 40px);
  }

  ${mediaQuery('480px')} {
    width: 28px;
    height: 28px;

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;
