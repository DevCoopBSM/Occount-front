import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTablePage from 'pages/Admin/TablePage';
import axiosInstance from 'utils/Axios';
import Modal from 'components/Modal';
import * as _ from './style';
import { PrettyDateTime } from 'utils/Date';

export default function InventoryByDay() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [barcode, setBarcode] = useState('');
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [itemInfo, setItemInfo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [itemList, setItemList] = useState([]);
  const [filteredItemList, setFilteredItemList] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const barcodeInputRef = useRef(null);

  const [endDate, setEndDate] = useState(
    new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth() + 1, 0))
  );
  const [data, setData] = useState([]);

  useEffect(() => {
    if (isModalOpen) barcodeInputRef.current.focus();
  }, [isModalOpen]);

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    const filteredItems = itemList.filter(item => item.상품이름.includes(itemName));
    setFilteredItemList(filteredItems);
  }, [itemName, itemList]);

  useEffect(() => {
    handleSearch();
  }, [endDate]);

  const fetchItems = async () => {
    try {
      const response = await axiosInstance.get('/admin/itemCheck');
      const remappedData = response.data.map(item => ({
        상품번호: item.item_id,
        상품이름: item.item_name,
        바코드: item.barcode,
        상품가격: item.item_price,
      }));
      setItemList(remappedData);
      setFilteredItemList(remappedData);
    } catch (error) {
      console.error('아이템 리스트를 불러오는 중 오류가 발생했습니다.', error);
    }
  };

  const handleSearch = () => {
    const queryParams = `?end_date=${endDate.toISOString().split('T')[0]}`;
    axiosInstance
      .get(`/admin/inventorybyday${queryParams}`)
      .then(response => {
        if (response.status === 204) {
          console.log('No content');
          setData([]);
        } else {
          const remappedData = response.data.map(item => ({
            상품번호: item.item_id,
            상품이름: item.item_name,
            수량: item.quantity,
            최종업데이트: PrettyDateTime(item.last_updated),
          }));
          setData(remappedData);
        }
      })
      .catch(error => {
        console.error('Error sending data:', error);
      });
  };

  const handleItemSelect = item => {
    setBarcode(item.바코드);
    setItemInfo(item.상품이름);
    setItemName(item.상품이름); // 상품명 상태 업데이트
  };

  const handleBarcodeChange = e => {
    setBarcode(e.target.value);
    const selectedItem = itemList.find(item => item.바코드 === e.target.value);
    if (selectedItem) handleItemSelect(selectedItem);
  };

  const handleBarcodeKeyPress = e => {
    if (e.key === 'Enter') {
      const selectedItem = itemList.find(item => item.바코드 === barcode);
      if (selectedItem) handleItemSelect(selectedItem);
    }
  };

  const handleQuantityChange = e => setQuantity(e.target.value);

  const handleItemNameChange = e => setItemName(e.target.value);

  const handleAddItem = () => {
    if ((!barcode && !itemInfo) || !quantity) {
      setErrorMessage('바코드 또는 상품명과 수량을 입력하세요.');
      return;
    }

    const newItem = { barcode, quantity, item_name: itemInfo };
    setSelectedItems([...selectedItems, newItem]);

    clearInputFields();
    barcodeInputRef.current.focus(); // 바코드 입력란에 포커스를 설정합니다.
  };

  const handleRemoveItem = index => {
    const updatedItems = [...selectedItems];
    updatedItems.splice(index, 1);
    setSelectedItems(updatedItems);
  };

  const handleSnapshotItems = async () => {
    if (selectedItems.length === 0) {
      setErrorMessage('등록할 항목을 추가하세요.');
      return;
    }

    try {
      await sendItemsForSnapshot(selectedItems);
      closeModal();
    } catch (error) {
      console.error('스냅샷 생성 중 오류가 발생했습니다.', error);
      setErrorMessage('스냅샷 생성 중 오류가 발생했습니다.');
    }
  };

  const sendItemsForSnapshot = async items => {
    try {
      await axiosInstance.post('/admin/createsnapshots', { items });
      navigate('/admin/inventorybyday');
    } catch (error) {
      console.error('Error in sendItemsForSnapshot:', error);
      setErrorMessage('스냅샷 생성 중 오류가 발생했습니다.');
    }
  };

  const clearInputFields = () => {
    setBarcode('');
    setItemName('');
    setItemInfo('');
    setQuantity('');
    setErrorMessage('');
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    clearInputFields();
    setSelectedItems([]); // 선택된 항목 초기화
    handleSearch(); // 모달이 닫힐 때 리스트를 다시 불러오기
  };
  return (
    <>
      <_.ButtonContainer>
        <_.Dbutton onClick={openModal}>재고기준등록</_.Dbutton>
      </_.ButtonContainer>
      <DataTablePage
        data={data}
        TableName="일별재고조회"
        endDate={endDate}
        setEndDate={setEndDate}
      />

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <_.ContentWrap>
          <_.InfoHeader>
            <_.ContentTitle>스냅샷(재고기준점) 등록</_.ContentTitle>
          </_.InfoHeader>
          <_.InfoBody>
            <_.InfoText>바코드</_.InfoText>
            <_.InfoInput
              ref={barcodeInputRef}
              name="barcode"
              value={barcode}
              onChange={handleBarcodeChange}
              onKeyPress={handleBarcodeKeyPress}
              autoFocus
            />
            <_.InfoText>상품명으로 검색</_.InfoText>
            <_.InfoInput
              name="itemName"
              value={itemName}
              onChange={handleItemNameChange}
            />
            {filteredItemList.length > 0 && (
              <_.ItemList>
                {filteredItemList.map(item => (
                  <_.Item key={item.바코드} onClick={() => handleItemSelect(item)}>
                    {item.상품이름}
                  </_.Item>
                ))}
              </_.ItemList>
            )}
            {itemInfo && (
              <>
                <_.InfoText>수량</_.InfoText>
                <_.InfoInput
                  name="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
                <_.AddButton onClick={handleAddItem}>추가</_.AddButton>
              </>
            )}
            {selectedItems.length > 0 && (
              <_.SelectedItemList>
                {selectedItems.map((item, index) => (
                  <_.SelectedItem key={index}>
                    {item.item_name} - {item.quantity}개
                    <_.RemoveButton onClick={() => handleRemoveItem(index)}>
                      제거
                    </_.RemoveButton>
                  </_.SelectedItem>
                ))}
              </_.SelectedItemList>
            )}
            {errorMessage && (
              <_.InfoText style={{ color: 'red' }}>{errorMessage}</_.InfoText>
            )}
          </_.InfoBody>
          <_.BtnWrap>
            <_.Dbutton mRight={'10px'} onClick={handleSnapshotItems}>
              재고기준등록
            </_.Dbutton>
            <_.Dbutton onClick={closeModal}>닫기</_.Dbutton>
          </_.BtnWrap>
        </_.ContentWrap>
      </Modal>
    </>
  );
}