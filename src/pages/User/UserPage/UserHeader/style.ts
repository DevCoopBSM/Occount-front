// style.js 파일에서
import styled, { css } from 'styled-components';
export const PageHeader = styled.header`
  display: flex;
  justify-content: center; /* 수평 중앙 정렬 */
  width: 100%; 
  height: 100px;
`;

export const HeaderInBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1000px; /* 고정된 1000px 크기 */
  height: 100%;
  font-size: 20px;
  font-weight: 700;
  color: #8a8a8a;
  padding-left: 20px;
  padding-right: 20px;
`;

export const LogoWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 100%;
`;

export const LogOutBtn = styled.button`
  margin-top: 30px;
  background-color: #fff;
  color: #333;
  font-weight: 600;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
`;

export const SettingsContainer = styled.div`
  position: relative;
  margin-top: 30px;
  background: var(--White, #FFF);
`;

export const SettingsButton = styled.button`
  background-color: #fff;
  color: #333;
  font-weight: 600;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  width: 150px;
  background-color: #fff;
  z-index: 1;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

export const DropdownItem = styled.button`
  width: 100%;
  padding: 10px;
  text-align: left;
  background-color: #fff;
  border: none;
  cursor: pointer;
  color: #000;
  font-size: 12px;
  font-weight: 700;

  &:hover {
    background: #f0f0f0;
  }
`;
