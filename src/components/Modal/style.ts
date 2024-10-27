import styled from "styled-components";

interface ModalOverlayProps {
  $overlayColor?: string;
}

interface StyleProps {
  padding?: string;
  borderRadius?: string;
  backgroundColor?: string;
  width?: string;
  maxWidth?: string;
  maxHeight?: string;
}

interface ModalContentProps {
  $style: StyleProps;
  $mobileFullScreen?: boolean;
}

export const ModalOverlay = styled.div<ModalOverlayProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => props.$overlayColor || 'rgba(0, 0, 0, 0.5)'};
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div<ModalContentProps>`
  background-color: ${props => props.$style.backgroundColor || 'transparent'};
  padding: ${props => props.$style.padding || '0'};
  border-radius: ${props => props.$style.borderRadius || '0'};
  overflow-y: auto;
  position: relative;
  width: ${props => props.$style.width || 'auto'};
  max-width: ${props => props.$style.maxWidth || 'none'};
  max-height: ${props => props.$style.maxHeight || '90vh'};

  @media (max-width: 768px) {
    width: ${props => props.$style.width || '95%'};
    padding: ${props => props.$style.padding || '20px'};
  }

  @media (max-width: 480px) {
    width: ${props => props.$mobileFullScreen ? '100%' : (props.$style.width || '95%')};
    height: ${props => props.$mobileFullScreen ? '100vh' : 'auto'};
    max-height: ${props => props.$mobileFullScreen ? 'none' : props.$style.maxHeight || '90vh'};
    border-radius: ${props => props.$mobileFullScreen ? '0' : props.$style.borderRadius || '16px'};
    padding: ${props => props.$style.padding || '16px'};
  }
`;
