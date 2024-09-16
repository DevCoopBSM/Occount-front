import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from 'utils/Axios';
import * as S from './style';

export function PaymentRedirectPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const status = searchParams.get('code') === 'FAILURE_TYPE_PG' ? 'fail' : 'success';
  const paymentId = searchParams.get('paymentId');
  const orderId = searchParams.get('txId');
  const message = decodeURIComponent(searchParams.get('message') || '');

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
      paymentId,
    };

    try {
      console.log('Sending confirm request:', requestData);
      const confirmResponse = await axiosInstance.post(
        'v2/pg/confirm',
        requestData
      );
      console.log('Confirm response:', confirmResponse.data);
      navigate('/payment-result', { state: confirmResponse.data });
    } catch (error) {
      console.error('Confirm request failed:', error);
      navigate('/payment-result', { state: { error } });
    }
  };

  const handlePaymentFail = () => {
    console.log('Payment failed');
    navigate('/payment-result', {
      state: {
        success: false,
        error: {
          code: searchParams.get('pgCode'),
          message: message,
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
