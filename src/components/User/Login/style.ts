import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #ffffff;
  padding: 0 20px;
  position: relative;
`;

export const LogoAndForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(30px, 3.13vw, 60px);
`;

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  gap: clamp(6px, 0.31vw, 6px);
`;

export const LogoWraping = styled.div`
  width: clamp(150px, 18.23vw, 350px);
  height: clamp(40px, 4.17vw, 80px);
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
`;

export const LoginWrap = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(40px, 4.17vw, 80px);
  width: 100%;
  max-width: clamp(350px, 39.9vw, 766px);
`;

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: clamp(14px, 1.04vw, 20px);
`;

export const PasswordContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const LoginInput = styled.input`
  width: 100%;
  background: #f3f3f3;
  border: 2px solid #dddddd;
  border-radius: clamp(6px, 0.42vw, 8px);
  padding: clamp(8px, 0.73vw, 14px) clamp(12px, 0.94vw, 18px);
  font-family: 'Pretendard', sans-serif;
  font-size: clamp(13px, 0.83vw, 16px);
  font-weight: 400;
  color: #111111;

  &::placeholder {
    color: #cccccc;
  }

  &:focus {
    outline: none;
    border-color: #f49e15;
  }
`;

export const PasswordInput = styled(LoginInput)`
  padding-right: clamp(35px, 2.6vw, 50px);
`;

export const PasswordToggleButton = styled.button`
  position: absolute;
  right: clamp(8px, 0.73vw, 14px);
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: clamp(16px, 1.25vw, 24px);
  height: clamp(16px, 1.25vw, 24px);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;
  }

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const LoginButton = styled.button`
  width: 100%;
  min-width: clamp(280px, 36.46vw, 700px);
  background-color: #41434c;
  color: white;
  border: none;
  border-radius: clamp(6px, 0.42vw, 8px);
  padding: clamp(8px, 0.83vw, 16px) clamp(14px, 1.25vw, 24px);
  font-family: 'Pretendard', sans-serif;
  font-size: clamp(14px, 1.04vw, 20px);
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  &:hover {
    background-color: #363840;
  }
`;

export const FormContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(20px, 1.56vw, 30px);
`;

export const ActionLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0;
`;

export const ActionButton = styled.button`
  width: auto;
  background: none;
  border: none;
  cursor: pointer;
  color: #f49e15;
  font-family: 'Pretendard', sans-serif;
  font-size: clamp(13px, 0.83vw, 16px);
  font-weight: 400;
  padding: clamp(4px, 0.42vw, 8px);
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

export const Divider = styled.span`
  color: #f49e15;
  font-family: 'Pretendard', sans-serif;
  font-size: clamp(13px, 0.83vw, 16px);
  font-weight: 400;
  padding: clamp(4px, 0.42vw, 8px);
`;


