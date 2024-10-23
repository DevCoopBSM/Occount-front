import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import Barcode from 'react-barcode';

interface BarcodeModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  userCode: string;
}

const BarcodeModal: React.FC<BarcodeModalProps> = ({ isOpen, onRequestClose, userCode }) => {
  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Barcode Modal"
      shouldCloseOnOverlayClick={true}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        content: {
          position: 'relative',
          inset: 'auto',
          border: 'none',
          background: 'transparent',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          borderRadius: '4px',
          outline: 'none',
          padding: '0',
        }
      }}
    >
      <ModalContent>
        <ModalHeader>바코드</ModalHeader>
        <BarcodeWrapper>
          <StyledBarcode 
            value={userCode} 
            format="CODE128" 
            width={2}
            height={100} 
            displayValue={false}
          />
        </BarcodeWrapper>
        <InstructionText>화면 밖을 클릭하면 창이 닫힙니다.</InstructionText>
      </ModalContent>
    </StyledModal>
  );
};

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  width: 350px;
`;

const ModalHeader = styled.h2`
  color: #333;
  margin-bottom: 20px;
  font-size: 24px;
`;

const BarcodeWrapper = styled.div`
  margin: 15px 0;
  padding: 15px;
  background-color: white;
  border-radius: 10px;
`;

const StyledBarcode = styled(Barcode)`
  svg {
    transform: scale(1.2);
    filter: blur(0.2px);
  }
`;

const InstructionText = styled.p`
  color: #666;
  font-size: 14px;
  margin-top: 15px;
  text-align: center;
`;

export default BarcodeModal;
