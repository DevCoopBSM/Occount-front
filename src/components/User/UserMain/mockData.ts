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

export const mockDetailedNotices = [
  {
    id: 1,
    title: '2025 오카운트 UI 개편 안내',
    content: '<p>안녕하세요, 오카운트 팀입니다.</p><p>사용자 경험 개선을 위해 UI를 전면 개편하였습니다. 새로운 디자인으로 더욱 편리하게 이용하실 수 있습니다.</p>',
    createdAt: new Date('2025-07-12'),
    importance: 'HIGH' as const,
  },
  {
    id: 2,
    title: '시스템 점검 안내',
    content: '<p>서버 업그레이드를 위한 시스템 점검이 예정되어 있습니다.</p><p>점검 시간: 2025년 7월 15일 02:00 ~ 04:00 (2시간)</p><p>점검 중에는 일부 서비스 이용이 제한될 수 있습니다.</p>',
    createdAt: new Date('2025-07-10'),
    importance: 'MEDIUM' as const,
  },
  {
    id: 3,
    title: '신규 상품 입고 안내',
    content: '<p>인기 상품들이 새롭게 입고되었습니다.</p><p>지금 바로 확인해보세요!</p>',
    createdAt: new Date('2025-07-08'),
    importance: 'LOW' as const,
  },
  {
    id: 4,
    title: '포인트 충전 이벤트',
    content: '<p>7월 한 달간 포인트 충전 시 10% 추가 적립!</p><p>이 기회를 놓치지 마세요.</p>',
    createdAt: new Date('2025-07-05'),
    importance: 'HIGH' as const,
  },
];

export const mockProducts: Product[] = [
  { id: 1, title: '초코파이', price: 1200, badge: 'new', category: '과자' },
  { id: 2, title: '바나나우유', price: 1500, badge: null, category: '음료' },
  { id: 3, title: '새우깡', price: 1300, badge: null, category: '과자' },
  { id: 4, title: '붕어싸만코', price: 2000, badge: 'hot', category: '아이스크림' },
  { id: 5, title: '김밥', price: 2500, badge: null, category: '식품' },
  { id: 6, title: '핫바', price: 1800, badge: 'hot', category: '냉동식품' },
];
