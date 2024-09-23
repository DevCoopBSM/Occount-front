import React, { useEffect, useState } from "react";
import PointLogItem from "./PointLogItem";
import { useAuth } from "context/authContext";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { axiosInstance } from "utils/Axios";
import { color } from "constants/color";
import * as _ from "./style";

export const Userlog = () => {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [useLogData, setUseLogData] = useState([]);
  const [chargeLogData, setChargeLogData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    fetchUserLog(0); // paylog
    fetchUserLog(1); // chargelog
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const fetchUserLog = (type) => {
    const endpoint = type === 0 ? "paylog" : "chargelog";
    const url = `v2/transaction/${endpoint}`;

    axiosInstance
      .get(url)
      .then((response) => {
        if (type === 0) {
          setUseLogData(response.data.payLogList || []); // payLogList를 상태로 설정
        } else {
          setChargeLogData(response.data.chargeLogList || []); // chargeLogList를 상태로 설정
        }
      })
      .catch((error) => {
        console.error(error);
        if (type === 0) {
          setUseLogData([]); // 에러 발생 시에도 빈 배열 설정
        } else {
          setChargeLogData([]); // 에러 발생 시에도 빈 배열 설정
        }
      });
  };

  const updateItemsPerPage = () => {
    const height = window.innerHeight;
    const newItemsPerPage = Math.floor((height - 400) / 70); // 70은 각 항목의 대략적인 높이, 400은 상단 여백
    setItemsPerPage(newItemsPerPage > 0 ? newItemsPerPage : 1);
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const formatPoint = user ? user.point.toLocaleString() : "0";

  const maxLength = Math.max(useLogData.length, chargeLogData.length);
  const pageCount = Math.ceil(maxLength / itemsPerPage);

  return (
    <_.CompeleteWrap>
      <_.ExChangeDetailWrap width={"900px"} paddingTop={"10px"}>
        <_.InfoText color={color.default}>남은금액</_.InfoText>
        <_.Exchange fontSize={"30px"} fontWeight={"700"}>
          {formatPoint}원
        </_.Exchange>
      </_.ExChangeDetailWrap>

      <_.UseLogWrap style={{ flexDirection: "column" }}>
        <_.InfoText>이용 내역</_.InfoText>

        <_.PointContainer>
          <_.rightWrap>
            <li style={{ display: "flex" }}>
              {useLogData.length > 0 && (
                <PointLogItem 
                  type={0} 
                  data={useLogData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)}
                  fetchUserLog={fetchUserLog}
                />
              )}
            </li>
          </_.rightWrap>
          <_.leftWrap>
            <li style={{ display: "flex" }}>
              {chargeLogData.length > 0 && (
                <PointLogItem 
                  type={1} 
                  data={chargeLogData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)}
                  fetchUserLog={fetchUserLog}
                />
              )}
            </li>
          </_.leftWrap>
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
