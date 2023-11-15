import './calendar-list.scss';

import React, { useState, useCallback } from 'react';

import List from 'devextreme-react/list';
import CheckBox from 'devextreme-react/check-box';

const listTitleRender = (item) => {
  return <div className='list-header'>
    {item.key}
  </div>;
};

export const CalendarList = ({ calendarItems, onSelectedCalendarsChange }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>(calendarItems || []);

  const onSelectedItemKeysChange = useCallback((checkedItems) => {
    setSelectedItems(checkedItems);
    onSelectedCalendarsChange(checkedItems);
  }, [onSelectedCalendarsChange]);

  const listItemsRender = useCallback((item) => {
    return (
      <div className='list-item'>
        <CheckBox
          value={!selectedItems.includes(item)}
          focusStateEnabled={false}
        />
        <span className='list-item-text'>{item.text}</span>
      </div>
    );
  }, [selectedItems]);
  return (
    <div className='calendar-list'>
      <List
        dataSource={calendarItems}
        activeStateEnabled={false}
        focusStateEnabled={false}
        hoverStateEnabled={false}
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
