import React, { useState } from 'react';
import Modal from 'components/Modal';
import axiosInstance from 'utils/Axios';
import * as S from './style';

const InquiryModal = ({ isOpen, onRequestClose, user }) => {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      onRequestClose();
    } catch (error) {
      console.error('문의 제출 실패:', error);
      alert('문의 제출에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <S.ModalContent>
        <S.ModalHeader>문의하기</S.ModalHeader>
        <S.InquiryForm onSubmit={handleSubmit}>
          <S.InquirySelect
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">카테고리 선택</option>
            <option value="SUGGEST">건의</option>
            <option value="ERROR">서비스 장애</option>
            <option value="ETC">기타</option>
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
              {isSubmitting ? '제출 중...' : '문의하기'}
            </S.SubmitButton>
            <S.CloseButton onClick={onRequestClose}>취소</S.CloseButton>
          </S.ModalFooter>
        </S.InquiryForm>
      </S.ModalContent>
    </Modal>
  );
};

export default InquiryModal;