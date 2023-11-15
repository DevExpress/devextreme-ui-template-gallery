import React from 'react';
import Toolbar, { Item } from 'devextreme-react/toolbar';
import TextBox from 'devextreme-react/text-box';
import Button from 'devextreme-react/button';

import { Template } from 'devextreme-react/core/template';

import { UserPanel } from '../user-panel/UserPanel';
import { ThemeSwitcher } from '../theme-switcher/ThemeSwitcher';

import type { AppHeaderProps } from '../../../types';

import './AppHeader.scss';

export const AppHeader = ({ menuToggleEnabled, title, toggleMenu, className }: AppHeaderProps) => {
  return (
    <header className={`header-component ${className}`}>
      <Toolbar className='header-toolbar'>
        <Item visible={menuToggleEnabled} location='before' widget='dxButton' cssClass='menu-button'>
          <Button icon='menu' stylingMode='text' onClick={toggleMenu} />
        </Item>
        <Item location='before' cssClass='header-title' text={title} visible={!!title} />
        <Item location='after' locateInMenu='auto' cssClass='global-search-box'>
          <TextBox placeholder='Search' width={180} mode='search' stylingMode='filled' />
        </Item>
        <Item location='after' locateInMenu='never'>
          <ThemeSwitcher />
        </Item>
        <Item location='after'>
          <div className='messages'>
            <Button icon='belloutline' stylingMode='text' />
            <div className='dx-badge'>
              4
            </div>
          </div>
        </Item>
        <Item location='after' locateInMenu='auto' menuItemTemplate='userPanelTemplate'>
          <UserPanel menuMode='context' />
        </Item>
        <Template name='userPanelTemplate'>
          <UserPanel menuMode='list' />
        </Template>
      </Toolbar>
    </header>
  );
};
