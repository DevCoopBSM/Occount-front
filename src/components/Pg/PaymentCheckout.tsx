import React, { useState, useEffect, useCallback } from 'react';
import Modal from 'components/Modal';
import { useNavigate } from 'react-router-dom';
import * as S from './style';
import * as PortOne from '@portone/browser-sdk/v2';

const storeId = process.env.REACT_APP_STORE_ID;
const channelKey = process.env.REACT_APP_CHANNEL_KEY_PAY;

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
  const navigate = useNavigate();

  const requestPay = useCallback(() => {
    if (!PortOne) {
      console.error('PortOne SDK가 로드되지 않았습니다.');
      setModalContent(
        <S.LoadingText>
          결제 시스템을 로드하는데 실패했습니다. 다시 시도해 주세요.
        </S.LoadingText>
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

    setModalContent(
      <S.LoadingText>결제 요청을 진행 중입니다...</S.LoadingText>
    );

    PortOne.requestPayment(paymentOptions as any)
      .then((response: PortOne.PaymentResponse) => {
        if (!response.code) {
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
          setModalContent(
            <S.LoadingText>
              결제에 실패했습니다: {response.message}
            </S.LoadingText>
          );
          setTimeout(() => onRequestClose(), 3000);
        }
      })
      .catch((error) => {
        console.error('결제 요청 실패', error);
        setModalContent(
          <S.LoadingText>
            결제 처리 중 오류가 발생했습니다. 다시 시도해 주세요.
          </S.LoadingText>
        );
        setTimeout(() => onRequestClose(), 3000);
      });
  }, [customerEmail, customerName, customerPhone, rechargeAmount, payMethod, navigate, onRequestClose, paymentType]);

  useEffect(() => {
    if (payMethod) {
      requestPay();
    }
  }, [payMethod, requestPay]);

  const handlePaymentStart = () => {
    setPayMethod('CARD');
  };

  return (
    <S.Wrapper>
      <S.BoxSection>
        {!payMethod ? (
          <S.PaymentModal>
            <S.Title>
              {paymentType === 'aripay' ? '아리페이 충전' : '출자금 납부'}
            </S.Title>
            <S.SubTitle>결제 수단을 선택해 주세요</S.SubTitle>
            <S.Description>현재는 카드 결제만 지원합니다.</S.Description>
            
            <S.NoticeBox>
              <S.NoticeText>
                결제 서비스 제공을 위해 아래와 같은 정보가 스마트로(주)에 제공됩니다.
                결제 진행시 동의 여부를 물어보며 
                이에 동의하지 않으실 시 결제서비스를 이용하실 수 없습니다.
              </S.NoticeText>
              <S.InfoTable>
                <S.InfoRow>
                  <S.InfoLabel>제공 정보</S.InfoLabel>
                  <S.InfoValue>이름, 전화번호, 결제정보, 이메일</S.InfoValue>
                </S.InfoRow>
                <S.InfoRow>
                  <S.InfoLabel>보유 기간</S.InfoLabel>
                  <S.InfoValue>전자상거래법에 따른 보관 기간 (5년)</S.InfoValue>
                </S.InfoRow>
              </S.InfoTable>
            </S.NoticeBox>

            <S.ButtonGroup>
              <S.PaymentButton onClick={handlePaymentStart}>
                카드 결제
              </S.PaymentButton>
              <S.CancelButton onClick={onRequestClose}>
                닫기
              </S.CancelButton>
            </S.ButtonGroup>
          </S.PaymentModal>
        ) : (
          <Modal
            isOpen={true}
            onRequestClose={onRequestClose}
            style={{
              backgroundColor: '#fff',  // 배경색을 하얀색으로
              padding: '24px',
              borderRadius: '16px',
              width: '90%',
              maxWidth: '300px'
            }}
          >
            {modalContent}
          </Modal>
        )}
      </S.BoxSection>
    </S.Wrapper>
  );
}
