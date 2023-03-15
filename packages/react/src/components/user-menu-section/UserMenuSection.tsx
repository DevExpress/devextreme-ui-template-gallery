import React, { useMemo } from 'react';
import { useAuth } from '../../contexts/auth';
import List from 'devextreme-react/list';

import './UserMenuSection.scss';
import type { UserMenuSectionProps } from '../../types';

export const UserMenuSection = ({ showAvatar }: UserMenuSectionProps) => {
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
    <>
      <div className='user-info'>
        { showAvatar && (
          <div className='image-container'>
            <div
              style={{
                background: `url(${user?.avatarUrl}) no-repeat #fff`,
                backgroundSize: 'cover',
              }}
              className='user-image'
            />
          </div>
        )}
        <div className='user-name'>{user?.name}</div>
      </div>
      <List items={menuItems} />
    </>
  );
};
