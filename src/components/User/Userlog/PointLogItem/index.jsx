import React, { useState, useEffect } from "react";
import * as _ from "./style";
import { useAuth } from "context/authContext";
import RefundFormModal from './RefundFormModal';
import { handleRefundRequest } from './refundService';

const PointLogItem = ({ type, data, fetchUserLog }) => {
  const Type = type === 1 ? "충전" : "사용";
  const background = type === 1 ? "#E6EBFF" : "#EFF0F2";
  const usedBackground = type === 1 ? "#d4f4dd" : "#EFF0F2";
  const overWeekBackground = "#fffacd";
  const [expandedItemId, setExpandedItemId] = useState(null);
  const [refundAccount, setRefundAccount] = useState({ bank: "", holderName: "", number: "", holderPhoneNumber: "" });
  const [showRefundForm, setShowRefundForm] = useState(false);
  const { refetchUser } = useAuth();

  const handleItemClick = (item) => {
    setExpandedItemId(expandedItemId === item.chargeId ? null : item.chargeId);
  };

  const closeModal = () => {
    setShowRefundForm(false);
    setRefundAccount({ bank: "", holderName: "", number: "", holderPhoneNumber: "" });
  };

  useEffect(() => {
    if (expandedItemId) {
      const updatedItem = data.find((item) => item.chargeId === expandedItemId);
      if (!updatedItem) {
        setExpandedItemId(null);
      }
    }
  }, [data, expandedItemId]);

  // 데이터가 undefined일 경우를 대비해 기본값 설정
  const logList = data || [];

  // 데이터를 적절히 변환
  const formattedData = logList
    .map((item) => {
      const chargeDate = new Date(...item.chargeDate); // 배열을 스프레드해서 Date 객체로 변환
      return {
        ...item,
        date: chargeDate, // 날짜 형식을 JS Date 객체로 변환
        inner_point: item.chargedPoint || item.payedPoint, // 포인트 금액 필드
        type: item.chargeType || item.payType, // 타입 필드
        charger_id: item.managedEmail // 관리자 이메일 필드
      };
    })
    .sort((a, b) => b.date - a.date); // 내림차순 정렬

  return (
    <div style={{ flexDirection: "column" }}>
      {formattedData.map((item, index) => {
        const chargeDate = item.date;
        const currentDate = new Date();
        const timeDiff = Math.abs(currentDate.getTime() - chargeDate.getTime());
        const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        const isOverWeek = dayDiff > 7;

        const chargeType = item.type === "2" ? "카드 충전" : item.type === "3" ? "계좌 충전" : "기타 충전";

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
              <_.DateText>{item.date.toLocaleDateString()}</_.DateText>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <_.AmountText>
                  {`${item.inner_point.toLocaleString()}원 ${Type}`}
                </_.AmountText>
                <_.ChargeTypeText>{chargeType}</_.ChargeTypeText>
              </div>
            </_.PointLogWrap>
            {expandedItemId === item.chargeId && (
              <_.DetailWrap>
                <_.DetailRow>
                  <_.DetailLabel>일시:</_.DetailLabel>
                  <_.DetailValue>{item.date.toLocaleString()}</_.DetailValue>
                </_.DetailRow>
                <_.DetailRow>
                  <_.DetailLabel>금액:</_.DetailLabel>
                  <_.DetailValue>{item.inner_point.toLocaleString()}원</_.DetailValue>
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
                      <>
                        {showRefundForm && item.type === "3" && (
                          <RefundFormModal
                            isOpen={showRefundForm}
                            closeModal={closeModal}
                            refundAccount={refundAccount}
                            setRefundAccount={setRefundAccount}
                            handleRefundRequest={() => handleRefundRequest(item, refundAccount, type, fetchUserLog, refetchUser, closeModal)}
                          />
                        )}
                        <div style={{ display: "flex", justifyContent: "center" }}>
                          <_.ModalButton onClick={() => {
                            if (item.type === "3") {
                              setShowRefundForm(true);
                            } else {
                              handleRefundRequest(item, refundAccount, type, fetchUserLog, refetchUser, closeModal);
                            }
                          }}>
                            환불 신청
                          </_.ModalButton>
                        </div>
                      </>
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
