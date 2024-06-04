import React, { useCallback, useEffect, useState, useRef } from 'react';

import { withLoadPanel } from '../../../utils/withLoadPanel';
import { TaskFormDetails } from './TaskFormDetails';
import { ToolbarForm } from '../../utils/toolbar-form/ToolbarForm';

import { Task } from '../../../types/task';

import { ButtonTypes } from 'devextreme-react/button';

import './TaskForm.scss';

const TaskFormWithLoadPanel = withLoadPanel(TaskFormDetails);

export const TaskForm = ({ task, isLoading }: { task?: Task, isLoading: boolean }) => {
  const [data, setData] = useState(task);
  const [editing, setEditing] = useState(false);
  const dataRef = useRef<Task>();

  useEffect(() => {
    if (task) {
      setData(task);
    }
  }, [task]);

  const onDataChanged = useCallback(data => {
    setData(data);
  }, []);
  const handleEditClick = () => {
    if(editing === false && data) {
      dataRef.current = data;
    } else {
      dataRef.current = undefined;
    }
    setEditing(!editing);
  };

  const onSaveClick = ({ validationGroup }: ButtonTypes.ClickEvent) => {
    if (!validationGroup.validate().isValid) return;

    handleEditClick();
  };

  const onCancelClick = () => {
    setData(dataRef.current);
    handleEditClick();
  };

  return (
    <div className='task-form'>
      <ToolbarForm toggleEditing={handleEditClick} onCancelClick={onCancelClick} onSaveClick={onSaveClick} editing={editing} />
      <TaskFormWithLoadPanel
        loading={isLoading}
        hasData={!!data}
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
