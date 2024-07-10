import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from 'utils/Axios';

export function PaymentSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    async function confirm() {
      const requestData = {
        orderId: searchParams.get("orderId"),
        amount: searchParams.get("amount"),
        paymentKey: searchParams.get("paymentKey"),
      };
      console.log(requestData)
      try {
        const response = await axiosInstance.post("/toss/confirm", requestData);
        setResponseData(response.data);
      } catch (error) {
        navigate(`/toss/fail?code=${error.response?.data?.code}&message=${error.response?.data?.message}`);
      }
    }

    confirm();

    // 3초 후에 메인 페이지로 이동
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    // 컴포넌트가 언마운트될 때 타이머를 정리합니다.
    return () => clearTimeout(timer);
  }, [searchParams, navigate]);

  return (
    <>
      <div className="box_section" style={styles.boxSection}>
        <img width="100px" src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png" alt="결제 완료" />
        <h2>결제를 완료했어요</h2>
        <div className="p-grid typography--p" style={styles.gridRow}>
          <div className="p-grid-col text--left">
            <b>결제금액</b>
          </div>
          <div className="p-grid-col text--right" id="amount">
            {`${Number(searchParams.get("amount")).toLocaleString()}원`}
          </div>
        </div>
        <div className="p-grid typography--p" style={styles.gridRow}>
          <div className="p-grid-col text--left">
            <b>주문번호</b>
          </div>
          <div className="p-grid-col text--right" id="orderId">
            {`${searchParams.get("orderId")}`}
          </div>
        </div>
        <div className="p-grid typography--p" style={styles.gridRow}>
          <div className="p-grid-col text--left">
            <b>paymentKey</b>
          </div>
          <div className="p-grid-col text--right" id="paymentKey" style={styles.paymentKey}>
            {`${searchParams.get("paymentKey")}`}
          </div>
        </div>
        <div className="p-grid-col" style={styles.buttonContainer}>
          <Link to="https://docs.tosspayments.com/guides/v2/payment-widget/integration">
            <button className="button" style={styles.button}>연동 문서</button>
          </Link>
          <Link to="https://discord.gg/A4fRFXQhRu">
            <button className="button" style={{ ...styles.button, ...styles.secondaryButton }}>
              실시간 문의
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

const styles = {
  boxSection: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    backgroundColor: '#fff',
    textAlign: 'center'
  },
  gridRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  paymentKey: {
    whiteSpace: 'initial',
    wordBreak: 'break-all',
    maxWidth: '250px'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '30px'
  },
  button: {
    padding: '10px 20px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#1b64da',
    color: '#fff',
    cursor: 'pointer',
    textDecoration: 'none',
    fontSize: '16px'
  },
  secondaryButton: {
    backgroundColor: '#e8f3ff',
    color: '#1b64da',
  }
};
