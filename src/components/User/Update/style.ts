import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #FFFFFF;
  width: 100%;
`;

export const ContentContainer = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const StepTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 40px;
  text-align: center;
  color: #333;
`;

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-bottom: 20px;
`;

export const AddressInputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

export const InputLabel = styled.label`
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
  align-self: flex-start;
`;

export const RegisterInput = styled.input`
  width: 100%;
  height: 36px;
  border: 1px solid #E0E0E0;
  padding: 10px;
  border-radius: 4px;
  background: #F2F2F2;
  color: #333;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #F49E15;
    box-shadow: 0 0 0 2px rgba(244, 158, 21, 0.2);
  }

  &::placeholder {
    color: #BDBDBD;
  }

  &:disabled {
    background-color: #E0E0E0;
    color: #9E9E9E;
    cursor: not-allowed;
    border-color: #BDBDBD;
  }
`;

export const VerificationButton = styled.button`
  width: auto;
  height: 36px;
  padding: 0 20px;
  white-space: nowrap;
  background-color: #F49E15;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #E08C00;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const PrimaryButton = styled.button`
  width: auto;
  min-width: 200px;
  padding: 0 20px;
  height: 40px;
  background-color: #F49E15;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0 auto;
  display: block;

  &:hover {
    background-color: #E08C00;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.p`
  color: #f44336;
  font-size: 14px;
  margin-bottom: 20px;
  text-align: center;
  width: 100%;
`;

export const SuccessMessage = styled.p<{ isVisible: boolean }>`
  color: green;
  background-color: #e6ffe6;
  border: 1px solid #b3ffb3;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  display: ${props => props.isVisible ? 'block' : 'none'};
`;

export const AuthContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  margin-bottom: 20px;
`;

export const InfoMessage = styled.div`
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 12px;
  margin-bottom: 20px;
  color: #495057;
  font-size: 14px;
  line-height: 1.5;
`;

export const SecuritySection = styled.div`
  border: 1px solid #E0E0E0;
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 20px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  input[type="checkbox"] {
    margin-right: 10px;
  }

  label {
    font-size: 16px;
    color: #333;
  }
`;

export const InvestmentContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

export const InvestmentInput = styled(RegisterInput)`
  flex: 6;
  min-width: 0;
`;

export const InvestmentButton = styled.button`
  flex: 4;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  transition: all 0.3s ease;
  white-space: nowrap;

  svg {
    font-size: 24px;
  }

  &:hover {
    background-color: #45a049;
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`;

export const AddressInput = styled(RegisterInput)`
  flex: 1;
  margin-right: 10px;
  width: auto;
`;

export const AddressSearchButton = styled(VerificationButton)`
  margin-bottom: 0;
  white-space: nowrap;
`;

export const WarningMessage = styled.p`
  color: #ff6b6b;
  font-size: 14px;
  margin-top: 5px;
  margin-bottom: 10px;
`;