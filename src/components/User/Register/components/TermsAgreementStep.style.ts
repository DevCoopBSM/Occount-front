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
  gap: clamp(20px, 1.56vw, 30px);
`;

export const TermsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const TermsItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 4px 0;
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(8px, 0.73vw, 14px);
  width: 100%;
  cursor: pointer;
`;

export const CheckboxButton = styled.button<{ $isChecked: boolean }>`
  width: clamp(24px, 2.08vw, 40px);
  height: clamp(24px, 2.08vw, 40px);
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
  padding: 0;

  &:hover {
    opacity: 0.8;
  }
`;

export const TermsLabel = styled.span<{ $isMain?: boolean }>`
  color: #111111;
  font-family: 'Pretendard', sans-serif;
  font-size: clamp(16px, 1.25vw, 20px);
  font-weight: ${(props) => (props.$isMain ? '600' : '400')};
`;

export const TermsLabelWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(4px, 0.31vw, 6px);
`;

export const RequiredBadge = styled.span`
  color: #F49E15;
  font-family: 'Pretendard', sans-serif;
  font-size: clamp(16px, 1.25vw, 20px);
  font-weight: 500;
`;

export const ErrorMessage = styled.div`
  color: #dc2626;
  font-family: 'Pretendard', sans-serif;
  font-size: clamp(12px, 0.83vw, 16px);
  font-weight: 400;
  text-align: center;
`;

export const DetailItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  cursor: pointer;
`;

export const DetailContent = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(5px, 0.52vw, 10px);
`;

export const BulletPoint = styled.span`
  color: #000000;
  font-family: 'Inter', sans-serif;
  font-size: clamp(16px, 1.25vw, 20px);
  font-weight: 700;
  line-height: 1.2;
`;

export const DetailText = styled.span`
  color: #000000;
  font-family: 'Inter', sans-serif;
  font-size: clamp(14px, 1.04vw, 18px);
  font-weight: 400;
  line-height: 1.07;
`;

export const DetailButton = styled.button<{ open?: boolean }>`
  width: clamp(22px, 2.29vw, 44px);
  height: clamp(22px, 2.29vw, 44px);
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.7;
  }

  svg {
    transform: ${(props) => (props.open ? 'rotate(180deg)' : 'rotate(0deg)')};
    transition: transform 0.3s ease;
  }
`;

export const DropdownContent = styled.div<{ $isOpen: boolean }>`
  width: 100%;
  max-height: ${(props) => (props.$isOpen ? '200px' : '0')};
  overflow: ${(props) => (props.$isOpen ? 'auto' : 'hidden')};
  transition: max-height 0.3s ease;
  background: #f8f9fa;
  border-radius: 8px;
  margin-top: ${(props) => (props.$isOpen ? '8px' : '0')};

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 2px;
  }
`;

export const DropdownText = styled.div`
  padding: 12px;
  font-family: 'Pretendard', sans-serif;
  font-size: 13px;
  line-height: 1.4;
  color: #333;
  white-space: pre-line;

  strong {
    font-weight: 600;
    color: #000;
    margin-top: 8px;
    margin-bottom: 4px;
    display: block;
  }

  p {
    margin: 4px 0;
  }
`;

export const NextButton = styled.button<{ $isEnabled: boolean }>`
  width: 100%;
  min-width: clamp(280px, 36.46vw, 700px);
  background-color: ${(props) => (props.$isEnabled ? '#41434c' : '#41434c')};
  opacity: ${(props) => (props.$isEnabled ? 1 : 0.6)};
  color: white;
  border: none;
  border-radius: clamp(6px, 0.42vw, 8px);
  padding: clamp(8px, 0.83vw, 16px) clamp(14px, 1.25vw, 24px);
  font-family: 'Pretendard', sans-serif;
  font-size: clamp(14px, 1.04vw, 20px);
  font-weight: 700;
  line-height: 1;
  cursor: ${(props) => (props.$isEnabled ? 'pointer' : 'not-allowed')};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  &:hover {
    background-color: ${(props) => (props.$isEnabled ? '#363840' : '#41434c')};
  }
`;
