/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useCallback } from 'react';
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

export const listTitleRender = (item) => {
  return <div className='list-header'>
    {item.key}
    <Button icon='add' stylingMode='contained' />
  </div>;
};

export const CalendarList = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const onSelectedItemKeysChange = useCallback((selectedItems) => {
    setSelectedItems(selectedItems);
  }, []);

  const listItemsRender = useCallback((item) => {
    return (
      <div className='list-item'>
        <CheckBox value={selectedItems.includes(item)} />
        <span className='list-item-text'>{item.text}</span>
      </div>
    );
  }, [selectedItems]);
  return (
    <List
      className='calendar-list'
      dataSource={listDS}
      groupRender={listTitleRender}
      itemRender={listItemsRender}
      grouped
      collapsibleGroups
      scrollingEnabled={false}
      selectionMode='multiple'
      onSelectedItemKeysChange={onSelectedItemKeysChange}
    />);
};
