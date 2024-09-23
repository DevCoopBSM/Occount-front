import React, { useState, useEffect } from 'react';
import * as _ from './style';
import { useAuth } from 'context/authContext';
import RefundFormModal from './RefundFormModal';
import { handleRefundRequest } from './refundService';

const PointLogItem = ({ type, data, fetchUserLog }) => {
  const [expandedItems, setExpandedItems] = useState({}); // 여러 아이템의 상태를 객체로 관리
  const [refundAccount, setRefundAccount] = useState({
    bank: '',
    holderName: '',
    number: '',
    holderPhoneNumber: '',
  });
  const [showRefundForm, setShowRefundForm] = useState(false);
  const { refetchUser } = useAuth();

  // 아이템 클릭 시 상태를 토글
  const handleItemClick = (itemId) => {
    setExpandedItems((prevState) => ({
      ...prevState,
      [itemId]: !prevState[itemId], // 클릭된 아이템의 상태만 토글
    }));
  };

  const closeModal = () => {
    setShowRefundForm(false);
    setRefundAccount({
      bank: '',
      holderName: '',
      number: '',
      holderPhoneNumber: '',
    });
  };

  // 포인트 로그 데이터를 형식화
  const formattedData = data
    .map((item) => {
      const dateArray = item.chargeDate || item.payDate; // 충전일 또는 결제일 선택

      // 유효한 dateArray가 있을 경우에만 Date 객체 생성
      const logDate =
        Array.isArray(dateArray) && dateArray.length === 6
          ? new Date(
              dateArray[0],
              dateArray[1] - 1,
              dateArray[2],
              dateArray[3],
              dateArray[4],
              dateArray[5]
            )
          : new Date(); // 기본값: 현재 날짜

      return {
        ...item,
        date: logDate,
        inner_point: item.chargedPoint || item.payedPoint,
        type: item.chargeType || item.payType, // 타입 구분
      };
    })
    .sort((a, b) => b.date - a.date); // 날짜 순으로 정렬


  const getBackgroundColor = (item, type, isOverWeek) => {
    if (item.refundState) return '#ffcccc';
    if (item.type === '1' && type === 1) return '#fffacd'; // 오프라인 충전
    if (isOverWeek && type === 1) return '#fffacd';
    return type === 0 ? '#d4f4dd' : '#E6EBFF'; // 사용 내역 색상 구분
  };

  return (
    <div style={{ flexDirection: 'column' }}>
      {formattedData.map((item, index) => {
        const logDate = item.date;
        const currentDate = new Date();
        const timeDiff = Math.abs(currentDate.getTime() - logDate.getTime());
        const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        const isOverWeek = dayDiff > 7;

        // 충전 내역과 사용 내역에 따라 텍스트를 구분
        const transactionType =
          type === 1
            ? item.type === '1'
              ? '오프라인 충전'
              : item.type === '2'
              ? '카드 충전'
              : item.type === '3'
              ? '계좌 충전'
              : '기타 충전'
            : '포인트 사용';

        return (
          <div key={`${type}-${index}`}>
            {/* 아이템 클릭 시 확장 상태를 토글 */}
            <_.PointLogWrap
              onClick={() => handleItemClick(item.chargeId || item.payId)} // 사용 내역에서도 개별 상태 관리
              style={{ background: getBackgroundColor(item, type, isOverWeek) }}
            >
              <_.DateText>{item.date.toLocaleDateString()}</_.DateText>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <_.AmountText>
                  {`${item.inner_point.toLocaleString()}원 ${
                    type === 1 ? '충전' : '사용'
                  }`}
                </_.AmountText>
                <_.ChargeTypeText>{transactionType}</_.ChargeTypeText>
              </div>
            </_.PointLogWrap>

            {/* 아이템이 확장된 상태일 때만 상세 정보 표시 */}
            {expandedItems[item.chargeId || item.payId] && ( // 충전 및 사용 내역 모두 개별적으로 확장
              <_.DetailWrap>
                <_.DetailRow>
                  <_.DetailLabel>일시:</_.DetailLabel>
                  <_.DetailValue>{item.date.toLocaleString()}</_.DetailValue>
                </_.DetailRow>
                <_.DetailRow>
                  <_.DetailLabel>금액:</_.DetailLabel>
                  <_.DetailValue>
                    {item.inner_point.toLocaleString()}원
                  </_.DetailValue>
                </_.DetailRow>
                {type === 1 && (
                  <>
                    <_.DetailRow>
                      <_.DetailLabel>상태:</_.DetailLabel>
                      <_.DetailValue>
                        {item.refundState
                          ? '환불 완료'
                          : isOverWeek
                          ? '1주일 초과'
                          : item.type >= 2
                          ? item.type === 3
                            ? '환불 신청 시 계좌 정보가 필요합니다.'
                            : '환불신청가능'
                          : '오프라인 충전된 내역'}
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
                            handleRefundRequest={() =>
                              handleRefundRequest(
                                item,
                                refundAccount,
                                type,
                                fetchUserLog,
                                refetchUser,
                                closeModal
                              )
                            }
                          />
                        )}
                        <div
                          style={{ display: 'flex', justifyContent: 'center' }}
                        >
                          <_.ModalButton
                            onClick={() => {
                              if (item.type === 3) {
                                setShowRefundForm(true); // 계좌 입력 필요
                              } else {
                                handleRefundRequest(
                                  item,
                                  refundAccount,
                                  type,
                                  fetchUserLog,
                                  refetchUser,
                                  closeModal
                                );
                              }
                            }}
                          >
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
