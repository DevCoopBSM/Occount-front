import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTablePage from 'pages/Admin/TablePage';
import axiosInstance from 'utils/Axios';
import Modal from 'components/Modal';
import styled from 'styled-components';
import * as _ from './style';
import { PrettyDateTime } from 'utils/Date';

export default function InventoryByDay() {
  const movePage = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [barcode, setBarcode] = useState('');
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [itemInfo, setItemInfo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [itemList, setItemList] = useState([]);
  const [filteredItemList, setFilteredItemList] = useState([]);
  const barcodeInputRef = useRef(null);

  const [endDate, setEndDate] = useState(
    new Date(
      Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth() + 1, 0)
    )
  );
  const [data, setData] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setBarcode('');
    setItemName('');
    setItemInfo('');
    setQuantity('');
    setErrorMessage('');
    handleSearch(); // 모달이 닫힐 때 리스트를 다시 불러오기
  };

  useEffect(() => {
    if (isModalOpen) {
      barcodeInputRef.current.focus();
    }
  }, [isModalOpen]);

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    const filteredItems = itemList.filter((item) =>
      item.상품이름.includes(itemName)
    );
    setFilteredItemList(filteredItems);
  }, [itemName, itemList]);

  const handleBarcodeChange = (e) => {
    setBarcode(e.target.value);

    const selectedItem = itemList.find(item => item.바코드 === e.target.value);
    if (selectedItem) {
      handleItemSelect(selectedItem);
    }
  };

  const handleBarcodeKeyPress = (e) => {
    if (e.key === 'Enter') {
      const selectedItem = itemList.find(item => item.바코드 === barcode);
      if (selectedItem) {
        handleItemSelect(selectedItem);
      }
    }
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleItemNameChange = (e) => {
    setItemName(e.target.value);
  };

  const handleSnapshotItem = async () => {
    try {
      if (!barcode || !quantity) {
        setErrorMessage('바코드와 수량을 모두 입력하세요.');
        return;
      }

      await sendBarcodeForSnapshot(barcode, quantity);
      closeModal();
    } catch (error) {
      console.error('스냅샷 생성 중 오류가 발생했습니다.', error);
      setErrorMessage('스냅샷 생성 중 오류가 발생했습니다.');
    }
  };

  const sendBarcodeForSnapshot = async (barcode, quantity) => {
    try {
      await axiosInstance.post('/admin/createsnapshots', {
        barcode,
        quantity,
      });
      movePage('/admin/inventorybyday');
    } catch (error) {
      console.error('Error in sendBarcodeForSnapshot:', error);
      setErrorMessage('스냅샷 생성 중 오류가 발생했습니다.');
    }
  };

  const fetchItems = async () => {
    try {
      const response = await axiosInstance.get('/admin/itemCheck');
      const remappedData = response.data.map((item) => ({
        상품번호: item.item_id,
        상품이름: item.item_name,
        바코드: item.barcode,
        상품가격: item.item_price,
      }));
      setItemList(remappedData);
      setFilteredItemList(remappedData); // 초기 필터링된 리스트는 전체 리스트
    } catch (error) {
      console.error('아이템 리스트를 불러오는 중 오류가 발생했습니다.', error);
    }
  };

  const handleSearch = () => {
    const queryParams = `?end_date=${endDate.toISOString().split('T')[0]}`;

    axiosInstance
      .get(`/admin/inventorybyday${queryParams}`)
      .then((response) => {
        if (response.status === 204) {
          console.log('No content');
          setData([]);
        } else {
          const remappedData = response.data.map((item) => ({
            상품번호: item.item_id,
            상품이름: item.item_name,
            수량: item.quantity,
            최종업데이트: PrettyDateTime(item.last_updated),
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
  }, [endDate]);

  const handleItemSelect = (item) => {
    setBarcode(item.바코드);
    setItemInfo(item.상품이름);
  };

  return (
    <>
      <DataTablePage
        data={data}
        TableName="일별재고조회"
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <_.ButtonContainer>
        <_.Dbutton onClick={openModal}>재고기준등록</_.Dbutton>
      </_.ButtonContainer>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ContentWrap>
          <InfoHeader>
            <ContentTitle>스냅샷(재고기준점) 등록</ContentTitle>
          </InfoHeader>
          <InfoBody>
            <InfoText>바코드</InfoText>
            <InfoInput
              ref={barcodeInputRef}
              name="barcode"
              value={barcode}
              onChange={handleBarcodeChange}
              onKeyPress={handleBarcodeKeyPress}
              autoFocus
            />
            <InfoText>상품명으로 검색</InfoText>
            <InfoInput
              name="itemName"
              value={itemName}
              onChange={handleItemNameChange}
            />
            {filteredItemList.length > 0 && (
              <ItemList>
                {filteredItemList.map((item) => (
                  <Item key={item.바코드} onClick={() => handleItemSelect(item)}>
                    {item.상품이름}
                  </Item>
                ))}
              </ItemList>
            )}
            {itemInfo && (
              <>
                <InfoText>수량</InfoText>
                <InfoInput
                  name="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
              </>
            )}
            {itemInfo && <InfoText>상품명: {itemInfo}</InfoText>}
            {errorMessage && (
              <InfoText style={{ color: 'red' }}>{errorMessage}</InfoText>
            )}
          </InfoBody>
          <BtnWrap>
            {itemInfo ? (
              <>
                <Dbutton mRight={'10px'} onClick={handleSnapshotItem}>
                  재고기준등록
                </Dbutton>
                <Dbutton onClick={closeModal}>닫기</Dbutton>
              </>
            ) : (
              <Dbutton onClick={closeModal}>닫기</Dbutton>
            )}
          </BtnWrap>
        </ContentWrap>
      </Modal>
    </>
  );
}

const ContentWrap = styled.div`
  padding: 20px;
`;

const InfoHeader = styled.div`
  margin-bottom: 20px;
`;

const ContentTitle = styled.h2`
  margin: 0;
`;

const InfoBody = styled.div`
  margin-bottom: 20px;
`;

const InfoText = styled.p`
  margin: 10px 0;
`;

const InfoInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
`;

const ItemList = styled.ul`
  max-height: 200px;
  overflow-y: scroll;
  border: 1px solid #d3d3d3;
  margin: 10px 0;
  padding: 0;
  list-style: none;
`;

const Item = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const BtnWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Dbutton = styled.button`
  margin-right: 5px;
  margin-left: 5px;
  width: 200px;
  height: 40px;
  color: #fff;
`;
