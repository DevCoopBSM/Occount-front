import styled from 'styled-components';

export const PageHeader = styled.header<{ $isAuthPage?: boolean }>`
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 80px;
  background: #ffffff;
  border-bottom: ${props => props.$isAuthPage ? 'none' : '1px solid #f0f0f0'};
`;

export const HeaderInBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1920px;
  padding: 0 180px;

  @media (max-width: 1560px) {
    padding: 0 80px;
  }

  @media (max-width: 1200px) {
    padding: 0 40px;
  }

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

export const LogoWrapper = styled.div<{ $isAuthPage?: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: -10px;

  img {
    width: ${props => props.$isAuthPage ? '120px' : '180px'};
    height: ${props => props.$isAuthPage ? '24px' : '36px'};
    object-fit: contain;
    transition: all 0.2s ease;
  }

  @media (max-width: 768px) {
    img {
      width: 120px;
      height: 23px;
    }
  }
`;

export const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavItem = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px 0;
  font-family: 'Inter', 'Noto Sans KR', sans-serif;
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
  color: #111827;
  transition: opacity 0.2s;
  white-space: nowrap;

  &:hover {
    opacity: 0.7;
  }
`;

export const SettingsSection = styled.div`
  display: flex;
  align-items: center;
`;

export const LoginButton = styled.button`
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  min-width: 0;
  width: auto;
  font-family: 'Inter', 'Noto Sans KR', sans-serif;
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
  color: #111827;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
`;

export const SettingsContainer = styled.div`
  position: relative;
`;

export const SettingsButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  min-width: 0;
  width: auto;
  font-family: 'Inter', 'Noto Sans KR', sans-serif;
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
  color: #111827;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  min-width: 180px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  z-index: 1000;
`;

export const DropdownItem = styled.button`
  width: 100%;
  padding: 12px 16px;
  text-align: left;
  background-color: #fff;
  border: none;
  cursor: pointer;
  color: #111111;
  font-family: 'Inter', 'Noto Sans KR', sans-serif;
  font-size: 16px;
  font-weight: 400;
  transition: background-color 0.2s;

  &:hover {
    background: #f5f5f5;
  }

  & + & {
    border-top: 1px solid #eeeeee;
  }
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const MenuButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 10px;
  font-family: 'Inter', 'Noto Sans KR', sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: #111111;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

export const LogOutBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 10px;
  font-family: 'Inter', 'Noto Sans KR', sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: #111111;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
`;
