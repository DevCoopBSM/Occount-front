import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import Modal from 'components/Modal';
import { fetchInquiryList, fetchInquiryDetail, createInquiry } from 'utils/inquiryApi';
import type { InquiryCategory, InquiryDetail, InquiryListItem, InquiryStatus } from 'types/inquiry';
import * as S from './style';
import { AxiosError } from 'axios';

interface InquiryModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  user: any;
}

type InquiryViewMode = 'form' | 'list' | 'detail';

const CATEGORY_LABEL: Record<InquiryCategory, string> = {
  PAYMENT: '결제 관련',
  ACCOUNT: '계정 관련',
  SERVICE: '서비스 오류',
  OTHER: '기타',
};

const STATUS_LABEL: Record<InquiryStatus, string> = {
  RECEIVED: '접수됨',
  IN_PROGRESS: '처리중',
  COMPLETED: '완료',
};

const formatDate = (raw: string): string => {
  // 마이크로초(소수점 6자리) 포함 문자열을 밀리초(3자리)로 잘라 파싱
  const normalized = raw.replace(/(\.\d{3})\d+/, '$1');
  const d = new Date(normalized);
  if (Number.isNaN(d.getTime())) return raw;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hour = String(d.getHours()).padStart(2, '0');
  const minute = String(d.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hour}:${minute}`;
};

const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onRequestClose, user }) => {
  const [inquiries, setInquiries] = useState<InquiryListItem[]>([]);
  const [selectedDetail, setSelectedDetail] = useState<InquiryDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [viewMode, setViewMode] = useState<InquiryViewMode>('form');
  const [category, setCategory] = useState<InquiryCategory | ''>('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const inquiriesPerPage = 5;
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
      setSelectedDetail(null);
      setError(null);
      setIsLoading(false);
    }
  }, [isOpen]);

  const loadInquiries = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const list = await fetchInquiryList();
      setInquiries(list);
    } catch (err) {
      console.error('Failed to fetch inquiries:', err);
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      setInquiries([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenListView = async () => {
    setCurrentPage(0);
    setSelectedDetail(null);
    setViewMode('list');
    await loadInquiries();
  };

  const handleOpenDetail = async (inquiryId: number) => {
    setIsDetailLoading(true);
    setViewMode('detail');
    try {
      const detail = await fetchInquiryDetail(inquiryId);
      setSelectedDetail(detail);
    } catch (err) {
      console.error('Failed to fetch inquiry detail:', err);
      setSelectedDetail(null);
    } finally {
      setIsDetailLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    const maxPage = totalPages - 1;
    if (newPage >= 0 && newPage <= maxPage) setCurrentPage(newPage);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !title || !content) {
      alert('카테고리, 제목, 내용을 모두 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      await createInquiry({ category, title, content });
      alert('문의가 성공적으로 제출되었습니다.');
      setCategory('');
      setTitle('');
      setContent('');
      await handleOpenListView();
    } catch (err: unknown) {
      console.error('문의 제출 실패:', err);
      if (err instanceof AxiosError && err.response) {
        alert(`문의 제출 실패: ${err.response.data}`);
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
      {viewMode === 'form' && (
        <>
          <S.ModalHeaderRow>
            <S.ModalHeader>문의 작성</S.ModalHeader>
            <S.TextActionButton type="button" onClick={handleOpenListView}>
              내 문의 보기
            </S.TextActionButton>
          </S.ModalHeaderRow>
          <S.InquiryForm onSubmit={handleSubmit}>
            <S.InquirySelect
              value={category}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setCategory(e.target.value as InquiryCategory)
              }
            >
              <option value="">카테고리 선택</option>
              {(Object.keys(CATEGORY_LABEL) as InquiryCategory[]).map((key) => (
                <option key={key} value={key}>
                  {CATEGORY_LABEL[key]}
                </option>
              ))}
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
      )}

      {viewMode === 'list' && (
        <>
          <S.ModalHeaderRow>
            <S.InquiriesHeader>내 문의 목록</S.InquiriesHeader>
            <S.TextActionButton type="button" onClick={() => setViewMode('form')}>
              문의 작성
            </S.TextActionButton>
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
              <S.InquiriesClipWrapper>
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
                              key={inquiry.inquiry_id}
                              onClick={() => handleOpenDetail(inquiry.inquiry_id)}
                              $status={inquiry.status}
                            >
                              <S.InquiryTitle>
                                {inquiry.title}
                                <S.InquiryCategory>
                                  {CATEGORY_LABEL[inquiry.category]}
                                </S.InquiryCategory>
                              </S.InquiryTitle>
                              <S.InquiryDate>{formatDate(inquiry.created_at)}</S.InquiryDate>
                              <S.StatusBadge $status={inquiry.status}>
                                {STATUS_LABEL[inquiry.status]}
                              </S.StatusBadge>
                            </S.InquiryItem>
                          ))}
                      </S.LogPage>
                    ))}
                  </S.InquiriesContent>
                </S.InquiriesContainer>
              </S.InquiriesClipWrapper>
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

      {viewMode === 'detail' && (
        <>
          <S.ModalHeaderRow>
            <S.InquiriesHeader>문의 상세</S.InquiriesHeader>
            <S.TextActionButton type="button" onClick={handleOpenListView}>
              목록으로
            </S.TextActionButton>
          </S.ModalHeaderRow>
          {isDetailLoading || !selectedDetail ? (
            <S.TransparentModalContent>
              <S.LoadingSpinner>로딩 중...</S.LoadingSpinner>
            </S.TransparentModalContent>
          ) : (
            <S.DetailContainer>
              <S.DetailHeader>
                <S.DetailTitle>{selectedDetail.title}</S.DetailTitle>
                <S.StatusBadge $status={selectedDetail.status}>
                  {STATUS_LABEL[selectedDetail.status]}
                </S.StatusBadge>
              </S.DetailHeader>
              <S.DetailMeta>
                <span>{CATEGORY_LABEL[selectedDetail.category]}</span>
                <span>{formatDate(selectedDetail.created_at)}</span>
              </S.DetailMeta>
              <S.DetailContent>{selectedDetail.content}</S.DetailContent>
              <S.InquiryAnswer $status={selectedDetail.status}>
                {selectedDetail.status === 'COMPLETED' ? (
                  <>
                    <S.AnswerLabel>답변</S.AnswerLabel>
                    <S.AnswerDate>처리 완료: {formatDate(selectedDetail.updated_at)}</S.AnswerDate>
                  </>
                ) : selectedDetail.status === 'IN_PROGRESS' ? (
                  <S.AnswerLabel>처리 중입니다.</S.AnswerLabel>
                ) : (
                  <S.AnswerLabel>답변 대기 중</S.AnswerLabel>
                )}
              </S.InquiryAnswer>
            </S.DetailContainer>
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
