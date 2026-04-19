import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import UserHeader from 'pages/User/UserPage/UserHeader';
import Footer from 'components/Footer';
import * as P from 'common/PageWrapStyle';

function UserLayout() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' ||
                     location.pathname === '/register' ||
                     location.pathname === '/pwchange' ||
                     location.pathname === '/pwChange' ||
                     location.pathname.startsWith('/pwchange/') ||
                     location.pathname.startsWith('/pwChange/');

  return (
    <P.PageWrap>
      <P.PageContainer>
        <UserHeader />
        <main><Outlet /></main>
        {!isAuthPage && <Footer />}
      </P.PageContainer>
    </P.PageWrap>
  );
}

export default UserLayout;
