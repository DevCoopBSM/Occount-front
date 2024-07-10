// PaymentCheckoutPage.jsx
import React, { useState, useEffect } from 'react';
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import Modal from '../Modal';
import { Success } from './Success';
import { Fail } from './Fail';
import axiosInstance from 'utils/Axios';
import * as S from './style';

// SDK 초기화
const clientKey = "test_ck_Z61JOxRQVE1Qa9kPZjaaVW0X9bAq";
const customerKey = generateRandomString();

export function PaymentCheckoutPage({ customerEmail, customerName, rechargeAmount }) {
  const [payment, setPayment] = useState(null);
  const [orderName, setOrderName] = useState(`아리페이 ${rechargeAmount} 결제`);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const amount = {
    currency: "KRW",
    value: rechargeAmount,
  };

  useEffect(() => {
    async function fetchPayment() {
      try {
        const tossPayments = await loadTossPayments(clientKey);
        const payment = tossPayments.payment({ customerKey });
        setPayment(payment);
      } catch (error) {
        console.error("Error fetching payment:", error);
      }
    }
    fetchPayment();
  }, []);

  async function requestPayment(method) {
    if (!payment || !method) return;
    try {
      const paymentRequest = {
        amount,
        orderId: generateRandomString(),
        orderName,
        successUrl: window.location.origin + "/toss/success",
        failUrl: window.location.origin + "/toss/fail",
        customerEmail,
        customerName,
        customerMobilePhone: "01000000000",
      };

      const response = await payment.requestPayment({ ...paymentRequest, method });

      // 결제 성공 시 결제 확인 요청
      const requestData = {
        orderId: response.orderId,
        amount: response.amount,
        paymentKey: response.paymentKey,
      };

      try {
        const confirmResponse = await axiosInstance.post("/toss/confirm", requestData);
        setModalContent(
          <>
            <Success responseData={confirmResponse.data} />
            <S.ModalButton onClick={handleCloseModal}>
              종료
            </S.ModalButton>
          </>
        );
      } catch (error) {
        setModalContent(
          <>
            <Fail code={error.response?.data?.code} message={error.response?.data?.message} />
            <S.ModalButton onClick={handleCloseModal}>
              종료
            </S.ModalButton>
          </>
        );
      }

      setIsModalOpen(true);

    } catch (error) {
      console.error("Error requesting payment:", error);
      setModalContent(
        <>
          <Fail code={error.response?.data?.code} message={error.response?.data?.message} />
          <S.ModalButton onClick={handleCloseModal}>
            종료
          </S.ModalButton>
        </>
      );
      setIsModalOpen(true);
    }
  }

  async function requestBillingAuth() {
    if (!payment) return;
    try {
      await payment.requestBillingAuth({
        method: "CARD",
        successUrl: "", // 임시 URL 제거
        failUrl: "", // 임시 URL 제거
        customerEmail,
        customerName,
      });
    } catch (error) {
      console.error("Error requesting billing auth:", error);
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return (
    <S.Wrapper>
      <S.BoxSection>
        <h1>일반 결제</h1>
        <div id="payment-method" style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
          <S.Button onClick={() => requestPayment("CARD")}>카드</S.Button>
          <S.Button onClick={() => requestPayment("TRANSFER")}>계좌이체</S.Button>
          <S.Button onClick={() => requestPayment("VIRTUAL_ACCOUNT")}>가상계좌</S.Button>
        </div>
      </S.BoxSection>
      <S.BoxSection>
        <h1>정기 결제</h1>
        <S.ButtonSecondary onClick={requestBillingAuth}>빌링키</S.ButtonSecondary>
      </S.BoxSection>
      <Modal 
        isOpen={isModalOpen} 
        onRequestClose={handleCloseModal} 
        style={{ 
          content: { 
            width: '90%', 
            maxWidth: '600px', 
            margin: '0 auto', 
            overflow: 'auto', 
            maxHeight: '90vh',
            position: 'relative' 
          } 
        }}
      >
        {modalContent}
      </Modal>
    </S.Wrapper>
  );
}

function generateRandomString() {
  return window.btoa(Math.random().toString()).slice(0, 20);
}
