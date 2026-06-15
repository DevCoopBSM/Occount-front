import { useState, useEffect } from 'react';
import Icon from 'components/Icon';
import { useSwipeable } from 'react-swipeable';
import { fetchAllOrders, fetchAllCharges } from 'utils/orderApi';
import PointLogItem from './PointLogItem';
import * as S from './style';

// 개발 모드 체크
const isDevMode = () => {
  return process.env.NODE_ENV === 'development' && process.env.REACT_APP_DEV_MODE === 'true';
};

// Mock 데이터 (v3 orders API 응답 구조)
const getMockPayLogs = () => [
  {
    order_id: 1,
    status: 'COMPLETED',
    order_date: '2026-06-15T12:30:00',
    total_amount: 7500,
    lines: [
      {
        item_id: 1,
        item_name_snapshot: '삼각김밥',
        unit_price: 1500,
        quantity: 3,
        total_price: 4500,
      },
      {
        item_id: 2,
        item_name_snapshot: '음료수',
        unit_price: 3000,
        quantity: 1,
        total_price: 3000,
      },
    ],
    payment: {
      payment_log_id: 1,
      payment_status: 'SUCCEEDED',
      points_used: 7500,
      card_amount: 0,
      transaction_id: null,
      approval_number: null,
    },
  },
  {
    order_id: 2,
    status: 'COMPLETED',
    order_date: '2026-06-15T11:15:00',
    total_amount: 6800,
    lines: [
      {
        item_id: 3,
        item_name_snapshot: '컵라면',
        unit_price: 1200,
        quantity: 2,
        total_price: 2400,
      },
      {
        item_id: 4,
        item_name_snapshot: '샌드위치',
        unit_price: 4400,
        quantity: 1,
        total_price: 4400,
      },
    ],
    payment: {
      payment_log_id: 2,
      payment_status: 'SUCCEEDED',
      points_used: 0,
      card_amount: 6800,
      transaction_id: 'TXN-001',
      approval_number: '00012345',
    },
  },
  {
    order_id: 3,
    status: 'COMPLETED',
    order_date: '2026-06-14T15:20:00',
    total_amount: 1200,
    lines: [
      { item_id: 5, item_name_snapshot: '과자', unit_price: 1200, quantity: 1, total_price: 1200 },
    ],
    payment: {
      payment_log_id: 3,
      payment_status: 'SUCCEEDED',
      points_used: 1200,
      card_amount: 0,
      transaction_id: null,
      approval_number: null,
    },
  },
  {
    order_id: 4,
    status: 'CANCELLED',
    order_date: '2026-06-14T16:45:00',
    total_amount: 3200,
    lines: [
      {
        item_id: 6,
        item_name_snapshot: '아이스크림',
        unit_price: 1600,
        quantity: 2,
        total_price: 3200,
      },
    ],
    payment: null,
  },
  {
    order_id: 5,
    status: 'COMPLETED',
    order_date: '2026-06-13T18:10:00',
    total_amount: 1800,
    lines: [
      { item_id: 7, item_name_snapshot: '초콜릿', unit_price: 900, quantity: 2, total_price: 1800 },
    ],
    payment: {
      payment_log_id: 5,
      payment_status: 'SUCCEEDED',
      points_used: 1800,
      card_amount: 0,
      transaction_id: null,
      approval_number: null,
    },
  },
  {
    order_id: 6,
    status: 'COMPLETED',
    order_date: '2026-06-13T12:15:00',
    total_amount: 8200,
    lines: [
      {
        item_id: 8,
        item_name_snapshot: '도시락',
        unit_price: 5500,
        quantity: 1,
        total_price: 5500,
      },
      {
        item_id: 9,
        item_name_snapshot: '음료수',
        unit_price: 2700,
        quantity: 1,
        total_price: 2700,
      },
    ],
    payment: {
      payment_log_id: 6,
      payment_status: 'SUCCEEDED',
      points_used: 3000,
      card_amount: 5200,
      transaction_id: 'TXN-002',
      approval_number: '00056789',
    },
  },
  {
    order_id: 7,
    status: 'FAILED',
    order_date: '2026-06-12T14:30:00',
    total_amount: 1200,
    lines: [
      { item_id: 5, item_name_snapshot: '과자', unit_price: 1200, quantity: 1, total_price: 1200 },
    ],
    payment: null,
  },
];

const getMockChargeLogs = () => [
  {
    charge_id: 1,
    charge_date: '2026-06-15T09:00:00',
    charge_reason: 'PURCHASE',
    detail_reason: '포인트 충전',
    payment_id: 5001,
    before_point: 0,
    change_amount: 100000,
    after_point: 100000,
  },
  {
    charge_id: 2,
    charge_date: '2026-06-10T15:30:00',
    charge_reason: 'PURCHASE',
    detail_reason: '포인트 충전',
    payment_id: 5002,
    before_point: 100000,
    change_amount: 50000,
    after_point: 150000,
  },
  {
    charge_id: 3,
    charge_date: '2026-06-05T13:45:00',
    charge_reason: 'PURCHASE',
    detail_reason: '포인트 충전',
    payment_id: 5003,
    before_point: 150000,
    change_amount: 30000,
    after_point: 180000,
  },
];

function UserLog() {
  const [currentPage, setCurrentPage] = useState(0);
  const [useLogData, setUseLogData] = useState([]);
  const [chargeLogData, setChargeLogData] = useState([]);
  const [itemsPerPage] = useState(12);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'usage', 'charge'

  useEffect(() => {
    fetchUserLog();
  }, []);

  const mapChargeToLogItem = (charge) => {
    const d = new Date(charge.charge_date);
    return {
      chargeId: charge.charge_id,
      chargeDate: [
        d.getFullYear(),
        d.getMonth() + 1,
        d.getDate(),
        d.getHours(),
        d.getMinutes(),
        d.getSeconds(),
      ],
      chargedPoint: charge.change_amount,
      chargeReason: charge.charge_reason,
    };
  };

  const mapOrderToLogItem = (order) => {
    const d = new Date(order.order_date);
    return {
      payId: order.order_id,
      payDate: [
        d.getFullYear(),
        d.getMonth() + 1,
        d.getDate(),
        d.getHours(),
        d.getMinutes(),
        d.getSeconds(),
      ],
      payedPoint: order.total_amount,
      orderLines: order.lines,
      orderPayment: order.payment,
      orderStatus: order.status,
    };
  };

  const fetchUserLog = async () => {
    try {
      // 개발 모드일 때 Mock 데이터 사용
      if (isDevMode()) {
        setUseLogData(getMockPayLogs().map(mapOrderToLogItem));
        setChargeLogData(getMockChargeLogs().map(mapChargeToLogItem));
        return;
      }

      const [allOrders, allCharges] = await Promise.all([fetchAllOrders(), fetchAllCharges()]);
      setUseLogData(allOrders.map(mapOrderToLogItem));
      setChargeLogData(allCharges.map(mapChargeToLogItem));
    } catch (error) {
      console.error(error);
      setUseLogData([]);
      setChargeLogData([]);
    }
  };

  const getLogDate = (item) => {
    const dateArray = item.payDate || item.chargeDate;
    if (Array.isArray(dateArray) && dateArray.length === 6) {
      const [year, month, day, hour, minute, second] = dateArray;
      return new Date(year, month - 1, day, hour, minute, second);
    }
    return new Date(0);
  };

  const addLogMeta = (item, logType) => ({
    ...item,
    logType,
    logDate: getLogDate(item),
  });

  // 모든 로그를 합치고 날짜순으로 정렬
  const getAllLogs = () => {
    const useLogs = useLogData.map((item) => addLogMeta(item, 'usage'));
    const chargeLogs = chargeLogData.map((item) => addLogMeta(item, 'charge'));
    const allLogs = [...useLogs, ...chargeLogs];
    return allLogs.sort((a, b) => b.logDate - a.logDate);
  };

  // 현재 탭에 따라 표시할 데이터 결정
  const getDisplayData = () => {
    switch (activeTab) {
      case 'usage':
        return useLogData.map((item) => addLogMeta(item, 'usage'));
      case 'charge':
        return chargeLogData.map((item) => addLogMeta(item, 'charge'));
      case 'all':
      default:
        return getAllLogs();
    }
  };

  const displayData = getDisplayData();
  const totalPages = Math.ceil(displayData.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(0); // 탭 변경 시 첫 페이지로 이동
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handlePageChange(currentPage + 1),
    onSwipedRight: () => handlePageChange(currentPage - 1),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  // 페이지네이션된 데이터를 2열로 나누기 (왼쪽 먼저 채우고 오른쪽 채우기)
  const paginatedData = displayData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  const halfLength = Math.ceil(paginatedData.length / 2);
  const leftColumnData = paginatedData.slice(0, halfLength);
  const rightColumnData = paginatedData.slice(halfLength);

  return (
    <S.CompeleteWrap>
      <S.PageTitle>결제 내역</S.PageTitle>

      {/* 탭 메뉴와 화살표 */}
      <S.TabContainerWrapper>
        <S.TabContainer>
          <S.TabButton active={activeTab === 'all'} onClick={() => handleTabChange('all')}>
            전체
          </S.TabButton>
          <S.TabButton active={activeTab === 'usage'} onClick={() => handleTabChange('usage')}>
            사용내역
          </S.TabButton>
          <S.TabButton active={activeTab === 'charge'} onClick={() => handleTabChange('charge')}>
            충전내역
          </S.TabButton>
        </S.TabContainer>

        <S.TabNavigationContainer>
          <S.TabNavigationArrow
            onClick={() => {
              const tabs = ['all', 'usage', 'charge'];
              const currentIndex = tabs.indexOf(activeTab);
              const prevIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
              handleTabChange(tabs[prevIndex]);
            }}
          >
            <Icon name="chevronLeft" size={30} color="#CCCCCC" />
          </S.TabNavigationArrow>
          <S.TabNavigationArrow
            onClick={() => {
              const tabs = ['all', 'usage', 'charge'];
              const currentIndex = tabs.indexOf(activeTab);
              const nextIndex = currentIndex === tabs.length - 1 ? 0 : currentIndex + 1;
              handleTabChange(tabs[nextIndex]);
            }}
          >
            <Icon name="chevronRight" size={30} color="#CCCCCC" />
          </S.TabNavigationArrow>
        </S.TabNavigationContainer>
      </S.TabContainerWrapper>

      <S.UseLogWrap {...handlers}>
        {displayData.length === 0 ? (
          <S.EmptyState>내역이 없습니다.</S.EmptyState>
        ) : (
          <S.LogContainer>
            <S.LogColumn>
              {leftColumnData.map((item, index) => (
                <PointLogItem
                  key={
                    item.logType === 'usage'
                      ? `use-${item.payId ?? index}`
                      : `charge-${item.chargeId ?? index}`
                  }
                  type={item.logType === 'usage' ? 0 : 1}
                  data={[item]}
                  fetchUserLog={fetchUserLog}
                />
              ))}
            </S.LogColumn>
            <S.LogColumn>
              {rightColumnData.map((item, index) => (
                <PointLogItem
                  key={
                    item.logType === 'usage'
                      ? `use-${item.payId ?? index}`
                      : `charge-${item.chargeId ?? index}`
                  }
                  type={item.logType === 'usage' ? 0 : 1}
                  data={[item]}
                  fetchUserLog={fetchUserLog}
                />
              ))}
            </S.LogColumn>
          </S.LogContainer>
        )}
      </S.UseLogWrap>
      {totalPages > 1 && (
        <S.Pagination>
          <S.PageNumber
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >
            &lt; 이전
          </S.PageNumber>
          <S.PageIndicator>
            {currentPage + 1} / {totalPages}
          </S.PageIndicator>
          <S.PageNumber
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
          >
            다음 &gt;
          </S.PageNumber>
        </S.Pagination>
      )}
    </S.CompeleteWrap>
  );
}

export default UserLog;
