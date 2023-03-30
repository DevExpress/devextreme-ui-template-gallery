/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useCallback } from 'react';
import List from 'devextreme-react/list';
import Button from 'devextreme-react/button';
import DropDownButton from 'devextreme-react/drop-down-button';
import './calendar-list.scss';
import { CheckBox } from 'devextreme-react';

const onAddClick = (e) => {
  e.event.stopImmediatePropagation();
};

export const listTitleRender = (item) => {
  return <div className='list-header'>
    {item.key}
    <Button icon='add' stylingMode='contained' onClick={onAddClick} />
  </div>;
};

export const CalendarList = ({ listDS, onSelectedCalendarsChange }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>(listDS || []);

  const onSelectedItemKeysChange = useCallback((checkedItems) => {
    setSelectedItems(checkedItems);
    onSelectedCalendarsChange(checkedItems);
  }, [onSelectedCalendarsChange]);

  const listItemsRender = useCallback((item) => {
    return (
      <div className='list-item'>
        <CheckBox value={!selectedItems.includes(item)}
          style={{
            '--checkbox-color': item.checkboxColor,
            // '--checkbox-secondary-color': item.color
          }} />
        <span className='list-item-text'>{item.text}</span>
      </div>
    );
  }, [selectedItems]);
  return (
    <div className='calendar-list'>
      <List
        className='calendar-list'
        dataSource={listDS}
        activeStateEnabled={false}
        groupRender={listTitleRender}
        itemRender={listItemsRender}
        grouped
        collapsibleGroups
        scrollingEnabled={false}
        selectionMode='multiple'
        onSelectedItemKeysChange={onSelectedItemKeysChange}
      />
    </div>
  );
};
