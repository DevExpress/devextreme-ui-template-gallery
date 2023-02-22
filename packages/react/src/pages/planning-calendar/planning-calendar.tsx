/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import Calendar from 'devextreme-react/calendar';
import Scheduler from 'devextreme-react/scheduler';
import Button from 'devextreme-react/button';
import Accordion from 'devextreme-react/accordion';

import './planning-calendar.scss';
export const PlanningCalendar = () => {
  const [selectedDay] = useState(0);
  return <div className='view-wrapper-calendar'>
    <div className='panels'>
      <div className='left'>
        <Button />
        <Button />
        <Calendar />
        <div className='filters-block'>
          <Accordion />
        </div>
      </div>
      <div className='right'>
        <Scheduler />
      </div>
    </div>
  </div>;
};
