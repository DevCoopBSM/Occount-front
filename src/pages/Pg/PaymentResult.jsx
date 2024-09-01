import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from 'components/Modal';
import * as S from './style';

export function PaymentResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state; // 여기서 data는 location.state 전체를 가리킴

  console.log('PaymentResultPage loaded with state:', location.state);

  // 상태 정보가 누락된 경우 경고 메시지를 표시하고 메인 페이지로 리디렉션
  if (!data || !data.status) {
    alert('잘못된 접근입니다.');
    setTimeout(() => navigate('/'), 3000);
    return null; // UI 렌더링을 방지하기 위해 null을 반환
  }

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
        {data.status === 'PAID' ? (
          <>
            <h1>결제가 성공적으로 완료되었습니다!</h1>
            <p>결제 ID: {data.id}</p>
            <p>결제 금액: {data.amount.total} 원</p>
            {data.method?.type === 'PaymentMethodCard' && (
              <>
                <p>결제 방법: 카드 결제</p>
              </>
            )}
            <S.ModalButton onClick={() => (window.location.href = '/')}>
              종료
            </S.ModalButton>
          </>
        ) : data.status === 'VIRTUAL_ACCOUNT_ISSUED' ? (
          <>
            <h1>가상계좌가 발급되었습니다!</h1>
            <p>결제 ID: {data.id}</p>
            <p>결제 금액: {data.amount.total} 원</p>
            <p>가상계좌 정보:</p>
            <p>은행: {data.method.bank}</p>
            <p>계좌번호: {data.method.accountNumber}</p>
            <p>
              계좌 만료 시간: {new Date(data.method.expiredAt).toLocaleString()}
            </p>
            <S.ModalButton onClick={() => (window.location.href = '/')}>
              종료
            </S.ModalButton>
          </>
        ) : (
          <>
            <h1>결제에 실패했습니다</h1>
            <p>오류 코드: {data.error?.code}</p>
            <p>오류 메시지: {data.error?.message}</p>
            <S.ModalButton onClick={() => (window.location.href = '/')}>
              종료
            </S.ModalButton>
          </>
        )}
      </Modal>
    </S.Wrapper>
  );
}
