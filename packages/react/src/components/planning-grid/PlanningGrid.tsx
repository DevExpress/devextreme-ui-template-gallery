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
import './PlanningGrid.scss';

const CellPriority = ({ text }) => {
    return (
        <div className={`cell-priority priority-${text.toLowerCase()}`}>
            <div className="cell-separator"></div>
            <span>{text}</span>
        </div>
    )
};

const CellStatus = ({ text }) => {
    return <span className={`cell-status status-${text.toLowerCase().replace(' ', '-')}`}>{text}</span>
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
        loading ? <LoadPanel visible /> :
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
            <Column dataField='priority' caption='Priority' cellRender={CellPriority} hidingPriority={4}>
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
            <Column dataField='status' caption='Status' minWidth="120" cellRender={CellStatus} hidingPriority={3}>
                <RequiredRule />
            </Column>
        </DataGrid>
    )
};

export default PlanningGrid;