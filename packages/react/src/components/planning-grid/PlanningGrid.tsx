import React, { useEffect, useState, useCallback } from 'react';
import DataGrid, {
    Column,
    Selection,
    Sorting,
    HeaderFilter,
    Scrolling,
    RequiredRule,
} from 'devextreme-react/data-grid';
import LoadPanel from 'devextreme-react/load-panel';
import SelectBox from 'devextreme-react/select-box';
import TextBox from 'devextreme-react/text-box';
import PriorityTask from '../priority-task/PriorityTask';
import StatusTask from '../status-task/StatusTask';
import { PRIORITY_ITEMS, STATUS_ITEMS } from '../../shared/constants'; 
import './PlanningGrid.scss';

const EditComponent = ({ items, editComponent: Component, setValue }) => {
    const EditField = (data) => (
        <div>
            {data && <Component text={data}></Component>}
            <TextBox readOnly></TextBox>
        </div>
    );
    const EditItem = (data) => <Component text={data}></Component>;

    return <SelectBox
        className="edit-cell"
        items={items}
        fieldRender={EditField}
        itemRender={EditItem}
        onValueChanged={(e) => setValue(e.value)}
    >
    </SelectBox>
};

const EditStatus = ({ setValue }) => (
    <EditComponent items={STATUS_ITEMS} editComponent={StatusTask} setValue={setValue} />
);
const EditPriority = ({ setValue }) => (
    <EditComponent items={PRIORITY_ITEMS} editComponent={PriorityTask} setValue={setValue} />
);
const PlanningGrid = ({ dataSource, forwardedRef }) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();
    useEffect(() => {
        if(dataSource.length !== 0) {
          setLoading(false);
          setData(dataSource.filter(d => d.status && d.priority));
        }
      }, [dataSource]);
    const onRowPrepared = useCallback((e) => {
        const { rowType, rowElement, data } = e;

        if (rowType === 'header') return;
    
        if (data.status === 'Completed') {
          rowElement.classList.add('completed');
        }
    }, []);
    return (
        loading ? <LoadPanel container=".content" visible position={{ of: '.content' }} /> :
        <DataGrid
            ref={forwardedRef}
            dataSource={data}
            columnAutoWidth
            onRowPrepared={onRowPrepared}
        >
            <Scrolling mode='virtual'></Scrolling>
            <Selection selectAllMode='allPages' showCheckBoxesMode='always' mode='multiple'/>
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
            <Column dataField='startDate' caption='Start Date' dataType="date" hidingPriority={2}>
                <RequiredRule />
            </Column>
            <Column dataField='dueDate' caption='Due Date' dataType="date" hidingPriority={1}>
                <RequiredRule />
            </Column>
            <Column dataField='owner' caption='Owner' hidingPriority={5}>
                <RequiredRule />
            </Column>
            <Column dataField='status' caption='Status' minWidth="120" cellRender={StatusTask} editCellRender={EditStatus} hidingPriority={3}>
                <RequiredRule />
            </Column>
        </DataGrid>
    )
};

export default PlanningGrid;