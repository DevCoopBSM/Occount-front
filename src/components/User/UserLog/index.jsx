import React, { useState, useEffect } from 'react';
import Icon from 'components/Icon';
import { axiosInstance } from 'utils/Axios';
import { useSwipeable } from 'react-swipeable';
import PointLogItem from './PointLogItem';
import * as S from './style';

function UserLog() {
  const [currentPage, setCurrentPage] = useState(0);
  const [useLogData, setUseLogData] = useState([]);
  const [chargeLogData, setChargeLogData] = useState([]);
  const [itemsPerPage] = useState(12);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'usage', 'charge'

  useEffect(() => {
    fetchUserLog();
  }, []);

  const fetchUserLog = async () => {
    try {
      const [paylogResponse, chargelogResponse] = await Promise.all([
        axiosInstance.get("v2/transaction/paylog"),
        axiosInstance.get("v2/transaction/chargelog")
      ]);
      
      setUseLogData(paylogResponse.data.payLogList || []);
      setChargeLogData(chargelogResponse.data.chargeLogList || []);
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
    const useLogs = useLogData.map(item => addLogMeta(item, 'usage'));
    const chargeLogs = chargeLogData.map(item => addLogMeta(item, 'charge'));
    const allLogs = [...useLogs, ...chargeLogs];
    return allLogs.sort((a, b) => b.logDate - a.logDate);
  };

  // 현재 탭에 따라 표시할 데이터 결정
  const getDisplayData = () => {
    switch (activeTab) {
      case 'usage':
        return useLogData.map(item => addLogMeta(item, 'usage'));
      case 'charge':
        return chargeLogData.map(item => addLogMeta(item, 'charge'));
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
    trackMouse: true
  });

  // 페이지네이션된 데이터를 2열로 나누기 (왼쪽 먼저 채우고 오른쪽 채우기)
  const paginatedData = displayData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
  const halfLength = Math.ceil(paginatedData.length / 2);
  const leftColumnData = paginatedData.slice(0, halfLength);
  const rightColumnData = paginatedData.slice(halfLength);

  return (
    <S.CompeleteWrap>
      <S.PageTitle>아리페이 충전하기</S.PageTitle>

      {/* 탭 메뉴와 화살표 */}
      <S.TabContainerWrapper>
        <S.TabContainer>
          <S.TabButton 
            active={activeTab === 'all'} 
            onClick={() => handleTabChange('all')}
          >
            전체
          </S.TabButton>
          <S.TabButton 
            active={activeTab === 'usage'} 
            onClick={() => handleTabChange('usage')}
          >
            사용내역
          </S.TabButton>
          <S.TabButton 
            active={activeTab === 'charge'} 
            onClick={() => handleTabChange('charge')}
          >
            충전내역
          </S.TabButton>
        </S.TabContainer>
        
          <S.TabNavigationContainer>
          <S.TabNavigationArrow onClick={() => {
            const tabs = ['all', 'usage', 'charge'];
            const currentIndex = tabs.indexOf(activeTab);
            const prevIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
            handleTabChange(tabs[prevIndex]);
          }}>
            <Icon name="chevronLeft" size={30} color="#CCCCCC" />
          </S.TabNavigationArrow>
          <S.TabNavigationArrow onClick={() => {
            const tabs = ['all', 'usage', 'charge'];
            const currentIndex = tabs.indexOf(activeTab);
            const nextIndex = currentIndex === tabs.length - 1 ? 0 : currentIndex + 1;
            handleTabChange(tabs[nextIndex]);
          }}>
            <Icon name="chevronRight" size={30} color="#CCCCCC" />
          </S.TabNavigationArrow>
        </S.TabNavigationContainer>
      </S.TabContainerWrapper>

      <S.UseLogWrap {...handlers}>
        <S.LogContainer>
          <S.LogColumn>
            {leftColumnData.map((item, index) => (
              <PointLogItem 
                key={item.logType === 'usage' ? `use-${item.payId ?? index}` : `charge-${item.chargeId ?? index}`}
                type={item.logType === 'usage' ? 0 : 1}
                data={[item]}
                fetchUserLog={fetchUserLog}
              />
            ))}
          </S.LogColumn>
          <S.LogColumn>
            {rightColumnData.map((item, index) => (
              <PointLogItem 
                key={item.logType === 'usage' ? `use-${item.payId ?? index}` : `charge-${item.chargeId ?? index}`}
                type={item.logType === 'usage' ? 0 : 1}
                data={[item]}
                fetchUserLog={fetchUserLog}
              />
            ))}
          </S.LogColumn>
        </S.LogContainer>
      </S.UseLogWrap>
    </S.CompeleteWrap>
  );
}

export default UserLog;
