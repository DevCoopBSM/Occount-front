import styled from "styled-components";

const TABLET_BREAKPOINT = "768px";
const DESKTOP_BREAKPOINT = "1440px";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background: #ffffff;
  padding: 28px 20px 96px;

  @media (max-width: ${TABLET_BREAKPOINT}) {
    padding: 32px 20px 100px;
  }
`;

export const ContentContainer = styled.div`
  width: 100%;
  max-width: 1920px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0 180px;

  @media (max-width: 1560px) {
    padding: 0 120px;
  }

  @media (max-width: ${DESKTOP_BREAKPOINT}) {
    padding: 0 80px;
  }

  @media (max-width: 1200px) {
    padding: 0 40px;
  }

  @media (max-width: ${TABLET_BREAKPOINT}) {
    padding: 0;
  }
`;

export const StepTitle = styled.h2`
  margin: 0 0 20px;
  font-family: "Pretendard", sans-serif;
  font-size: 32px;
  font-weight: 600;
  line-height: 1.2;
  color: #111111;
  text-align: center;

  @media (max-width: ${TABLET_BREAKPOINT}) {
    font-size: 30px;
    margin-bottom: 18px;
  }
`;

export const FormSections = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const FormLayout = styled.div`
  width: 100%;
  max-width: 920px;
  margin: 0 auto;

  @media (max-width: ${TABLET_BREAKPOINT}) {
    max-width: none;
  }
`;

export const TwoColumnSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 1080px) {
    grid-template-columns: 1fr;
  }
`;

export const SectionCard = styled.section`
  background: #ffffff;
  border: 1px solid rgba(17, 17, 17, 0.08);
  border-radius: 28px;
  padding: 20px 22px;

  @media (max-width: ${TABLET_BREAKPOINT}) {
    padding: 18px 16px;
    border-radius: 20px;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 14px;
`;

export const SectionTitle = styled.h3`
  margin: 0;
  font-family: "Pretendard", sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.3;
  color: #111111;
`;

export const SectionDescription = styled.p`
  margin: 0;
  font-family: "Pretendard", sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.6;
  color: #666666;
`;

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const InputGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0 16px;

  @media (max-width: ${TABLET_BREAKPOINT}) {
    grid-template-columns: 1fr;
    gap: 0;
  }
`;

export const AddressInputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 10px;

  @media (max-width: ${TABLET_BREAKPOINT}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const InputLabel = styled.label`
  font-family: "Pretendard", sans-serif;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.4;
  color: #444444;
  margin-bottom: 6px;
  align-self: flex-start;
`;

export const RegisterInput = styled.input`
  width: 100%;
  min-height: 48px;
  border: 1px solid #e9e9e9;
  padding: 12px 14px;
  border-radius: 14px;
  background: #ffffff;
  color: #111111;
  font-family: "Pretendard", sans-serif;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.4;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #f49e15;
    box-shadow: 0 0 0 4px rgba(244, 158, 21, 0.12);
  }

  &::placeholder {
    color: #9e9e9e;
    font-weight: 400;
  }

  &:disabled,
  &[readonly] {
    background-color: #f8f9fa;
    color: #666666;
    cursor: not-allowed;
    border-color: #ececec;
  }

  @media (max-width: ${TABLET_BREAKPOINT}) {
    min-height: 46px;
    padding: 11px 13px;
    font-size: 15px;
    border-radius: 12px;
  }
`;

const baseButtonStyles = `
  border: none;
  border-radius: 18px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: "Pretendard", sans-serif;
  font-weight: 600;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const VerificationButton = styled.button`
  ${baseButtonStyles}
  min-width: 140px;
  min-height: 48px;
  padding: 0 18px;
  background-color: #fcc800;
  color: #111111;
  font-size: 15px;

  &:hover {
    background-color: #f49e15;
  }

  @media (max-width: ${TABLET_BREAKPOINT}) {
    width: 100%;
    min-height: 46px;
    font-size: 15px;
    border-radius: 12px;
  }
`;

export const PrimaryButton = styled.button`
  ${baseButtonStyles}
  min-width: 200px;
  min-height: 50px;
  padding: 0 24px;
  background-color: #fcc800;
  color: #111111;
  font-size: 17px;
  margin: 0 auto;

  &:hover {
    background-color: #f49e15;
  }

  @media (max-width: ${TABLET_BREAKPOINT}) {
    width: 100%;
    min-width: 0;
    min-height: 48px;
    font-size: 16px;
    border-radius: 12px;
  }
`;

export const ErrorMessage = styled.p`
  color: #d84a4a;
  background: #fff3f3;
  border: 1px solid #ffd7d7;
  border-radius: 14px;
  padding: 10px 14px;
  font-size: 13px;
  margin: 0 0 14px;
  text-align: left;
  width: 100%;
  font-family: "Pretendard", sans-serif;
  line-height: 1.5;
`;

export const SuccessMessage = styled.p<{ isVisible: boolean }>`
  color: #256b32;
  background-color: #eef9f0;
  border: 1px solid #d3ecd7;
  border-radius: 14px;
  padding: 10px 14px;
  margin: 0 0 14px;
  font-size: 13px;
  line-height: 1.5;
  font-family: "Pretendard", sans-serif;
  display: ${props => props.isVisible ? "block" : "none"};
`;

export const AuthContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;

  @media (max-width: ${TABLET_BREAKPOINT}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const InfoMessage = styled.div`
  background-color: #fff8e5;
  border: 1px solid #f6df9b;
  border-radius: 14px;
  padding: 12px 14px;
  margin-bottom: 14px;
  color: #6f5a1a;
  font-size: 13px;
  line-height: 1.6;
  font-family: "Pretendard", sans-serif;
`;

export const SecuritySection = styled.div`
  border: 1px solid rgba(17, 17, 17, 0.08);
  background: #fbfbfb;
  border-radius: 16px;
  padding: 14px;
  margin-bottom: 12px;

  @media (max-width: ${TABLET_BREAKPOINT}) {
    padding: 14px 12px;
    border-radius: 14px;
  }
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
  gap: 10px;
  margin-bottom: 10px;

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: #fcc800;
  }

  label {
    font-family: "Pretendard", sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #333333;
  }
`;

export const InvestmentContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;

  @media (max-width: ${TABLET_BREAKPOINT}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const InvestmentInput = styled(RegisterInput)`
  flex: 1;
  min-width: 0;
`;

export const InvestmentButton = styled.button`
  ${baseButtonStyles}
  min-height: 48px;
  min-width: 176px;
  padding: 0 18px;
  background-color: #69b05a;
  color: white;
  font-size: 16px;
  gap: 8px;

  svg {
    font-size: 20px;
  }

  &:hover {
    background-color: #589a4a;
  }

  @media (max-width: ${TABLET_BREAKPOINT}) {
    width: 100%;
    min-height: 48px;
    min-width: 0;
    font-size: 16px;
    border-radius: 12px;
  }
`;

export const AddressInput = styled(RegisterInput)`
  flex: 1;
  width: auto;
`;

export const AddressSearchButton = styled(VerificationButton)`
  margin-bottom: 0;
`;

export const WarningMessage = styled.p`
  color: #d84a4a;
  font-size: 12px;
  line-height: 1.5;
  margin: 8px 0 0;
  font-family: "Pretendard", sans-serif;
`;
