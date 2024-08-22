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

export default function UserList() {
  const [data, setData] = useState([]);

  const fetchData = () => {
    axiosInstance
      .get(`v2/admin/userlist`)
      .then((response) => {
        if (response.status === 204) {
          // 사용자에게 데이터가 없음을 알리고, data 상태를 빈 배열로 설정합니다.
          console.log('No content');
          setData([]);
        } else {
          // 받아온 데이터의 필드를 재매핑합니다.
          const remappedData = response.data.map((item) => ({
            사용자바코드: item.code_number,
            이름: item.student_name,
            협동조합원: item.is_coop,
            이메일: item.email,
            아리페이잔액: item.point,
            관리자: item.is_admin,
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

  return <DataTable TableName="조합원 목록" data={data} />;
}
