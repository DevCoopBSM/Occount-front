import styled from "styled-components";
import { animated } from 'react-spring';

// 인터페이스 정의
interface ToggleButtonProps {
  active: boolean;
}

interface NavigationButtonProps {
  isPrev?: boolean;
}







export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #FFFFFF;  // 배경색을 흰색으로 변경
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
`;

export const LogoImg = styled.img`
  width: 300px;
  height: auto;
  margin-bottom: 40px;
`;

export const LogoText = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #333;
`;

export const StepTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 40px;
  text-align: center;
  color: #333;
`;

export const ToggleButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 600px;
  margin-bottom: 40px;
`;

export const ToggleButton = styled.button<ToggleButtonProps>`
  width: 32%;
  height: 80px;
  background-color: ${({ active }) => (active ? "#F49E15" : "transparent")};
  color: ${({ active }) => (active ? "white" : "#F49E15")};
  border: 2px solid #F49E15;
  border-radius: 12px;
  font-size: 22px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background-color: ${({ active }) => (active ? "#E08C00" : "#FFF5E6")};
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 600px;
  margin-top: 40px;
`;

export const NavigationButton = styled.button<NavigationButtonProps>`
  width: 48%;
  height: 60px;
  background-color: ${props => props.isPrev ? '#D9D9D9' : '#F49E15'};
  color: ${props => props.isPrev ? '#333' : 'white'};
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.isPrev ? '#C0C0C0' : '#E08C00'};
  }

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  width: 300px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  text-align: center;
`;

export const VerificationButton = styled.button`
  width: 100%;
  max-width: 400px;
  height: 60px;
  background-color: #F49E15;
  color: white;
  border: none;
  border-radius: 30px;
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

  @media (max-width: 768px) {
    height: 50px;
    font-size: clamp(14px, 2.5vw, 20px);
  }
`;

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
  height: 60px;
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

export const AddressInputContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  margin-bottom: 10px;
`;

export const AddressInput = styled(RegisterInput)`
  flex: 1;
`;

export const AddressSearchButton = styled.button`
  width: 120px;
  height: 50px;
  background-color: #F49E15;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background-color: #E08C00;
  }
`;

export const EmailContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 5px;
`;

export const EmailInput = styled(RegisterInput)`
  flex: 1;
  margin-bottom: 0;
`;

export const EmailDomain = styled.span`
  font-size: clamp(16px, 3vw, 24px);
  color: #808080;
  margin-left: 10px;
  font-style: normal;
  font-weight: 400;
`;

export const VerifyButton = styled.button`
  width: 20%;
  height: 60px;
  margin-left: 5px;
  outline: 2px solid var(--Gray, #999);
  background-color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: #808080;
  font-size: clamp(16px, 3vw, 24px);
  font-weight: 400;

  @media (max-width: 768px) {
    height: 50px;
    font-size: clamp(14px, 2.5vw, 20px);
  }
`;

export const AuthButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;
`;

export const AuthStatusButton = styled.button`
  width: 100%;
  height: 50px;
  background-color: white;
  color: #F49E15;
  border: 2px solid #F49E15;
  border-radius: 25px;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
  cursor: default;
`;

export const AuthActionButton = styled.button`
  width: 100%;
  height: 50px;
  background-color: #F49E15;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #E08C00;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const Button = styled.button`
  width: 100%;
  max-width: 400px;
  height: 50px;
  background-color: #D9D9D9;
  color: #333;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 10px;

  &:hover {
    background-color: #C0C0C0;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const PrimaryButton = styled(Button)`
  background-color: #F49E15;
  color: white;

  &:hover {
    background-color: #E08C00;
  }
`;

export const SecondaryButton = styled(Button)`
  background-color: #D9D9D9;
  color: #333;
  border: none;

  &:hover {
    background-color: #C0C0C0;
  }
`;

export const UserInfoContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;
`;

export const UserInfoItem = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
  color: #333;
`;

export const ContentContainer = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AnimatedContainer = styled(animated.div)`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 다른 스타일 컴포넌트들 사이에 추가
export const ErrorMessage = styled.p<{ isVisible: boolean }>`
  color: #f44336;
  font-size: 14px;
  margin-top: 5px;
  display: ${props => props.isVisible ? 'block' : 'none'};
`;

export const PasswordContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const SuccessMessage = styled.p<{ isVisible: boolean }>`
  color: #4CAF50;
  font-size: 14px;
  margin-top: 5px;
  display: ${props => props.isVisible ? 'block' : 'none'};
`;

export const PinContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  margin-bottom: 20px;
`;

export const PinInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const PinInput = styled.input`
  width: 100%;
  height: 50px;
  border: 1px solid #E0E0E0;
  padding: 10px;
  border-radius: 4px;
  background: #F8F8F8;
  color: #333;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  transition: border-color 0.3s ease;
  text-align: center;
  letter-spacing: 5px;

  &:focus {
    outline: none;
    border-color: #F49E15;
    box-shadow: 0 0 0 2px rgba(244, 158, 21, 0.2);
  }

  &::placeholder {
    color: #BDBDBD;
    letter-spacing: normal;
  }
`;

export const Checkbox = styled.input`
  margin-right: 10px;
`;

export const PrivacyAgreementContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
`;

export const PrivacyCheckbox = styled.input`
  margin-right: 10px;
`;

export const PrivacyText = styled.label`
  font-size: 14px;
  color: #333;
`;

export const PrivacyContent = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  font-size: 14px;
  line-height: 1.5;
  color: #333;
  overflow-y: auto;
  max-height: 250px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  h3 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #1a1a1a;
  }

  h4 {
    font-size: 15px;
    font-weight: bold;
    margin-top: 12px;
    margin-bottom: 6px;
    color: #333;
  }

  p {
    margin-bottom: 8px;
  }

  ol, ul {
    margin-left: 20px;
    margin-bottom: 10px;
  }

  li {
    margin-bottom: 5px;
  }

  ul li {
    list-style-type: disc;
  }
`;

export const PrivacyNotice = styled.div`
  margin-top: 15px;
  padding: 10px 15px;
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  font-size: 13px;
  color: #495057;
  line-height: 1.4;
`;
