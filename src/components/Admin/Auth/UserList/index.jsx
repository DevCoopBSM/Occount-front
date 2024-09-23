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
      .get(`v2/account/userlist`)
      .then((response) => {
        // response.data.userList에서 userList 배열을 가져옵니다.
        const userList = response.data.userList;
        if (Array.isArray(userList)) {
          // 받아온 데이터의 필드를 재매핑합니다.
          const remappedData = userList.map((item) => ({
            조합원번호: item.userNumber,
            이름: item.userName,
            권한: item.roles,
            이메일: item.userEmail,
            아리페이잔액: item.userPoint
          }));

          // 재매핑된 데이터를 상태에 설정합니다.
          console.log('Data sent:', remappedData);
          setData(remappedData);
        } else {
          console.error('userList is not an array');
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
