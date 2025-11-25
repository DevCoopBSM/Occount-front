export type ProductBadge = 'new' | 'hot' | null;

export interface Product {
  id: number;
  title: string;
  price?: number;
  badge: ProductBadge;
  category: string;
}

export interface NoticeItem {
  id: number;
  title: string;
  date: string;
  importance?: 'HIGH' | 'MEDIUM' | 'LOW';
}

export const mockNotices: NoticeItem[] = [
  { id: 1, title: '2025 오카운트 UI 변경', date: '2025.07.12', importance: 'HIGH' },
  { id: 2, title: '2025 오카운트 UI 변경', date: '2025.07.12', importance: 'MEDIUM' },
  { id: 3, title: '2025 오카운트 UI 변경', date: '2025.07.12', importance: 'MEDIUM' },
];

export const mockAnnouncements: NoticeItem[] = [
  { id: 1, title: '들어온 상품 안내', date: '2025.07.12', importance: 'LOW' },
  { id: 2, title: '들어온 상품 안내', date: '2025.07.12', importance: 'LOW' },
];

export const mockProducts: Product[] = [
  { id: 1, title: '초코파이', price: 1200, badge: 'new', category: '과자' },
  { id: 2, title: '바나나우유', price: 1500, badge: null, category: '음료' },
  { id: 3, title: '새우깡', price: 1300, badge: null, category: '과자' },
  { id: 4, title: '붕어싸만코', price: 2000, badge: 'hot', category: '아이스크림' },
  { id: 5, title: '김밥', price: 2500, badge: null, category: '식품' },
  { id: 6, title: '핫바', price: 1800, badge: 'hot', category: '냉동식품' },
];
