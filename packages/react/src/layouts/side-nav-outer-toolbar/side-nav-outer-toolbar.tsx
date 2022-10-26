
import React, { useState, useCallback, useRef } from 'react';

import Drawer from 'devextreme-react/drawer';
import ScrollView from 'devextreme-react/scroll-view';
import { Template } from 'devextreme-react/core/template';

import { useNavigate } from 'react-router';

import { Header, SideNavigationMenu, Footer } from '../../components';
import { useScreenSize } from '../../utils/media-query';
import { useMenuPatch } from '../../utils/patches';

import type { SideNavToolbarProps } from '../../types';

import './side-nav-outer-toolbar.scss';

export const SideNavOuterToolbar = ({ title, children }: React.PropsWithChildren<SideNavToolbarProps>) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const navigate = useNavigate();
  const { isXSmall, isLarge } = useScreenSize();
  const [patchCssClass, onMenuReady] = useMenuPatch();
  const [menuStatus, setMenuStatus] = useState(isLarge ? MenuStatus.Opened : MenuStatus.Closed);

  const toggleMenu = useCallback(({ event }) => {
    setMenuStatus((prevMenuStatus) => (prevMenuStatus === MenuStatus.Closed ? MenuStatus.Opened : MenuStatus.Closed));
    event.stopPropagation();
  }, []);

  const temporaryOpenMenu = useCallback(() => {
    setMenuStatus((prevMenuStatus) => (prevMenuStatus === MenuStatus.Closed ? MenuStatus.TemporaryOpened : prevMenuStatus));
  }, []);

  const onOutsideClick = useCallback(() => {
    setMenuStatus((prevMenuStatus) => (prevMenuStatus !== MenuStatus.Closed && !isLarge ? MenuStatus.Closed : prevMenuStatus));
    return true;
  }, [isLarge]);

  const onNavigationChanged = useCallback(
    ({ itemData: { path }, event, node }) => {
      if (menuStatus === MenuStatus.Closed || !path || node.selected) {
        event.preventDefault();
        return;
      }

      navigate(path);
      scrollViewRef.current?.instance.scrollTo(0);

      if (!isLarge || menuStatus === MenuStatus.TemporaryOpened) {
        setMenuStatus(MenuStatus.Closed);
        event.stopPropagation();
      }
    },
    [navigate, menuStatus, isLarge]
  );

  return (
    <div className='side-nav-outer-toolbar'>
      <Header className='layout-header' menuToggleEnabled toggleMenu={toggleMenu} title={title} />
      <Drawer
        className={['drawer', patchCssClass].join(' ')}
        position='before'
        closeOnOutsideClick={onOutsideClick}
        openedStateMode={isLarge ? 'shrink' : 'overlap'}
        revealMode={isXSmall ? 'slide' : 'expand'}
        minSize={isXSmall ? 0 : 60}
        maxSize={250}
        shading={isLarge ? false : true}
        opened={menuStatus === MenuStatus.Closed ? false : true}
        template='menu'
      >
        <div className='container'>
          <ScrollView ref={scrollViewRef} className='layout-body with-footer'>
            <div className='content'>
              {React.Children.map(children, (item: any) => {
                return item.type !== Footer && item;
              })}
            </div>
            <div className='content-block'>
              {React.Children.map(children, (item: any) => {
                return item.type === Footer && item;
              })}
            </div>
          </ScrollView>
        </div>
        <Template name='menu'>
          <SideNavigationMenu compactMode={menuStatus === MenuStatus.Closed} selectedItemChanged={onNavigationChanged} openMenu={temporaryOpenMenu} onMenuReady={onMenuReady}></SideNavigationMenu>
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
