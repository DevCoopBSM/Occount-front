import { useEffect, useMemo, useState } from 'react';
import { mockProducts } from 'components/User/UserMain/mockData';
import { fetchItemList, Item } from './itemListApi';

export const categories = [
  '전체보기',
  '과자',
  '아이스크림',
  '음료',
  '냉동식품',
  '빵류',
  '식품',
  '잡화',
];

const fallbackItems: Item[] = mockProducts.map((product) => ({
  itemId: product.id,
  itemName: product.title,
  itemCode: `MOCK-${product.id}`,
  itemPrice: product.price ?? 0,
  category: product.category,
  isNew: product.badge === 'new',
  isHot: product.badge === 'hot',
}));

const filterItemList = (items: Item[], selectedCategory: string, searchTerm: string): Item[] => {
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  return items.filter((item) => {
    const matchesCategory = selectedCategory === '전체보기' || item.category === selectedCategory;
    const matchesSearchTerm =
      normalizedSearchTerm === '' || item.itemName.toLowerCase().includes(normalizedSearchTerm);

    return matchesCategory && matchesSearchTerm;
  });
};

export const useItemList = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체보기');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const filteredItems = useMemo(
    () => filterItemList(items, selectedCategory, searchTerm),
    [items, selectedCategory, searchTerm]
  );

  const hasItems = filteredItems.length > 0;
  const isEmpty = !loading && !hasItems;

  useEffect(() => {
    const loadItems = async () => {
      try {
        setLoading(true);
        setError(null);
        setItems(await fetchItemList());
      } catch (error) {
        console.error('Error fetching items:', error);
        setItems(fallbackItems);
        setError('상품 목록을 불러오지 못해 임시 목록을 표시하고 있습니다.');
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, []);

  return {
    filteredItems,
    selectedCategory,
    searchTerm,
    loading,
    error,
    hasItems,
    isEmpty,
    setSelectedCategory,
    setSearchTerm,
  };
};
