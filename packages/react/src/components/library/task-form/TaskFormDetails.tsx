import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import Form, {
  SimpleItem,
  GroupItem,
  ColCountByScreen,
} from 'devextreme-react/form';

import SelectBox, { FieldAddons } from 'devextreme-react/select-box';
import TextArea from 'devextreme-react/text-area';

import { FormTextbox } from '../../utils/form-textbox/FormTextbox';
import { FormDateBox } from '../../utils/form-datebox/FormDateBox';

import { PRIORITY_ITEMS, STATUS_ITEMS } from '../../../shared/constants';
import {
  editBeforeRender,
  statusItemRender,
  priorityBeforeRender,
  priorityItemRender,
} from '../../../shared/statusIndicatorRenderMethods';

import { Task } from '../../../types/task';
import './TaskFormDetails.scss';
import { getSizeQualifier } from '../../../utils/media-query';

export const TaskFormDetails = ({
  editing,
  data,
  subjectField,
  onDataChanged,
}: {
  editing: boolean;
  data: Task;
  subjectField: boolean;
  onDataChanged: (data) => void;
}) => {
  const [formData, setFormData] = useState<Task>({ ...data });

  useEffect(() => {
    setFormData({ ...data });
  }, [data]);

  const updateField = (field: string) => (value: string) => {
    const newData = { ...formData, [field]: value };
    onDataChanged(newData);

    setFormData(newData);
  };

  return (
    <Form
      className={classNames({
        'plain-styled-form task-form-details': true,
        'view-mode': !editing,
      })}
      screenByWidth={getSizeQualifier}
    >
      {subjectField && (
        <SimpleItem colSpan={2}>
          <FormTextbox
            label='Subject'
            value={formData.text}
            isEditing={!editing}
            onValueChange={updateField('text')}
          />
        </SimpleItem>
      )}
      <GroupItem itemType='group'>
        <ColCountByScreen xs={1} sm={2} md={2} lg={2} />
        <SimpleItem cssClass='accent'>
          <FormTextbox
            label='Company'
            value={formData.company}
            isEditing={!editing}
            onValueChange={updateField('company')}
          />
        </SimpleItem>
        <SimpleItem cssClass='accent'>
          <FormTextbox
            label='Assigned to'
            value={formData.owner}
            isEditing={!editing}
            onValueChange={updateField('owner')}
          />
        </SimpleItem>
        <SimpleItem>
          <SelectBox
            className='task-details-select-box'
            label='Priority'
            labelMode='static'
            value={formData.priority}
            items={PRIORITY_ITEMS}
            readOnly={!editing}
            stylingMode='filled'
            placeholder=''
            displayExpr={() => ''}
            itemRender={priorityItemRender}
            onValueChange={updateField('priority')}
          >
            <FieldAddons beforeRender={priorityBeforeRender} />
          </SelectBox>
        </SimpleItem>
        <SimpleItem>
          <SelectBox
            className='task-details-select-box'
            label='Status'
            labelMode='static'
            value={formData.status}
            items={STATUS_ITEMS}
            readOnly={!editing}
            stylingMode='filled'
            placeholder=''
            displayExpr={() => ''}
            itemRender={statusItemRender}
            onValueChange={updateField('status')}
          >
            <FieldAddons beforeRender={editBeforeRender} />
          </SelectBox>
        </SimpleItem>
        <SimpleItem>
          <FormDateBox
            value={formData.startDate}
            readOnly={!editing}
            label='Start Date'
            onValueChange={updateField('startDate')}
          />
        </SimpleItem>
        <SimpleItem>
          <FormDateBox
            value={formData.dueDate}
            readOnly={!editing}
            label='Due Date'
            onValueChange={updateField('dueDate')}
          />
        </SimpleItem>
      </GroupItem>

      <SimpleItem colSpan={2}>
        <TextArea
          label='Details'
          readOnly={!editing}
          value={formData.description}
          stylingMode='filled'
          onValueChange={updateField('description')}
        />
      </SimpleItem>
    </Form>
  );
};
