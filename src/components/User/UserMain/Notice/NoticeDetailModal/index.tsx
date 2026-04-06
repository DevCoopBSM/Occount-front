import React from 'react';
import Modal from 'components/Modal';
import { Notice } from '../notices';
import DOMPurify from 'dompurify';
import * as S from './style';

interface NoticeDetailModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  notice: Notice | null;
}

const NoticeDetailModal: React.FC<NoticeDetailModalProps> = ({
  isOpen,
  onRequestClose,
  notice
}) => {
  if (!notice) return null;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\. /g, '.').replace('.', '');
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlayColor: 'rgba(48, 48, 48, 0.3)',
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '0',
        width: 'clamp(350px, 41.67vw, 800px)', // 800px / 1920px = 41.67%
        maxHeight: 'clamp(300px, 20.83vw, 400px)', // 400px / 1920px = 20.83%
      }}
    >
      <S.ModalContainer>
        <S.ModalHeader>
          <S.ModalTitle>{notice.title}</S.ModalTitle>
          <S.CloseButton onClick={onRequestClose}>
            <S.CloseIcon>✕</S.CloseIcon>
          </S.CloseButton>
        </S.ModalHeader>

        <S.ModalContent>
          <S.NoticeMetadata>
            <S.NoticeDate>작성일: {formatDate(notice.createdAt)}</S.NoticeDate>
          </S.NoticeMetadata>

          <S.NoticeContentText
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(notice.content.replace(/\n/g, '<br/>'))
            }}
          />
        </S.ModalContent>

        <S.ModalFooter>
          <S.CloseFooterButton onClick={onRequestClose}>
            닫기
          </S.CloseFooterButton>
        </S.ModalFooter>
      </S.ModalContainer>
    </Modal>
  );
};

export default NoticeDetailModal;