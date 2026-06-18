import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  DataGrid,
  DataGridRef,
  Column,
  Selection,
  Sorting,
  HeaderFilter,
  DataGridTypes,
  RequiredRule,
  Paging,
  Pager,
  Editing,
  Scrolling,
  LoadPanel,
} from 'devextreme-react/data-grid';
import SelectBox, { FieldAddons } from 'devextreme-react/select-box';

import { StatusIndicator } from '../status-indicator/StatusIndicator';
import {
  editBeforeRender,
  statusItemRender,
  priorityBeforeRender,
  priorityItemRender,
} from '../../../shared/statusIndicatorRenderMethods';

import { PRIORITY_ITEMS, STATUS_ITEMS } from '../../../shared/constants';

import { Task, PlanningProps } from '../../../types/task';
import { GridEdit } from '../../../types/planning-grid';

import './TaskListGrid.scss';

let useNavigation = true;

const priorityCellRender = ({ text }) => {
  return <StatusIndicator text={`| ${text}`} />;
};

const CellComponent = ({ data }: { data: { text: string } }) => (
  <StatusIndicator text={data.text} />
);

const editStatusRender = ({ setValue, value }: GridEdit) => (
  <SelectBox
    className='edit-cell'
    defaultValue={value}
    items={STATUS_ITEMS}
    placeholder=''
    displayExpr={() => ''}
    itemRender={statusItemRender}
    onValueChange={(value) => setValue(value)}
  >
    <FieldAddons beforeRender={editBeforeRender} />
  </SelectBox>
);
const editPriorityRender = ({ setValue, value }: GridEdit) => (
  <SelectBox
    className='edit-cell'
    defaultValue={value}
    items={PRIORITY_ITEMS}
    placeholder=''
    displayExpr={() => ''}
    itemRender={priorityItemRender}
    onValueChange={(value) => setValue(value)}
  >
    <FieldAddons beforeRender={priorityBeforeRender} />
  </SelectBox>
);

export const TaskListGrid = React.forwardRef<DataGridRef, PlanningProps>(
  ({ dataSource }, ref) => {
    const [data, setData] = useState<Task[]>();

    const navigate = useNavigate();

    useEffect(() => {
      setData(dataSource.filter((d) => d.status && d.priority));
    }, [dataSource]);

    const navigateToDetails = useCallback(
      ({ rowType, data }: DataGridTypes.RowClickEvent) => {
        if (useNavigation && rowType !== 'detailAdaptive') {
          navigate(`/planning-task-details?id=${data.id}`);
        }
      },
      []
    );

    const toogleUseNavigation = useCallback(() => {
      useNavigation = !useNavigation;
    }, []);

    return (
      <DataGrid
        className='planning-grid theme-dependent'
        ref={ref}
        dataSource={data}
        columnAutoWidth
        hoverStateEnabled
        showBorders
        height='100%'
        onEditingStart={toogleUseNavigation}
        onEditCanceled={toogleUseNavigation}
        onSaved={toogleUseNavigation}
        onRowClick={navigateToDetails}
      >
        <LoadPanel enabled={false} />
        <Scrolling mode='virtual' />
        <Paging defaultPageSize={30} />
        <Pager visible />
        <Editing mode='row' allowUpdating />
        <Selection
          selectAllMode='allPages'
          showCheckBoxesMode='always'
          mode='multiple'
        />
        <HeaderFilter visible />
        <Sorting mode='multiple' />

        <Column dataField='text' caption='Subject' hidingPriority={7}>
          <RequiredRule />
        </Column>
        <Column dataField='company' caption='Company' hidingPriority={6}>
          <RequiredRule />
        </Column>
        <Column
          dataField='priority'
          caption='Priority'
          cellRender={priorityCellRender}
          editCellRender={editPriorityRender}
          hidingPriority={4}
        >
          <RequiredRule />
        </Column>
        <Column
          dataField='startDate'
          caption='Start Date'
          dataType='date'
          hidingPriority={2}
        >
          <RequiredRule />
        </Column>
        <Column
          dataField='dueDate'
          caption='Due Date'
          dataType='date'
          sortOrder='asc'
          hidingPriority={1}
        >
          <RequiredRule />
        </Column>
        <Column dataField='owner' caption='Owner' hidingPriority={5}>
          <RequiredRule />
        </Column>
        <Column
          dataField='status'
          caption='Status'
          minWidth={120}
          cellComponent={CellComponent}
          editCellRender={editStatusRender}
          hidingPriority={3}
        >
          <RequiredRule />
        </Column>
      </DataGrid>
    );
  }
);
