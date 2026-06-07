import { apiClient } from 'api/client';

export interface Item {
  itemId: number;
  itemName: string;
  itemCode: string;
  itemPrice: number;
  category?: string;
  isNew?: boolean;
  isHot?: boolean;
}

interface ApiItem {
  itemId: number;
  name: string;
  category?: string;
  price: number;
  quantity: number;
  barcode?: string | null;
}

interface ItemListResponse {
  items: ApiItem[];
}

const mapApiItemToItem = (item: ApiItem): Item => ({
  itemId: item.itemId,
  itemName: item.name,
  itemCode: item.barcode ?? `ITEM-${item.itemId}`,
  itemPrice: item.price,
  category: item.category || '기타',
  isNew: false,
  isHot: false,
});

export const fetchItemList = async (): Promise<Item[]> => {
  const response = await apiClient.get<ItemListResponse>('items');
  return response.items?.map(mapApiItemToItem) ?? [];
};
