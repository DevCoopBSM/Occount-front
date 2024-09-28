import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from 'contexts/authContext';
import { axiosInstance } from 'utils/Axios';
import { useSwipeable } from 'react-swipeable';
import PointLogItem from './PointLogItem';
import * as S from './style';

export const UserLog = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(0);
  const [useLogData, setUseLogData] = useState([]);
  const [chargeLogData, setChargeLogData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const containerRef = useRef(null);

  useEffect(() => {
    fetchUserLog();
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const updateItemsPerPage = () => {
    const width = window.innerWidth;
    if (width < 768) {
      setItemsPerPage(5);
    } else if (width < 1024) {
      setItemsPerPage(8);
    } else {
      setItemsPerPage(10);
    }
  };

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

  const handlePageChange = (newPage) => {
    const maxPage = Math.ceil(Math.max(useLogData.length, chargeLogData.length) / itemsPerPage) - 1;
    if (newPage >= 0 && newPage <= maxPage) {
      setCurrentPage(newPage);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handlePageChange(currentPage + 1),
    onSwipedRight: () => handlePageChange(currentPage - 1),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  const formatPoint = user ? user.point.toLocaleString() : "0";

  return (
    <S.CompeleteWrap>
      <S.ExChangeDetailWrap>
        <S.InfoText>남은금액</S.InfoText>
        <S.Exchange>{formatPoint}원</S.Exchange>
      </S.ExChangeDetailWrap>

      <S.UseLogWrap {...handlers}>
        <S.LogTitles>
          <S.LogTitle>사용 내역</S.LogTitle>
          <S.LogTitle>충전 내역</S.LogTitle>
        </S.LogTitles>
        <S.LogContainer>
          <S.LogColumn>
            {useLogData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((item, index) => (
              <PointLogItem 
                key={`use-${item.payId || index}`}
                type={0}
                data={[item]}
                fetchUserLog={fetchUserLog}
              />
            ))}
          </S.LogColumn>
          <S.LogColumn>
            {chargeLogData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((item, index) => (
              <PointLogItem 
                key={`charge-${item.chargeId || index}`}
                type={1}
                data={[item]}
                fetchUserLog={fetchUserLog}
              />
            ))}
          </S.LogColumn>
        </S.LogContainer>
        <S.Pagination>
          <S.PageNumber onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
            &lt; 이전
          </S.PageNumber>
          <S.PageIndicator>
            {currentPage + 1} / {Math.ceil(Math.max(useLogData.length, chargeLogData.length) / itemsPerPage)}
          </S.PageIndicator>
          <S.PageNumber onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(Math.max(useLogData.length, chargeLogData.length) / itemsPerPage) - 1}>
            다음 &gt;
          </S.PageNumber>
        </S.Pagination>
      </S.UseLogWrap>
    </S.CompeleteWrap>
  );
};

export default UserLog;