import React, { useState, useEffect, useCallback } from 'react';
import * as S from './style';
import axiosInstance from 'utils/Axios';

interface Item {
  itemId: number;
  itemName: string;
  itemCode: string;
  itemPrice: number;
  category?: string;
  isNew?: boolean;
  isHot?: boolean;
}

const categories = [
  '전체보기',
  '과자',
  '아이스크림',
  '음료',
  '냉동식품',
  '빵류',
  '식품',
  '잡화'
];

const ItemList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체보기');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const filterItems = useCallback(() => {
    let filtered = items;

    // 카테고리 필터
    if (selectedCategory !== '전체보기') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // 검색어 필터
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(item =>
        item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  }, [items, selectedCategory, searchTerm]);

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    filterItems();
  }, [filterItems]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('v2/item/');
      
      if (response.status === 204 || !response.data.itemList || response.data.itemList.length === 0) {
        // API 데이터가 없으면 목 데이터 사용
          alert("반환된 상품이 없습니다.");
      } else {
        const remappedData: Item[] = response.data.itemList.map((item: any) => ({
          itemId: item.itemId,
          itemName: item.itemName,
          itemCode: item.itemCode,
          itemPrice: item.itemPrice,
          category: item.category || '기타',
          isNew: item.isNew || false,
          isHot: item.isHot || false,
        }));
        setItems(remappedData);
        setFilteredItems(remappedData);
      }
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <S.Container>
      <S.Title>매점상품 보기</S.Title>
      
      <S.FilterSection>
        <S.CategoryTabBar>
          {categories.map((category) => (
            <S.CategoryTab
              key={category}
              active={selectedCategory === category}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </S.CategoryTab>
          ))}
        </S.CategoryTabBar>
        
        <S.SearchBar>
          <S.SearchInput
            type="text"
            placeholder="찾으시는 상품을 입력해주세요"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <S.SearchIcon>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                stroke="#666666"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </S.SearchIcon>
        </S.SearchBar>
      </S.FilterSection>

      {loading ? (
        <S.LoadingMessage>로딩 중...</S.LoadingMessage>
      ) : filteredItems.length === 0 ? (
        <S.EmptyMessage>상품이 없습니다.</S.EmptyMessage>
      ) : (
        <S.ProductGrid>
          {filteredItems.map((item) => (
            <S.ProductCard key={item.itemId}>
              {(item.isNew || item.isHot) && (
                <S.Badge type={item.isNew ? 'new' : 'hot'}>
                  {item.isNew ? 'NEW' : 'HOT'}
                </S.Badge>
              )}
              <S.ProductInfo>
                <S.ProductTitle>{item.itemName}</S.ProductTitle>
                <S.ProductPrice>
                  {item.itemPrice.toLocaleString()} 원
                </S.ProductPrice>
              </S.ProductInfo>
              <S.ProductImagePlaceholder />
            </S.ProductCard>
          ))}
        </S.ProductGrid>
      )}
    </S.Container>
  );
};

export default ItemList;

