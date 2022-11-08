import React from 'react';
import classNames from 'classnames';

import Form, { SimpleItem, GroupItem, ColCountByScreen } from 'devextreme-react/form';

import SelectBox from 'devextreme-react/select-box';
import DateBox from 'devextreme-react/date-box';
import TextArea from 'devextreme-react/text-area';
import TextBox from 'devextreme-react/text-box';
import Validator, { RequiredRule } from 'devextreme-react/validator';
import ValidationGroup from 'devextreme-react/validation-group';

import { FormTextbox } from '../form-textbox/FormTextbox';

import { PriorityTask } from '../priority-task/PriorityTask';
import { StatusTask } from '../status-task/StatusTask';

import { PRIORITY_ITEMS, STATUS_ITEMS } from '../../shared/constants';

import { Task } from '../../shared/types/task';

const renderPriorityField = (data: string) => (
  <>
    <PriorityTask text={data}></PriorityTask>
    <TextBox readOnly></TextBox>
  </>
);

const renderStatusField = (data: string) => (
  <>
    <StatusTask text={data}></StatusTask>
    <TextBox readOnly></TextBox>
  </>
);

const renderPriorityItem = (data: string) => <PriorityTask text={data}></PriorityTask>;
const renderStatusItem = (data: string) => <StatusTask text={data}></StatusTask>;

export const TaskFormDetails = ({ editing, data, onDataChanged }: { editing: boolean, data: Task, onDataChanged: (data) => void }) => {
  const updateField = (field: string) => (value) => {
    onDataChanged({ ...data, ...{ [field]: value } });
  };

  return (
    <ValidationGroup>
      <Form
        labelMode='floating'
        className={classNames({ 'plain-styled-form': true, 'view-mode': !editing })}
      >
        <GroupItem itemType='group' colCount={2}>
          <ColCountByScreen xs={2}></ColCountByScreen>
          <SimpleItem cssClass='accent'>
            <FormTextbox
              label='Company'
              value={data.company}
              isEditing={!editing}
              onValueChange={updateField('company')}
            >
            </FormTextbox>
          </SimpleItem>
          <SimpleItem cssClass='accent'>
            <FormTextbox
              label='Assigned to'
              value={data.owner}
              isEditing={!editing}
              onValueChange={updateField('owner')}
            >
            </FormTextbox>
          </SimpleItem>
          <SimpleItem>
            <SelectBox
              label='Priority'
              value={data.priority}
              items={PRIORITY_ITEMS}
              readOnly={!editing}
              elementAttr={{ class: 'form-editor' }}
              stylingMode='filled'
              fieldRender={renderPriorityField}
              itemRender={renderPriorityItem}
              onValueChange={updateField('priority')}
            >
            </SelectBox>
          </SimpleItem>
          <SimpleItem>
            <SelectBox
              label='Status'
              value={data.status}
              items={STATUS_ITEMS}
              readOnly={!editing}
              elementAttr={{ class: 'form-editor' }}
              stylingMode='filled'
              fieldRender={renderStatusField}
              itemRender={renderStatusItem}
              onValueChange={updateField('status')}
            >
            </SelectBox>
          </SimpleItem>
          <SimpleItem>
            <DateBox
              value={data.startDate}
              readOnly={!editing}
              name='Set Start Date'
              label='Start Date'
              elementAttr={{ class: 'form-editor' }}
              inputAttr={{ class: 'form-editor-input' }}
              stylingMode='filled'
              placeholder='MM/dd/y'
              displayFormat='MM/dd/y'
              onValueChange={updateField('startDate')}
            >
              <Validator>
                <RequiredRule />
              </Validator>
            </DateBox>
          </SimpleItem>
          <SimpleItem>
            <DateBox
              value={data.dueDate}
              readOnly={!editing}
              name='Set Due Date'
              label='Due Date'
              elementAttr={{ class: 'form-editor' }}
              inputAttr={{ class: 'form-editor-input' }}
              stylingMode='filled'
              placeholder='MM/dd/y'
              displayFormat='MM/dd/y'
              onValueChange={updateField('dueDate')}
            >
              <Validator>
                <RequiredRule />
              </Validator>
            </DateBox>
          </SimpleItem>
        </GroupItem>

        <SimpleItem colSpan={2}>
          <TextArea
            label='Details'
            readOnly={!editing}
            value={data.description}
            elementAttr={{ class: 'form-editor' }}
            stylingMode='filled'
            onValueChange={updateField('description')}
          ></TextArea>
        </SimpleItem>
      </Form>
    </ValidationGroup>
  );
};
