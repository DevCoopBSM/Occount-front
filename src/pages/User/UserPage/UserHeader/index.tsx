import React, { useState, useEffect, useRef } from 'react';
import * as H from './style';
import OccountLogo from 'assets/occount-logo.svg';
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 6.75H21M3 12H21M3 17.25H21" stroke="#111111" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>메뉴</span>
          </H.MenuButton>
          
          <H.SettingsContainer ref={dropdownRef}>
            <H.SettingsButton onClick={handleSettingsClick}>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                <g clipPath="url(#clip0_1623_1486)">
                  <mask id="mask0_1623_1486" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="30" height="30">
                    <path d="M30 0H0V30H30V0Z" fill="white"/>
                  </mask>
                  <g mask="url(#mask0_1623_1486)">
                    <path d="M15.3076 5L24.3757 10.25V20.75L15.3076 26L6.23938 20.75V10.25L15.3076 5ZM15.3076 7.20595L8.14847 11.3506V19.6494L15.3076 23.794L22.4667 19.6494V11.3506L15.3076 7.20595ZM15.3076 19.3182C14.2949 19.3182 13.3237 18.9159 12.6077 18.1998C11.8917 17.4838 11.4894 16.5127 11.4894 15.5C11.4894 14.4873 11.8917 13.5162 12.6077 12.8001C13.3237 12.0841 14.2949 11.6818 15.3076 11.6818C16.3202 11.6818 17.2914 12.0841 18.0074 12.8001C18.7235 13.5162 19.1257 14.4873 19.1257 15.5C19.1257 16.5127 18.7235 17.4838 18.0074 18.1998C17.2914 18.9159 16.3202 19.3182 15.3076 19.3182ZM15.3076 17.4091C15.8139 17.4091 16.2994 17.208 16.6575 16.8499C17.0155 16.4919 17.2167 16.0063 17.2167 15.5C17.2167 14.9937 17.0155 14.5081 16.6575 14.1501C16.2994 13.792 15.8139 13.5909 15.3076 13.5909C14.8013 13.5909 14.3157 13.792 13.9576 14.1501C13.5996 14.5081 13.3985 14.9937 13.3985 15.5C13.3985 16.0063 13.5996 16.4919 13.9576 16.8499C14.3157 17.208 14.8013 17.4091 15.3076 17.4091Z" fill="#111111"/>
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_1623_1486">
                    <rect width="30" height="30" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
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
};

export default Header;
