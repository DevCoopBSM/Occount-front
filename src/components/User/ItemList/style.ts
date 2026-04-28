import styled from 'styled-components';

const TABLET_BREAKPOINT = '768px';

export const Title = styled.h1`
  font-family: 'Pretendard', sans-serif;
  font-size: 40px;
  font-weight: 600;
  color: #111111;
  margin: 0 0 28px 0;

  @media (max-width: ${TABLET_BREAKPOINT}) {
    font-size: 30px;
    margin-bottom: 24px;
  }
`;

export const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  gap: 24px;

  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const CategoryTabBar = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  flex: 1;
  max-width: 900px;

  @media (max-width: 1200px) {
    max-width: 100%;
    overflow-x: auto;
    flex-wrap: nowrap;
    padding-bottom: 4px;
  }
`;

export const CategoryTab = styled.button<{ active: boolean }>`
  min-width: fit-content;
  padding: 16px 28px;
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
  font-weight: ${props => props.active ? 600 : 500};
  color: ${props => props.active ? '#111111' : '#666666'};
  background: ${props => props.active ? '#FCC800' : '#FFFFFF'};
  border-radius: 999px;
  border: 1px solid ${props => props.active ? '#FCC800' : '#EFEFEF'};
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    color: #111111;
    border-color: #F49E15;
  }

  @media (max-width: ${TABLET_BREAKPOINT}) {
    padding: 14px 22px;
    font-size: 16px;
  }
`;

export const SearchBar = styled.div`
  position: relative;
  width: 420px;
  min-height: 56px;
  background: #FFFFFF;
  border: 1px solid #FCC800;
  border-radius: 999px;
  display: flex;
  align-items: center;
  padding: 0 20px 0 24px;
  gap: 12px;

  @media (max-width: 1200px) {
    width: 100%;
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
  color: #111111;
  background: transparent;
  border: none;
  outline: none;

  &::placeholder {
    color: #666666;
  }

  @media (max-width: ${TABLET_BREAKPOINT}) {
    font-size: 16px;
  }
`;

export const SearchIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const ProductCard = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  height: 190px;
  background: white;
  border: 1px solid #ececec;
  border-radius: 24px;
  padding: 24px 26px;

  @media (max-width: ${TABLET_BREAKPOINT}) {
    height: auto;
    min-height: 164px;
    padding: 22px 20px;
    border-radius: 20px;
  }
`;

export const Badge = styled.div<{ type: 'new' | 'hot' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 4px 12px;
  border-radius: 999px;
  background: ${props => props.type === 'new' ? '#FCC800' : '#F49E15'};
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.type === 'new' ? '#111111' : '#FFFFFF'};

  @media (max-width: ${TABLET_BREAKPOINT}) {
    font-size: 16px;
  }
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  flex: 1;
  min-width: 0;
`;

export const ProductTitle = styled.h3`
  font-family: 'Pretendard', sans-serif;
  font-size: 32px;
  font-weight: 600;
  color: #111111;
  margin: 0;
  line-height: normal;

  @media (max-width: ${TABLET_BREAKPOINT}) {
    font-size: 26px;
  }
`;

export const ProductPrice = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
  font-weight: 500;
  color: #666666;
  margin: 0;
  line-height: normal;
`;

export const LoadingMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
  font-family: 'Pretendard', sans-serif;
  font-size: 20px;
  color: #666666;
`;

export const EmptyMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
  font-family: 'Pretendard', sans-serif;
  font-size: 20px;
  color: #666666;
`;
