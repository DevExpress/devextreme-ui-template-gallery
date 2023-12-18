
import React, { useState, useCallback } from 'react';

import Drawer from 'devextreme-react/drawer';
import { Template } from 'devextreme-react/core/template';
import { ButtonTypes } from 'devextreme-react/button';
import { TreeViewTypes } from 'devextreme-react/tree-view';

import { useNavigate } from 'react-router';

import { AppHeader, SideNavigationMenu, AppFooter } from '../../components';
import { useScreenSize } from '../../utils/media-query';
import { useMenuPatch } from '../../utils/patches';

import type { SideNavToolbarProps } from '../../types';

import './side-nav-outer-toolbar.scss';
import { SideNavigationItem } from '../../components/library/side-navigation-menu/SideNavigationMenu';

export const SideNavOuterToolbar = ({ title, children }: React.PropsWithChildren<SideNavToolbarProps>) => {
  const navigate = useNavigate();
  const { isXSmall, isLarge } = useScreenSize();
  const [patchCssClass, onMenuReady] = useMenuPatch();
  const [menuStatus, setMenuStatus] = useState(isLarge ? MenuStatus.Opened : MenuStatus.Closed);

  const toggleMenu = useCallback(({ event }: ButtonTypes.ClickEvent) => {
    setMenuStatus((prevMenuStatus) => (prevMenuStatus === MenuStatus.Closed ? MenuStatus.Opened : MenuStatus.Closed));
    event?.stopPropagation();
  }, []);

  const temporaryOpenMenu = useCallback(() => {
    setMenuStatus((prevMenuStatus) => (prevMenuStatus === MenuStatus.Closed ? MenuStatus.TemporaryOpened : prevMenuStatus));
  }, []);

  const onOutsideClick = useCallback(() => {
    setMenuStatus((prevMenuStatus) => (prevMenuStatus !== MenuStatus.Closed && !isLarge ? MenuStatus.Closed : prevMenuStatus));
    return !isLarge;
  }, [isLarge]);

  const onNavigationChanged = useCallback(
    ({ itemData: { path }, event, node }: TreeViewTypes.ItemClickEvent & { itemData: SideNavigationItem }) => {
      if (menuStatus === MenuStatus.Closed || !path || node?.selected) {
        event?.preventDefault();
        return;
      }

      navigate(path);
      if (!isLarge || menuStatus === MenuStatus.TemporaryOpened) {
        setMenuStatus(MenuStatus.Closed);
        event?.stopPropagation();
      }
    },
    [navigate, menuStatus, isLarge]
  ) as (e: TreeViewTypes.ItemClickEvent) => void;

  return (
    <div className='side-nav-outer-toolbar'>
      <AppHeader className='layout-header' menuToggleEnabled toggleMenu={toggleMenu} title={title} />
      <Drawer
        className={['drawer layout-body', patchCssClass].join(' ')}
        position='before'
        closeOnOutsideClick={onOutsideClick}
        openedStateMode={isLarge ? 'shrink' : 'overlap'}
        revealMode={isXSmall ? 'slide' : 'expand'}
        minSize={isXSmall ? 0 : 48}
        maxSize={250}
        shading={isLarge ? false : true}
        opened={menuStatus === MenuStatus.Closed ? false : true}
        template='menu'
      >
        <div className='content'>
          {React.Children.map(children, (item) => {
            return React.isValidElement(item) && item.type !== AppFooter && item;
          })}
        </div>
        <Template name='menu'>
          <SideNavigationMenu compactMode={menuStatus === MenuStatus.Closed} selectedItemChanged={onNavigationChanged} openMenu={temporaryOpenMenu} onMenuReady={onMenuReady} />
        </Template>
      </Drawer>
    </div>
  );
};

const MenuStatus = {
  Closed: 1,
  Opened: 2,
  TemporaryOpened: 3,
};
