import React from "react";
import * as _ from "./style";

const Modal = ({ isOpen, onRequestClose, children }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onRequestClose();
    }
  };

  return (
    <_.ModalOverlay onClick={handleOverlayClick}>
      <_.ModalContent>
        {children}
      </_.ModalContent>
    </_.ModalOverlay>
  );
};

export default Modal;
