import React, { useEffect, useState } from 'react';
import DataTable from 'pages/Admin/TablePage';
import axiosInstance from 'utils/Axios';

const stockData = [
  {
    item_id: 1,
    item_name: '상품 A',
    quantity: 100,
    last_updated: '2023-11-14 18:46:41',
  },
];

export default function ItemPage() {
  const [data, setData] = useState([]);

  const fetchData = () => {
    axiosInstance
      .get(`v2/item`)
      .then((response) => {
        if (response.status === 204) {
          // 사용자에게 데이터가 없음을 알리고, data 상태를 빈 배열로 설정합니다.
          console.log('No content');
          setData([]);
        } else {
          // 받아온 데이터의 필드를 재매핑합니다.
          const remappedData = response.data.itemList.map((item) => ({
            상품번호: item.itemId,
            상품이름: item.itemName,
            바코드: item.itemCode,
            상품가격: item.itemPrice,
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
    fetchData();
  }, []); // 빈 의존성 배열을 전달하여 이 useEffect가 마운트 시에만 실행되도록 합니다.

  return <DataTable TableName="상품 내역" data={data} />;
}
