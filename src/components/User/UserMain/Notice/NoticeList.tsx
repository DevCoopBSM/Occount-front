import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchNotices, Notice } from './notices';
import NoticeDetailModal from './NoticeDetailModal';
import Icon from 'components/Icon';

const NoticeList: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const loadNotices = async () => {
      try {
        const fetchedNotices = await fetchNotices();
        setNotices(fetchedNotices);
      } catch (err) {
        setError('공지사항을 가져오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    loadNotices();
  }, []);

  const handleNoticeClick = (notice: Notice) => {
    setSelectedNotice(notice);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedNotice(null);
  };

  return (
    <NoticeWrapper>
      <HeaderContainer>
        <Title>변경/공지사항</Title>
        <NavigationContainer>
          <NavigationButton aria-label="이전" disabled>
            <Icon name="chevronLeft" size={40} color="#cccccc" />
          </NavigationButton>
          <NavigationButton aria-label="다음" disabled>
            <Icon name="chevronRight" size={40} color="#cccccc" />
          </NavigationButton>
        </NavigationContainer>
      </HeaderContainer>

      <NoticeContainer>
        {loading ? (
          <LoadingMessage>로딩 중...</LoadingMessage>
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : notices.length > 0 ? (
          notices.map((notice) => (
            <NoticeItem key={notice.id} onClick={() => handleNoticeClick(notice)}>
              <NoticeItemHeader>
                <NoticeTitle>{notice.title}</NoticeTitle>
                <NoticeDate>
                  {new Date(notice.createdAt).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  }).replace(/\. /g, '.').replace('.', '')}
                </NoticeDate>
              </NoticeItemHeader>
            </NoticeItem>
          ))
        ) : (
          <EmptyMessage>등록된 공지사항이 없습니다.</EmptyMessage>
        )}
      </NoticeContainer>

      <NoticeDetailModal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        notice={selectedNotice}
      />
    </NoticeWrapper>
  );
};

// 스타일 컴포넌트
const NoticeWrapper = styled.div`
  position: absolute;
  left: clamp(20px, 29.69vw, 570px); // 570px / 1920px = 29.69%
  top: clamp(60px, 4.69vw, 90px); // 90px / 1920px = 4.69%
  width: clamp(300px, 40.63vw, 780px); // 780px / 1920px = 40.63%
  display: flex;
  flex-direction: column;
  gap: clamp(5px, 0.52vw, 10px); // 10px / 1920px = 0.52%

  @media (max-width: 768px) {
    position: static;
    left: auto;
    top: auto;
    width: 100%;
    padding: 0 20px;
    margin-top: 20px;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(5px, 0.52vw, 10px);
  width: 100%;
`;

const Title = styled.h1`
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: clamp(24px, 1.67vw, 32px); // 32px / 1920px = 1.67%
  color: #111111;
  text-align: center;
  margin: 0;
  padding: clamp(5px, 0.52vw, 10px);
  line-height: 1.4;
`;

const NavigationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0;
  padding: clamp(5px, 0.52vw, 10px);
`;

const NavigationButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: clamp(24px, 1.56vw, 30px); // 30px / 1920px = 1.56%
  height: clamp(24px, 1.56vw, 30px);

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:not(:disabled):hover {
    opacity: 0.7;
  }
`;

const NoticeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(1px, 0.1vw, 2px); // 2px / 1920px = 0.1%
  width: 100%;
  padding: clamp(5px, 0.52vw, 10px);
`;

const NoticeItem = styled.div`
  cursor: pointer;
  width: 100%;
  background: transparent;

  &:hover {
    opacity: 0.8;
  }
`;

const NoticeItemHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: clamp(5px, 0.52vw, 10px);
  width: 100%;
`;

const NoticeTitle = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: clamp(14px, 0.94vw, 18px); // 18px / 1920px = 0.94%
  color: #111111;
  margin: 0;
  line-height: normal;
  flex: 1;
  text-align: left;
`;

const NoticeDate = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: clamp(14px, 0.94vw, 18px); // 18px / 1920px = 0.94%
  color: #666666;
  margin: 0;
  line-height: normal;
  text-align: right;
  flex-shrink: 0;
`;


const LoadingMessage = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-size: clamp(14px, 0.94vw, 18px);
  color: #666666;
  text-align: center;
  margin: 20px 0;
`;

const ErrorMessage = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-size: clamp(14px, 0.94vw, 18px);
  color: #ff6666;
  text-align: center;
  margin: 20px 0;
`;

const EmptyMessage = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-size: clamp(14px, 0.94vw, 18px);
  color: #666666;
  text-align: center;
  margin: 20px 0;
`;

export default NoticeList;
