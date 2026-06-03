import React from 'react';
import * as ItemListStyles from './style';
import { ContentContainer } from 'common/ContentContainer';
import Icon from 'components/Icon';
import { categories, useItemList } from './useItemList';

const ItemList: React.FC = () => {
  const {
    filteredItems,
    selectedCategory,
    searchTerm,
    loading,
    error,
    hasItems,
    isEmpty,
    setSelectedCategory,
    setSearchTerm,
  } = useItemList();

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <ContentContainer>
      <ItemListStyles.Title>상품 목록</ItemListStyles.Title>

      <ItemListStyles.FilterSection>
        <ItemListStyles.CategoryTabBar>
          {categories.map((category) => (
            <ItemListStyles.CategoryTab
              key={category}
              $active={selectedCategory === category}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </ItemListStyles.CategoryTab>
          ))}
        </ItemListStyles.CategoryTabBar>

        <ItemListStyles.SearchBar>
          <ItemListStyles.SearchInput
            type="text"
            placeholder="찾으시는 상품을 입력해주세요"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <ItemListStyles.SearchIcon>
            <Icon name="search" size={22} color="#F49E15" strokeWidth={2} />
          </ItemListStyles.SearchIcon>
        </ItemListStyles.SearchBar>
      </ItemListStyles.FilterSection>

      {error && <ItemListStyles.WarningMessage>{error}</ItemListStyles.WarningMessage>}

      {loading && <ItemListStyles.LoadingMessage>로딩 중...</ItemListStyles.LoadingMessage>}

      {isEmpty && <ItemListStyles.EmptyMessage>상품이 없습니다.</ItemListStyles.EmptyMessage>}

      {hasItems && (
        <ItemListStyles.ProductGrid>
          {filteredItems.map((item) => (
            <ItemListStyles.ProductCard key={item.itemId}>
              <ItemListStyles.ProductInfo>
                {(item.isNew || item.isHot) && (
                  <ItemListStyles.Badge type={item.isNew ? 'new' : 'hot'}>
                    {item.isNew ? 'NEW' : 'HOT'}
                  </ItemListStyles.Badge>
                )}
                <ItemListStyles.ProductTitle>{item.itemName}</ItemListStyles.ProductTitle>
                <ItemListStyles.ProductPrice>
                  {item.itemPrice.toLocaleString()} 원
                </ItemListStyles.ProductPrice>
              </ItemListStyles.ProductInfo>
            </ItemListStyles.ProductCard>
          ))}
        </ItemListStyles.ProductGrid>
      )}
    </ContentContainer>
  );
};

export default ItemList;
