import styled from 'styled-components';
import { Link } from 'react-router-dom';

// New AdminHeader
export const AdminMainHeader = styled.div`
  background-color: #34343c;
  width: 100%;
  height: 50px;
`;

export const NewHeaderInBox = styled.div`
  display: flex;
  justify-content: left;
  width: 100%;
  height: 100%;

  text-align: ${(props) => (props.textAlign ? props.testAlign : 'left')};
  font-size: 10px;
  font-weight: 700;
  color: #8a8a8a;

  padding-left: 20px;
  padding-top: ${(props) => (props.paddingTop ? props.paddingTop : '0')};
`;

export const NewHeaderComponents = styled.div`
  display: flex;
  justify-content: left;
  width: 80%;
  height: 100%;

  text-align: ${(props) => (props.textAlign ? props.testAlign : 'left')};
  font-size: 10px;
  font-weight: 700;
  color: #8a8a8a;

  padding-left: 20px;
  padding-top: ${(props) => (props.paddingTop ? props.paddingTop : '0')};
`;

export const NewLogOutBtn = styled.button`
  background-color: #34343c;
  color: #fff;
  font-weight: 500;
  font-size: 17px;
  margin-right: 20px;
`;

export const LogoButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
`;

export const ListBtn = styled.button`
  margin-left: 77px;
  width: 100px;
  height: 50px;
  background-color: #51515e;
  font-size: 17px;
  color: #fff;
  text-align: center;
`;

export const ListBtn2 = styled.button`
  width: 100px;
  height: 50px;
  background-color: #51515e;
  font-size: 17px;
  color: #fff;
  text-align: center;
  border-radius: 0px;
`;

export const HeaderLink = styled(Link)`
  margin-right: 3px;
  width: 120px;
  height: 50px;
  background-color: ${(props) =>
    props['data-isactive'] === 'true' ? '#F7BD4C' : '#51515e'}; // 노란색으로 변경
  font-size: 15px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none; /* 링크 밑줄 제거 */
  border-radius: 0px;
`;
