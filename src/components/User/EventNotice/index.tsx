import React, { useState } from 'react';
import Icon from 'components/Icon';
import * as S from './style';

interface EventBanner {
  id: number;
  imageUrl?: string;
  title?: string;
  description?: string;
}

function EventNotice() {
  const [currentPage, setCurrentPage] = useState(0);

  // 이벤트 배너 데이터 (실제로는 API에서 가져올 수 있습니다)
  const eventBanners: EventBanner[] = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
  ];

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(Math.ceil(eventBanners.length / 4) - 1, prev + 1));
  };

  const displayedBanners = eventBanners.slice(currentPage * 4, (currentPage + 1) * 4);

  return (
    <S.EventNoticeContainer>
      <S.Content>
        <S.TitleWrapper>
          <S.Title>이벤트 안내</S.Title>
          <S.NavigationButtons>
            <S.NavButton 
              onClick={handlePrevious} 
              disabled={currentPage === 0}
              aria-label="이전"
            >
              <Icon name="chevronLeft" size={20} color="#111111" />
            </S.NavButton>
            <S.NavButton 
              onClick={handleNext} 
              disabled={currentPage >= Math.ceil(eventBanners.length / 4) - 1}
              aria-label="다음"
            >
              <Icon name="chevronRight" size={20} color="#111111" />
            </S.NavButton>
          </S.NavigationButtons>
        </S.TitleWrapper>

        <S.EventBannersWrapper>
          <S.EventBannersList>
            {displayedBanners.map((banner) => (
              <S.EventBannerCard key={banner.id} />
            ))}
          </S.EventBannersList>
        </S.EventBannersWrapper>
      </S.Content>
    </S.EventNoticeContainer>
  );
}

export default EventNotice;
