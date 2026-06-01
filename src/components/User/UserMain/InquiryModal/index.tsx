import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import Modal from 'components/Modal';
import axiosInstance from 'utils/Axios';
import * as S from './style';
import { AxiosError } from 'axios';

interface Inquiry {
  inquiryId: number;
  inquiryTitle: string;
  inquiryContent: string;
  inquiryType: string;
  inquiryAnswer: string | null;
  userEmail: string;
  createdAt: [number, number, number, number, number];
  answeredAt: [number, number, number, number, number] | null;
}

interface InquiryModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  user: any;
}

type InquiryViewMode = 'form' | 'list';

const getCategoryInKorean = (inquiryType: string): string => {
  switch (inquiryType) {
    case 'SERVICE_SUGGEST':
      return '서비스 건의';
    case 'SERVICE_ERROR':
      return '서비스 장애';
    case 'SERVICE_ETC':
      return '기타';
    default:
      return inquiryType;
  }
};

const formatDate = (dateArray: [number, number, number, number, number]): string => {
  const [year, month, day, hour, minute] = dateArray;
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
};

const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onRequestClose, user }) => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [viewMode, setViewMode] = useState<InquiryViewMode>('form');
  const [category, setCategory] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [expandedInquiries, setExpandedInquiries] = useState<{ [key: number]: boolean }>({});

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [inquiriesPerPage] = useState<number>(5);
  const safeInquiries = Array.isArray(inquiries) ? inquiries : [];
  const totalPages = Math.max(1, Math.ceil(safeInquiries.length / inquiriesPerPage));

  const handlers = useSwipeable({
    onSwipedLeft: () => handlePageChange(currentPage + 1),
    onSwipedRight: () => handlePageChange(currentPage - 1),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  useEffect(() => {
    if (isOpen) {
      setViewMode('form');
      setCurrentPage(0);
      setExpandedInquiries({});
      setError(null);
      setIsLoading(false);
    }
  }, [isOpen]);

  const fetchInquiries = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.suspense<{ inquiryList: Inquiry[] }>({
        url: 'v2/inquiry/user',
        method: 'GET',
      });
      setInquiries(Array.isArray(response?.inquiryList) ? response.inquiryList : []);
    } catch (error) {
      console.error('Failed to fetch inquiries:', error);
      setError(error instanceof Error ? error : new Error('An unknown error occurred'));
      setInquiries([]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleInquiry = (inquiryId: number) => {
    setExpandedInquiries((prev) => ({ ...prev, [inquiryId]: !prev[inquiryId] }));
  };

  const handlePageChange = (newPage: number) => {
    const maxPage = totalPages - 1;
    if (newPage >= 0 && newPage <= maxPage) {
      setCurrentPage(newPage);
    }
  };

  const openListView = async () => {
    setCurrentPage(0);
    setExpandedInquiries({});
    setViewMode('list');
    await fetchInquiries();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !title || !content) {
      alert('카테고리, 제목, 내용을 모두 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      await axiosInstance.suspense({
        url: 'v2/inquiry/new',
        method: 'POST',
        data: { category, title, content },
      });
      alert('문의가 성공적으로 제출되었습니다.');
      setCategory('');
      setTitle('');
      setContent('');
      setViewMode('list');
      await fetchInquiries();
    } catch (error: unknown) {
      console.error('문의 제출 실패:', error);
      if (error instanceof AxiosError && error.response) {
        const errorMessage = error.response.data;
        alert(`문의 제출 실패: ${errorMessage}`);
      } else {
        alert('문의 제출에 실패했습니다. 다시 시도해주세요.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  if (!user) {
    return (
      <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
        <S.ModalContent>
          <S.ModalHeader>알림</S.ModalHeader>
          <S.NoInquiries>로그인 후 이용 가능합니다.</S.NoInquiries>
          <S.ModalFooter>
            <S.CloseButton type="button" onClick={onRequestClose}>
              닫기
            </S.CloseButton>
          </S.ModalFooter>
        </S.ModalContent>
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        padding: '32px',
        borderRadius: '16px',
        backgroundColor: '#fff',
        maxWidth: '560px',
        width: '92%',
      }}
    >
      {viewMode === 'form' ? (
        <>
          <S.ModalHeaderRow>
            <S.ModalHeader>문의 작성</S.ModalHeader>
            <S.TextActionButton type="button" onClick={openListView}>
              내 문의 보기
            </S.TextActionButton>
          </S.ModalHeaderRow>
          <S.InquiryForm onSubmit={handleSubmit}>
            <S.InquirySelect
              value={category}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}
            >
              <option value="">카테고리 선택</option>
              <option value="SERVICE_SUGGEST">서비스 건의</option>
              <option value="SERVICE_ERROR">서비스 장애</option>
              <option value="SERVICE_ETC">기타</option>
            </S.InquirySelect>
            <S.InquiryInput
              type="text"
              placeholder="제목"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            />
            <S.InquiryTextarea
              placeholder="내용"
              value={content}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
            />
            <S.ModalFooter>
              <S.SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? '제출 중...' : '제출하기'}
              </S.SubmitButton>
              <S.CloseButton type="button" onClick={onRequestClose}>
                닫기
              </S.CloseButton>
            </S.ModalFooter>
          </S.InquiryForm>
        </>
      ) : (
        <>
          <S.ModalHeaderRow>
            <S.InquiriesHeader>내 문의 목록</S.InquiriesHeader>
          </S.ModalHeaderRow>
          {isLoading ? (
            <S.TransparentModalContent>
              <S.LoadingSpinner>로딩 중...</S.LoadingSpinner>
            </S.TransparentModalContent>
          ) : error ? (
            <S.EmptyState>
              <S.EmptyStateText>문의 목록을 불러오지 못했습니다.</S.EmptyStateText>
            </S.EmptyState>
          ) : safeInquiries.length === 0 ? (
            <S.EmptyState>
              <S.EmptyStateText>아직 작성한 문의가 없습니다.</S.EmptyStateText>
            </S.EmptyState>
          ) : (
            <>
              <S.InquiriesContainer {...handlers}>
                <S.InquiriesContent
                  style={{
                    transform: `translateX(${-100 * currentPage}%)`,
                    width: `${100 * totalPages}%`,
                  }}
                >
                  {Array.from({ length: totalPages }, (_, pageIndex) => (
                    <S.LogPage key={pageIndex}>
                      {safeInquiries
                        .slice(pageIndex * inquiriesPerPage, (pageIndex + 1) * inquiriesPerPage)
                        .map((inquiry) => (
                          <S.InquiryItem
                            key={inquiry.inquiryId}
                            onClick={() => toggleInquiry(inquiry.inquiryId)}
                            $hasAnswer={!!inquiry.inquiryAnswer}
                          >
                            <S.InquiryTitle>
                              {inquiry.inquiryTitle}
                              <S.InquiryCategory>
                                {getCategoryInKorean(inquiry.inquiryType)}
                              </S.InquiryCategory>
                            </S.InquiryTitle>
                            <S.InquiryDate>{formatDate(inquiry.createdAt)}</S.InquiryDate>
                            {expandedInquiries[inquiry.inquiryId] && (
                              <>
                                <S.InquiryContent>{inquiry.inquiryContent}</S.InquiryContent>
                                <S.InquiryAnswer $hasAnswer={!!inquiry.inquiryAnswer}>
                                  {inquiry.inquiryAnswer ? (
                                    <>
                                      <div>{inquiry.inquiryAnswer}</div>
                                      <S.AnswerDate>
                                        답변 일시: {formatDate(inquiry.answeredAt!)}
                                      </S.AnswerDate>
                                    </>
                                  ) : (
                                    '답변 대기 중'
                                  )}
                                </S.InquiryAnswer>
                              </>
                            )}
                          </S.InquiryItem>
                        ))}
                    </S.LogPage>
                  ))}
                </S.InquiriesContent>
              </S.InquiriesContainer>
              {totalPages > 1 && (
                <S.Pagination>
                  <S.PageNumber
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                  >
                    &lt; 이전
                  </S.PageNumber>
                  <S.PageIndicator>
                    {currentPage + 1} / {totalPages}
                  </S.PageIndicator>
                  <S.PageNumber
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages - 1}
                  >
                    다음 &gt;
                  </S.PageNumber>
                </S.Pagination>
              )}
            </>
          )}
          <S.ModalFooter>
            <S.CloseButton type="button" onClick={onRequestClose}>
              닫기
            </S.CloseButton>
          </S.ModalFooter>
        </>
      )}
    </Modal>
  );
};

export default InquiryModal;
