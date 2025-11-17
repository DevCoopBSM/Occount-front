import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1560px;
  margin: 0 auto;
  padding: 34px 20px 100px;
  min-height: calc(100vh - 200px);
`;

export const Title = styled.h1`
  font-family: 'Pretendard', sans-serif;
  font-size: 32px;
  font-weight: 600;
  color: #111111;
  margin: 0 0 40px 0;
`;

export const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
  gap: 20px;

  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const CategoryTabBar = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  flex: 1;
  max-width: 780px;

  @media (max-width: 1200px) {
    max-width: 100%;
    overflow-x: auto;
  }
`;

export const CategoryTab = styled.button<{ active: boolean }>`
  flex: 1;
  min-width: fit-content;
  padding: 10px 15px;
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: ${props => props.active ? '#111111' : '#666666'};
  background: transparent;
  border-radius: 0;
  border: none;
  border-bottom: ${props => props.active ? '3px solid #F49E15' : 'none'};
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    color: #111111;
  }
`;

export const SearchBar = styled.div`
  position: relative;
  width: 500px;
  height: 40px;
  background: #F3F3F3;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  gap: 10px;

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
  position: relative;
  height: 190px;
  background: white;
  border: 1px solid #CCCCCC;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const ProductInfo = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 30px 20px;
  z-index: 1;
`;

export const Badge = styled.div<{ type: 'new' | 'hot' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 8px;
  border-radius: 8px;
  background: ${props => props.type === 'new' ? '#FCC800' : '#F49E15'};
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: ${props => props.type === 'new' ? '#111111' : '#FFFFFF'};
  width: fit-content;
  margin-bottom: 10px;
`;

export const ProductTitle = styled.h3`
  font-family: 'Pretendard', sans-serif;
  font-size: 32px;
  font-weight: 600;
  color: #111111;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 400px;
`;

export const ProductPrice = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: #666666;
  margin: 0;
`;

export const ProductImagePlaceholder = styled.div`
  width: 300px;
  height: 190px;
  background: linear-gradient(135deg, #F5F5F5 0%, #E0E0E0 100%);
  flex-shrink: 0;
  margin-right: -0.5px;
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

