import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ContextMenu, { Position } from 'devextreme-react/context-menu';
import List from 'devextreme-react/list';
import { useAuth } from '../../contexts/auth';
import './UserPanel.scss';
import type { UserPanelProps } from '../../types';

export const UserPanel = ({ menuMode }: UserPanelProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  function navigateToProfile() {
    navigate('/profile');
  }

  const menuItems = useMemo(
    () => [
      {
        text: 'Profile',
        icon: 'user',
        onClick: navigateToProfile,
      },
      {
        text: 'Logout',
        icon: 'runner',
        onClick: signOut,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [signOut]
  );
  return (
    <div className={'user-panel'}>
      <div className={'user-info'}>
        <div className={'image-container'}>
          <div
            style={{
              background: `url(${user!.avatarUrl}) no-repeat #fff`,
              backgroundSize: 'cover',
            }}
            className={'user-image'}
          />
        </div>
        <div className={'user-name'}>{user!.name}</div>
      </div>

      {menuMode === 'context' && (
        <ContextMenu items={menuItems} target={'.user-button'} showEvent={'dxclick'} width={160} cssClass={'user-menu'}>
          <Position my={'top center'} at={'bottom center'} />
        </ContextMenu>
      )}
      {menuMode === 'list' && <List className={'dx-toolbar-menu-action'} items={menuItems} />}
    </div>
  );
};
