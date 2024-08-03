import * as H from 'common/PageWrapStyle';
import { ReactComponent as AriPayLogo } from 'assets/AriPayLogo.svg';
import { useAuth } from 'context/authContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { isLoggedIn, setIsLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
    logout(false, navigate); // assuming `logout` function in `useAuth` is using `navigate` properly
  };

  return (
    <H.PageHeader>
      <H.HeaderInBox>
        <AriPayLogo
          width={'130px'}
          height={'100px'}
          onClick={handleLogoClick}
        />
        {isLoggedIn ? (
          <H.LogOutBtn onClick={handleLogoutClick}>로그아웃</H.LogOutBtn>
        ) : (
          <H.LogOutBtn onClick={handleLoginClick}>로그인</H.LogOutBtn>
        )}
      </H.HeaderInBox>
    </H.PageHeader>
  );
};

export default Header;
