import React from "react";
import { ReactComponent as CheckLogo } from "assets/CheckLogo.svg";
import { useNavigate, useLocation } from "react-router-dom";
import * as _ from "./style";
import { color } from "constants/color";

const Complete = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const dataFromState = location.state?.data || {};

  console.log("Received Data:", dataFromState); // 추가: 이 부분에서 받은 데이터 확인

  const transactionType = dataFromState.plusPoint ? "충전" : "결제";
  const transactionAmount = dataFromState.chargedPoint || dataFromState.payedPoint;
  const oldPoint = dataFromState.oldPoint;
  const newPoint = dataFromState.newPoint;
  const studentName = dataFromState.studentName;

  const GoBack = () => {
    navigate("/admin/payments", {
      state: {
        userName: studentName,
        userPoint: newPoint, // 남은 금액을 새로운 시작 금액으로 설정
        userCode: dataFromState.userCode, // 사용자 코드를 그대로 전달
      },
    });
  };

  const GoBackBarcode = () => {
    navigate("/admin/barcode");
  };

  return (
    <>
      <_.CompeleteWrap>
        <_.PaymentsTopWrap>
          <CheckLogo style={{ width: "70px", height: "70px" }} />
          <_.PaymentsTopTitle>
            {transactionAmount ? transactionAmount.toLocaleString() : "0"}원
          </_.PaymentsTopTitle>
          <_.PaymentsTopSubTitle>{transactionType}완료</_.PaymentsTopSubTitle>
        </_.PaymentsTopWrap>

        <_.PaymentsBottomWrap>
          <_.StudentInfo>
            <_.InfoText color={color.default}>학생정보</_.InfoText>
            <_.StudentInfoDetail>
              <_.InfoText>이름 : {studentName}</_.InfoText>
            </_.StudentInfoDetail>
          </_.StudentInfo>

          <_.ExChangeWrap>
            <_.ExChangeDetailWrap marginTop={"30px"}>
              <_.InfoText color={color.default}>원래금액</_.InfoText>
              <_.Exchange>
                {oldPoint ? oldPoint.toLocaleString() : "0"}원
              </_.Exchange>
            </_.ExChangeDetailWrap>

            <_.ExChangeDetailWrap>
              <_.InfoText color={color.default}>{transactionType}금액</_.InfoText>
              <_.Exchange>
                {transactionAmount ? transactionAmount.toLocaleString() : "0"}원
              </_.Exchange>
            </_.ExChangeDetailWrap>

            <_.ExChangeDetailWrap
              paddingTop={"10px"}
              marginTop={"5px"}
              border={`1px solid #D3D3D3`}
            >
              <_.InfoText color={color.default}>남은금액</_.InfoText>
              <_.Exchange fontSize={"30px"} fontWeight={"700"}>
                {newPoint ? newPoint.toLocaleString() : "0"}원
              </_.Exchange>
            </_.ExChangeDetailWrap>
          </_.ExChangeWrap>
        </_.PaymentsBottomWrap>
        <_.GoBackBtn onClick={GoBack}>추가 충전 및 결제</_.GoBackBtn>
        <br />
        <br />
        <_.GoBackBtn onClick={GoBackBarcode}>새 바코드</_.GoBackBtn>
      </_.CompeleteWrap>
    </>
  );
};

export default Complete;
