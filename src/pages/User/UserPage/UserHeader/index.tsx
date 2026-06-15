import { useState, useEffect, useRef } from 'react';
import * as H from './style';
import Icon from 'components/Icon';
import { useAuth } from 'contexts/authContext';
import { useNavigate, useLocation } from 'react-router-dom';

function Header() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState<boolean>(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState<boolean>(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const lastScrollYRef = useRef<number>(0);

  const handleLogoClick = (): void => {
    navigate('/');
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

  const handleNavigation = (path: string): void => {
    setMobileMenuVisible(false);
    navigate(path);
  };

  const isAuthPage =
    location.pathname === '/login' ||
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

      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = (): void => {
      const currentScrollY = window.scrollY;
      const lastScrollY = lastScrollYRef.current;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <H.PageHeader $isAuthPage={isAuthPage} $isVisible={isHeaderVisible}>
      <H.HeaderInBox>
        <H.LogoWrapper $isAuthPage={isAuthPage} onClick={handleLogoClick}>
          <img src="/assets/occount-logo.svg" alt="Occount Logo" />
        </H.LogoWrapper>

        {!isAuthPage && (
          <>
            <H.Navigation>
              <H.NavItem onClick={() => handleNavigation('/item-list')}>상품 목록</H.NavItem>
              <H.NavItem onClick={() => handleNavigation('/userlog')}>결제 내역</H.NavItem>
              <H.NavItem onClick={() => handleNavigation('/notice')}>공지사항</H.NavItem>
            </H.Navigation>

            <H.RightSection>
              <H.MobileMenuContainer ref={mobileMenuRef}>
                <H.MenuButton
                  onClick={() => setMobileMenuVisible((prev) => !prev)}
                  aria-label="모바일 메뉴 열기"
                >
                  <Icon name="menu" size={24} />
                </H.MenuButton>
                {mobileMenuVisible && (
                  <H.MobileMenuPanel>
                    <H.MobileMenuItem onClick={() => handleNavigation('/item-list')}>
                      상품 목록
                    </H.MobileMenuItem>
                    <H.MobileMenuItem onClick={() => handleNavigation('/userlog')}>
                      결제 내역
                    </H.MobileMenuItem>
                    <H.MobileMenuItem onClick={() => handleNavigation('/notice')}>
                      공지사항
                    </H.MobileMenuItem>
                  </H.MobileMenuPanel>
                )}
              </H.MobileMenuContainer>

              <H.SettingsSection>
                {isLoggedIn ? (
                  <H.SettingsContainer ref={dropdownRef}>
                    <H.SettingsButton onClick={handleSettingsClick}>
                      <Icon name="settings" size={20} />
                      <span>설정</span>
                    </H.SettingsButton>
                    {dropdownVisible && (
                      <H.DropdownMenu>
                        <H.DropdownItem onClick={handleUserInfoChangeClick}>
                          회원 정보 변경
                        </H.DropdownItem>
                        <H.DropdownItem onClick={handleLogoutClick}>로그아웃</H.DropdownItem>
                      </H.DropdownMenu>
                    )}
                  </H.SettingsContainer>
                ) : (
                  <H.LoginButton onClick={() => navigate('/login')}>로그인</H.LoginButton>
                )}
              </H.SettingsSection>
            </H.RightSection>
          </>
        )}
      </H.HeaderInBox>
    </H.PageHeader>
  );
}

export default Header;
