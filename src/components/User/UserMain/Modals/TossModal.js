import React from 'react';
import Modal from 'components/Modal';
import { PaymentCheckoutPage } from 'components/Toss/PaymentCheckout';
import * as _ from './style';

const TossModal = ({ isOpen, onRequestClose, user, rechargeAmount }) => {
  return (
    <Modal 
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{ content: { width: '100%', maxWidth: '800px', margin: '0 auto', overflow: 'auto', maxHeight: '100vh' } }}
    >
      <PaymentCheckoutPage customerEmail={user.email} customerName={user.name} rechargeAmount={rechargeAmount} todayTotalCharge={user.todayTotalCharge} />
      <_.ModalFooterButton onClick={onRequestClose} style={{ fontSize: '20px', padding: '10px 20px', marginTop: '20px' }}>
        닫기
      </_.ModalFooterButton>
    </Modal>
  );
};

export default TossModal;
