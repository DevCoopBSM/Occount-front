import styled from 'styled-components';

export const PageHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  width: 100%;
  background: rgba(238, 238, 238, 0.8);
  backdrop-filter: blur(10px);
`;

export const HeaderInBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1920px;
  padding: 10px 180px;
  
  @media (max-width: 1560px) {
    padding: 10px 80px;
  }
  
  @media (max-width: 1200px) {
    padding: 10px 40px;
  }
  
  @media (max-width: 768px) {
    padding: 10px 20px;
  }
`;

export const LogoWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  
  img {
    width: 200px;
    height: 46px;
    object-fit: contain;
  }
  
  @media (max-width: 768px) {
    img {
      width: 150px;
      height: 35px;
    }
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
  font-family: 'Pretendard', sans-serif;
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

export const SettingsContainer = styled.div`
  position: relative;
`;

export const SettingsButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 10px;
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: #111111;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.7;
  }
  
  svg {
    width: 30px;
    height: 30px;
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
  font-family: 'Pretendard', sans-serif;
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

export const LogOutBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 10px;
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: #111111;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.7;
  }
`;
