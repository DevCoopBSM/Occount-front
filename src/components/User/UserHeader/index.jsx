import * as H from './style';
import { ReactComponent as AriPayLogo } from 'assets/OccountLogo.svg';
import { useAuth } from 'context/authContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoutClick = () => {
    logout(false, navigate);
  };

  const handleSettingsClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handlePasswordChangeClick = () => {
    navigate('/pwChange'); // 비밀번호 변경 페이지로 이동
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
          <H.SettingsContainer>
            <H.SettingsButton onClick={handleSettingsClick}>설정</H.SettingsButton>
            {dropdownVisible && (
              <H.DropdownMenu>
                <H.DropdownItem onClick={handleLogoutClick}>로그아웃</H.DropdownItem>
                <H.DropdownItem onClick={handlePasswordChangeClick}>비밀번호 변경</H.DropdownItem>
              </H.DropdownMenu>
            )}
          </H.SettingsContainer>
        ) : (
          <H.LogOutBtn onClick={handleLoginClick}>로그인</H.LogOutBtn>
        )}
      </H.HeaderInBox>
    </H.PageHeader>
  );
};

export default Header;
