import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function FailPage({ code, message }) {
  const navigate = useNavigate();

  useEffect(() => {
    // 3초 후에 메인 페이지로 이동
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    // 컴포넌트가 언마운트될 때 타이머를 정리합니다.
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div id="info" className="box_section" style={styles.boxSection}>
      <img width="100px" src="https://static.toss.im/lotties/error-spot-no-loop-space-apng.png" alt="에러 이미지" />
      <h2>결제를 실패했어요</h2>

      <div className="p-grid typography--p" style={styles.gridRow}>
        <div className="p-grid-col text--left">
          <b>에러메시지</b>
        </div>
        <div className="p-grid-col text--right" id="message">{message}</div>
      </div>
      <div className="p-grid typography--p" style={styles.gridRow}>
        <div className="p-grid-col text--left">
          <b>에러코드</b>
        </div>
        <div className="p-grid-col text--right" id="code">{code}</div>
      </div>

      <div className="p-grid-col" style={styles.buttonContainer}>
        <a href="https://docs.tosspayments.com/guides/v2/payment-widget/integration">
          <button className="button" style={styles.button}>연동 문서</button>
        </a>
        <a href="https://discord.gg/A4fRFXQhRu">
          <button className="button" style={{ ...styles.button, ...styles.secondaryButton }}>
            실시간 문의
          </button>
        </a>
      </div>
    </div>
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
