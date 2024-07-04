import React, { useEffect, useState } from 'react';
import DataTable from 'pages/Admin/TablePage';
import axiosInstance from 'utils/Axios';
import { PrettyDateTime } from 'utils/Date';
import StockBarcode from './StockBarcode';
import * as _ from './style';

export default function InventoryCheck() {
  const [startDate, setStartDate] = useState(
    new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), 1))
  );
  const [endDate, setEndDate] = useState(
    new Date(
      Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth() + 1, 0)
    )
  );
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSearch = () => {
    const queryParams = `?start_date=${
      startDate.toISOString().split('T')[0]
    }&end_date=${endDate.toISOString().split('T')[0]}`;

    axiosInstance
      .get(`/admin/inventoryCheck${queryParams}`)
      .then((response) => {
        if (response.status === 204) {
          console.log('No content');
          setData([]);
        } else {
          const remappedData = response.data.map((item) => ({
            재고번호: item.inventory_id,
            상품번호: item.item_id,
            상품이름: item.item_name,
            수량: item.quantity,
            최종업데이트: PrettyDateTime(item.last_updated),
            작성자아이디: item.writer_id,
            사유: item.reason,
          }));

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
    <><_.ButtonContainer>
        <_.Dbutton onClick={() => setModalOpen(true)}>재고변동등록</_.Dbutton>
      </_.ButtonContainer>
      <DataTable
        TableName="입고&손실 내역"
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        data={data}
      />
      <StockBarcode isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
