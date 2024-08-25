import React, { useState, useEffect } from "react";
import * as _ from "./style";
import { useAuth } from "context/authContext";
import RefundFormModal from './RefundFormModal';
import { handleRefundRequest } from './refundService';

const PointLogItem = ({ type, data, fetchUserLog }) => {
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

  const logList = data || [];

  const formattedData = logList
    .map((item) => {
      const chargeDate = new Date(item.chargeDate[0], item.chargeDate[1] - 1, item.chargeDate[2], item.chargeDate[3], item.chargeDate[4], item.chargeDate[5]);
      return {
        ...item,
        date: chargeDate,
        inner_point: item.chargedPoint || item.payedPoint,
        type: item.chargeType || item.payType,
      };
    })
    .sort((a, b) => b.date - a.date);

  const getBackgroundColor = (item, type, isOverWeek) => {
    if (item.refundState) return "#ffcccc";
    if (item.type === "1" && type === 1) return "#fffacd"; // 오프라인 충전 (type === 1) 일 때
    if (isOverWeek && type === 1) return "#fffacd";
    return type === 0 ? "#d4f4dd" : "#E6EBFF";
  };

  return (
    <div style={{ flexDirection: "column" }}>
      {formattedData.map((item, index) => {
        const chargeDate = item.date;
        const currentDate = new Date();
        const timeDiff = Math.abs(currentDate.getTime() - chargeDate.getTime());
        const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        const isOverWeek = dayDiff > 7;

        const chargeType = item.type === "1" 
          ? "오프라인 충전" 
          : item.type === "2" 
          ? "카드 충전" 
          : item.type === "3" 
          ? "계좌 충전" 
          : "기타 충전";

        return (
          <div key={`${type}-${index}`}>
            <_.PointLogWrap
              onClick={() => handleItemClick(item)}
              style={{ background: getBackgroundColor(item, type, isOverWeek) }}
            >
              <_.DateText>{item.date.toLocaleDateString()}</_.DateText>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <_.AmountText>
                  {`${item.inner_point.toLocaleString()}원 ${type === 1 ? "충전" : "사용"}`}
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
                          : item.type >= 2 
                          ? (item.type === 3 ? "환불 신청 시 계좌 정보가 필요합니다." : "환불신청가능") 
                          : "오프라인 충전된 내역"}
                      </_.DetailValue>
                    </_.DetailRow>
                    {item.type >= 2 && !item.refundState && !isOverWeek && (
                      <>
                        {showRefundForm && item.type === 3 && (
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
                            if (item.type === 3) {
                              setShowRefundForm(true); // 계좌 입력이 필요함
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
