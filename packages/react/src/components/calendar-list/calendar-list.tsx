/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import List from 'devextreme-react/list';
import Button from 'devextreme-react/button';
import './calendar-list.scss';
import { CheckBox } from 'devextreme-react';

const listDS = [
  {
    key: 'My calendars',
    items: ['Brett Johnson', 'Tasks', 'Reminder', 'Contacts']
  },
  {
    key: 'Other calendars',
    items: ['Holidays']
  }
];

export const listItemsRender = (item) => {
  return (
    <div className='list-item'>
      <CheckBox />
      <span className='list-item-text'>{item.text}</span>
    </div>
  );
};

export const listTitleRender = (item) => {
  return <div className='list-header'>
    {item.key}
    <Button icon='add' stylingMode='contained' />
  </div>;
};

export const CalendarList = () => {
  return (
    <List
      dataSource={listDS}
      groupRender={listTitleRender}
      itemRender={listItemsRender}
      grouped
      collapsibleGroups
      scrollingEnabled={false}
      selectionMode='multiple'
      activeStateEnabled={false}
    />);
};
