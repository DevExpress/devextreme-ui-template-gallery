import React, { useMemo } from 'react';

import List from 'devextreme-react/list';
import DropDownButton from 'devextreme-react/drop-down-button';

import { useAuth } from '../../contexts/auth';

import type { UserPanelProps } from '../../types';

import './UserPanel.scss';

export const UserPanel = ({ menuMode }: UserPanelProps) => {
  const { user, signOut } = useAuth();

  const menuItems = useMemo(
    () => [
      {
        text: 'Logout',
        icon: 'runner',
        onClick: signOut,
      },
    ],
    [signOut]
  );
  return (
    <div className='user-panel'>
      {menuMode === 'context' && (
        <DropDownButton items={menuItems} stylingMode='text'
          width={150} icon={user?.avatarUrl}
          text={user?.name} showArrowIcon={false} />
      )}
      {menuMode === 'list' && (
        <div>
          <div className='user-info'>
            <div className='image-container'>
              <div
                style={{
                  background: `url(${user?.avatarUrl}) no-repeat #fff`,
                  backgroundSize: 'cover',
                }}
                className='user-image'
              />
            </div>
            <div className='user-name'>{user?.name}</div>
          </div>
          <List items={menuItems} />
        </div>
      )}
    </div>
  );
};
