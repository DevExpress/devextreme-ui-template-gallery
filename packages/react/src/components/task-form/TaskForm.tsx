import React, { useCallback, useEffect, useState } from 'react';

import { withLoadPanel } from '../../utils/withLoadPanel';
import { TaskFormDetails } from './TaskFormDetails';
import { ToolbarForm } from '../toolbar-form/ToolbarForm';

import { Task } from '../../types/task';

import './TaskForm.scss';

const TaskFormWithLoadPanel = withLoadPanel(TaskFormDetails);

export const TaskForm = ({ task }: { task?: Task }) => {
  const [data, setData] = useState(task);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (task) {
      setData(task);
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
      <ToolbarForm toggleEditing={toggleEditing} editing={editing} />
      <TaskFormWithLoadPanel
        loading={!data}
        data={data}
        editing={editing}
        onDataChanged={onDataChanged}
        colCountByScreen={{
          xs: 2,
          sm: 2,
        }}
        panelProps={{
          container: '.task-form',
          position: { of: '.task-form' },
        }}
      />
    </div>
  );
};
