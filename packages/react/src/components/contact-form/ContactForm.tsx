import React, { useState, useCallback } from 'react';

import classNames from 'classnames';

import Toolbar, { Item } from 'devextreme-react/toolbar';
import Button from 'devextreme-react/button';
import From, { Item as ItemForm, GroupItem, ColCountByScreen } from 'devextreme-react/form';
import SelectBox from 'devextreme-react/select-box';

import { Contact } from '../../shared/types/crm-contact';

export const ContactForm = ({ data }: { data: Contact }) => {
  const [editing, setEditing] = useState(false);

  const handleEditClick = useCallback(() => {
    setEditing(!editing);
  }, [editing]);

  return (
    <div className='contact-form'>
      <Toolbar>
        <Item location='before'><span className='form-title'>Details</span></Item>
        <Item location='after' locateInMenu='after' visible={!editing}>
          <Button
            text='Edit'
            icon='edit'
            stylingMode='outlined'
            type='default'
            onClick={handleEditClick}
          ></Button>
        </Item>
        <Item location='after' locateInMenu='after' visible={editing}>
          <Button
            text='Save'
            stylingMode='outlined'
            type='default'
            onClick={handleEditClick}
          ></Button>
        </Item>
        <Item location='after' locateInMenu='after' visible={editing}>
          <Button
            text='Cancel'
            stylingMode='text'
            onClick={handleEditClick}
          ></Button>
        </Item>
      </Toolbar>

      <From
        className={classNames({ 'plain-styled-form': true, 'view-mode': !editing })}
        labelMode='floating'
      >
        <GroupItem colCount={2}>
          <ColCountByScreen xs={2}></ColCountByScreen>
          <ItemForm>

          </ItemForm>

          <GroupItem>
            <ItemForm>
              <SelectBox
                label='Status'
                value={data.status}
                readOnly={!editing}
                stylingMode='filled'
                width='100%'
                // fieldRender={StatusField}
              />
            </ItemForm>

            <ItemForm>

            </ItemForm>

            <ItemForm>

            </ItemForm>
          </GroupItem>

          <ItemForm>

          </ItemForm>

          <ItemForm cssClass='accent'>

          </ItemForm>

          <ItemForm cssClass='accent' colSpan={2}>

          </ItemForm>
        </GroupItem>

        <GroupItem colCount={4} caption='Contacts'>
          <ColCountByScreen xs={2}></ColCountByScreen>
          <ItemForm colSpan={4}>

          </ItemForm>

          <ItemForm colSpan={2}>

          </ItemForm>

          <ItemForm>

          </ItemForm>

          <ItemForm>

          </ItemForm>
        </GroupItem>

        <GroupItem colCount={2} cssClass='contact-fields-group'>
          <ColCountByScreen xs={2}></ColCountByScreen>
          <ItemForm>

            <Button
              className='form-item-button'
              visible={!editing}
              text='Call'
              icon='tel'
              type='default'
              stylingMode='outlined'
            ></Button>
          </ItemForm>

          <ItemForm>

            <Button
              className='form-item-button'
              visible={!editing}
              text='Send Email'
              icon='email'
              type='default'
              stylingMode='outlined'
            ></Button>
          </ItemForm>
        </GroupItem>
      </From>
    </div>
  );
};
