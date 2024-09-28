import React, { useState, useEffect } from 'react';
import Modal from 'components/Modal';
import axiosInstance from 'utils/Axios';
import * as S from './style';
import { AxiosError } from 'axios';  // 이 줄을 추가해주세요

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

const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onRequestClose }) => {
  const [category, setCategory] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [inquiriesPerPage] = useState<number>(5);
  const [isInquiryFormOpen, setIsInquiryFormOpen] = useState<boolean>(false);
  const [expandedInquiries, setExpandedInquiries] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await axiosInstance.get('v2/inquiry/user');
        if (response.data && Array.isArray(response.data.inquiryList)) {
          setInquiries(response.data.inquiryList);
        } else {
          console.error('서버에서 받은 데이터 구조가 예상과 다릅니다:', response.data);
          setInquiries([]);
        }
      } catch (error) {
        console.error('문의 목록을 가져오는 데 실패했습니다:', error);
        setInquiries([]);
      }
    };

    fetchInquiries();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !title || !content) {
      alert('카테고리, 제목, 내용을 모두 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      await axiosInstance.post('v2/inquiry/new', { category, title, content });
      alert('문의가 성공적으로 제출되었습니다.');
      setCategory('');
      setTitle('');
      setContent('');
      setIsInquiryFormOpen(false);
      onRequestClose();
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

  const toggleInquiry = (inquiryId: number) => {
    setExpandedInquiries(prev => ({ ...prev, [inquiryId]: !prev[inquiryId] }));
  };

  const indexOfLastInquiry = currentPage * inquiriesPerPage;
  const indexOfFirstInquiry = indexOfLastInquiry - inquiriesPerPage;
  const currentInquiries = inquiries.slice(indexOfFirstInquiry, indexOfLastInquiry);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
        <S.ModalContent>
          <S.InquiriesContainer>
            <S.InquiriesHeader>내 문의 목록</S.InquiriesHeader>
            {currentInquiries.length === 0 ? (
              <S.NoInquiries>문의 내역이 없습니다.</S.NoInquiries>
            ) : (
              currentInquiries.map((inquiry) => (
                <S.InquiryItem 
                  key={inquiry.inquiryId} 
                  onClick={() => toggleInquiry(inquiry.inquiryId)}
                  hasAnswer={!!inquiry.inquiryAnswer}
                >
                  <S.InquiryTitle>
                    {inquiry.inquiryTitle}
                    <S.InquiryCategory>{getCategoryInKorean(inquiry.inquiryType)}</S.InquiryCategory>
                  </S.InquiryTitle>
                  <S.InquiryDate>{formatDate(inquiry.createdAt)}</S.InquiryDate>
                  {expandedInquiries[inquiry.inquiryId] && (
                    <>
                      <S.InquiryContent>{inquiry.inquiryContent}</S.InquiryContent>
                      <S.InquiryAnswer hasAnswer={!!inquiry.inquiryAnswer}>
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
              ))
            )}
            <S.Pagination>
              {Array.from({ length: Math.ceil(inquiries.length / inquiriesPerPage) }, (_, i) => (
                <S.PageNumber key={i + 1} onClick={() => paginate(i + 1)}>
                  {i + 1}
                </S.PageNumber>
              ))}
            </S.Pagination>
          </S.InquiriesContainer>
          <S.ModalFooter>
            <S.OpenInquiryFormButton onClick={() => setIsInquiryFormOpen(true)}>문의하기</S.OpenInquiryFormButton>
            <S.CloseButton onClick={onRequestClose}>닫기</S.CloseButton>
          </S.ModalFooter>
        </S.ModalContent>
      </Modal>
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