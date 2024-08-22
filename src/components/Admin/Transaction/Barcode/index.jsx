import React, { useState, useRef } from "react";
import imgLogo from "assets/DevCoopL.svg";
import axiosInstance from "utils/Axios";
import { useNavigate } from "react-router-dom";
import * as _ from "./style"; // 스타일 파일을 임포트

// 바코드를 전송하여 사용자 정보를 가져오는 함수
export const sendBarcode = async (userCode) => {
  try {
    const response = await axiosInstance.post(`v2/transaction/scan`, {
      userCode,
    });
    return response.data; // 서버에서 반환된 데이터를 그대로 반환
  } catch (error) {
    throw error;
  }
};

export const Barcode = () => {
  const [userCode, setUserCode] = useState(""); // userCode 상태 관리
  const [errorMessage, setErrorMessage] = useState(""); // 오류 메시지 상태 관리
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅
  const inputRef = useRef(null); // 입력창에 포커스를 맞추기 위한 ref

  // 입력값이 변경될 때마다 userCode 상태 업데이트
  const handleChange = (e) => {
    setUserCode(e.target.value);
    setErrorMessage(""); // 입력 중일 때 오류 메시지 초기화
  };

  // 폼 제출 시 실행되는 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 서버에 userCode를 전송하고 사용자 정보 받아옴
      const { userName, userPoint } = await sendBarcode(userCode);
      // 페이지 이동 시 사용자 정보와 userCode를 state로 넘김
      navigate("/admin/payments", {
        state: {
          userName,
          userPoint,
          userCode,
        },
      });
    } catch (error) {
      setErrorMessage("바코드 인식에 실패했습니다. 다시 시도해주세요.");
      setUserCode(""); // 바코드 입력창을 초기화
      inputRef.current.focus(); // 입력창에 포커스 맞추기
    }
  };

  return (
    <_.BarcodeWrap>
      <_.BarcodeIn onSubmit={handleSubmit}>
        <div
          style={{
            fontSize: "27px",
            marginBottom: "20px",
            textAlign: "center",
            fontWeight: 600,
            color: "#51515E",
          }}
        >
          학생증 스캔 페이지
        </div>
        <_.LogoImg src={imgLogo} alt="logo image" />
        <_.BarcodeInput
          placeholder="바코드를 스캔해주세요"
          onChange={handleChange}
          value={userCode}
          ref={inputRef} // ref 연결
          type="password"
          autoFocus
        />
        {errorMessage && <_.ErrorText>{errorMessage}</_.ErrorText>} {/* 오류 메시지 출력 */}
        <br />
        <_.ConfirmButton>확인</_.ConfirmButton>
      </_.BarcodeIn>
    </_.BarcodeWrap>
  );
};

export default Barcode;
