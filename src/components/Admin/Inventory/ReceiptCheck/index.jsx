import React, { useEffect, useState } from 'react';
import DataTablePage from 'pages/Admin/TablePage';
import axiosInstance from 'utils/Axios';
import { PrettyDateTime } from 'utils/Date';

export default function ReceiptCheck() {
  const [startDate, setStartDate] = useState(
    new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), 1))
  );
  const [endDate, setEndDate] = useState(
    new Date(
      Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth() + 1, 0)
    )
  );
  const [data, setData] = useState([]);

  // 월초부터 월말까지 기본 조회
  const handleSearch = () => {
    const queryParams = `?start_date=${
      startDate.toISOString().split('T')[0]
    }&end_date=${endDate.toISOString().split('T')[0]}`;

    axiosInstance
      .get(`/admin/receiptCheck${queryParams}`)
      .then((response) => {
        if (response.status === 204) {
          // 사용자에게 데이터가 없음을 알리고, data 상태를 빈 배열로 설정합니다.
          console.log('No content');
          setData([]);
        } else {

          // 받아온 데이터의 필드를 재매핑합니다.
          const remappedData = response.data.map((item) => ({
            거래번호: item.receiptId,
            가격: item.tradedPoint,
            상품번호: item.item_id,
            상품이름: item.itemName,
            판매량: item.saleQty,
            거래일시: PrettyDateTime(item.saleDate),
          }));

          // 재매핑된 데이터를 상태에 설정합니다.
          console.log('Data sent:', remappedData);
          setData(remappedData);
        }
      })
      .catch((error) => {
        console.error('Error sending data:', error);
      });
  };

  useEffect(() => {
    handleSearch();
  }, [startDate, endDate]);

  return (
    <DataTablePage
      TableName="판매 내역"
      startDate={startDate}
      endDate={endDate}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
      data={data}
    />
  );
}
