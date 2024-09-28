import React from 'react';
import * as H from 'common/PageWrapStyle';
import { ReactComponent as AriPayLogo } from 'assets/AdminMainHeader.svg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'contexts/authContext';
import * as _ from './style';

const getActiveMenu = (menuItems, openItems) => {
  const activeItems = Object.entries(openItems)
    .filter(([_, value]) => value.isOpen)
    .sort((a, b) => b[1].timestamp - a[1].timestamp); // timestamp 내림차순 정렬

  if (activeItems.length > 0) {
    const activeItemName = activeItems[0][0];
    return menuItems.find((item) => item.name === activeItemName);
  }

  return null;
};

const AdminMainHeader = ({
  handleLinkClick,
  menuItems,
  openItems,
  activeLink,
}) => {
  const { isAdminLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const activeMenu = getActiveMenu(menuItems, openItems);
  const goToBarcode = () => {
    navigate('/admin/');
  };

  const handleLogoutClick = () => {
    logout(true, navigate);
  };

  return (
    <_.AdminMainHeader>
      <_.NewHeaderInBox>
        <AriPayLogo width={'200px'} height={'75px'} onClick={goToBarcode} />
        <_.NewHeaderComponents>
          {activeMenu &&
            activeMenu.links.map((link) => (
              <_.HeaderLink
                data-isactive={(activeLink === link.text).toString()}
                key={link.text}
                to={link.to}
                onClick={() => {
                  handleLinkClick(link.text);
                }}
              >
                {link.text}
              </_.HeaderLink>
            ))}
        </_.NewHeaderComponents>

        {isAdminLoggedIn ? (
          <_.NewLogOutBtn onClick={handleLogoutClick}>로그아웃</_.NewLogOutBtn>
        ) : (
          <_.NewLogOutBtn onClick={() => navigate('/admin/login')}>
            로그인
          </_.NewLogOutBtn>
        )}
      </_.NewHeaderInBox>
    </_.AdminMainHeader>
  );
};

export default AdminMainHeader;
