import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Modal from 'components/Modal';
import axiosInstance from 'utils/Axios';

const StockBarcode = ({ isOpen, onClose }) => {
  const [barcode, setBarcode] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemInfo, setItemInfo] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [reason, setReason] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [itemList, setItemList] = useState([]);
  const [filteredItemList, setFilteredItemList] = useState([]);
  const barcodeInputRef = useRef(null);

  useEffect(() => {
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

    fetchItems();
  }, []);

  useEffect(() => {
    if (isOpen && barcodeInputRef.current) {
      barcodeInputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const filteredItems = itemList.filter((item) =>
      item.상품이름.includes(itemName)
    );
    setFilteredItemList(filteredItems);
  }, [itemName, itemList]);

  const sendBarcodeForInsert = async (barcode, quantity, reason) => {
    try {
      await axiosInstance.post('/admin/insertinventory', {
        barcode,
        quantity,
        reason,
      });
      onClose();
    } catch (error) {
      console.error('Error in sendBarcode:', error);
    }
  };

  const handleAddItem = async () => {
    try {
      await sendBarcodeForInsert(barcode, quantity, reason);
      resetForm();
    } catch (error) {
      console.error('재고 등록 중 오류가 발생했습니다.', error);
    }
  };

  const handleRemoveItem = async () => {
    try {
      await sendBarcodeForInsert(barcode, -quantity, reason);
      resetForm();
    } catch (error) {
      console.error('손실 등록 중 오류가 발생했습니다.', error);
    }
  };

  const resetForm = () => {
    setBarcode('');
    setItemName('');
    setItemInfo(null);
    setQuantity('');
    setReason('');
    setErrorMessage('');
  };

  const handleItemSelect = (item) => {
    setBarcode(item.바코드);
    setItemInfo(item.상품이름);
  };

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

  const handleItemNameChange = (e) => {
    setItemName(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ContentWrap>
        <InfoHeader>
          <ContentTitle>{itemInfo || '아이템 선택 또는 바코드 입력'}</ContentTitle>
        </InfoHeader>
        <InfoBody>
          <InfoText>아이템 리스트</InfoText>
          <ItemList>
            {filteredItemList.map((item) => (
              <Item key={item.바코드} onClick={() => handleItemSelect(item)}>
                {item.상품이름}
              </Item>
            ))}
          </ItemList>
          <InfoText>상품명으로 검색</InfoText>
          <InfoInput
            placeholder="상품명을 입력해주세요"
            type="text"
            onChange={handleItemNameChange}
            value={itemName}
          />
          <InfoText>바코드 입력</InfoText>
          <InfoInput
            ref={barcodeInputRef}
            placeholder="상품 바코드를 입력해주세요"
            type="text"
            onChange={handleBarcodeChange}
            onKeyPress={handleBarcodeKeyPress}
            value={barcode}
            autoFocus
          />
          <InfoText>수량</InfoText>
          <InfoInput
            name="quantity"
            value={quantity}
            onChange={handleQuantityChange}
          />
          <InfoText>사유</InfoText>
          <InfoInput
            name="reason"
            value={reason}
            onChange={handleReasonChange}
          />
        </InfoBody>
        <BtnWrap>
          <Dbutton onClick={handleAddItem}>입고</Dbutton>
          <Dbutton onClick={handleRemoveItem}>손실</Dbutton>
          <Dbutton onClick={onClose}>취소</Dbutton>
        </BtnWrap>
      </ContentWrap>
    </Modal>
  );
};

export default StockBarcode;

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
