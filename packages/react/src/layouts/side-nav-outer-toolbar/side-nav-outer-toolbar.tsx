
import React, { useState, useCallback, useEffect } from 'react';

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

enum MenuOpenState {
  Closed = 1,
  Opened = 2,
  TemporaryOpened = 3,
}

type MenuStatus = MenuOpenState | null;

export const SideNavOuterToolbar = ({ title, children }: React.PropsWithChildren<SideNavToolbarProps>) => {
  const navigate = useNavigate();
  const { isXSmall, isLarge } = useScreenSize();
  const [patchCssClass, onMenuReady] = useMenuPatch();
  const [menuStatus, setMenuStatus] = useState<MenuStatus>(null);

  const getDefaultMenuOpenState = useCallback(() => isLarge ? MenuOpenState.Opened : MenuOpenState.Closed, [isLarge]);
  const getMenuOpenState = useCallback((status: MenuStatus) => {
    if (status === null) {
      return getDefaultMenuOpenState();
    }

    return status;
  }, [getDefaultMenuOpenState]);

  const getMenuStatus = useCallback((status: MenuStatus) => {
    return status === getDefaultMenuOpenState() ? null : status;
  }, [getDefaultMenuOpenState]);

  const changeMenuStatus = useCallback((reducerFn: (prevStatus: MenuStatus) => MenuStatus) => {
    setMenuStatus(prevMenuStatus => getMenuStatus(reducerFn(getMenuOpenState(prevMenuStatus)) ?? prevMenuStatus));
  }, [getMenuOpenState, getMenuStatus]);

  const toggleMenu = useCallback(({ event }: ButtonTypes.ClickEvent) => {
    changeMenuStatus(prevStatus => prevStatus === MenuOpenState.Closed ? MenuOpenState.Opened : MenuOpenState.Closed);
    event?.stopPropagation();
  }, [changeMenuStatus]);

  const temporaryOpenMenu = useCallback(() => {
    changeMenuStatus(prevStatus => prevStatus === MenuOpenState.Closed ? MenuOpenState.TemporaryOpened : null);
  }, [changeMenuStatus]);

  const onOutsideClick = useCallback(() => {
    changeMenuStatus(prevStatus => prevStatus !== MenuOpenState.Closed && !isLarge ? MenuOpenState.Closed : null);
    return !isLarge;
  }, [isLarge, changeMenuStatus]);

  const onNavigationChanged = useCallback(
    ({ itemData: { path }, event, node }: TreeViewTypes.ItemClickEvent & { itemData: SideNavigationItem }) => {
      if (getMenuOpenState(menuStatus) === MenuOpenState.Closed || !path || node?.selected) {
        event?.preventDefault();
        return;
      }

      navigate(path);
      if (!isLarge || menuStatus === MenuOpenState.TemporaryOpened) {
        setMenuStatus(getMenuStatus(MenuOpenState.Closed));
        event?.stopPropagation();
      }
    },
    [navigate, menuStatus, isLarge]
  ) as (e: TreeViewTypes.ItemClickEvent) => void;

  useEffect(() => {
    changeMenuStatus(() => menuStatus);
  }, [isLarge]);

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
        opened={getMenuOpenState(menuStatus) === MenuOpenState.Closed ? false : true}
        template='menu'
      >
        <div className='content'>
          {React.Children.map(children, (item) => {
            return React.isValidElement(item) && item.type !== AppFooter && item;
          })}
        </div>
        <Template name='menu'>
          <SideNavigationMenu
            compactMode={getMenuOpenState(menuStatus) === MenuOpenState.Closed}
            selectedItemChanged={onNavigationChanged}
            openMenu={temporaryOpenMenu}
            onMenuReady={onMenuReady}
          />
        </Template>
      </Drawer>
    </div>
  );
};
