import React, { useEffect, useState } from 'react';
import styled from 'styled-components'; // styled-components 임포트
import { fetchNotices, Notice } from './notices'; // Axios를 통해 공지사항 가져오는 함수 임포트
import DOMPurify from 'dompurify'; // DOMPurify 임포트

const NoticeList: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([]); // 공지사항 상태
  const [expandedNoticeId, setExpandedNoticeId] = useState<number | null>(null); // 확장된 공지사항 ID 상태
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 오류 상태

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

  const handleNoticeClick = (id: number) => {
    setExpandedNoticeId(expandedNoticeId === id ? null : id); // 클릭한 공지사항을 확장/축소
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <NoticeWrapper>
      <h2>공지사항</h2>
      <NoticeContainer>
        {notices.map((notice) => (
          <NoticeItem key={notice.id} importance={notice.importance} onClick={() => handleNoticeClick(notice.id)}>
            <TitleContainer>
              <Title>{notice.title.toUpperCase()}</Title> {/* 제목을 대문자로 변환 */}
              <DateLabel>
                {new Date(notice.createdAt).toLocaleDateString()} {/* 날짜 형식 변경 */}
              </DateLabel>
            </TitleContainer>
            <NoticeContent expanded={expandedNoticeId === notice.id}>
              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(notice.content) }} /> {/* HTML 태그를 안전하게 렌더링 */}
            </NoticeContent>
          </NoticeItem>
        ))}
      </NoticeContainer>
    </NoticeWrapper>
  );
};

// 스타일 컴포넌트
const NoticeWrapper = styled.div`
  border: 2px solid #f0ce00;
  border-radius: 10px;
  padding: 20px;
  background-color: #fff;
  margin: 20px auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%; /* 전체 너비 사용 */
  max-width: 1200px; /* 최대 너비 제한 */
`;

const NoticeContainer = styled.div`
  margin: 0 auto; /* 가운데 정렬 */
`;

const NoticeItem = styled.div<{ importance: string }>`
  cursor: pointer;
  margin: 5px auto; /* 항목 간 여백 줄임 */
  padding: 8px 15px; /* 상하 패딩 줄이고, 좌우 패딩 유지 */
  border-radius: 5px;
  transition: transform 0.2s;
  background-color: ${({ importance }) => {
    switch (importance) {
      case 'HIGH':
        return '#ffcccc';
      case 'MEDIUM':
        return '#fff3cd';
      case 'LOW':
        return '#d4edda';
      default:
        return '#fff';
    }
  }};

  &:hover {
    transform: scale(1.01);
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0; /* 상하 패딩 줄임 */
`;

const Title = styled.span`
  color: black;
  font-size: clamp(14px, 1.5vw, 18px); /* 반응형 글꼴 크기 */
  font-weight: bold;
`;

const DateLabel = styled.span`
  color: #666; /* 날짜 색상 변경 */
  font-size: clamp(12px, 1.2vw, 16px); /* 반응형 글꼴 크기 */
`;

const NoticeContent = styled.div<{ expanded: boolean }>`
  padding: ${({ expanded }) => (expanded ? '8px' : '0')};
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top: 5px;
  height: auto; /* 자동 높이 설정 */
  max-height: ${({ expanded }) => (expanded ? 'fit-content' : '0')}; /* 내용에 맞게 자동 조절 */
  overflow: hidden; /* 스크롤 제거 */
  transition: all 0.2s ease-in-out;
  opacity: ${({ expanded }) => (expanded ? 1 : 0)};
  line-height: 1.4;
  font-size: 14px;
  color: #333;
  white-space: pre-wrap; /* 줄바꿈 유지 */
  word-break: break-word; /* 긴 단어 줄바꿈 */
`;

export default NoticeList;
