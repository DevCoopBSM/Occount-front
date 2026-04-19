import React, { useState, useEffect, useRef } from 'react';
import * as H from './style';
import OccountLogo from 'assets/occount-logo.svg';
import Icon from 'components/Icon';
import { useAuth } from 'contexts/authContext';
import { useNavigate, useLocation } from 'react-router-dom';

function Header() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogoClick = (): void => {
    navigate('/');
  };

  const handleLogoutClick = (): void => {
    logout(navigate);
  };

  const handleSettingsClick = (): void => {
    if (isLoggedIn) {
      setDropdownVisible(!dropdownVisible);
    } else {
      navigate('/login');
    }
  };

  const handleUserInfoChangeClick = (): void => {
    navigate('/update');
  };

  const handleNavigation = (path: string): void => {
    navigate(path);
  };

  const isAuthPage = location.pathname === '/login' ||
                     location.pathname === '/register' ||
                     location.pathname === '/pwchange' ||
                     location.pathname === '/pwChange' ||
                     location.pathname.startsWith('/pwchange/') ||
                     location.pathname.startsWith('/pwChange/');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <H.PageHeader $isAuthPage={isAuthPage}>
      <H.HeaderInBox>
        <H.LogoWrapper $isAuthPage={isAuthPage} onClick={handleLogoClick}>
          <img
            src={OccountLogo}
            alt="Occount Logo"
          />
        </H.LogoWrapper>

        {!isAuthPage && (
          <>
            <H.Navigation>
              <H.NavItem onClick={() => handleNavigation('/')}>포인트 충전</H.NavItem>
              <H.NavItem onClick={() => handleNavigation('/userlog')}>결제 내역</H.NavItem>
              <H.NavItem onClick={() => handleNavigation('/item-list')}>상품 목록</H.NavItem>
              <H.NavItem onClick={() => handleNavigation('/contact')}>문의 및 건의</H.NavItem>
            </H.Navigation>

            <H.SettingsSection>
              {isLoggedIn ? (
                <H.SettingsContainer ref={dropdownRef}>
                  <H.SettingsButton onClick={handleSettingsClick}>
                    <Icon name="settings" size={20} />
                    <span>설정</span>
                  </H.SettingsButton>
                  {dropdownVisible && (
                    <H.DropdownMenu>
                      <H.DropdownItem onClick={handleUserInfoChangeClick}>회원 정보 변경</H.DropdownItem>
                      <H.DropdownItem onClick={handleLogoutClick}>로그아웃</H.DropdownItem>
                    </H.DropdownMenu>
                  )}
                </H.SettingsContainer>
              ) : (
                <H.LoginButton onClick={() => navigate('/login')}>
                  로그인
                </H.LoginButton>
              )}
            </H.SettingsSection>
          </>
        )}
      </H.HeaderInBox>
    </H.PageHeader>
  );
}

export default Header;
