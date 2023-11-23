import React, { useCallback, useEffect, useState } from 'react';

import { Toolbar, Item as ToolbarItem } from 'devextreme-react/toolbar';
import DropDownButton, { Item as DropDownItem } from 'devextreme-react/drop-down-button';
import TabPanel, { Item as TabPanelItem } from 'devextreme-react/tab-panel';
import ValidationGroup from 'devextreme-react/validation-group';
import Button from 'devextreme-react/button';
import ScrollView from 'devextreme-react/scroll-view';

import { TaskForm, CardActivities, CardNotes, CardMessages } from '../../components';

import { Task } from '../../types/task';

import { getTask } from 'dx-template-gallery-data';

import './planning-task-details.scss';

const TASK_ID = 1;

export const PlanningTaskDetails = () => {
  const [task, setTask] = useState<Task>();
  const [isLoading, setIsLoading] = useState(false);

  const loadData = useCallback(() => {
    getTask(TASK_ID)
      .then((data) => {
        setTask(data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const refresh = useCallback(() => {
    setIsLoading(true);
    loadData();
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  return (
    <ScrollView className='view-wrapper-scroll'>
      <div className='view-wrapper view-wrapper-details'>
        <Toolbar className='toolbar-details theme-dependent'>
          <ToolbarItem location='before'>
            <Button icon='arrowleft' stylingMode='text' />
          </ToolbarItem>
          <ToolbarItem location='before' text={ task?.text ?? 'Loading...' } />
          <ToolbarItem location='after' locateInMenu='auto'>
            <DropDownButton text='Actions' stylingMode='text' dropDownOptions={{ width: 'auto' }}>
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
          >
            <Button
              text='Attach'
              icon='attach'
              stylingMode='text'
            />
          </ToolbarItem>
          <ToolbarItem
            location='after'
            locateInMenu='auto'
            widget='dxButton'
            showText='inMenu'
          >
            <Button
              text='Refresh'
              icon='refresh'
              stylingMode='text'
              onClick={refresh}
            />
          </ToolbarItem>
        </Toolbar>
        <div className='panels'>
          <div className='left'>
            <ValidationGroup>
              <TaskForm task={task} isLoading={isLoading} />
            </ValidationGroup>
          </div>
          <div className='right'>
            <div className='dx-card details-card'>
              <TabPanel
                showNavButtons
                focusStateEnabled={false}
                deferRendering={false}
              >
                <TabPanelItem title='Activities'>
                  <CardActivities activities={task?.activities} isLoading={isLoading} />
                </TabPanelItem>
                <TabPanelItem title='Notes'>
                  <CardNotes items={task?.notes} user={task?.owner} />
                </TabPanelItem>
                <TabPanelItem title='Messages'>
                  <CardMessages items={task?.messages} user={task?.owner} />
                </TabPanelItem>
              </TabPanel>
            </div>
          </div>
        </div>
      </div>
    </ScrollView>
  );
};
