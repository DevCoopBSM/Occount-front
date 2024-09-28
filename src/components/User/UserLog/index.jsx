import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'contexts/authContext';
import { axiosInstance } from 'utils/Axios';
import ReactPaginate from 'react-paginate';
import PointLogItem from './PointLogItem';
import * as _ from './style';

export const UserLog = () => {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [useLogData, setUseLogData] = useState([]);
  const [chargeLogData, setChargeLogData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  useEffect(() => {
    fetchUserLog();
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
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

  const updateItemsPerPage = () => {
    const height = window.innerHeight;
    const newItemsPerPage = Math.floor((height - 400) / 70);
    setItemsPerPage(newItemsPerPage > 0 ? newItemsPerPage : 1);
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const formatPoint = user ? user.point.toLocaleString() : "0";

  const maxLength = Math.max(useLogData.length, chargeLogData.length);
  const pageCount = Math.ceil(maxLength / itemsPerPage);

  const paginatedUseLogData = useLogData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
  const paginatedChargeLogData = chargeLogData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <_.CompeleteWrap>
      <_.ExChangeDetailWrap>
        <_.InfoText>남은금액</_.InfoText>
        <_.Exchange>{formatPoint}원</_.Exchange>
      </_.ExChangeDetailWrap>
  
      <_.UseLogWrap>
        <_.PointContainer>
          <_.LogColumn style={{ width: '100%' }}>
            <_.LogTitle>사용 내역</_.LogTitle>
            {paginatedUseLogData.map((item, index) => (
              <PointLogItem 
                key={`use-${item.payId || index}-${currentPage}`}
                type={0}
                data={[item]}
                fetchUserLog={fetchUserLog}
              />
            ))}
          </_.LogColumn>
          <_.LogColumn style={{ width: '100%' }}>
            <_.LogTitle>충전 내역</_.LogTitle>
            {paginatedChargeLogData.map((item, index) => (
              <PointLogItem 
                key={`charge-${item.chargeId || index}-${currentPage}`}
                type={1}
                data={[item]}
                fetchUserLog={fetchUserLog}
              />
            ))}
          </_.LogColumn>
        </_.PointContainer>
        <_.Pagination>
          <ReactPaginate
            previousLabel={"이전페이지"}
            nextLabel={"다음페이지"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"selected"}
          />
        </_.Pagination>
      </_.UseLogWrap>
    </_.CompeleteWrap>
  );
};
