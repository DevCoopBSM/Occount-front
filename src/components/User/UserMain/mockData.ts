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

export type AriPickStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface AriPickProposal {
  proposal_id: number;
  name: string;
  reason: string;
  proposer_id: number;
  proposal_date: string;
  status: AriPickStatus;
  like_count: number;
}

export interface CreateAriPickRequest {
  product_name: string;
  reason: string;
}

export interface AriPickFoodSearchItem {
  food_id: number;
  name: string;
  category?: string;
  price?: number;
}

export interface AriPickLikeToggleResponse {
  liked: boolean;
  like_count: number;
}

export interface AriPickStats {
  total_count: number;
  pending_count: number;
  approved_count: number;
  rejected_count: number;
}

export const mockNotices: NoticeItem[] = [
  { id: 1, title: '2025 오카운트 UI 변경', date: '2025.07.12', importance: 'HIGH' },
  { id: 2, title: '2025 오카운트 UI 변경', date: '2025.07.12', importance: 'MEDIUM' },
  { id: 3, title: '2025 오카운트 UI 변경', date: '2025.07.12', importance: 'MEDIUM' },
];

export const mockAnnouncements: NoticeItem[] = [
  { id: 1, title: '들어온 상품 안내', date: '2025.07.12', importance: 'LOW' },
  { id: 2, title: '매점 운영 시간 변경 안내', date: '2025.07.10', importance: 'LOW' },
  { id: 3, title: '시스템 점검 안내', date: '2025.07.08', importance: 'LOW' },
  { id: 4, title: '여름 휴가 기간 안내', date: '2025.07.05', importance: 'LOW' },
  { id: 5, title: '신규 결제 방식 도입 안내', date: '2025.07.03', importance: 'LOW' },
];

export const mockAriPickProposals: AriPickProposal[] = [
  {
    proposal_id: 1,
    name: '초코에몽',
    reason: '달콤하고 든든해서 쉬는 시간에 마시기 좋습니다.',
    proposer_id: 2025001,
    proposal_date: '2025-07-12',
    status: 'PENDING',
    like_count: 18,
  },
  {
    proposal_id: 2,
    name: '불닭볶음면',
    reason: '점심시간 이후 간식으로 찾는 학생들이 많습니다.',
    proposer_id: 2025002,
    proposal_date: '2025-07-10',
    status: 'APPROVED',
    like_count: 31,
  },
  {
    proposal_id: 3,
    name: '프로틴바',
    reason: '운동하는 학생들이 간단하게 먹을 수 있는 상품이 필요합니다.',
    proposer_id: 2025003,
    proposal_date: '2025-07-08',
    status: 'REJECTED',
    like_count: 7,
  },
];

export const mockDetailedNotices = [
  {
    id: 1,
    title: '2025 오카운트 UI 개편 안내',
    content:
      '<p>안녕하세요, 오카운트 팀입니다.</p><p>사용자 경험 개선을 위해 UI를 전면 개편하였습니다. 새로운 디자인으로 더욱 편리하게 이용하실 수 있습니다.</p>',
    createdAt: new Date('2025-07-12'),
    importance: 'HIGH' as const,
  },
  {
    id: 2,
    title: '시스템 점검 안내',
    content:
      '<p>서버 업그레이드를 위한 시스템 점검이 예정되어 있습니다.</p><p>점검 시간: 2025년 7월 15일 02:00 ~ 04:00 (2시간)</p><p>점검 중에는 일부 서비스 이용이 제한될 수 있습니다.</p>',
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
  { id: 2, title: '새우깡', price: 1300, badge: null, category: '과자' },
  { id: 3, title: '허니버터칩', price: 1700, badge: 'hot', category: '과자' },
  { id: 4, title: '바나나우유', price: 1500, badge: null, category: '음료' },
  { id: 5, title: '코카콜라 제로', price: 1800, badge: null, category: '음료' },
  { id: 6, title: '포카리스웨트', price: 1900, badge: 'new', category: '음료' },
  { id: 7, title: '붕어싸만코', price: 2000, badge: 'hot', category: '아이스크림' },
  { id: 8, title: '메로나', price: 1200, badge: null, category: '아이스크림' },
  { id: 9, title: '월드콘', price: 2200, badge: null, category: '아이스크림' },
  { id: 10, title: '핫바', price: 1800, badge: 'hot', category: '냉동식품' },
  { id: 11, title: '만두', price: 3200, badge: null, category: '냉동식품' },
  { id: 12, title: '치즈크러스트 피자', price: 4900, badge: 'new', category: '냉동식품' },
  { id: 13, title: '소시지빵', price: 2300, badge: null, category: '빵류' },
  { id: 14, title: '크림치즈 베이글', price: 2800, badge: 'new', category: '빵류' },
  { id: 15, title: '김밥', price: 2500, badge: null, category: '식품' },
  { id: 16, title: '컵라면', price: 1700, badge: 'hot', category: '식품' },
  { id: 17, title: '햄치즈 샌드위치', price: 3300, badge: null, category: '식품' },
  { id: 18, title: '물티슈', price: 1000, badge: null, category: '잡화' },
  { id: 19, title: '건전지', price: 2500, badge: null, category: '잡화' },
  { id: 20, title: '칫솔', price: 1800, badge: 'new', category: '잡화' },
];
