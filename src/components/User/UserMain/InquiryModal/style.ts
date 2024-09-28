import styled from 'styled-components';

interface InquiryItemProps {
  $hasAnswer?: boolean;
}

interface InquiryAnswerProps {
  $hasAnswer?: boolean;
}

export const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
  text-align: center;
  font-weight: bold;
`;

export const ModalContent = styled.div`
  padding: 30px;
  background-color: #fff;
  border-radius: 12px;
  max-width: 600px;
  margin: auto;

  @media (max-width: 600px) {
    padding: 20px;
  }
`;

export const ModalHeader = styled.h2`
  font-size: 28px;
  margin-bottom: 20px;
  color: #333;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 24px;
  }
`;

export const InquiryForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const commonInputStyles = `
  margin-bottom: 15px;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-family: inherit;
  &:focus {
    outline: none;
    border-color: #f0ce00;
  }

  @media (max-width: 600px) {
    font-size: 14px;
    padding: 10px;
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
  gap: 15px;
  margin-top: 20px;
  flex-direction: row;

  @media (max-width: 600px) {
    gap: 10px;
  }
`;

const ButtonStyles = `
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 150px;
  white-space: nowrap;

  @media (max-width: 600px) {
    font-size: 14px;
    padding: 10px 20px;
    min-width: 100px;
  }
`;

export const SubmitButton = styled.button`
  ${ButtonStyles}
  background-color: #f0ce00;
  color: #ffffff;

  &:hover {
    background-color: #e0be00;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export const CloseButton = styled.button`
  ${ButtonStyles}
  background-color: #f0f0f0;
  color: #333;

  &:hover {
    background-color: #e0e0e0;
  }
`;

export const InquiriesContainer = styled.div`
  overflow: hidden;
  width: 100%;
`;

export const InquiriesContent = styled.div`
  display: flex;
  transition: transform 0.3s ease-out;
  width: 100%;
`;

export const InquiriesHeader = styled.h2`
  margin-bottom: 20px;

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
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  background-color: ${props => (props.$hasAnswer ? '#e0ffe0' : '#ffffff')};

  @media (max-width: 600px) {
    padding: 8px;
  }
`;

export const InquiryTitle = styled.h3`
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 600px) {
    font-size: 18px;
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
  color: ${props => (props.$hasAnswer ? '#000' : '#999')};
  margin-top: 10px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 6px;

  @media (max-width: 600px) {
    font-size: 14px;
  }
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
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-size: 14px;
  color: ${props => props.disabled ? '#999' : '#666'};
  padding: 5px 10px;
  border: 1px solid ${props => props.disabled ? '#999' : '#f0ce00'};
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.disabled ? 'transparent' : '#f0ce00'};
    color: ${props => props.disabled ? '#999' : 'white'};
  }
`;

export const OpenInquiryFormButton = styled.button`
  ${ButtonStyles}
  background-color: #f0ce00;
  color: #ffffff;

  &:hover {
    background-color: #e0be00;
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

export const NewInquiryButton = styled.button`
  ${ButtonStyles}
  background-color: #f0ce00;
  color: #ffffff;

  &:hover {
    background-color: #e0be00;
  }
`;

export const TransparentModalContent = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
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
