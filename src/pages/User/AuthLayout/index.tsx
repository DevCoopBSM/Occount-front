import { Outlet } from 'react-router-dom';
import UserHeader from 'pages/User/UserPage/UserHeader';
import * as P from 'common/PageWrapStyle';

function AuthLayout() {
  return (
    <P.PageWrap>
      <P.PageContainer>
        <UserHeader />
        <main>
          <Outlet />
        </main>
      </P.PageContainer>
    </P.PageWrap>
  );
}

export default AuthLayout;
