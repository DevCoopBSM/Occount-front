import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const SidebarItem = styled.div`
  display: block;
  padding: 10px 15px;
  color: #fff;
  font-weight: 600;
  font-size: 20px;
  cursor: pointer;
  background-color: #51515e; // 호버 스타일
`;
export const SubItems = styled.div`
  display: block;
  color: #fff;
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
`;

export const SidebarItemLink = styled(Link)`
  /* 링크 스타일 */
  display: block;
  color: #fff;
  padding: 10px 15px;
  text-decoration: none;
  font-weight: 450;
  font-size: 20px;
  /* 클릭된 항목의 스타일 */
  background-color: ${(props) =>
    props['data-isactive'] === 'true' ? '#F7BD4C' : 'transparent'}; // 노란색으로 변경

  &:hover {
    background-color: #666; // 호버 스타일
  }
`;
