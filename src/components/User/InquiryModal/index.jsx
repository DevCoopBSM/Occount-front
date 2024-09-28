import React, { useState, useEffect } from 'react';
import Modal from 'components/Modal';
import axiosInstance from 'utils/Axios';
import * as S from './style';

const InquiryModal = ({ isOpen, onRequestClose, user }) => {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inquiries, setInquiries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [inquiriesPerPage] = useState(5);
  const [isInquiryFormOpen, setIsInquiryFormOpen] = useState(false);
  const [expandedInquiries, setExpandedInquiries] = useState({});

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await axiosInstance.get('v2/inquiry/user');
        setInquiries(response.data);
      } catch (error) {
        console.error('문의 목록을 가져오는 데 실패했습니다:', error);
      }
    };

    fetchInquiries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || !title || !content) {
      alert('카테고리, 제목, 내용을 모두 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      await axiosInstance.post('v2/inquiry/new', {
        category, 
        title,
        content,
      });
      alert('문의가 성공적으로 제출되었습니다.');
      setCategory('');
      setTitle('');
      setContent('');
      setIsInquiryFormOpen(false);
      onRequestClose();
    } catch (error) {
      console.error('문의 제출 실패:', error);
      alert('문의 제출에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleInquiry = (inquiryId) => {
    setExpandedInquiries((prev) => ({
      ...prev,
      [inquiryId]: !prev[inquiryId],
    }));
  };

  const indexOfLastInquiry = currentPage * inquiriesPerPage;
  const indexOfFirstInquiry = indexOfLastInquiry - inquiriesPerPage;
  const currentInquiries = inquiries.slice(indexOfFirstInquiry, indexOfLastInquiry);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                  <S.InquiryTitle>{inquiry.inquiryTitle}</S.InquiryTitle>
                  {expandedInquiries[inquiry.inquiryId] && (
                    <>
                      <S.InquiryContent>{inquiry.inquiryContent}</S.InquiryContent>
                      <S.InquiryAnswer hasAnswer={!!inquiry.inquiryAnswer}>
                        {inquiry.inquiryAnswer ? inquiry.inquiryAnswer : '답변 대기 중'}
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
                onChange={(e) => setCategory(e.target.value)}
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
                onChange={(e) => setTitle(e.target.value)}
              />
              <S.InquiryTextarea
                placeholder="내용"
                value={content}
                onChange={(e) => setContent(e.target.value)}
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