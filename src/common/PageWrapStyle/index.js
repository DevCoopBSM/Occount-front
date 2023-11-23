import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const PageWrap = styled.div`
  width: 100%;
  height: 100vh;
  overflow: auto;
  background-color: #d9d9d9;
`;

export const AdminWrap = styled.div`
  width: 100%;
  height: 100vh;
  overflow: auto;
  background-color: #d9d9d9;
`;

export const AdminMainPageContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  overflow: auto;
  background-color: #d9d9d9;
  overflow-x: hidden;
  z-index: 1001;
`;

export const AdminSubPageContainer = styled.div`
  margin-left: 0;
  margin-right: auto;

  width: 90%;
  height: 100%;
  overflow: auto;
  background-color: #fff;
  overflow-x: hidden;
`;

export const PageContainer = styled.div`
  margin: 0 auto;
  width: 1000px;
  height: 100%;
  overflow: auto;
  background-color: #fff;
  overflow-x: hidden;
`;

export const PageHeader = styled.header`
  display: flex;
  justify-content: space-between;

  width: 100%;
  height: 100px;
`;

export const HeaderInBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 950px;
  height: 100%;

  text-align: ${(props) => (props.testAlign ? props.testAlign : '')};
  font-size: 20px;
  font-weight: 700;
  color: #8a8a8a;

  padding-left: 20px;
  padding-top: ${(props) => (props.paddingTop ? props.paddingTop : '')};
`;

export const InfoContainer = styled.div`
  margin: 0 auto;
  width: 900px;
  height: 100%;
`;

export const InfoHeader = styled.div`
  margin-top: 80px;
  display: flex;
  justify-content: space-between;
  width: 900px;
  height: 55px;
`;

export const LogOutBtn = styled.button`
  margin-top: 30px;
  background-color: #fff;
  color: #333;
  font-weight: 600;
`;

export const NotFoundWrap = styled.p`
  margin-top: 150px;
  text-align: center;
`;

export const NotFoundTitle = styled.h1`
  font-weight: 400;
  color: #fcc800;
`;

export const HomeButton = styled(Link)`
  margin: 0 auto;

  padding-top: 7px;
  display: block;
  text-decoration: none;
  width: 100px;
  height: 40px;
  border-radius: 15px;
  background-color: #f5d410;
  color: #fff;
`;

export const NotFoundContent = styled.p`
  margin: 20px 0 20px 0;
`;

export const LeftBar = styled.div`
  background-color: #34343c;
  width: 253px;
  height: 100%;
  overflow-y: scroll;

  .scroll::-webkit-scrollbar {
    display: none;
  }

  .scroll {
    -ms-overflow-style: none; /* 인터넷 익스플로러 */
    scrollbar-width: none; /* 파이어폭스 */
  }
`;

export const PreWrap = styled.div`
  margin-top: 150px;
  text-align: center;
`;

export const PreTitle = styled.h1`
  font-weight: 400;
  color: #fcc800;
`;

export const PreContent = styled.p`
  margin: 20px 0 20px 0;
`;
