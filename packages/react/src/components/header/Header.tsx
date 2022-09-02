import React from 'react';
import Toolbar, { Item } from 'devextreme-react/toolbar';
import TextBox from 'devextreme-react/text-box';
import Button from 'devextreme-react/button';
import { UserPanel } from '../user-panel/UserPanel';
import './Header.scss';
import { Template } from 'devextreme-react/core/template';
import type { HeaderProps } from '../../types';

export const Header = ({ menuToggleEnabled, title, toggleMenu, className }: HeaderProps) => {
  return (
    <header className={`header-component ${className}`}>
      <Toolbar className={'header-toolbar'}>
        <Item visible={menuToggleEnabled} location={'before'} widget={'dxButton'} cssClass={'menu-button'}>
          <Button icon='menu' stylingMode='text' onClick={toggleMenu} />
        </Item>
        <Item location={'before'} cssClass={'header-title'} text={title} visible={!!title} />
        <Item location={'after'} locateInMenu={'auto'}>
          <TextBox placeholder={'Search'} width={180} mode={'search'} stylingMode={'outlined'}></TextBox>
        </Item>
        <Item location={'after'} locateInMenu={'auto'} menuItemTemplate={'userPanelTemplate'}>
          <Button className={'user-button authorization'} width={160} height={'100%'} stylingMode={'text'}>
            <UserPanel menuMode={'context'} />
          </Button>
        </Item>
        <Template name={'userPanelTemplate'}>
          <UserPanel menuMode={'list'} />
        </Template>
      </Toolbar>
    </header>
  );
};
