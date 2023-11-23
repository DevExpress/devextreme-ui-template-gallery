import React from 'react';

import Toolbar, { Item } from 'devextreme-react/toolbar';
import Button from 'devextreme-react/button';

import './ToolbarForm.scss';

export const ToolbarForm = ({ editing, toggleEditing, onCancelClick, onSaveClick }: {
  editing: boolean, toggleEditing: () => void, onCancelClick: () => void, onSaveClick: (e) => void
}) => {
  return (
    <Toolbar className='toolbar-form'>
      <Item location='before'>
        <span className='dx-form-group-caption'>Details</span>
      </Item>
      <Item location='after' visible={!editing}>
        <Button text='Edit' icon='edit' stylingMode='contained' type='default' onClick={toggleEditing} />
      </Item>
      <Item location='after' visible={editing}>
        <Button text='Save' stylingMode='contained' type='default' onClick={onSaveClick} />
      </Item>
      <Item location='after' visible={editing}>
        <Button text='Cancel' stylingMode='outlined' type='normal' onClick={onCancelClick} />
      </Item>
    </Toolbar>
  );
};
