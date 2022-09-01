import React, { useEffect, useState, useCallback } from 'react';
import DataGrid, { Column, Selection, Sorting, HeaderFilter, Scrolling, RequiredRule } from 'devextreme-react/data-grid';
import LoadPanel from 'devextreme-react/load-panel';
import SelectBox from 'devextreme-react/select-box';
import TextBox from 'devextreme-react/text-box';
import { PriorityTask } from '../priority-task/PriorityTask';
import { StatusTask } from '../status-task/StatusTask';
import { PRIORITY_ITEMS, STATUS_ITEMS } from '../../shared/constants';
import { Task, PlanningProps } from '../../shared/types/task';
import { GridEdit, GridEditComponent } from '../../shared/types/planning-grid';
import './PlanningGrid.scss';

const EditComponent = ({ items, editComponent: Component, setValue }: GridEditComponent) => {
  const EditField = (data: string) => (
    <div>
      {data && <Component text={data}></Component>}
      <TextBox readOnly></TextBox>
    </div>
  );
  const EditItem = (data: string) => <Component text={data}></Component>;

  return <SelectBox className='edit-cell' items={items} fieldRender={EditField} itemRender={EditItem} onValueChange={(value) => setValue(value)}></SelectBox>;
};

const EditStatus = ({ setValue }: GridEdit) => <EditComponent items={STATUS_ITEMS} editComponent={StatusTask} setValue={setValue} />;
const EditPriority = ({ setValue }: GridEdit) => <EditComponent items={PRIORITY_ITEMS} editComponent={PriorityTask} setValue={setValue} />;
export const PlanningGrid = React.forwardRef<DataGrid, PlanningProps>(({ dataSource }, ref) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Task[]>();
  useEffect(() => {
    if (dataSource.length !== 0) {
      setLoading(false);
      setData(dataSource.filter((d) => d.status && d.priority));
    }
  }, [dataSource]);
  const onRowPrepared = useCallback(({ rowType, rowElement, data }) => {
    if (rowType !== 'header' && data.status === 'Completed') {
      rowElement.classList.add('completed');
    }
  }, []);
  return loading ? (
    <LoadPanel container='.content' visible position={{ of: '.content' }} />
  ) : (
    <DataGrid ref={ref} dataSource={data} columnAutoWidth onRowPrepared={onRowPrepared}>
      <Scrolling mode='virtual'></Scrolling>
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
      <Column dataField='startDate' caption='Start Date' dataType='date' sortOrder='desc' hidingPriority={2}>
        <RequiredRule />
      </Column>
      <Column dataField='dueDate' caption='Due Date' dataType='date' hidingPriority={1}>
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
