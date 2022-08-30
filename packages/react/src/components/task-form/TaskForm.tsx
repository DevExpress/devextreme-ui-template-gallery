import React, { useCallback, useEffect, useState } from 'react';
import './TaskForm.scss';
import Toolbar, { Item } from 'devextreme-react/toolbar';
import Button from 'devextreme-react/button';
import LoadPanel from 'devextreme-react/load-panel';
import { PriorityTask } from '../priority-task/PriorityTask';
import { StatusTask } from '../status-task/StatusTask';
import SelectBox from 'devextreme-react/select-box';
import TextBox from 'devextreme-react/text-box';
import { PRIORITY_ITEMS, STATUS_ITEMS } from '../../shared/constants';
import Form, { SimpleItem, GroupItem, Label } from 'devextreme-react/form';
import { DropDownButton, Calendar } from 'devextreme-react';
import { TaskPriority, TaskStatus } from '../../shared/types/task';
import { FormEdit, FormEditComponent, FormTask } from '../../shared/types/form';

const EditComponent = ({ items, editComponent: Component, label, value, setValue }: FormEditComponent) => {
  const EditField = useCallback(
    (data: string) => (
      <div className='form-custom-list-prop'>
        {data && <Component text={data}></Component>}
        <TextBox readOnly></TextBox>
      </div>
    ),
    [Component]
  );
  const EditItem = useCallback((data: string) => <Component text={data}></Component>, [Component]);

  return <SelectBox items={items} fieldRender={EditField} itemRender={EditItem} label={label} value={value} onValueChange={(value) => setValue(value)}></SelectBox>;
};

const EditStatus = ({ label, value, setValue }: FormEdit) => {
  const updateValue = (value) => {
    setValue({ status: value });
  };
  return <EditComponent items={STATUS_ITEMS} editComponent={StatusTask} label={label} value={value} setValue={updateValue} />;
};
const EditPriority = ({ label, value, setValue }: FormEdit) => {
  const updateValue = (value) => {
    setValue({ priority: value });
  };
  return <EditComponent items={PRIORITY_ITEMS} editComponent={PriorityTask} label={label} value={value} setValue={updateValue} />;
};

const CompanyField = ({ editorOptions }) => (
  <FormContext.Consumer>
    {({ data }) => (
      <div className='info'>
        <label className='dx-texteditor-label'>{editorOptions.label}</label>
        <span className='default-label dx-theme-accent-as-text-color'>{data.company}</span>
      </div>
    )}
  </FormContext.Consumer>
);

const OwnerField = ({ editorOptions }) => (
  <FormContext.Consumer>
    {({ data }) => (
      <div className='info'>
        <label className='dx-texteditor-label'>{editorOptions.label}</label>
        <span className='default-label dx-theme-accent-as-text-color'>{data.owner}</span>
      </div>
    )}
  </FormContext.Consumer>
);

const DropDownContentTemplate = () => <FormContext.Consumer>{({ dueDateChange }) => <Calendar onValueChange={dueDateChange} />}</FormContext.Consumer>;

const DueDateTemplate = ({ editorOptions }) => {
  return (
    <DropDownButton
      icon='event'
      stylingMode='outlined'
      text={editorOptions.label}
      dropDownOptions={{ width: 'auto' }}
      dropDownContentRender={DropDownContentTemplate}
      showArrowIcon={false}
    ></DropDownButton>
  );
};

const PriorityField = ({ editorOptions }) => (
  <FormContext.Consumer>
    {({ data }) => (
      <div className='info'>
        <label className='dx-texteditor-label'>{editorOptions.label}</label>
        <PriorityTask text={data.priority}></PriorityTask>
      </div>
    )}
  </FormContext.Consumer>
);

const PriorityEditing = ({ editorOptions }) => (
  <FormContext.Consumer>{({ data, setValue }) => <EditPriority value={data.priority} label={editorOptions.label} setValue={setValue}></EditPriority>}</FormContext.Consumer>
);

const StatusEditing = ({ editorOptions }) => (
  <FormContext.Consumer>{({ data, setValue }) => <EditStatus value={data.status} label={editorOptions.label} setValue={setValue}></EditStatus>}</FormContext.Consumer>
);

const StatusField = ({ editorOptions }) => (
  <FormContext.Consumer>
    {({ data }) => (
      <div className='info'>
        <label className='dx-texteditor-label'>{editorOptions.label}</label>
        <StatusTask text={data.status}></StatusTask>
      </div>
    )}
  </FormContext.Consumer>
);

const FormContext = React.createContext({
  data: { priority: '', status: '', company: '', owner: '' },
  setValue: (obj: { priority?: TaskPriority; status?: TaskStatus }) => {},
  dueDateChange: (value: any) => {},
});

export const TaskForm = ({ task }: { task: FormTask | undefined }) => {
  const [data, setData] = useState(task);
  const [isDueDate, setDueDate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const editorOptions = { stylingMode: editing ? 'filled' : 'underlined' };
  useEffect(() => {
    if (task) {
      setLoading(false);
      setData({ ...task, ...{ dueDate: null } });
    }
  }, [task]);
  const toggleEditing = useCallback(() => {
    setEditing(!editing);
  }, [editing]);
  const dueDateChange = (value) => {
    setData({ ...task!, ...{ dueDate: value } });
    setDueDate(!!value);
  };
  const updateTask = (obj) => {
    setData({ ...data, ...obj });
  };
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
      {loading ? (
        <LoadPanel container='.task-form' visible position={{ of: '.task-form' }} />
      ) : (
        <FormContext.Provider value={{ data: data!, setValue: updateTask, dueDateChange: dueDateChange }}>
          <Form formData={data} labelMode='floating' readOnly={!editing}>
            <SimpleItem dataField='text' visible={editing}></SimpleItem>
            <GroupItem itemType='group' caption='Details' colCount={2}>
              <SimpleItem dataField='company' render={editing ? undefined : CompanyField} editorOptions={editorOptions}></SimpleItem>
              <SimpleItem dataField='owner' render={editing ? undefined : OwnerField} editorOptions={editorOptions}>
                <Label text='Assigned to'></Label>
              </SimpleItem>
              <SimpleItem dataField='priority' render={editing ? PriorityEditing : PriorityField}></SimpleItem>
              <SimpleItem dataField='status' render={editing ? StatusEditing : StatusField}></SimpleItem>
              <SimpleItem
                dataField='startDate'
                editorType='dxDateBox'
                editorOptions={{
                  name: 'Start Date',
                  placeholder: 'MM/dd/y',
                  displayFormat: 'MM/dd/y',
                  ...editorOptions,
                }}
              ></SimpleItem>
              <SimpleItem
                dataField='dueDate'
                editorType='dxDateBox'
                render={editing || isDueDate ? undefined : DueDateTemplate}
                editorOptions={{
                  name: 'Due Date',
                  placeholder: 'MM/dd/y',
                  displayFormat: 'MM/dd/y',
                  onValueChange: dueDateChange,
                  ...editorOptions,
                }}
              ></SimpleItem>
            </GroupItem>

            <SimpleItem colSpan={2} dataField='description' editorType='dxTextArea' editorOptions={editorOptions}>
              <Label text='Details'></Label>
            </SimpleItem>
          </Form>
        </FormContext.Provider>
      )}
    </div>
  );
};
