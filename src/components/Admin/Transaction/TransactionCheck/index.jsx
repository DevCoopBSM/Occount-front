import React, {useState} from "react";
import Modal from "components/Modal";
import { ReactComponent as QuestionLogo } from "assets/QuestionLogo.svg";
import { useNavigate } from "react-router-dom";
import * as _ from "./style";
import axiosInstance from "utils/Axios";

const PaymentsCheck = ({ state, fetchUserInfo, actionType }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const amount = parseInt(state.variousPoint, 10);
  const navigate = useNavigate();

  const completePage = (data) => {
    console.log("Complete Page Data:", data); // 추가: 이 부분에서 데이터 확인
    navigate("/admin/complete", { state: { data } });
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleAction = () => {
    const endpoint = actionType === "pay" ? `v2/transaction/pay` : `v2/transaction/charge`;
    const payload = {
      userCode: state.userCode,
      [actionType === "pay" ? "payedPoint" : "chargedPoint"]: state.variousPoint,
      charger: state.charger,
    };

    axiosInstance
      .post(endpoint, payload)
      .then((result) => {
        const data = result.data;
        console.log("요청성공", data);
        completePage(data);
      })
      .catch((error) => {
        if (error.response && error.response.data.message === "잘못된 요청입니다. 잔액초과") {
          setErrorMessage("잔액이 부족합니다.");
          setTimeout(() => setErrorMessage(null), 3000);
        } else {
          console.log("요청실패", error);
        }
      });
  };

  return (
    <>
      <button onClick={openModal}>
        {actionType === "pay" ? "결제" : "충전"}
      </button>
      <Modal isOpen={modalOpen}>
        <_.ContentWrap>
          <QuestionLogo style={{ width: "60px", height: "60px" }} />
          <_.ContentTitle>{amount.toLocaleString()}원</_.ContentTitle>
          <_.ContentSubTitle>
            {actionType === "pay" ? "결제하시겠습니까?" : "충전하시겠습니까?"}
          </_.ContentSubTitle>
          {errorMessage && <div>{errorMessage}</div>}
        </_.ContentWrap>
        <_.BtnWrap>
          <button onClick={handleAction}>네</button>
          <button onClick={closeModal}>아니오</button>
        </_.BtnWrap>
      </Modal>
    </>
  );
};

export default PaymentsCheck;
