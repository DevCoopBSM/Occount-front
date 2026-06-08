import { Outlet, useLocation } from 'react-router-dom';
import UserHeader from 'pages/User/UserPage/UserHeader';
import Footer from 'components/Footer';
import * as P from 'common/PageWrapStyle';

function UserLayout() {
  const location = useLocation();
  const hideFooterPaths = ['/login', '/register'];
  const shouldHideFooter = hideFooterPaths.includes(location.pathname);

  return (
    <P.PageWrap>
      <P.PageContainer>
        <UserHeader />
        <main>
          <Outlet />
        </main>
        {!shouldHideFooter && <Footer />}
      </P.PageContainer>
    </P.PageWrap>
  );
}

export default UserLayout;
