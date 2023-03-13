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

  const dropDownButtonAttributes = {
    class: 'user-button'
  };

  const buttonDropDownOptions = {
    width: '150'
  };

  return (
    <div className='user-panel'>
      {menuMode === 'context' && (
        <DropDownButton items={menuItems} stylingMode='text' focusStateEnabled={false}
          icon={user?.avatarUrl} showArrowIcon={false}
          elementAttr={dropDownButtonAttributes}
          dropDownOptions={buttonDropDownOptions} />
      )}
      {menuMode === 'list' && (
        <>
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
        </>
      )}
    </div>
  );
};
