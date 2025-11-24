import React, { ReactNode } from 'react';
import UserHeader from 'pages/User/UserPage/UserHeader';
import Footer from 'components/Footer';
import * as P from 'common/PageWrapStyle';

interface UserLayoutProps {
  children: ReactNode;
}

function UserLayout({ children }: UserLayoutProps) {
  return (
    <P.PageWrap>
      <P.PageContainer>
        <UserHeader />
        <main>{children}</main>
        <Footer />
      </P.PageContainer>
    </P.PageWrap>
  );
}

export default UserLayout;
