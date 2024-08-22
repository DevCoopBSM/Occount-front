import React, { useState, useEffect } from "react";
import PaymentsCheck from "../TransactionCheck"; // 통합된 체크 컴포넌트 사용
import TransactionLog from "../TransactionLog"; // 통합된 로그 컴포넌트 사용
import * as C from "../Complete/style";
import * as _ from "./style";
import * as P from "common/PageWrapStyle";
import { color } from "constants/color";
import { useLocation } from "react-router-dom";
import { useAuth } from "context/authContext"; // AuthContext에서 데이터를 가져옴
import axiosInstance from "utils/Axios"; // axiosInstance 임포트

const Payments = () => {
  const location = useLocation();
  const { userCode: initialUserCode } = location.state || {};
  const { user } = useAuth(); // AuthContext에서 사용자 정보를 가져옴

  const [state, setState] = useState({
    charger: user?.name || "", // 컨텍스트에서 가져온 adminName을 사용
    userName: "",
    userPoint: "",
    variousPoint: "",
    userCode: initialUserCode || "",
    errorMessage: "",
  });

  // 서버로부터 사용자 정보를 받아오는 함수
  const fetchUserInfo = async (userCode) => {
    try {
      const response = await axiosInstance.post(`v2/transaction/scan`, {
        userCode,
      });
      const { userName, userPoint } = response.data;
      setState((prevState) => ({
        ...prevState,
        userName,
        userPoint,
      }));
    } catch (error) {
      console.log("사용자 정보를 가져오는데 실패했습니다.", error);
    }
  };

  // 페이지가 처음 로드될 때 사용자 정보를 가져옴
  useEffect(() => {
    if (state.userCode) {
      fetchUserInfo(state.userCode);
    }
  }, [state.userCode]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const isNumeric = /^\d+$/; // 숫자만 포함하는 정규 표현식
    if (name === "variousPoint" && (!isNumeric.test(value) || parseInt(value, 10) < 1)) {
      setState((prevState) => ({
        ...prevState,
        variousPoint: "자연수로 입력해주세요", // 오류 메시지를 `variousPoint`에 설정
        errorMessage: "point value error", // 오류 메시지 설정 (이것은 선택적입니다. 필요에 따라 사용하거나 제거할 수 있습니다.)
      }));

      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          variousPoint: "",
          errorMessage: "",
        }));
      }, 2000);
      return;
    }

    setState((prevState) => ({
      ...prevState,
      [name]: value,
      errorMessage: "",
    }));
  };

  return (
    <>
      <P.InfoContainer>
        <C.StudentInfo>
          <C.InfoText color={color.default}>학생 정보</C.InfoText>
          <C.StudentInfoDetail>
            <C.InfoText>이름 : {state.userName}</C.InfoText>
          </C.StudentInfoDetail>
        </C.StudentInfo>

        <C.ExChangeDetailWrap
          width={"900px"}
          paddingTop={"10px"}
          marginTop={"5px"}
        >
          <C.InfoText color={color.default}>남은 금액</C.InfoText>
          <C.Exchange fontSize={"30px"} fontWeight={"700"}>
            {state.userPoint.toLocaleString()}원
          </C.Exchange>
        </C.ExChangeDetailWrap>
        <_.PointWrap>
          <_.PointInTop>
            <C.InfoText color={color.default}>포인트</C.InfoText>
            <_.PointInput
              name="variousPoint"
              value={state.variousPoint}
              onChange={handleChange}
              isError={!!state.errorMessage} // 에러 메시지가 있으면 true, 아니면 false
            />
          </_.PointInTop>

          <_.PointBottom>
            <_.NumberInput
              placeholder={state.charger}
              name="charger"
              value={state.charger}
              onChange={handleChange}
            />
            {/* 통합된 체크 컴포넌트를 사용하고, 결제와 충전 기능을 둘 다 처리할 수 있게 합니다 */}
            <PaymentsCheck state={state} fetchUserInfo={fetchUserInfo} actionType="pay" />
            <PaymentsCheck state={state} fetchUserInfo={fetchUserInfo} actionType="charge" />
          </_.PointBottom>
        </_.PointWrap>

        <C.InfoText>사용내역</C.InfoText>
        <_.UseLogWrap>
          <_.rightWrap>
            <li>
              <TransactionLog userCode={state.userCode} type="pay" />
            </li>
          </_.rightWrap>
          <_.leftWrap>
            <li>
              <TransactionLog userCode={state.userCode} type="charge" />
            </li>
          </_.leftWrap>
        </_.UseLogWrap>
      </P.InfoContainer>
    </>
  );
};

export default Payments;
