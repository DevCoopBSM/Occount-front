import styled from 'styled-components';

export const ModalContent = styled.div`
  padding: 30px;
  background-color: #fff;
  border-radius: 12px;
`;

export const ModalHeader = styled.h2`
  font-size: 28px;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
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
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
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