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
  top: 40px;
  right: 0;
  z-index: 9999;
  pointer-events: none;
  display: flex;
  justify-content: flex-end;

  ${mediaQuery('1200px')} {
    top: 30px;
  }

  ${mediaQuery('768px')} {
    top: 24px;
  }

  ${mediaQuery('480px')} {
    top: 20px;
  }
`;

export const ToastContainer = styled.div<ToastContainerProps>`
  display: flex;
  align-items: flex-start;
  width: auto;
  max-width: 90vw;
  background: white;
  border: 2px solid #dddddd;
  border-radius: 0;
  overflow: hidden;
  animation: ${(props) => (props.$isVisible ? slideIn : slideOut)} 0.3s
    ease-in-out;
  pointer-events: auto;

  ${mediaQuery('1200px')} {
    max-width: 600px;
  }

  ${mediaQuery('768px')} {
    max-width: 500px;
  }

  ${mediaQuery('480px')} {
    max-width: calc(100vw - 24px);
  }
`;

export const AccentBar = styled.div<{ $type: string }>`
  width: 30px;
  background: ${(props) => getAccentColor(props.$type)};
  flex-shrink: 0;
  align-self: stretch;

  ${mediaQuery('480px')} {
    width: 24px;
  }
`;

export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: white;

  ${mediaQuery('768px')} {
    padding: 14px 20px;
  }

  ${mediaQuery('480px')} {
    padding: 12px 16px;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: #111111;
  flex: 1;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 6px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 800;
  font-size: 24px;
  line-height: 32px;

  ${mediaQuery('768px')} {
    font-size: 20px;
    line-height: 28px;
  }

  ${mediaQuery('480px')} {
    font-size: 18px;
    line-height: 24px;
    gap: 4px;
  }
`;

export const ExclamationMark = styled.span`
  color: inherit;
`;

export const Title = styled.span`
  color: inherit;
`;

export const Message = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #111111;
  margin: 0;
  white-space: nowrap;

  ${mediaQuery('768px')} {
    font-size: 14px;
    line-height: 20px;
  }

  ${mediaQuery('480px')} {
    font-size: 13px;
    line-height: 18px;
  }
`;

export const CloseButton = styled.button`
  width: 36px;
  height: 36px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }

  svg {
    width: 24px;
    height: 24px;
  }

  ${mediaQuery('768px')} {
    width: 32px;
    height: 32px;

    svg {
      width: 20px;
      height: 20px;
    }
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
