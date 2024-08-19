import * as H from 'common/PageWrapStyle';
import { ReactComponent as AriPayLogo } from 'assets/AriPayLogo.svg';
import { useAuth } from 'context/authContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { isLoggedIn, logout } = useAuth(); // setIsLoggedIn 제거
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoutClick = () => {
    logout(false, navigate); // `logout` 함수만 호출하여 상태를 처리
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
