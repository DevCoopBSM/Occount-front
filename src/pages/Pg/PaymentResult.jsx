import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from 'components/Modal';
import * as S from './style';

export function PaymentResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  console.log('PaymentResultPage loaded with state:', data);

  if (!data) {
    console.error('No data received in PaymentResultPage');
    navigate('/');
    return null;
  }

  const handleClose = () => {
    navigate('/');
  };

  return (
    <S.Wrapper>
      <Modal
        isOpen={true}
        style={{
          content: {
            width: '90%',
            maxWidth: '600px',
            margin: '0 auto',
            overflow: 'auto',
            maxHeight: '90vh',
            position: 'relative',
          },
        }}
      >
        {data.success ? (
          <>
            <h1>결제가 성공적으로 완료되었습니다!</h1>
            <p>결제 ID: {data.paymentId}</p>
            <p>주문 ID: {data.orderId}</p>
            <p>결제 금액: {data.amount?.total} 원</p>
            {data.method?.type === 'card' && (
              <>
                <p>결제 방법: 카드 결제</p>
                <p>카드사: {data.method.card.company}</p>
                <p>카드 번호: {data.method.card.number}</p>
              </>
            )}
            {data.method?.type === 'virtualAccount' && (
              <>
                <p>결제 방법: 가상계좌</p>
                <p>은행: {data.method.virtualAccount.bank}</p>
                <p>계좌번호: {data.method.virtualAccount.accountNumber}</p>
                <p>
                  계좌 만료 시간:{' '}
                  {new Date(data.method.virtualAccount.dueDate).toLocaleString()}
                </p>
              </>
            )}
          </>
        ) : (
          <>
            <h1>결제에 실패했습니다</h1>
            <p>오류 코드: {data.error?.code}</p>
            <p>오류 메시지: {data.error?.message}</p>
          </>
        )}
        <S.ModalButton onClick={handleClose}>종료</S.ModalButton>
      </Modal>
    </S.Wrapper>
  );
}
