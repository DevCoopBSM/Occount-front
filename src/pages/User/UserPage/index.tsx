import React from 'react';
import { Outlet } from 'react-router-dom';
import UserHeader from 'pages/User/UserPage/UserHeader';
import Footer from 'components/Footer';
import * as P from 'common/PageWrapStyle';

function UserLayout() {
  return (
    <P.PageWrap>
      <P.PageContainer>
        <UserHeader />
        <main><Outlet /></main>
        <Footer />
      </P.PageContainer>
    </P.PageWrap>
  );
}

export default UserLayout;
