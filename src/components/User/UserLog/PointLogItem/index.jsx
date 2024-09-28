import React, { useState, useEffect } from 'react';
import * as _ from './style';
import { useAuth } from 'contexts/authContext';
import RefundFormModal from './RefundFormModal';
import { handleRefundRequest } from './refundService';

const PointLogItem = ({ type, data, fetchUserLog }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [refundAccount, setRefundAccount] = useState({
    bank: '',
    holderName: '',
    number: '',
    holderPhoneNumber: '',
  });
  const [showRefundForm, setShowRefundForm] = useState(false);
  const { refetchUser } = useAuth();

  const item = data[0];
  const itemId = item.chargeId || item.payId;

  useEffect(() => {
    setIsExpanded(false);
  }, [itemId]);

  const handleItemClick = () => {
    setIsExpanded(!isExpanded);
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

  const formatDate = (dateArray) => {
    if (Array.isArray(dateArray) && dateArray.length === 6) {
      return new Date(dateArray[0], dateArray[1] - 1, dateArray[2], dateArray[3], dateArray[4], dateArray[5]);
    }
    return new Date();
  };

  const date = formatDate(item.chargeDate || item.payDate);
  const inner_point = item.chargedPoint || item.payedPoint;
  const itemType = item.chargeType || item.payType;

  const currentDate = new Date();
  const timeDiff = Math.abs(currentDate.getTime() - date.getTime());
  const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  const isOverWeek = dayDiff > 7;

  const getBackgroundColor = () => {
    if (item.refundState) return '#ffcccc';
    if (itemType === '1' && type === 1) return '#fffacd';
    if (isOverWeek && type === 1) return '#fffacd';
    return type === 0 ? '#d4f4dd' : '#E6EBFF';
  };

  const getTransactionType = () => {
    if (type !== 1) return '포인트 사용';
    switch (itemType) {
      case '1': return '오프라인 충전';
      case '2': return '카드 충전';
      case '3': return '계좌 충전';
      default: return '기타 충전';
    }
  };

  const getRefundStatus = () => {
    if (item.refundState) return '환불 완료';
    if (isOverWeek) return '1주일 초과';
    if (itemType >= 2) {
      return itemType === 3 ? '환불 신청 시 계좌 정보가 필요합니다.' : '환불가능';
    }
    return '오프라인 충전된 내역';
  };

  const renderRefundButton = () => {
    if (itemType >= 2 && !item.refundState && !isOverWeek) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <_.ModalButton
            onClick={() => {
              if (itemType === 3) {
                setShowRefundForm(true);
              } else {
                handleRefundRequest(item, refundAccount, type, fetchUserLog, refetchUser, closeModal);
              }
            }}
          >
            환불 신청
          </_.ModalButton>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <_.PointLogWrap
        onClick={handleItemClick}
        style={{ background: getBackgroundColor() }}
      >
        <_.DateText>{date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\./g, '.').slice(0, -1)}</_.DateText>
        <_.AmountText>{`${inner_point.toLocaleString()}원`}</_.AmountText>
        <_.ChargeTypeText>{getTransactionType()}</_.ChargeTypeText>
      </_.PointLogWrap>

      {isExpanded && (
        <_.DetailWrap>
          <_.DetailRow>
            <_.DetailLabel>날짜:</_.DetailLabel>
            <_.DetailValue>{date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\./g, '.').slice(0, -1)}</_.DetailValue>
          </_.DetailRow>
          <_.DetailRow>
            <_.DetailLabel>시간:</_.DetailLabel>
            <_.DetailValue>{date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</_.DetailValue>
          </_.DetailRow>
          <_.DetailRow>
            <_.DetailLabel>금액:</_.DetailLabel>
            <_.DetailValue>{inner_point.toLocaleString()}원</_.DetailValue>
          </_.DetailRow>
          {type === 1 && (
            <>
              <_.DetailRow>
                <_.DetailLabel>상태:</_.DetailLabel>
                <_.DetailValue>{getRefundStatus()}</_.DetailValue>
              </_.DetailRow>
              {renderRefundButton()}
            </>
          )}
        </_.DetailWrap>
      )}
      {showRefundForm && (
        <RefundFormModal
          isOpen={showRefundForm}
          closeModal={closeModal}
          refundAccount={refundAccount}
          setRefundAccount={setRefundAccount}
          handleRefundRequest={() => handleRefundRequest(item, refundAccount, type, fetchUserLog, refetchUser, closeModal)}
        />
      )}
    </div>
  );
};

export default PointLogItem;