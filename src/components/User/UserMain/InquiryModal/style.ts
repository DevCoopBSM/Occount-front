import styled from 'styled-components';
import type { InquiryStatus } from 'types/inquiry';

interface InquiryItemProps {
  $status: InquiryStatus;
}

interface InquiryAnswerProps {
  $status: InquiryStatus;
}

interface StatusBadgeProps {
  $status: InquiryStatus;
}

const STATUS_BG: Record<InquiryStatus, string> = {
  RECEIVED: '#f5f5f5',
  IN_PROGRESS: '#fff8e1',
  COMPLETED: '#f0fff4',
};

const STATUS_COLOR: Record<InquiryStatus, string> = {
  RECEIVED: '#888888',
  IN_PROGRESS: '#f49e15',
  COMPLETED: '#2e7d32',
};

export const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
  text-align: center;
  font-weight: bold;
`;

export const ModalContent = styled.div`
  padding: 32px;
  background-color: #fff;
  border-radius: 16px;
  max-width: 500px;
  width: 90%;
  margin: auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  border: 1px solid #f0f0f0;

  @media (max-width: 600px) {
    padding: 24px;
    border-radius: 12px;
  }
`;

export const ModalHeader = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  color: #111111;
  text-align: left;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: 600px) {
    font-size: 22px;
    margin-bottom: 20px;
  }
`;

export const InquiryForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const ModalHeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;

  @media (max-width: 600px) {
    align-items: flex-start;
  }
`;

const commonInputStyles = `
  margin-bottom: 16px;
  padding: 14px 16px;
  font-size: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  transition: all 0.2s ease;
  background-color: #fafafa;

  &:focus {
    outline: none;
    border-color: #FCC800;
    background-color: #fff;
    box-shadow: 0 0 0 3px rgba(252, 200, 0, 0.1);
  }

  @media (max-width: 600px) {
    font-size: 15px;
    padding: 12px 14px;
  }
`;

export const InquirySelect = styled.select`
  ${commonInputStyles}
`;

export const InquiryInput = styled.input`
  ${commonInputStyles}
`;

export const InquiryTextarea = styled.textarea`
  ${commonInputStyles}
  height: 150px;
  resize: vertical;

  @media (max-width: 600px) {
    height: 120px;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 24px;
  flex-direction: row;

  @media (max-width: 600px) {
    gap: 12px;
    margin-top: 20px;
    padding-top: 16px;
    flex-direction: column-reverse;
  }
`;

const ButtonStyles = `
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 120px;
  white-space: nowrap;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.4;

  @media (max-width: 600px) {
    font-size: 15px;
    padding: 10px 20px;
    min-width: 100px;
  }
`;

export const SubmitButton = styled.button`
  ${ButtonStyles}
  background-color: #FCC800;
  color: #111111;

  &:hover {
    background-color: #F49E15;
    transform: translateY(-1px);
  }

  &:disabled {
    background-color: #E8E8E8;
    color: #999999;
    cursor: not-allowed;
    transform: none;
  }
`;

export const CloseButton = styled.button`
  ${ButtonStyles}
  background-color: #F3F3F3;
  color: #111111;
  border: 1px solid #CCCCCC;

  &:hover {
    background-color: #E8E8E8;
    transform: translateY(-1px);
  }
`;

export const InquiriesClipWrapper = styled.div`
  overflow: hidden;
  width: 100%;
`;

export const InquiriesContainer = styled.div`
  overflow: visible;
  width: 100%;
  padding: 2px 4px;
`;

export const InquiriesContent = styled.div`
  display: flex;
  transition: transform 0.3s ease-out;
  width: 100%;
`;

export const InquiriesHeader = styled.h2`
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: #111111;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: 600px) {
    font-size: 24px;
  }
`;

export const NoInquiries = styled.p`
  color: #999;

  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

export const InquiryItem = styled.div<InquiryItemProps>`
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  cursor: pointer;
  background-color: ${(props) => STATUS_BG[props.$status]};
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);

  &:hover {
    border-color: #fcc800;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 600px) {
    padding: 12px;
  }
`;

export const InquiryTitle = styled.h3`
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 16px;
  font-weight: 600;
  color: #111111;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: 600px) {
    font-size: 15px;
  }
`;

export const InquiryCategory = styled.span`
  font-size: 12px;
  color: #999;
  margin-top: 5px;
`;

export const InquiryContent = styled.p`
  margin: 5px 0;
  font-weight: bold;

  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

export const InquiryAnswer = styled.div<InquiryAnswerProps>`
  color: ${(props) => STATUS_COLOR[props.$status]};
  margin-top: 10px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 6px;

  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

export const StatusBadge = styled.span<StatusBadgeProps>`
  display: inline-block;
  margin-top: 6px;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  background-color: ${(props) => STATUS_BG[props.$status]};
  color: ${(props) => STATUS_COLOR[props.$status]};
  border: 1px solid ${(props) => STATUS_COLOR[props.$status]}33;
`;

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 4px 0;
`;

export const DetailHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const DetailTitle = styled.h3`
  margin: 0;
  font-size: 17px;
  font-weight: 600;
  color: #111111;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const DetailMeta = styled.div`
  display: flex;
  gap: 12px;
  font-size: 13px;
  color: #999;
`;

export const DetailContent = styled.p`
  margin: 0;
  font-size: 15px;
  color: #333;
  line-height: 1.6;
  white-space: pre-wrap;
  background-color: #fafafa;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 14px 16px;
`;

export const AnswerLabel = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

export const AnswerDate = styled.span`
  font-size: 12px;
  color: #666;
  display: block;
  margin-top: 5px;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  @media (max-width: 600px) {
    margin-top: 15px;
  }
`;

export const PageNumber = styled.span<{ disabled?: boolean }>`
  margin: 0 10px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  font-size: 14px;
  color: ${(props) => (props.disabled ? '#999' : '#666')};
  padding: 5px 10px;
  border: 1px solid ${(props) => (props.disabled ? '#999' : '#f0ce00')};
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.disabled ? 'transparent' : '#f0ce00')};
    color: ${(props) => (props.disabled ? '#999' : 'white')};
  }
`;

export const TextActionButton = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  color: #8a6a12;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
  cursor: pointer;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;

  &:hover {
    color: #6f550d;
    text-decoration: underline;
  }
`;

export const InquiryDate = styled.span`
  font-size: 12px;
  color: #999;
  display: block;
  margin-top: 5px;
`;

export const LoadingSpinner = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 18px;
  color: #666;
`;

export const TransparentModalContent = styled.div`
  width: 100%;
  min-height: 280px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PageIndicator = styled.span`
  margin: 0 10px;
  font-size: 14px;
  color: #666;
`;

export const LogPage = styled.div`
  flex: 0 0 100%;
  width: 100%;
`;

export const LogColumn = styled.div`
  width: 50%;
  padding: 0 10px;
`;

export const LogTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
  text-align: center;
`;

export const EmptyState = styled.div`
  display: flex;
  min-height: 240px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 12px 0 4px;
`;

export const EmptyStateText = styled.p`
  margin: 0;
  font-size: 15px;
  line-height: 1.6;
  color: #999999;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
`;
