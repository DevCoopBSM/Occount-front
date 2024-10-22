import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #FFFFFF;
  width: 100%; // 추가: 전체 너비를 사용하도록 설정
`;

export const ContentContainer = styled.div`
  width: 100%;
  max-width: 600px; // 최대 너비를 600px로 유지
  display: flex;
  flex-direction: column;
  align-items: stretch; // 변경: center에서 stretch로 변경하여 자식 요소들이 전체 너비를 사용하도록 함
`;

export const StepTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 40px;
  text-align: center;
  color: #333;
`;

export const UserInfoContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
`;

export const UserInfoItem = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
  color: #333;
`;

export const InputContainer = styled.div`
  width: 100%; // 이미 100%로 설정되어 있지만, 확실히 하기 위해 유지
  display: flex;
  flex-direction: column;
  align-items: stretch; // 변경: flex-start에서 stretch로 변경
  margin-bottom: 20px;
`;

export const InputLabel = styled.label`
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
  align-self: flex-start;
`;

export const RegisterInput = styled.input`
  width: 100%; // 이미 100%로 설정되어 있지만, 확실히 하기 위해 유지
  height: 36px; // 변경: 세로 길이를 60%로 줄임
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
  white-space: nowrap;  // 텍스트가 줄바꿈되지 않도록
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
  margin: 0 auto; // 가운데 정렬을 위해 추가
  display: block; // 가운데 정렬을 위해 변경

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
  color: #4CAF50;
  font-size: 14px;
  margin-top: 5px;
  display: ${props => props.isVisible ? 'block' : 'none'};
`;

export const AuthContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  margin-bottom: 20px;  // 하단 여백 추가
`;

export const InfoMessage = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
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

export const SecondaryButton = styled.button`
  width: auto;
  min-width: 200px;
  padding: 0 20px;
  height: 40px;
  background-color: #4CAF50;  // 다른 색상 사용
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
    background-color: #45a049;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const InvestmentContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%; // 전체 너비를 사용
`;

export const InvestmentInput = styled(RegisterInput)`
  flex: 6; // 6의 비율로 공간 차지
  min-width: 0; // flex item의 너비가 내용에 따라 줄어들지 않도록 설정
`;

export const InvestmentButton = styled.button`
  flex: 4; // 4의 비율로 공간 차지
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
  white-space: nowrap; // 텍스트가 줄바꿈되지 않도록 설정

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

export const VerifyButton = styled(PrimaryButton)`
  width: auto;
  min-width: 100px;
  height: 36px;
  font-size: 16px;
  margin: 0;
`;

// InvestmentModal 관련 스타일
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
`;

export const ModalTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;

export const ModalInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const ModalInput = styled.input`
  width: 60%;
  height: 36px;
  padding: 5px 10px;
  font-size: 18px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const ModalButton = styled.button`
  width: 40px;
  height: 36px;
  background-color: #F49E15;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    background-color: #E08C00;
  }
`;

export const ModalActionButton = styled(PrimaryButton)`
  width: 100%;
  margin-top: 20px;
`;
