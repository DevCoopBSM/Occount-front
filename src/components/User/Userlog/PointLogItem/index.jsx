import React, { useState, useEffect } from "react";
import * as _ from "./style";
import { useAuth } from "context/authContext";
import { axiosInstance } from "utils/Axios";

const PointLogItem = ({ type, data, fetchUserLog }) => {
  const Type = type === 1 ? "충전" : "사용";
  const background = type === 1 ? "#E6EBFF" : "#EFF0F2";
  const usedBackground = "#d4f4dd"; // 사용된 포인트의 연두색 배경
  const overWeekBackground = "#fffacd"; // 1주일이 넘은 건의 노란색 배경
  const [expandedItem, setExpandedItem] = useState(null);
  const { refetchUser } = useAuth();

  const handleItemClick = (item) => {
    setExpandedItem(expandedItem === item ? null : item);
  };

  const handleRefundRequest = async (item) => {
    if (item?.charger_id === "Online") {
      const chargeDate = new Date(item.date);
      const currentDate = new Date();
      const timeDiff = Math.abs(currentDate.getTime() - chargeDate.getTime());
      const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

      if (dayDiff > 7) {
        alert("충전한지 1주일이 초과된 건은 환불할 수 없습니다.");
        return;
      }

      const confirmed = window.confirm(
        `일시: ${new Date(item.date).toLocaleString()} \n금액: ${parseInt(item.inner_point).toLocaleString()}원 \n\n환불을 신청하시겠습니까?`
      );
      if (confirmed) {
        try {
          const response = await axiosInstance.post("/toss/refund", { charge_num: item.charge_num });
          if (response.data.success) {
            alert(`환불 신청이 완료되었습니다: ${response.data.data.message}`);
            setExpandedItem(null);
            await fetchUserLog(type); // 환불이 완료된 후 유저 로그를 다시 불러옵니다
            await refetchUser(); // 유저 정보를 다시 불러옵니다
          } else {
            alert(`환불에 실패하였습니다. 다시 시도해주세요. 에러: ${response.data.error}`);
          }
        } catch (error) {
          console.error(error);
          alert(`환불에 실패하였습니다. 다시 시도해주세요. 에러: ${error.response.data.message}, ${error.response.data.details}`);
        }
      }
    }
  };

  useEffect(() => {
    if (expandedItem) {
      const updatedItem = data.find((item) => item.charge_num === expandedItem.charge_num);
      if (updatedItem) {
        setExpandedItem(updatedItem);
      }
    }
  }, [data]);

  return (
    <div style={{ flexDirection: "column" }}>
      {data.map((item, index) => {
        const chargeDate = new Date(item.date);
        const currentDate = new Date();
        const timeDiff = Math.abs(currentDate.getTime() - chargeDate.getTime());
        const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        const isOverWeek = dayDiff > 7;

        return (
          <div key={`${type}-${index}`}>
            <_.PointLogWrap
              onClick={() => handleItemClick(item)}
              style={{
                background: item.refundState
                  ? "#ffcccc"
                  : item.charger_id !== "Online" && type === 1
                  ? "#fffacd"
                  : isOverWeek && type === 1
                  ? overWeekBackground
                  : type === 0
                  ? usedBackground
                  : background,
              }}
            >
              <_.DateText>{new Date(item.date).toLocaleDateString()}</_.DateText>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <_.AmountText>
                  {`${parseInt(item.inner_point).toLocaleString()}원 ${Type}`}
                </_.AmountText>
              </div>
            </_.PointLogWrap>
            {expandedItem === item && (
              <_.DetailWrap>
                <_.DetailRow>
                  <_.DetailLabel>일시:</_.DetailLabel>
                  <_.DetailValue>{new Date(item.date).toLocaleString()}</_.DetailValue>
                </_.DetailRow>
                <_.DetailRow>
                  <_.DetailLabel>금액:</_.DetailLabel>
                  <_.DetailValue>{parseInt(item.inner_point).toLocaleString()}원</_.DetailValue>
                </_.DetailRow>
                {type === 1 && (
                  <>
                    <_.DetailRow>
                      <_.DetailLabel>상태:</_.DetailLabel>
                      <_.DetailValue>
                        {item.refundState 
                          ? "환불 완료" 
                          : isOverWeek 
                          ? "1주일 초과" 
                          : item.charger_id === "Online" 
                          ? "환불신청가능" 
                          : "온라인으로 충전된 내역이 아님"}
                      </_.DetailValue>
                    </_.DetailRow>
                    {item.charger_id === "Online" && !item.refundState && !isOverWeek && (
                      <div style={{ display: "flex", justifyContent: "center" }}>
                        <_.ModalButton onClick={() => handleRefundRequest(item)}>환불 신청</_.ModalButton>
                      </div>
                    )}
                  </>
                )}
              </_.DetailWrap>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PointLogItem;
