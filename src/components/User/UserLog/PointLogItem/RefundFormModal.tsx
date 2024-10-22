import React from 'react';
import * as _ from "./style";
import Modal from 'components/Modal';
import { Bankenum } from './bank';
import { RefundAccount } from './index';  // index.tsx에서 RefundAccount 인터페이스를 가져옵니다

interface RefundFormModalProps {
  isOpen: boolean;
  closeModal: () => void;
  refundAccount: RefundAccount;
  setRefundAccount: React.Dispatch<React.SetStateAction<RefundAccount>>;
  handleRefundRequest: () => void;
}

const RefundFormModal: React.FC<RefundFormModalProps> = ({ 
  isOpen, 
  closeModal, 
  refundAccount, 
  setRefundAccount, 
  handleRefundRequest 
}) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal}>
      <_.ModalHeader>환불 계좌 정보 입력</_.ModalHeader>
      <_.ModalContent>
        <_.DetailRow>
          <_.DetailLabel>은행:</_.DetailLabel>
          <_.DetailSelect
            value={refundAccount.bank}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
              setRefundAccount({ ...refundAccount, bank: e.target.value })}
          >
            <option value="">은행 선택</option>
            {Object.entries(Bankenum).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </_.DetailSelect>
        </_.DetailRow>
        <_.DetailRow>
          <_.DetailLabel>예금주:</_.DetailLabel>
          <_.DetailInput
            type="text"
            value={refundAccount.holderName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              setRefundAccount({ ...refundAccount, holderName: e.target.value })}
          />
        </_.DetailRow>
        <_.DetailRow>
          <_.DetailLabel>계좌번호:</_.DetailLabel>
          <_.DetailInput
            type="text"
            value={refundAccount.accountNumber}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              setRefundAccount({ ...refundAccount, accountNumber: e.target.value })}
          />
        </_.DetailRow>
        <_.DetailRow>
          <_.DetailLabel>연락처:</_.DetailLabel>
          <_.DetailInput
            type="text"
            value={refundAccount.holderPhoneNumber}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              setRefundAccount({ ...refundAccount, holderPhoneNumber: e.target.value })}
          />
        </_.DetailRow>
        <_.ModalFooter>
          <_.ModalButton onClick={handleRefundRequest}>환불 신청</_.ModalButton>
          <_.ModalCloseButton onClick={closeModal}>닫기</_.ModalCloseButton>
        </_.ModalFooter>
      </_.ModalContent>
    </Modal>
  );
};

export default RefundFormModal;
