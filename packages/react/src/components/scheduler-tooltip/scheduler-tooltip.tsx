/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { } from 'react';
import Button from 'devextreme-react/button';
import Tooltip from 'devextreme-react/tooltip';

export const TooltipContentTemplate = ({ appointmentData, deleteCurrentAppointment, editCurrentAppointment }) => {
  if (!appointmentData) {
    return <></>;
  }
  const timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  };
  const dateOptions = {
    ...timeOptions,
    weekday: 'short',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  };
  const timeString = `${appointmentData.startDate.toLocaleString(undefined, dateOptions)} - ${appointmentData.endDate.toLocaleTimeString(undefined, timeOptions)}`;

  return (<div className='appointment-tooltip'>
    <div className='title'>{appointmentData.text}</div>
    <div className='content'>
      <div className='date'>
        <Button icon='clock'
          focusStateEnabled={false}
          activeStateEnabled={false}
          hoverStateEnabled={false}
        />
        {timeString}
      </div>
      <div className='description'>
        <Button icon='textdocument'
          focusStateEnabled={false}
          activeStateEnabled={false}
          hoverStateEnabled={false}
        />
        {appointmentData.description}
      </div>
    </div>
    <div className='buttons'>
      <Button
        text='Delete'
        type='danger'
        stylingMode='outlined'
        onClick={deleteCurrentAppointment}
      />
      <Button
        text='Edit'
        type='success'
        stylingMode='outlined'
        onClick={editCurrentAppointment}
      />
    </div>
  </div>);
};
