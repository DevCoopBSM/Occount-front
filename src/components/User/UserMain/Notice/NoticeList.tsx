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
    <>
      <PageTitle>변경/공지사항</PageTitle>

      <TabContainerWrapper>
        <EmptySpace />
        <NavigationContainer>
          <NavigationButton aria-label="이전" disabled>
            <Icon name="chevronLeft" size={30} color="#cccccc" />
          </NavigationButton>
          <NavigationButton aria-label="다음" disabled>
            <Icon name="chevronRight" size={30} color="#cccccc" />
          </NavigationButton>
        </NavigationContainer>
      </TabContainerWrapper>

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
    </>
  );
};

const PageTitle = styled.h1`
  font-family: 'Pretendard', sans-serif;
  font-size: 32px;
  font-weight: 600;
  color: #111111;
  margin-bottom: 25px;
  line-height: 1.4;
`;

const TabContainerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
  width: 100%;
`;

const EmptySpace = styled.div`
  width: 350px;
`;

const NavigationContainer = styled.div`
  display: flex;
  gap: 0;
  align-items: center;
`;

const NavigationButton = styled.button`
  width: 30px;
  height: 30px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: all 0.3s ease;

  svg path {
    fill: #CCCCCC;
    transition: fill 0.3s ease;
  }

  &:disabled {
    cursor: not-allowed;
  }

  &:not(:disabled):hover svg path {
    fill: #111111;
  }
`;

const NoticeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 100%;
  padding: 10px;
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
  padding: 10px;
  width: 100%;
`;

const NoticeTitle = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: 18px;
  color: #111111;
  margin: 0;
  line-height: normal;
  flex: 1;
  text-align: left;
`;

const NoticeDate = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: 18px;
  color: #666666;
  margin: 0;
  line-height: normal;
  text-align: right;
  flex-shrink: 0;
`;


const LoadingMessage = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
  color: #666666;
  text-align: center;
  margin: 20px 0;
`;

const ErrorMessage = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
  color: #ff6666;
  text-align: center;
  margin: 20px 0;
`;

const EmptyMessage = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
  color: #666666;
  text-align: center;
  margin: 20px 0;
`;

export default NoticeList;
