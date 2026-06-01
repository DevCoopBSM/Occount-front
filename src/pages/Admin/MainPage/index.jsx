import { useState } from 'react';
import * as P from 'common/PageWrapStyle';
import AdminRouter from 'components/Admin/AdminRouter';
import AdminMainHeader from './AdminMainHeader';
import SideBar from './SideBar';
import MenuItems from './MenuItems';

export default function AdminMainPage() {
  const [openItems, setOpenItems] = useState({});
  const [activeLink, setActiveLink] = useState('');

  const toggleItem = (itemName) => {
    setOpenItems((prev) => ({
      ...prev,
      [itemName]: {
        isOpen: !prev[itemName]?.isOpen,
        timestamp: Date.now(), // 현재 시간을 기록
      },
    }));
  };
  const handleLinkClick = (linkText) => {
    setActiveLink(linkText);
  };

  return (
    <P.AdminWrap>
      <AdminMainHeader
        handleLinkClick={handleLinkClick}
        openItems={openItems}
        activeLink={activeLink}
        menuItems={MenuItems}
      />
      <P.AdminMainPageContainer>
        <SideBar
          handleLinkClick={handleLinkClick}
          openItems={openItems}
          toggleItem={toggleItem}
          activeLink={activeLink}
          menuItems={MenuItems}
        />
        <P.AdminSubPageContainer>
          <AdminRouter />
        </P.AdminSubPageContainer>
      </P.AdminMainPageContainer>
    </P.AdminWrap>
  );
}
