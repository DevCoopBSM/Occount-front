import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from 'utils/Axios';
import * as S from './style';

export function PaymentRedirectPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.state);
  const status = searchParams.get('status');
  const paymentId = searchParams.get('paymentId');
  const orderId = searchParams.get('orderId');
  const amount = searchParams.get('amount');

  useEffect(() => {
    console.log('Redirect Page Loaded');
    console.log('Status:', status);

    if (status === 'success') {
      handlePaymentSuccess();
    } else {
      handlePaymentFail();
    }
  }, [status]);

  const handlePaymentSuccess = async () => {
    const requestData = {
      orderId,
      amount,
      paymentId,
    };

    try {
      console.log('Sending confirm request:', requestData); // 디버그용 로그 추가
      const confirmResponse = await axiosInstance.post(
        'v2/pg/confirm',
        requestData
      );
      console.log('Confirm response:', confirmResponse.data); // 디버그용 로그 추가
      if (
        confirmResponse.data.status === 'PAID' ||
        confirmResponse.data.status === 'VIRTUAL_ACCOUNT_ISSUED'
      ) {
        navigate('/payment-result', { state: confirmResponse.data });
      } else {
        navigate('/payment-result', { state: confirmResponse.data });
      }
    } catch (error) {
      console.error('Confirm request failed:', error); // 디버그용 로그 추가
      navigate('/payment-result', { state: error });
    }
  };

  const handlePaymentFail = () => {
    console.log('Payment failed');
    navigate('/payment-result', {
      state: {
        success: false,
        error: {
          code: searchParams.get('code'),
          message: searchParams.get('message'),
        },
      },
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
