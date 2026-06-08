import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 80px);
  background-color: #ffffff;
  padding: 0 20px;
  position: relative;
  overflow: hidden;
`;

export const LogoAndForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(20px, 2.5vw, 40px);
  width: 100%;
  max-width: clamp(350px, 39.9vw, 766px);
  max-height: 100%;
  justify-content: center;
  margin-top: -60px;
`;

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  gap: clamp(6px, 0.31vw, 6px);
`;

export const LogoWrapping = styled.div`
  width: clamp(150px, 20.94vw, 402px);
  height: clamp(40px, 4.17vw, 113px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LogoImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const LogoSubText = styled.p`
  color: #111111;
  font-family: 'Pretendard', sans-serif;
  font-size: clamp(14px, 1.25vw, 24px);
  font-weight: 400;
  text-align: center;
  margin: 0;
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: clamp(350px, 36.46vw, 700px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(16px, 1.25vw, 24px);
`;

export const StepTitle = styled.h2`
  color: #111111;
  font-family: 'Pretendard', sans-serif;
  font-size: clamp(24px, 2.08vw, 40px);
  font-weight: 700;
  text-align: center;
  margin: 0;
`;

export const VerificationContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(16px, 1.25vw, 24px);
  max-height: 60vh;
  overflow: visible;
`;

export const VerificationButton = styled.button<{ $isVerifying?: boolean; $isVerified?: boolean }>`
  width: 100%;
  min-width: clamp(280px, 36.46vw, 700px);
  background-color: ${(props) => (props.$isVerifying || props.$isVerified ? '#41434c' : '#41434c')};
  opacity: ${(props) => (props.$isVerifying || props.$isVerified ? 0.6 : 1)};
  color: white;
  border: none;
  border-radius: clamp(6px, 0.42vw, 8px);
  padding: clamp(8px, 0.83vw, 16px) clamp(14px, 1.25vw, 24px);
  font-family: 'Pretendard', sans-serif;
  font-size: clamp(14px, 1.04vw, 20px);
  font-weight: 700;
  cursor: ${(props) => (props.$isVerifying || props.$isVerified ? 'not-allowed' : 'pointer')};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: clamp(10px, 1.04vw, 20px);

  &:hover {
    background-color: ${(props) =>
      props.$isVerifying || props.$isVerified ? '#41434c' : '#363840'};
  }
`;

export const UserInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: clamp(8px, 0.83vw, 16px);
  margin-bottom: clamp(12px, 1.04vw, 20px);
`;

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: clamp(6px, 0.52vw, 10px);
`;

export const InputLabel = styled.label`
  color: #111111;
  font-family: 'Pretendard', sans-serif;
  font-size: clamp(14px, 1.04vw, 18px);
  font-weight: 500;
`;

export const RegisterInput = styled.input`
  width: 100%;
  min-width: clamp(280px, 36.46vw, 700px);
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: clamp(6px, 0.42vw, 8px);
  padding: clamp(8px, 0.83vw, 16px) clamp(14px, 1.25vw, 24px);
  font-family: 'Pretendard', sans-serif;
  font-size: clamp(14px, 1.04vw, 20px);
  font-weight: 400;
  color: #111111;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #F49E15;
  }

  &:disabled {
    background-color: #f8f9fa;
    color: #6c757d;
    cursor: not-allowed;
  }

  &::placeholder {
    color: #adb5bd;
  }
`;

export const ReVerificationButton = styled.button`
  width: 100%;
  min-width: clamp(280px, 36.46vw, 700px);
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: clamp(6px, 0.42vw, 8px);
  padding: clamp(8px, 0.83vw, 16px) clamp(14px, 1.25vw, 24px);
  font-family: 'Pretendard', sans-serif;
  font-size: clamp(14px, 1.04vw, 20px);
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: clamp(10px, 0.83vw, 16px);

  &:hover {
    background-color: #5a6268;
  }

  &:disabled {
    background-color: #e9ecef;
    color: #6c757d;
    cursor: not-allowed;
  }
`;

export const StatusMessage = styled.div`
  color: #28a745;
  font-family: 'Pretendard', sans-serif;
  font-size: clamp(12px, 0.83vw, 16px);
  font-weight: 400;
  text-align: center;
  margin-top: clamp(8px, 0.52vw, 12px);
`;

export const ErrorMessage = styled.div`
  color: #dc2626;
  font-family: 'Pretendard', sans-serif;
  font-size: clamp(12px, 0.83vw, 16px);
  font-weight: 400;
  text-align: center;
  margin-top: clamp(8px, 0.52vw, 12px);
`;

export const NavigationContainer = styled.div`
  width: 100%;
  max-width: clamp(280px, 36.46vw, 700px);
  display: flex;
  gap: clamp(12px, 1.04vw, 20px);
  margin-top: clamp(20px, 1.56vw, 30px);
`;

export const NavigationButton = styled.button<{ $isPrev?: boolean }>`
  flex: 1;
  background-color: ${(props) => (props.$isPrev ? '#e9ecef' : '#41434c')};
  color: ${(props) => (props.$isPrev ? '#111111' : 'white')};
  border: none;
  border-radius: clamp(6px, 0.42vw, 8px);
  padding: clamp(8px, 0.83vw, 16px) clamp(14px, 1.25vw, 24px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Pretendard', sans-serif;
  font-size: clamp(14px, 1.04vw, 20px);
  font-weight: 700;
  line-height: 1;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};

  &:hover {
    background-color: ${(props) => (props.$isPrev ? '#dee2e6' : '#363840')};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;
