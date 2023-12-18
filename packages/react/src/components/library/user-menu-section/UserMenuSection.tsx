import React, { useMemo, useCallback } from 'react';
import { useAuth } from '../../../contexts/auth';
import List, { ListTypes } from 'devextreme-react/list';

import './UserMenuSection.scss';
import type { UserMenuSectionProps } from '../../../types';

type MenuItem = {
  text: string;
  icon: string;
  onClick: () => void;
};

export const UserMenuSection = ({ showAvatar, listRef }: UserMenuSectionProps) => {
  const { user, signOut } = useAuth();

  const menuItems = useMemo<MenuItem[]>(
    () => [
      {
        text: 'Logout',
        icon: 'runner',
        onClick: signOut,
      },
    ],
    []
  );

  const listElementAttr = {
    class: 'user-info-list'
  };

  const onItemClick = useCallback(({ itemData }: ListTypes.ItemClickEvent<MenuItem>) => itemData?.onClick(), []);

  return (
    <>
      <div className='user-info'>
        { showAvatar && (
          <div className='image-container'>
            <div
              style={{
                backgroundImage: `url(${user?.avatarUrl})`,
              }}
              className='user-image'
            />
          </div>
        )}
        <div className='user-name'>{user?.name}</div>
      </div>
      <List ref={listRef} elementAttr={listElementAttr} onItemClick={onItemClick} items={menuItems} />
    </>
  );
};
