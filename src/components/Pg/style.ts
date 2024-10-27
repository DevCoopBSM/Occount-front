// style.js
import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BoxSection = styled.div`
  width: 80%;
  max-width: 600px;
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ButtonStyles = `
  font-size: 20px; /* Increased font size */
  padding: 15px 20px; /* Increased padding */
  margin: 10px;
  width: 150px; /* Fixed width */
  height: 60px; /* Fixed height */
  border: none;
  border-radius: 10px; /* Increased border radius */
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

export const Button = styled.button`
  ${ButtonStyles}
  background-color: #f0ce00; /* 노란색 */
  color: white;
  &:hover {
    background-color: #e0be00;
  }
`;

export const CloseButton = styled.button`
  ${ButtonStyles}
  background-color: #f0f0f0; /* 연한 회색 */
  color: #333;
  &:hover {
    background-color: #e0e0e0;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
  flex-direction: row; /* 변경된 부분 */

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const PrivacyAgreement = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  
  input[type="checkbox"] {
    width: 16px;
    height: 16px;
  }

  label {
    font-size: 14px;
    color: #333;
  }
`;
