import React, { useEffect, useState } from 'react';
import './planning-task-details.scss';
import Toolbar, { Item as ToolbarItem } from 'devextreme-react/toolbar';
import Button from 'devextreme-react/button';
import DropDownButton, { Item as DropDownItem } from 'devextreme-react/drop-down-button';
import TabPanel, { Item as TabPanelItem } from 'devextreme-react/tab-panel';
import { TaskForm, CardActivities } from '../../components';
import { getTasks } from 'dx-rwa-data';

const refresh = () => {} //TODO

export default function PlanningTaskDetails() {
  const [task, setTask] = useState({ text: undefined });
  useEffect(() => {
    getTasks()
      .then((data) => setTask(data[0]))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="view-wrapper-details">
      <Toolbar>
        <ToolbarItem location='before'>
          <Button icon='arrowleft'></Button>
        </ToolbarItem>
        <ToolbarItem location="before" text={task.text}></ToolbarItem>
        <ToolbarItem location="after" locateInMenu="auto">
          <DropDownButton text="ACTIONS" stylingMode="contained">
            <DropDownItem text="Duplicate"></DropDownItem>
            <DropDownItem text="Close"></DropDownItem>
            <DropDownItem text="Delete"></DropDownItem>
          </DropDownButton>
        </ToolbarItem>
        <ToolbarItem
          location="after"
          locateInMenu="auto"
          widget="dxButton"
          showText="inMenu"
          options={{
            text: 'Attach',
            icon: 'attach'
          }}
        >
        </ToolbarItem>
        <ToolbarItem
          location="after"
          locateInMenu="auto"
          widget="dxButton"
          showText="inMenu"
          options={{
            text: 'Refresh',
            icon: 'refresh',
            onClick: refresh
          }}
        >
        </ToolbarItem>
      </Toolbar>
      <div className="panels">
        <div className="left">
          <TaskForm></TaskForm>
        </div>
        <div className="right">
          <div className="dx-card">
            <TabPanel showNavButtons deferRendering={false}>
              <TabPanelItem title="Activities">
                {/* <CardActivities>

                </CardActivities> */}
              </TabPanelItem>
              <TabPanelItem title="Notes">

              </TabPanelItem>
              <TabPanelItem title="Messages">

              </TabPanelItem>
            </TabPanel>
          </div>
        </div>
      </div>
    </div>
)}
