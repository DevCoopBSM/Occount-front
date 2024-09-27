import React, { useState, useEffect } from 'react';
import Modal from 'components/Modal';
import { useNavigate } from 'react-router-dom';
import * as S from './style';
import * as PortOne from '@portone/browser-sdk/v2';

const storeId = process.env.REACT_APP_STORE_ID;
const channelKey = process.env.REACT_APP_CHANNEL_KEY;

function generatePaymentId(email) {
  // 이메일의 @ 앞부분만 추출
  const localPart = email.split('@')[0];

  // 특수문자를 모두 제거하고 문자와 숫자만 남김
  const sanitizedLocalPart = localPart.replace(/[^a-zA-Z0-9]/g, '');

  // 현재 시간을 YYYYMMDDHHmmss 형식으로 가져옴
  const now = new Date();
  const timeString = now.toISOString().replace(/[-:.T]/g, ''); // 예: 20240801093045 (YYYYMMDDHHmmss)

  // Payment ID 생성
  return `${sanitizedLocalPart}${timeString}`;
}
export function PaymentCheckoutPage({
  customerEmail,
  customerName,
  rechargeAmount,
  onRequestClose,
}) {
  const [payMethod, setPayMethod] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const navigate = useNavigate();

  const requestPay = () => {
    if (!PortOne) {
      console.error('PortOne SDK가 로드되지 않았습니다.');
      setModalContent(
        <p>결제 시스템을 로드하는데 실패했습니다. 다시 시도해 주세요.</p>
      );
      return;
    }

    const paymentId = generatePaymentId(customerEmail);

    const paymentOptions = {
      storeId,
      paymentId,
      orderName: `아리페이 ${rechargeAmount} 결제`,
      totalAmount: rechargeAmount,
      currency: 'KRW',
      channelKey,
      payMethod,
      customer: {
        phoneNumber: '010-0000-0000',
        fullName: customerName,
        customerId: customerEmail,
        email: customerEmail,
      },
      WindowType: {
        mobile: "REDIRECTION",
      },
      redirectUrl: 'https://occount.bsm-aripay.kr/payment-redirect',
    };

    if (payMethod === 'VIRTUAL_ACCOUNT') {
      paymentOptions.virtualAccount = {
        accountExpiry: {
          validHours: 1,
        },
      };
    }

    setModalContent(<p>결제 요청을 진행 중입니다...</p>);

    PortOne.requestPayment(paymentOptions)
      .then((response) => {
        console.log('결제 요청 응답', response);
        if (response.txId && !response.code) {
          console.log('Navigate to success:', {
            status: 'success',
            paymentId: response.paymentId,
            orderId: paymentOptions.orderName,
            amount: paymentOptions.totalAmount,
          });
          navigate('/payment-redirect', {
            state: {
              status: 'success',
              paymentId: response.paymentId,
              orderId: paymentOptions.orderName,
              amount: paymentOptions.totalAmount,
            },
          });
        } else {
          console.log('Payment failed:', {
            status: 'failure',
            code: response.code,
            message: response.message,
          });
          setModalContent(<p>결제가 취소되었습니다. 다시 시도해 주세요.</p>);
          setTimeout(() => onRequestClose(), 3000); // 3초 뒤 모달 닫기
        }
      })
      .catch((error) => {
        console.error('결제 요청 실패', error);
        setModalContent(<p>결제가 취소되었습니다. 다시 시도해 주세요.</p>);
        setTimeout(() => onRequestClose(), 3000); // 3초 뒤 모달 닫기
      });
  };

  useEffect(() => {
    if (payMethod) {
      requestPay();
    }
  }, [payMethod]);

  return (
    <S.Wrapper>
      <S.BoxSection>
        <h1>결제 진행 중</h1>
        {!payMethod ? (
          <>
            <p>결제 수단을 선택해 주세요</p>
            <p> 현재는 카드 결제만 지원합니다.</p>
            <button onClick={() => setPayMethod('CARD')}>카드 결제</button>
            {/* <button onClick={() => setPayMethod('TRANSFER')}>계좌 이체</button>
            <button onClick={() => setPayMethod('VIRTUAL_ACCOUNT')}>가상 계좌</button> */}
          </>
        ) : (
          <Modal
            isOpen={true}
            onRequestClose={onRequestClose}
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
            {modalContent}
          </Modal>
        )}
      </S.BoxSection>
    </S.Wrapper>
  );
}
