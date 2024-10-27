import React, { useState, useEffect, useCallback } from 'react';
import Modal from 'components/Modal';
import { useNavigate } from 'react-router-dom';
import * as S from './style';
import * as PortOne from '@portone/browser-sdk/v2';

const storeId = process.env.REACT_APP_STORE_ID;
const channelKey = process.env.REACT_APP_CHANNEL_KEY;

// 독립적인 인터페이스 정의
interface CustomerInfo {
  phoneNumber: string;
  fullName: string;
  customerId: string;
  email: string;
}

interface PaymentRequestOptions {
  storeId: string;
  paymentId: string;
  orderName: string;
  totalAmount: number;
  currency: string;
  channelKey: string;
  payMethod: string;
  customer: CustomerInfo;
  windowType: {
    pc: string;
    mobile: string;
  };
  redirectUrl: string;
  virtualAccount?: {
    accountExpiry: {
      validHours: number;
    };
  };
}

function generatePaymentId(email: string, paymentType: 'aripay' | 'investment'): string {
  const prefix = paymentType === 'aripay' ? 'A' : 'I';
  const localPart = email.split('@')[0];
  const sanitizedLocalPart = localPart.replace(/[^a-zA-Z0-9]/g, '');
  const now = new Date();
  const timeString = now.toISOString().replace(/[-:.T]/g, '');
  return `${prefix}${sanitizedLocalPart}${timeString}`;
}

interface PaymentCheckoutPageProps {
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  rechargeAmount: number;
  onRequestClose: () => void;
  paymentType: 'aripay' | 'investment';
}

export function PaymentCheckoutPage({
  customerEmail,
  customerName,
  customerPhone,
  rechargeAmount,
  onRequestClose,
  paymentType,
}: PaymentCheckoutPageProps) {
  const [payMethod, setPayMethod] = useState<string | null>(null);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const navigate = useNavigate();

  const requestPay = useCallback(() => {
    if (!PortOne) {
      console.error('PortOne SDK가 로드되지 않았습니다.');
      setModalContent(
        <p>결제 시스템을 로드하는데 실패했습니다. 다시 시도해 주세요.</p>
      );
      return;
    }

    const paymentId = generatePaymentId(customerEmail, paymentType);

    const paymentOptions: PaymentRequestOptions = {
      storeId: storeId!,
      paymentId,
      orderName: paymentType === 'aripay' 
        ? `아리페이 ${rechargeAmount} 결제`
        : `출자금 ${rechargeAmount} 결제`,
      totalAmount: rechargeAmount,
      currency: 'KRW',
      channelKey: channelKey!,
      payMethod: payMethod!,
      customer: {
        phoneNumber: customerPhone || '010-0000-0000',
        fullName: customerName,
        customerId: customerEmail,
        email: customerEmail,
      },
      windowType: {
        pc: 'IFRAME',
        mobile: 'REDIRECTION',
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

    PortOne.requestPayment(paymentOptions as any)
      .then((response: PortOne.PaymentResponse) => {
        console.log('결제 요청 응답', response);
        if (!response.code) {  // code가 없으면 성공
          console.log('Navigate to success:', {
            status: 'success',
            paymentId: response.paymentId,
            orderId: paymentOptions.orderName,
            amount: paymentOptions.totalAmount,
            paymentType,
            txId: response.txId,
          });
          navigate('/payment-redirect', {
            state: {
              status: 'success',
              paymentId: response.paymentId,
              orderId: paymentOptions.orderName,
              amount: paymentOptions.totalAmount,
              paymentType,
              txId: response.txId,
            },
          });
        } else {
          console.log('Payment failed:', {
            status: 'failure',
            code: response.code,
            message: response.message,
          });
          setModalContent(<p>결제에 실패했습니다: {response.message}</p>);
          setTimeout(() => onRequestClose(), 3000);
        }
      })
      .catch((error) => {
        console.error('결제 요청 실패', error);
        setModalContent(<p>결제 처리 중 오류가 발생했습니다. 다시 시도해 주세요.</p>);
        setTimeout(() => onRequestClose(), 3000);
      });
  }, [customerEmail, customerName, customerPhone, rechargeAmount, payMethod, navigate, onRequestClose, paymentType]);

  useEffect(() => {
    if (payMethod) {
      requestPay();
    }
  }, [payMethod, requestPay]);

  const handlePaymentStart = () => {
    if (!privacyAgreed) {
      alert('개인정보 제3자 제공에 동의해주세요.');
      return;
    }
    setPayMethod('CARD');
  };

  return (
    <S.Wrapper>
      <S.BoxSection>
        <h1>{paymentType === 'aripay' ? '아리페이 충전' : '출자금 납부'}</h1>
        {!payMethod ? (
          <>
            <p>결제 수단을 선택해 주세요</p>
            <p>현재는 카드 결제만 지원합니다.</p>
            <S.PrivacyAgreement>
              <input
                type="checkbox"
                id="privacyAgreement"
                checked={privacyAgreed}
                onChange={(e) => setPrivacyAgreed(e.target.checked)}
              />
              <label htmlFor="privacyAgreement">
                개인정보 제3자 제공에 동의합니다. (필수)
              </label>
            </S.PrivacyAgreement>
            <S.Button 
              onClick={handlePaymentStart}
              disabled={!privacyAgreed}
            >
              카드 결제
            </S.Button>
            <S.CloseButton onClick={onRequestClose}>닫기</S.CloseButton>
          </>
        ) : (
          <Modal
            isOpen={true}
            onRequestClose={onRequestClose}
          >
            <div style={{
              width: '90%',
              maxWidth: '600px',
              margin: '0 auto',
              overflow: 'auto',
              maxHeight: '90vh',
              position: 'relative',
            }}>
              {modalContent}
              <S.CloseButton onClick={onRequestClose}>닫기</S.CloseButton>
            </div>
          </Modal>
        )}
      </S.BoxSection>
    </S.Wrapper>
  );
}
