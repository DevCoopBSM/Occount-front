import React, { useState, useEffect } from 'react';
import { axiosInstance } from 'utils/Axios';
import { useSwipeable } from 'react-swipeable';
import PointLogItem from './PointLogItem';
import * as S from './style';

export const UserLog = () => {
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

  // 모든 로그를 합치고 날짜순으로 정렬
  const getAllLogs = () => {
    const useLogs = useLogData.map(item => ({ ...item, logType: 'usage' }));
    const chargeLogs = chargeLogData.map(item => ({ ...item, logType: 'charge' }));
    const allLogs = [...useLogs, ...chargeLogs];
    return allLogs.sort((a, b) => new Date(b.timestamp || b.createdAt) - new Date(a.timestamp || a.createdAt));
  };

  // 현재 탭에 따라 표시할 데이터 결정
  const getDisplayData = () => {
    switch (activeTab) {
      case 'usage':
        return useLogData.map(item => ({ ...item, logType: 'usage' }));
      case 'charge':
        return chargeLogData.map(item => ({ ...item, logType: 'charge' }));
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
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M18.3839 8.49112C18.872 8.97927 18.872 9.77074 18.3839 10.2589L13.6427 15L18.3839 19.7411C18.872 20.2292 18.872 21.0207 18.3839 21.5089C17.8958 21.997 17.1042 21.997 16.6161 21.5089L10.9911 15.8839C10.7567 15.6494 10.625 15.3315 10.625 15C10.625 14.6684 10.7567 14.3505 10.9911 14.1161L16.6161 8.49111C17.1042 8.00296 17.8958 8.00296 18.3839 8.49112Z" fill="#CCCCCC"/>
            </svg>
          </S.TabNavigationArrow>
          <S.TabNavigationArrow onClick={() => {
            const tabs = ['all', 'usage', 'charge'];
            const currentIndex = tabs.indexOf(activeTab);
            const nextIndex = currentIndex === tabs.length - 1 ? 0 : currentIndex + 1;
            handleTabChange(tabs[nextIndex]);
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M11.6161 8.49112C11.128 8.97927 11.128 9.77074 11.6161 10.2589L16.3573 15L11.6161 19.7411C11.128 20.2292 11.128 21.0207 11.6161 21.5089C12.1042 21.997 12.8958 21.997 13.3839 21.5089L19.0089 15.8839C19.2433 15.6494 19.375 15.3315 19.375 15C19.375 14.6684 19.2433 14.3505 19.0089 14.1161L13.3839 8.49111C12.8958 8.00296 12.1042 8.00296 11.6161 8.49112Z" fill="#CCCCCC"/>
            </svg>
          </S.TabNavigationArrow>
        </S.TabNavigationContainer>
      </S.TabContainerWrapper>

      <S.UseLogWrap {...handlers}>
        <S.LogContainer>
          <S.LogColumn>
            {leftColumnData.map((item, index) => (
              <PointLogItem 
                key={item.logType === 'usage' ? `use-${item.payId}-${item.timestamp}` : `charge-${item.chargeId}-${item.timestamp}`}
                type={item.logType === 'usage' ? 0 : 1}
                data={[item]}
                fetchUserLog={fetchUserLog}
              />
            ))}
          </S.LogColumn>
          <S.LogColumn>
            {rightColumnData.map((item, index) => (
              <PointLogItem 
                key={item.logType === 'usage' ? `use-${item.payId}-${item.timestamp}` : `charge-${item.chargeId}-${item.timestamp}`}
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
};

export default UserLog;