import React, { useEffect } from 'react';
import { ToastProps } from './types';
import * as S from './style';

const Toast: React.FC<ToastProps> = ({
  isVisible,
  message,
  type = 'error',
  title,
  duration = 3000,
  onClose,
}) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const getTitle = (type: string) => {
    switch (type) {
      case 'error':
        return '로그인 오류';
      case 'success':
        return '성공';
      case 'warning':
        return '경고';
      case 'info':
      default:
        return '알림';
    }
  };

  if (!isVisible) return null;

  return (
    <S.ToastOverlay>
      <S.ToastContainer $isVisible={isVisible} $type={type}>
        <S.AccentBar $type={type} />
        <S.ContentWrapper>
          <S.TextContainer>
            <S.TitleContainer>
              <S.Title>{title || getTitle(type)}</S.Title>
            </S.TitleContainer>
            <S.Message>{message}</S.Message>
          </S.TextContainer>
          <S.CloseButton onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="#111111"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </S.CloseButton>
        </S.ContentWrapper>
      </S.ToastContainer>
    </S.ToastOverlay>
  );
};

export default Toast;
