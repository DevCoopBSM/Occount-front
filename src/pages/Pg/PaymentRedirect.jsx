import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from 'utils/Axios';
import * as S from './style';

export function PaymentRedirectPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  
  // URL 파라미터와 state에서 모두 paymentId를 확인
  const paymentId = searchParams.get('paymentId') || location.state?.paymentId;
  const code = searchParams.get('code');
  const message = searchParams.get('message');

  const isSuccess = !code  || location.state?.status === 'success';

  useEffect(() => {
    console.log('Redirect Page Loaded');
    console.log('Is Success:', isSuccess);
    console.log('PaymentId:', paymentId);

    if (isSuccess && paymentId) {
      handlePaymentSuccess();
    } else {
      handlePaymentFail();
    }
  }, [isSuccess, paymentId]);

  const handlePaymentSuccess = async () => {
    try {
      console.log('Sending confirm request:', { paymentId });
      const confirmResponse = await axiosInstance.post(
        'v2/pg/confirm',
        { paymentId }
      );
      console.log('Confirm response:', confirmResponse.data);
      
      // 필요한 정보만 추출
      const { method, amount, customer } = confirmResponse.data;
      const paymentInfo = {
        success: true,
        paymentId,
        method: method?.type,
        amount: amount?.total,
        currency: amount?.currency,
        customer: customer?.name
      };
      
      navigate('/payment-result', { state: paymentInfo });
    } catch (error) {
      console.error('Confirm request failed:', error);
      navigate('/payment-result', { state: { success: false, error } });
    }
  };

  const handlePaymentFail = () => {
    console.log('Payment failed');
    navigate('/payment-result', {
      state: {
        success: false,
        error: message || '결제에 실패했습니다.'
      }
    });
  };

  return (
    <S.Wrapper>
      <S.BoxSection>
        <h1>결제 처리 중...</h1>
      </S.BoxSection>
    </S.Wrapper>
  );
}
