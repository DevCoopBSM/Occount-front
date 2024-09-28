import React, { useState, Suspense, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import Modal from 'components/Modal';
import axiosInstance from 'utils/Axios';
import * as S from './style';
import { AxiosError } from 'axios';
import { ErrorBoundary } from 'react-error-boundary';

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

const getCategoryInKorean = (inquiryType: string): string => {
  switch (inquiryType) {
    case 'SERVICE_SUGGEST': return '서비스 건의';
    case 'SERVICE_ERROR': return '서비스 장애';
    case 'SERVICE_ETC': return '기타';
    default: return inquiryType;
  }
};

const formatDate = (dateArray: [number, number, number, number, number]): string => {
  const [year, month, day, hour, minute] = dateArray;
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
};

const fetchInquiries = async () => {
  const response = await axiosInstance.suspense<{ inquiryList: Inquiry[] }>({ 
    url: 'v2/inquiry/user',
    method: 'GET'
  });
  return response.inquiryList;
};

const InquiryList: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchInquiries()
      .then(data => {
        setInquiries(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch inquiries:', error);
        setIsLoading(false);
      });
  }, []);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [inquiriesPerPage] = useState<number>(5);
  const [expandedInquiries, setExpandedInquiries] = useState<{ [key: number]: boolean }>({});

  const toggleInquiry = (inquiryId: number) => {
    setExpandedInquiries(prev => ({ ...prev, [inquiryId]: !prev[inquiryId] }));
  };

  const indexOfLastInquiry = currentPage * inquiriesPerPage;
  const indexOfFirstInquiry = indexOfLastInquiry - inquiriesPerPage;
  const currentInquiries = inquiries.slice(indexOfFirstInquiry, indexOfLastInquiry);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (isLoading) {
    return null; // 로딩 중에는 아무것도 표시하지 않음
  }

  if (inquiries.length === 0) {
    return <S.NoInquiries>문의 내역이 없습니다.</S.NoInquiries>;
  }

  return (
    <>
      {currentInquiries.map((inquiry) => (
        <S.InquiryItem 
          key={inquiry.inquiryId} 
          onClick={() => toggleInquiry(inquiry.inquiryId)}
          $hasAnswer={!!inquiry.inquiryAnswer} // 'hasAnswer'를 '$hasAnswer'로 변경
        >
          <S.InquiryTitle>
            {inquiry.inquiryTitle}
            <S.InquiryCategory>{getCategoryInKorean(inquiry.inquiryType)}</S.InquiryCategory>
          </S.InquiryTitle>
          <S.InquiryDate>{formatDate(inquiry.createdAt)}</S.InquiryDate>
          {expandedInquiries[inquiry.inquiryId] && (
            <>
              <S.InquiryContent>{inquiry.inquiryContent}</S.InquiryContent>
              <S.InquiryAnswer $hasAnswer={!!inquiry.inquiryAnswer}> // 'hasAnswer'를 '$hasAnswer'로 변경
                {inquiry.inquiryAnswer ? (
                  <>
                    <div>{inquiry.inquiryAnswer}</div>
                    <S.AnswerDate>답변 일시: {formatDate(inquiry.answeredAt!)}</S.AnswerDate>
                  </>
                ) : '답변 대기 중'}
              </S.InquiryAnswer>
            </>
          )}
        </S.InquiryItem>
      ))}
      <S.Pagination>
        {Array.from({ length: Math.ceil(inquiries.length / inquiriesPerPage) }, (_, i) => (
          <S.PageNumber key={i + 1} onClick={() => paginate(i + 1)}>
            {i + 1}
          </S.PageNumber>
        ))}
      </S.Pagination>
    </>
  );
};

const SuspenseInquiryList: React.FC = () => (
  <ErrorBoundary
    fallback={<S.ErrorMessage>문의 목록을 불러오는 데 실패했습니다.</S.ErrorMessage>}
  >
    <Suspense fallback={null}>
      <InquiryList />
    </Suspense>
  </ErrorBoundary>
);

const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onRequestClose, user }) => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isInquiryFormOpen, setIsInquiryFormOpen] = useState<boolean>(false);
  const [category, setCategory] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [expandedInquiries, setExpandedInquiries] = useState<{ [key: number]: boolean }>({});

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [inquiriesPerPage] = useState<number>(5);
  const [slideDirection, setSlideDirection] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);

  const handlers = useSwipeable({
    onSwipedLeft: () => handlePageChange(currentPage + 1),
    onSwipedRight: () => handlePageChange(currentPage - 1),
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  useEffect(() => {
    if (isOpen) {
      fetchInquiries();
    }
  }, [isOpen]);

  const fetchInquiries = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.suspense<{ inquiryList: Inquiry[] }>({
        url: 'v2/inquiry/user',
        method: 'GET'
      });
      setInquiries(response.inquiryList);
    } catch (error) {
      console.error('Failed to fetch inquiries:', error);
      setError(error instanceof Error ? error : new Error('An unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  };

  const toggleInquiry = (inquiryId: number) => {
    setExpandedInquiries(prev => ({ ...prev, [inquiryId]: !prev[inquiryId] }));
  };

  const handlePageChange = (newPage: number) => {
    const maxPage = Math.ceil(inquiries.length / inquiriesPerPage) - 1;
    if (newPage >= 0 && newPage <= maxPage) {
      setSlideDirection(newPage > currentPage ? 'left' : 'right');
      setCurrentPage(newPage);
    }
  };

  const onTransitionEnd = () => {
    setSlideDirection('');
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
        data: { category, title, content }
      });
      alert('문의가 성공적으로 제출되었습니다.');
      setCategory('');
      setTitle('');
      setContent('');
      setIsInquiryFormOpen(false);
      fetchInquiries();
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
            <S.CloseButton onClick={onRequestClose}>닫기</S.CloseButton>
          </S.ModalFooter>
        </S.ModalContent>
      </Modal>
    );
  }

  if (error) {
    onRequestClose();
    return null;
  }

  return (
    <>
      {isLoading ? (
        <S.TransparentModalContent />
      ) : (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
          <S.ModalContent>
            <S.InquiriesHeader>내 문의 목록</S.InquiriesHeader>
            <S.InquiriesContainer {...handlers}>
              <S.InquiriesContent 
                ref={containerRef} 
                onTransitionEnd={onTransitionEnd}
                style={{
                  transform: `translateX(${-100 * currentPage}%)`,
                  width: `${100 * Math.ceil(inquiries.length / inquiriesPerPage)}%`
                }}
              >
                {Array.from({ length: Math.ceil(inquiries.length / inquiriesPerPage) }, (_, pageIndex) => (
                  <S.LogPage key={pageIndex}>
                    {inquiries.slice(pageIndex * inquiriesPerPage, (pageIndex + 1) * inquiriesPerPage).map((inquiry) => (
                      <S.InquiryItem 
                        key={inquiry.inquiryId} 
                        onClick={() => toggleInquiry(inquiry.inquiryId)}
                        $hasAnswer={!!inquiry.inquiryAnswer}
                      >
                        <S.InquiryTitle>
                          {inquiry.inquiryTitle}
                          <S.InquiryCategory>{getCategoryInKorean(inquiry.inquiryType)}</S.InquiryCategory>
                        </S.InquiryTitle>
                        <S.InquiryDate>{formatDate(inquiry.createdAt)}</S.InquiryDate>
                        {expandedInquiries[inquiry.inquiryId] && (
                          <>
                            <S.InquiryContent>{inquiry.inquiryContent}</S.InquiryContent>
                            <S.InquiryAnswer $hasAnswer={!!inquiry.inquiryAnswer}>
                              {inquiry.inquiryAnswer ? (
                                <>
                                  <div>{inquiry.inquiryAnswer}</div>
                                  <S.AnswerDate>답변 일시: {formatDate(inquiry.answeredAt!)}</S.AnswerDate>
                                </>
                              ) : '답변 대기 중'}
                            </S.InquiryAnswer>
                          </>
                        )}
                      </S.InquiryItem>
                    ))}
                  </S.LogPage>
                ))}
              </S.InquiriesContent>
            </S.InquiriesContainer>
            <S.Pagination>
              <S.PageNumber onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
                &lt; 이전
              </S.PageNumber>
              <S.PageIndicator>
                {currentPage + 1} / {Math.ceil(inquiries.length / inquiriesPerPage)}
              </S.PageIndicator>
              <S.PageNumber onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(inquiries.length / inquiriesPerPage) - 1}>
                다음 &gt;
              </S.PageNumber>
            </S.Pagination>
            <S.ModalFooter>
              <S.NewInquiryButton onClick={() => setIsInquiryFormOpen(true)}>문의 작성</S.NewInquiryButton>
              <S.CloseButton onClick={onRequestClose}>닫기</S.CloseButton>
            </S.ModalFooter>
          </S.ModalContent>
        </Modal>
      )}
      {isInquiryFormOpen && (
        <Modal isOpen={isInquiryFormOpen} onRequestClose={() => setIsInquiryFormOpen(false)}>
          <S.ModalContent>
            <S.ModalHeader>문의하기</S.ModalHeader>
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
                <S.CloseButton onClick={() => setIsInquiryFormOpen(false)}>취소</S.CloseButton>
              </S.ModalFooter>
            </S.InquiryForm>
          </S.ModalContent>
        </Modal>
      )}
    </>
  );
};

export default InquiryModal;