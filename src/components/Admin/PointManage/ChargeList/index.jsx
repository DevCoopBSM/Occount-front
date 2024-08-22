import React, { useEffect, useState } from 'react';
import TablePage from 'pages/Admin/TablePage';
import axiosInstance from 'utils/Axios';
import { PrettyDateTime } from 'utils/Date';

const ReceiptCheck = () => {
  const [startDate, setStartDate] = useState(
    new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), 1))
  );
  const [endDate, setEndDate] = useState(
    new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth() + 1, 0))
  );
  const [data, setData] = useState([]);

  const handleSearch = () => {
    const queryParams = `?start_date=${startDate.toISOString().split('T')[0]}&end_date=${endDate.toISOString().split('T')[0]}&type=0`;

    axiosInstance
      .get(`v2/admin/pointlog${queryParams}`)
      .then((response) => {
        if (response.status === 204) {
          setData([]);
        } else {
          const remappedData = response.data.map((item) => ({
            충전번호: item.charge_num,
            학생바코드: item.code_number,
            학생이름: item.student_name,
            타입: item.type,
            이전포인트: item.point,
            충전포인트: item.inner_point,
            최종포인트: parseInt(item.point) + parseInt(item.inner_point),
            충전담당ID: item.charger_id,
            거래일시: PrettyDateTime(item.date),
            환불상태: item.refundState
          }));
          setData(remappedData);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    handleSearch();
  }, [startDate, endDate]);

  return (
    <TablePage
      TableName="기간별 충전 내역"
      startDate={startDate}
      setStartDate={setStartDate}
      endDate={endDate}
      setEndDate={setEndDate}
      data={data}
    />
  );
};

export default ReceiptCheck;
