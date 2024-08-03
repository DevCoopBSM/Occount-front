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

export const Button = styled.button`
  font-size: 20px; /* Increased font size */
  padding: 15px 20px; /* Increased padding */
  margin: 10px;
  width: 150px; /* Fixed width */
  height: 60px; /* Fixed height */
  background-color: #007bff;
  border: none;
  border-radius: 10px; /* Increased border radius */
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export const ButtonSecondary = styled(Button)`
  background-color: #6c757d;
  &:hover {
    background-color: #5a6268;
  }
`;

export const ModalButton = styled(Button)`
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 20px;
  padding: 10px 20px;
`;
