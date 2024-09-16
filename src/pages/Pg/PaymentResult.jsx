import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
      <S.ResultContainer>
        <S.ResultContent>
          {data.success ? (
            <>
              <S.Title>결제가 성공적으로 완료되었습니다!</S.Title>
              <S.InfoItem>결제 고객: {data.customer}</S.InfoItem>
              <S.InfoItem>결제 금액: {data.amount} </S.InfoItem>
              <S.InfoItem>결제 방법: {data.method}</S.InfoItem>
            </>
          ) : (
            <>
              <S.Title>결제에 실패했습니다</S.Title>
              <S.InfoItem>오류 코드: {data.error?.code}</S.InfoItem>
              <S.InfoItem>오류 메시지: {data.error?.message}</S.InfoItem>
            </>
          )}
          <S.CloseButton onClick={handleClose}>확인</S.CloseButton>
        </S.ResultContent>
      </S.ResultContainer>
    </S.Wrapper>
  );
}

