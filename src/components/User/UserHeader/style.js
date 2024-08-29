// style.js 파일에서
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const PageHeader = styled.header`
  display: flex;
  justify-content: center; /* 수평 중앙 정렬 */
  width: 100%; 
  height: 100px;
`;

export const HeaderInBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1000px; /* 고정된 1000px 크기 */
  height: 100%;

  text-align: ${(props) => (props.testAlign ? props.testAlign : '')};
  font-size: 20px;
  font-weight: 700;
  color: #8a8a8a;

  padding-left: 20px;
  padding-top: ${(props) => (props.paddingTop ? props.paddingTop : '')};
`;

export const LogOutBtn = styled.button`
  margin-top: 30px;
  background-color: #fff;
  color: #333;
  font-weight: 600;
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
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  width: 150px;
  background-color: #fff;
  z-index: 1;
`;

export const DropdownItem = styled.button`
  width: 100%;
  padding: 10px;
  text-align: left;
  background-color: #fff;
  border: none;
  border-radius: 0px;
  cursor: pointer;
  border: 1px solid #999;
  color: #000;
  font-size: 12px;
  font-weight: 700;

  &:hover {
    border: 1px solid #999;
    background: #CCC;
  }
`;
