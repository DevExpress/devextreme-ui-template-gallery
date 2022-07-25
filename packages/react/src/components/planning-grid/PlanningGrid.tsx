import React, { useEffect, useState } from 'react';
import DataGrid, {
    Column,
    Selection,
    Sorting,
    HeaderFilter,
} from 'devextreme-react/data-grid';
import LoadPanel from 'devextreme-react/load-panel';
import './PlanningGrid.scss';

const CellPriority = ({ text }) => {
    return (
        <div>
            <div></div>
            <span>{text}</span>
        </div>
    )
};

const CellStatus = ({ text }) => {
    return <span>{text}</span>
}

const PlanningGrid = ({ dataSource }) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if(dataSource.length !== 0) {
          setLoading(false);
        }
      }, [dataSource]);  
    return (
        loading ? <LoadPanel visible /> :
        <DataGrid 
            dataSource={dataSource}
            columnAutoWidth
        >
            <Selection selectAllMode='allPages' showCheckBoxesMode='always' mode='multiple'/>
            <HeaderFilter visible />
            <Sorting />
            <Column dataField='text' caption='Subject' hidingPriority={7} />
            <Column dataField='company' caption='Company' hidingPriority={6} />
            <Column dataField='priority' caption='Priority' cellRender={CellPriority} hidingPriority={4} />
            <Column dataField='startDate' caption='Start Date' hidingPriority={2} />
            <Column dataField='dueDate' caption='Due Date' hidingPriority={1} />
            <Column dataField='owner' caption='Owner' hidingPriority={5} />
            <Column dataField='status' caption='Status' cellRender={CellStatus} hidingPriority={3} />
        </DataGrid>
    )
};

export default PlanningGrid;