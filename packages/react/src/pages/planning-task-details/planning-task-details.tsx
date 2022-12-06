import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Item as ToolbarItem } from 'devextreme-react/toolbar';
import DropDownButton, { Item as DropDownItem } from 'devextreme-react/drop-down-button';
import TabPanel, { Item as TabPanelItem } from 'devextreme-react/tab-panel';
import ValidationGroup from 'devextreme-react/validation-group';

import { TaskForm, CardActivities, CardNotes, CardMessages, ToolbarDetails } from '../../components';

import { Task } from '../../types/task';

import { getTask } from 'dx-template-gallery-data';

import './planning-task-details.scss';

const TASK_ID = 1;

export const PlanningTaskDetails = () => {
  const [task, setTask] = useState<Task>();
  const [messagesCount, setMessagesCount] = useState(0);

  const loadData = useCallback(() => {
    getTask(TASK_ID)
      .then((data) => {
        setTask(data);
        setMessagesCount(data.messages.length);
      })
      .catch((error) => console.log(error));
  }, []);

  const onMessagesCountChanged = useCallback((count) => {
    setMessagesCount(count);
  }, []);

  const refresh = useCallback(() => loadData(), [loadData]);

  const ToolbarItemAttach = useMemo(()=>({
    text: 'Attach',
    icon: 'attach',
  }), []);

  const ToolbarItemRefresh = useMemo(()=>({
    text: 'Refresh',
    icon: 'refresh',
    onClick: refresh,
  }), [refresh]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className='view-wrapper view-wrapper-details'>
      <ToolbarDetails name={task?.text}>
        <ToolbarItem location='after' locateInMenu='auto'>
          <DropDownButton text='Actions' stylingMode='contained'>
            <DropDownItem text='Duplicate' />
            <DropDownItem text='Close' />
            <DropDownItem text='Delete' />
          </DropDownButton>
        </ToolbarItem>
        <ToolbarItem
          location='after'
          locateInMenu='auto'
          widget='dxButton'
          showText='inMenu'
          options={ToolbarItemAttach}
        />
        <ToolbarItem
          location='after'
          locateInMenu='auto'
          widget='dxButton'
          showText='inMenu'
          options={ToolbarItemRefresh}
        />
      </ToolbarDetails>
      <div className='panels'>
        <div className='left'>
          <ValidationGroup>
            <TaskForm task={task} />
          </ValidationGroup>
        </div>
        <div className='right'>
          <div className='dx-card details-card'>
            <TabPanel showNavButtons deferRendering={false}>
              <TabPanelItem title='Activities'>
                <CardActivities activities={task?.activities} />
              </TabPanelItem>
              <TabPanelItem title='Notes'>
                <CardNotes items={task?.notes} user={task?.owner} />
              </TabPanelItem>
              <TabPanelItem title='Messages' badge={messagesCount}>
                <CardMessages items={task?.messages} user={task?.owner} onMessagesCountChanged={onMessagesCountChanged} />
              </TabPanelItem>
            </TabPanel>
          </div>
        </div>
      </div>
    </div>
  );
};
