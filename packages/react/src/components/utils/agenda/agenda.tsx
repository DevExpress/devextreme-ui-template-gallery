import './agenda.scss';
import React, { useCallback } from 'react';

import List from 'devextreme-react/list';
import Button from 'devextreme-react/button';

import { useScreenSize } from '../../../utils/media-query';
import { AgendaListItem } from './agenda-list-item';

export const Agenda = ({ selectedAppointmentData = { startDate: new Date() }, toggleOpen, resources, items, showAppointmentTooltip }) => {
  const { isLarge } = useScreenSize();

  const formattedStartDate = selectedAppointmentData.startDate.toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  });

  const renderListItem = useCallback((item) => {
    return <AgendaListItem item={item} resources={resources} />;
  }, [resources]);

  return <div className='agenda'>
    <div className='agenda-header'>
      <div className='date'>
        {formattedStartDate}
      </div>
      <Button
        icon={isLarge ? 'panelleft' : 'panel'}
        stylingMode='text'
        onClick={toggleOpen}
      />
    </div>
    <List
      dataSource={items}
      itemRender={renderListItem}
      onItemClick={showAppointmentTooltip}
    />
  </div>;
};
