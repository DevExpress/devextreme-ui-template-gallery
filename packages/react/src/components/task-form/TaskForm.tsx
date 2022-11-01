import React, { useCallback, useEffect, useState } from 'react';

import Toolbar, { Item } from 'devextreme-react/toolbar';
import Button from 'devextreme-react/button';

import { withLoadPanel } from '../../shared/utils/withLoadPanel';
import { TaskFormDetails } from './TaskFormDetails';

import { FormTask } from '../../shared/types/task-form';

import './TaskForm.scss';

const TaskFormWithLoadPanel = withLoadPanel(TaskFormDetails);

export const TaskForm = ({ task }: { task?: FormTask }) => {
  const [data, setData] = useState(task);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (task) {
      setData({ ...task, ...{ dueDate: null } });
    }
  }, [task]);

  const onDataChanged = useCallback(data => {
    setData(data);
  }, []);
  const toggleEditing = useCallback(() => {
    setEditing(!editing);
  }, [editing]);

  return (
    <div className='task-form'>
      <Toolbar>
        <Item location='after' locateInMenu='after' visible={!editing}>
          <Button text='Edit' icon='edit' stylingMode='outlined' type='default' onClick={toggleEditing}></Button>
        </Item>
        <Item location='after' locateInMenu='after' visible={editing}>
          <Button text='Save' stylingMode='outlined' type='default' onClick={toggleEditing}></Button>
        </Item>
        <Item location='after' locateInMenu='after' visible={editing}>
          <Button text='Cancel' stylingMode='text' onClick={toggleEditing}></Button>
        </Item>
      </Toolbar>
      <TaskFormWithLoadPanel
        loading={!data}
        data={data}
        editing={editing}
        onDataChanged={onDataChanged}
        panelProps={{
          container: '.task-form',
          position: { of: '.task-form' },
        }}
      />
    </div>
  );
};
