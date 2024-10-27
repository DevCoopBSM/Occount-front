import React from "react";
import * as S from "./style";

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
  style?: {
    padding?: string;
    borderRadius?: string;
    backgroundColor?: string;
    overlayColor?: string;
    width?: string;
    maxWidth?: string;
    maxHeight?: string;
    mobileFullScreen?: boolean;
  };
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onRequestClose, 
  children,
  style = {}
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onRequestClose();
    }
  };

  return (
    <S.ModalOverlay 
      onClick={handleOverlayClick} 
      $overlayColor={style.overlayColor}
    >
      <S.ModalContent
        $style={style}
        $mobileFullScreen={style.mobileFullScreen}
      >
        {children}
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default Modal;
