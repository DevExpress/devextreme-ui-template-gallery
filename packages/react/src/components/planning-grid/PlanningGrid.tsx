import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import DataGrid, {
  Column, Selection, Sorting, HeaderFilter,
  RequiredRule, Paging, Pager, Editing
} from 'devextreme-react/data-grid';
import SelectBox from 'devextreme-react/select-box';
import TextBox from 'devextreme-react/text-box';

import { PriorityTask } from '../priority-task/PriorityTask';
import { StatusTask } from '../status-task/StatusTask';

import { PRIORITY_ITEMS, STATUS_ITEMS } from '../../shared/constants';

import { Task, PlanningProps } from '../../shared/types/task';
import { GridEdit, GridEditComponent } from '../../shared/types/planning-grid';

import './PlanningGrid.scss';

const EditComponent = ({ items, editComponent: Component, setValue, value }: GridEditComponent) => {
  const EditField = (data: string) => (
    <div>
      {data && <Component text={data} />}
      <TextBox readOnly />
    </div>
  );
  const EditItem = (data: string) => <Component text={data} />;

  return <SelectBox className='edit-cell' defaultValue={value} items={items} fieldRender={EditField} itemRender={EditItem} onValueChange={(value) => setValue(value)} />;
};

const EditStatus = ({ setValue, value }: GridEdit) => <EditComponent items={STATUS_ITEMS} editComponent={StatusTask} setValue={setValue} value={value} />;
const EditPriority = ({ setValue, value }: GridEdit) => <EditComponent items={PRIORITY_ITEMS} editComponent={PriorityTask} setValue={setValue} value={value} />;
export const PlanningGrid = React.forwardRef<DataGrid, PlanningProps>(({ dataSource }, ref) => {
  const [data, setData] = useState<Task[]>();

  const navigate = useNavigate();

  useEffect(() => {
    setData(dataSource.filter((d) => d.status && d.priority));
  }, [dataSource]);

  const onRowPrepared = useCallback(({ rowType, rowElement, data }) => {
    if (rowType !== 'header' && data.status === 'Completed') {
      rowElement.classList.add('completed');
    }
  }, []);

  const navigateToDetails = useCallback(() => {
    navigate('/planning-task-details');
  }, []);

  return (
    <DataGrid className='planning-grid' ref={ref} dataSource={data} columnAutoWidth onRowPrepared={onRowPrepared} onRowClick={navigateToDetails}>
      <Paging pageSize={15} />
      <Pager visible showPageSizeSelector />
      <Editing mode='row' allowUpdating />
      <Selection selectAllMode='allPages' showCheckBoxesMode='always' mode='multiple' />
      <HeaderFilter visible />
      <Sorting mode='multiple' />

      <Column dataField='text' caption='Subject' hidingPriority={7}>
        <RequiredRule />
      </Column>
      <Column dataField='company' caption='Company' hidingPriority={6}>
        <RequiredRule />
      </Column>
      <Column dataField='priority' caption='Priority' cellRender={PriorityTask} editCellRender={EditPriority} hidingPriority={4}>
        <RequiredRule />
      </Column>
      <Column dataField='startDate' caption='Start Date' dataType='date' hidingPriority={2}>
        <RequiredRule />
      </Column>
      <Column dataField='dueDate' caption='Due Date' dataType='date' sortOrder='asc' hidingPriority={1}>
        <RequiredRule />
      </Column>
      <Column dataField='owner' caption='Owner' hidingPriority={5}>
        <RequiredRule />
      </Column>
      <Column dataField='status' caption='Status' minWidth={120} cellRender={StatusTask} editCellRender={EditStatus} hidingPriority={3}>
        <RequiredRule />
      </Column>
    </DataGrid>
  );
});
