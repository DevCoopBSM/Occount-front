import React, { useState, useEffect, useRef } from 'react';
import * as H from './style';
import OccountLogo from 'assets/occount-logo.svg';
import Icon from 'components/Icon';
import { useAuth } from 'contexts/authContext';
import { useNavigate } from 'react-router-dom';

function Header() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogoClick = (): void => {
    navigate('/');
  };

  const handleLoginClick = (): void => {
    navigate('/login');
  };

  const handleLogoutClick = (): void => {
    logout(navigate);
  };

  const handleSettingsClick = (): void => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleUserInfoChangeClick = (): void => {
    navigate('/update');
  };

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
    <H.PageHeader>
      <H.HeaderInBox>
        <H.LogoWrapper onClick={handleLogoClick}>
          <img 
            src={OccountLogo} 
            alt="Occount Logo"
          />
        </H.LogoWrapper>
        
        <H.RightSection>
          <H.MenuButton>
            <Icon name="menu" strokeWidth={1.5} />
            <span>메뉴</span>
          </H.MenuButton>
          
          <H.SettingsContainer ref={dropdownRef}>
            <H.SettingsButton onClick={handleSettingsClick}>
              <Icon name="settings" size={30} />
              <span>설정</span>
            </H.SettingsButton>
            {dropdownVisible && (
              <H.DropdownMenu>
                {isLoggedIn ? (
                  <>
                    <H.DropdownItem onClick={handleUserInfoChangeClick}>회원 정보 변경</H.DropdownItem>
                    <H.DropdownItem onClick={handleLogoutClick}>로그아웃</H.DropdownItem>
                  </>
                ) : (
                  <H.DropdownItem onClick={handleLoginClick}>로그인</H.DropdownItem>
                )}
              </H.DropdownMenu>
            )}
          </H.SettingsContainer>
        </H.RightSection>
      </H.HeaderInBox>
    </H.PageHeader>
  );
}

export default Header;
