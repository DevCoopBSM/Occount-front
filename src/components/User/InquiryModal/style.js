import styled from 'styled-components';

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
  flex-direction: row; /* 변경된 부분 */

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
  padding: 20px;

  @media (max-width: 600px) {
    padding: 15px;
  }
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

export const InquiryItem = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  background-color: ${props => (props.hasAnswer ? '#e0ffe0' : '#ffffff')}; /* 변경된 부분 */

  @media (max-width: 600px) {
    padding: 8px;
  }
`;

export const InquiryTitle = styled.h3`
  margin: 0;

  @media (max-width: 600px) {
    font-size: 18px;
  }
`;

export const InquiryContent = styled.p`
  margin: 5px 0;
  font-weight: bold; /* 변경된 부분 */

  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

export const InquiryAnswer = styled.p`
  color: ${props => (props.hasAnswer ? '#000' : '#999')};
  margin-top: 10px; /* 변경된 부분 */
  padding: 10px;
  background-color: #f9f9f9; /* 변경된 부분 */
  border-radius: 6px; /* 변경된 부분 */

  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  @media (max-width: 600px) {
    margin-top: 15px;
  }
`;

export const PageNumber = styled.span`
  margin: 0 5px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 600px) {
    font-size: 14px;
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