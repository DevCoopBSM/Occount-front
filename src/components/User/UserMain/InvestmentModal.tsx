import React, { useState } from 'react';
import styled from 'styled-components';
import PaymentModal from 'components/Pg/PaymentModal';

interface InvestmentModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  user: { email: string; name: string; phone?: string } | null;
}

const InvestmentModal: React.FC<InvestmentModalProps> = ({
  isOpen,
  onRequestClose,
  user
}) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handlePaymentClick = () => {
    if (!user) {
      alert('로그인 후 이용해 주세요.');
      return;
    }
    setIsPaymentModalOpen(true);
  };

  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false);
    onRequestClose(); // 모달 닫기
  };

  if (!isOpen) return null;

  return (
    <>
      <ModalOverlay onClick={onRequestClose}>
        <ModalContent onClick={e => e.stopPropagation()}>
          <Title>조합원 가입 안내</Title>
          <Content>
            정식 조합원으로 가입하시면 더 많은 혜택을 받으실 수 있습니다.
            학교행사로 지급되는 아리페이를 더욱 편하게 사용가능하고
            총회 때 참가자격이 주어지고 다양한 상품을 제공받습니다!!
            출자금 납부(최소 만원)를 통해 정식 조합원이 되어주세요!<br />
            <strong>출자금은 졸업 및 탈퇴 시 환급 및 기부를 결정할 수 있습니다.</strong>
          </Content>
          <ButtonContainer>
            <PrimaryButton onClick={handlePaymentClick}>출자금 납부하기</PrimaryButton>
            <SecondaryButton onClick={onRequestClose}>다음에 하기</SecondaryButton>
          </ButtonContainer>
        </ModalContent>
      </ModalOverlay>

      {isPaymentModalOpen && (
        <PaymentModal
          type="investment"
          isOpen={isPaymentModalOpen}
          onRequestClose={handleClosePaymentModal}
          user={user}
          maxAmount={50000}
        />
      )}
    </>
  );
};

// 스타일 정의
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 400px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Content = styled.p`
  text-align: center;
  margin-bottom: 20px;
  line-height: 1.5;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const BaseButton = styled.button`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
`;

const PrimaryButton = styled(BaseButton)`
  background-color: #f0ce00;
  color: white;
  &:hover {
    background-color: #e0be00;
  }
`;

const SecondaryButton = styled(BaseButton)`
  background-color: #f5f5f5;
  color: #666;
  &:hover {
    background-color: #e5e5e5;
  }
`;

export default InvestmentModal;
