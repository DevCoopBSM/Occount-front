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

// 목 데이터
const mockItems: Item[] = [
  {
    itemId: 1,
    itemName: '새우깡',
    itemCode: '8801019600722',
    itemPrice: 1500,
    category: '과자',
    isNew: false,
    isHot: true
  },
  {
    itemId: 2,
    itemName: '코카콜라',
    itemCode: '8801094000011',
    itemPrice: 2000,
    category: '음료',
    isNew: false,
    isHot: false
  },
  {
    itemId: 3,
    itemName: '하겐다즈 바닐라',
    itemCode: '8801062801019',
    itemPrice: 5000,
    category: '아이스크림',
    isNew: true,
    isHot: false
  },
  {
    itemId: 4,
    itemName: '포카칩',
    itemCode: '8801019600739',
    itemPrice: 1800,
    category: '과자',
    isNew: false,
    isHot: false
  },
  {
    itemId: 5,
    itemName: '삼각김밥 참치마요',
    itemCode: '8801094001012',
    itemPrice: 1500,
    category: '식품',
    isNew: false,
    isHot: true
  },
  {
    itemId: 6,
    itemName: '빼빼로',
    itemCode: '8801062801026',
    itemPrice: 1200,
    category: '과자',
    isNew: false,
    isHot: false
  },
  {
    itemId: 7,
    itemName: '핫식스',
    itemCode: '8801094000028',
    itemPrice: 1800,
    category: '음료',
    isNew: true,
    isHot: false
  },
  {
    itemId: 8,
    itemName: '메로나',
    itemCode: '8801062801033',
    itemPrice: 1000,
    category: '아이스크림',
    isNew: false,
    isHot: true
  },
  {
    itemId: 9,
    itemName: '컵라면',
    itemCode: '8801019600746',
    itemPrice: 2500,
    category: '냉동식품',
    isNew: false,
    isHot: false
  },
  {
    itemId: 10,
    itemName: '식빵',
    itemCode: '8801094001029',
    itemPrice: 3000,
    category: '빵류',
    isNew: false,
    isHot: false
  },
  {
    itemId: 11,
    itemName: '밀키스',
    itemCode: '8801062801040',
    itemPrice: 1500,
    category: '음료',
    isNew: false,
    isHot: false
  },
  {
    itemId: 12,
    itemName: '볼펜세트',
    itemCode: '8801019600753',
    itemPrice: 3500,
    category: '잡화',
    isNew: true,
    isHot: false
  },
  {
    itemId: 13,
    itemName: '초코파이',
    itemCode: '8801094001036',
    itemPrice: 2000,
    category: '과자',
    isNew: false,
    isHot: true
  },
  {
    itemId: 14,
    itemName: '슈퍼콘',
    itemCode: '8801062801057',
    itemPrice: 1500,
    category: '아이스크림',
    isNew: false,
    isHot: false
  },
  {
    itemId: 15,
    itemName: '크림빵',
    itemCode: '8801019600760',
    itemPrice: 2000,
    category: '빵류',
    isNew: true,
    isHot: false
  },
  {
    itemId: 16,
    itemName: '사이다',
    itemCode: '8801094001043',
    itemPrice: 1800,
    category: '음료',
    isNew: false,
    isHot: false
  }
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
        console.log('API 데이터가 없어 목 데이터를 사용합니다.');
        setItems(mockItems);
        setFilteredItems(mockItems);
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
      console.log('API 호출 실패, 목 데이터를 사용합니다.');
      // API 호출 실패 시 목 데이터 사용
      setItems(mockItems);
      setFilteredItems(mockItems);
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

