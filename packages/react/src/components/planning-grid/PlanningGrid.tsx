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
import './PlanningGrid.scss';

const priorityItems = ['Low', 'Normal', 'High'];
const statusItems = ['Open', 'In Progress', 'Deferred', 'Completed'];

const CellPriority = ({ text }) => (
    <div className={`cell-priority priority-${text.toLowerCase()}`}>
        <div className="cell-separator"></div>
        <span>{text}</span>
    </div>
);

const CellStatus = ({ text }) => <span className={`cell-status status-${text.toLowerCase().replace(' ', '-')}`}>{text}</span>;

const EditFieldPriority = (data) => (
    <div>
        {data && <CellPriority text={data}></CellPriority>}
        <TextBox readOnly></TextBox>
    </div>
);

const EditItemPriority = (data) => <CellPriority text={data}></CellPriority>;

const EditFieldStatus = (data) => (
    <div>
        {data && <CellStatus text={data}></CellStatus>}
        <TextBox readOnly></TextBox>
    </div>
);

const EditItemStatus = (data) => <CellStatus text={data}></CellStatus>;

const EditCellPriority = (props) => {
    return (
        <SelectBox
            className="edit-cell"
            items={priorityItems}
            fieldRender={EditFieldPriority}
            itemRender={EditItemPriority}
            onValueChanged={(e) => props.setValue(e.value)}
        >
        </SelectBox>
    )
}
const EditCellStatus = (props) => {
    return (
        <SelectBox
            className="edit-cell"
            items={statusItems}
            fieldRender={EditFieldStatus}
            itemRender={EditItemStatus}
            onValueChanged={(e) => props.setValue(e.value)}
        >
        </SelectBox>
    )
}

const PlanningGrid = ({ dataSource, forwardedRef }) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if(dataSource.length !== 0) {
          setLoading(false);
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
            dataSource={dataSource}
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
            <Column dataField='priority' caption='Priority' cellRender={CellPriority} editCellRender={EditCellPriority} hidingPriority={4}>
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
            <Column dataField='status' caption='Status' minWidth="120" cellRender={CellStatus} editCellRender={EditCellStatus} hidingPriority={3}>
                <RequiredRule />
            </Column>
        </DataGrid>
    )
};

export default PlanningGrid;