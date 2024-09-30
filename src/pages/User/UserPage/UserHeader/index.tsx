import React, { useState, useEffect, useRef } from 'react';
import * as H from './style';
import AriPayLogo from 'assets/OccountLogo.svg';
import { useAuth } from 'contexts/authContext';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
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

  const handlePasswordChangeClick = (): void => {
    navigate('/pwChange');
  };

  const handleUserInfoChangeClick = (): void => {
    navigate('/userInfoChange');
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
            src={AriPayLogo} 
            alt="AriPay Logo" 
            width="130px" 
            height="100px"
          />
        </H.LogoWrapper>
        {isLoggedIn ? (
          <H.SettingsContainer ref={dropdownRef}>
            <H.SettingsButton onClick={handleSettingsClick}>설정</H.SettingsButton>
            {dropdownVisible && (
              <H.DropdownMenu>
                <H.DropdownItem onClick={handleLogoutClick}>로그아웃</H.DropdownItem>
                <H.DropdownItem onClick={handlePasswordChangeClick}>비밀번호 변경</H.DropdownItem>
                <H.DropdownItem onClick={handleUserInfoChangeClick}>회원 정보 변경</H.DropdownItem>
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
