import React, { useState, useEffect } from "react";
import * as _ from "./style";
import { useAuth } from "context/authContext";
import RefundFormModal from './RefundFormModal';
import { handleRefundRequest } from './refundService';

const PointLogItem = ({ type, data, fetchUserLog }) => {
  const Type = type === 1 ? "충전" : "사용";
  const background = type === 1 ? "#E6EBFF" : "#EFF0F2";
  const usedBackground = type === 1 ? "#d4f4dd" : "#EFF0F2"; // 사용된 포인트의 연두색 배경
  const overWeekBackground = "#fffacd"; // 1주일이 넘은 건의 노란색 배경
  const [expandedItem, setExpandedItem] = useState(null);
  const [refundAccount, setRefundAccount] = useState({ bank: "", holderName: "", number: "", holderPhoneNumber: "" }); // 계좌 정보 상태 추가
  const [showRefundForm, setShowRefundForm] = useState(false); // 환불 폼 표시 상태
  const { refetchUser } = useAuth();

  const handleItemClick = (item) => {
    setExpandedItem(expandedItem === item ? null : item);
  };

  const closeModal = () => {
    setShowRefundForm(false);
    setRefundAccount({ bank: "", holderName: "", number: "", holderPhoneNumber: "" });
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
              <_.DateText>{new Date(item.date).toLocaleDateString()}</_.DateText>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <_.AmountText>
                  {`${parseInt(item.inner_point).toLocaleString()}원 ${Type}`}
                </_.AmountText>
                <_.ChargeTypeText>{chargeType}</_.ChargeTypeText>
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
