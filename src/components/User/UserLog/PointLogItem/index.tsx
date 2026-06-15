import { useState, useEffect, useCallback } from 'react';
import * as _ from './style';
import { MockLogItem, PointLogItemProps, UserLogItem } from './types';

const isMockLogItem = (item: UserLogItem): item is MockLogItem => {
  return (
    'chargeAmount' in item ||
    'paymentAmount' in item ||
    'storeName' in item ||
    'paymentMethod' in item ||
    'chargeMethod' in item ||
    'status' in item
  );
};

function PointLogItem({ type, data }: PointLogItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const item = data[0];
  const itemId = item.chargeId ?? item.payId;

  useEffect(() => {
    setIsExpanded(false);
  }, [itemId]);

  const handleItemClick = () => {
    setIsExpanded(!isExpanded);
  };

  const formatDate = (dateArray: number[] | undefined): Date => {
    if (Array.isArray(dateArray) && dateArray.length === 6) {
      return new Date(
        dateArray[0],
        dateArray[1] - 1,
        dateArray[2],
        dateArray[3],
        dateArray[4],
        dateArray[5]
      );
    }
    return new Date();
  };

  const date = formatDate(item.chargeDate ?? item.payDate);
  const innerPoint =
    item.chargedPoint ??
    item.payedPoint ??
    (isMockLogItem(item) ? (item.chargeAmount ?? item.paymentAmount ?? 0) : 0);
  const itemType = item.chargeType ?? item.payType;

  const getBackgroundColor = useCallback(() => '#ffffff', []);

  const getTransactionType = () => {
    if (type !== 1) {
      // 주문 상태 표시
      switch (item.orderStatus) {
        case 'COMPLETED':
          return '결제완료';
        case 'CANCELLED':
          return '취소됨';
        case 'FAILED':
          return '결제실패';
        case 'PROCESSING':
          return '처리중';
        default:
          return '포인트 사용';
      }
    }
    // 충전 내역: v3 chargeReason 우선, 없으면 구버전 itemType 폴백
    if (item.chargeReason) {
      const reasonMap: Record<string, string> = {
        PURCHASE: '포인트 충전',
        REFUND: '환불',
        ADMIN: '관리자 지급',
        EVENT: '이벤트',
      };
      return reasonMap[item.chargeReason] ?? '기타 충전';
    }
    switch (itemType) {
      case '1':
        return '오프라인 충전';
      case '2':
        return '카드 충전';
      case '3':
        return '계좌 충전';
      default:
        return '기타 충전';
    }
  };

  return (
    <div>
      <_.PointLogWrap onClick={handleItemClick} style={{ background: getBackgroundColor() }}>
        <_.LeftSection>
          <_.DateText>
            {date
              .toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })
              .replace(/\. /g, '/')
              .replace(/\./g, '')}
          </_.DateText>
          <_.AmountText>{`${innerPoint.toLocaleString()}원`}</_.AmountText>
        </_.LeftSection>
        <_.ChargeTypeText>{getTransactionType()}</_.ChargeTypeText>
      </_.PointLogWrap>

      {isExpanded && (
        <_.DetailWrap>
          <_.DetailRow>
            <_.DetailLabel>날짜:</_.DetailLabel>
            <_.DetailValue>
              {date
                .toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })
                .replace(/\./g, '.')
                .slice(0, -1)}
            </_.DetailValue>
          </_.DetailRow>
          <_.DetailRow>
            <_.DetailLabel>시간:</_.DetailLabel>
            <_.DetailValue>
              {date.toLocaleTimeString('ko-KR', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })}
            </_.DetailValue>
          </_.DetailRow>
          {type === 0 && item.orderLines && item.orderLines.length > 0 && (
            <>
              <_.Divider />
              {item.orderLines.map((line) => (
                <_.OrderLineRow key={line.item_id}>
                  <_.OrderLineName>{line.item_name_snapshot}</_.OrderLineName>
                  <_.OrderLineQty>x{line.quantity}</_.OrderLineQty>
                  <_.OrderLinePrice>{line.total_price.toLocaleString()}원</_.OrderLinePrice>
                </_.OrderLineRow>
              ))}
              {item.orderPayment && (
                <>
                  <_.Divider />
                  {item.orderPayment.points_used > 0 && (
                    <_.DetailRow>
                      <_.DetailLabel>포인트:</_.DetailLabel>
                      <_.DetailValue>
                        {item.orderPayment.points_used.toLocaleString()}원
                      </_.DetailValue>
                    </_.DetailRow>
                  )}
                  {item.orderPayment.card_amount > 0 && (
                    <_.DetailRow>
                      <_.DetailLabel>카드:</_.DetailLabel>
                      <_.DetailValue>
                        {item.orderPayment.card_amount.toLocaleString()}원
                      </_.DetailValue>
                    </_.DetailRow>
                  )}
                </>
              )}
            </>
          )}
          {type === 1 && item.detailReason && (
            <_.DetailRow>
              <_.DetailLabel>사유:</_.DetailLabel>
              <_.DetailValue>{item.detailReason}</_.DetailValue>
            </_.DetailRow>
          )}
        </_.DetailWrap>
      )}
    </div>
  );
}

export default PointLogItem;
