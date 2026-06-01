import React from 'react';
import * as _ from './style';
import * as P from 'common/PageWrapStyle';
import MenuItems from '../MenuItems'; // MenuItems 파일 경로를 확인하세요

const SideBar = ({ openItems, toggleItem, activeLink, handleLinkClick }) => {
  return (
    <P.LeftBar>
      {MenuItems.map((item) => (
        <React.Fragment key={item.name}>
          <_.SidebarItem onClick={() => toggleItem(item.name)}>{item.name}</_.SidebarItem>
          <_.SubItems isOpen={openItems[item.name]?.isOpen}>
            {item.links.map((link) => (
              <_.SidebarItemLink
                key={link.text}
                to={link.to}
                data-isactive={(activeLink === link.text).toString()}
                onClick={() => handleLinkClick(link.text)}
              >
                {link.text}
              </_.SidebarItemLink>
            ))}
          </_.SubItems>
        </React.Fragment>
      ))}
    </P.LeftBar>
  );
};

export default SideBar;
