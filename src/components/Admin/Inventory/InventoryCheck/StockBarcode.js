import React, { useState, useEffect, useRef } from 'react';
import axiosInstance from 'utils/Axios';
import Modal from 'components/Modal';
import * as _ from './style';

export default function StockBarcode({ isOpen, onClose }) {
  const [barcode, setBarcode] = useState('');
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [reason, setReason] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [itemList, setItemList] = useState([]);
  const [filteredItemList, setFilteredItemList] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const barcodeInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) barcodeInputRef.current.focus();
  }, [isOpen]);

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    const filteredItems = itemList.filter(item => item.상품이름.includes(itemName));
    setFilteredItemList(filteredItems);
  }, [itemName, itemList]);

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

  const handleItemSelect = item => {
    setBarcode(item.바코드);
    setItemName(item.상품이름);
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

  const handleReasonChange = e => setReason(e.target.value);

  const handleAddItem = () => {
    if ((!barcode && !itemName) || !quantity || !reason) {
      setErrorMessage('바코드 또는 상품명, 수량 및 사유를 입력하세요.');
      return;
    }

    const newItem = { barcode, quantity, item_name: itemName, reason };
    setSelectedItems([...selectedItems, newItem]);

    clearInputFields();
  };

  const handleRemoveItem = index => {
    const updatedItems = [...selectedItems];
    updatedItems.splice(index, 1);
    setSelectedItems(updatedItems);
  };

  const handleSaveItems = async () => {
    if (selectedItems.length === 0) {
      setErrorMessage('등록할 항목을 추가하세요.');
      return;
    }

    try {
      await sendItems(selectedItems);
      onClose();
    } catch (error) {
      console.error('재고 변동 등록 중 오류가 발생했습니다.', error);
      setErrorMessage('재고 변동 등록 중 오류가 발생했습니다.');
    }
  };

  const sendItems = async items => {
    try {
      await axiosInstance.post('/admin/stockchanges', { items });
    } catch (error) {
      console.error('Error in sendItems:', error);
      setErrorMessage('재고 변동 등록 중 오류가 발생했습니다.');
    }
  };

  const clearInputFields = () => {
    setBarcode('');
    setItemName('');
    setQuantity('');
    setReason('');
    setErrorMessage('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <_.ContentWrap>
        <_.InfoHeader>
          <_.ContentTitle>재고 변동 등록</_.ContentTitle>
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
          <_.InfoText>수량</_.InfoText>
          <_.InfoInput
            name="quantity"
            value={quantity}
            onChange={handleQuantityChange}
          />
          <_.InfoText>사유</_.InfoText>
          <_.InfoInput
            name="reason"
            value={reason}
            onChange={handleReasonChange}
          />
          <_.AddButton onClick={handleAddItem}>추가</_.AddButton>
          {selectedItems.length > 0 && (
            <_.SelectedItemList>
              {selectedItems.map((item, index) => (
                <_.SelectedItem key={index}>
                  {item.item_name} : {item.quantity}개 (사유: {item.reason})
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
          <_.Dbutton mRight={'10px'} onClick={handleSaveItems}>
            저장
          </_.Dbutton>
          <_.Dbutton onClick={onClose}>닫기</_.Dbutton>
        </_.BtnWrap>
      </_.ContentWrap>
    </Modal>
  );
}
