import React from 'react';
import DropDownButton from 'devextreme-react/drop-down-button';
import { Template } from 'devextreme-react/core/template';
import { UserMenuSection } from '../user-menu-section/UserMenuSection';
import type { UserPanelProps } from '../../types';
import { useAuth } from '../../contexts/auth';
import './UserPanel.scss';

export const UserPanel = ({ menuMode }: UserPanelProps) => {
  const { user } = useAuth();

  const dropDownButtonAttributes = {
    class: 'user-button'
  };

  const buttonDropDownOptions = {
    width: '150'
  };

  return (
    <div className='user-panel'>
      {menuMode === 'context' && (
        <DropDownButton stylingMode='text'
          icon={user?.avatarUrl} showArrowIcon={false}
          elementAttr={dropDownButtonAttributes}
          dropDownOptions={buttonDropDownOptions}
          dropDownContentTemplate='dropDownTemplate'>
          <Template name='dropDownTemplate'>
            <UserMenuSection />
          </Template>
        </DropDownButton>
      )}
      {menuMode === 'list' && (
        <UserMenuSection showAvatar />
      )}
    </div>
  );
};
