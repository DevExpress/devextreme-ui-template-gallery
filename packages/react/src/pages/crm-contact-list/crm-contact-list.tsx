import React, { useState, useCallback, useEffect } from 'react';
import './crm-contact-list.scss';

import DataGrid, {
    Sorting,
    Selection, 
    HeaderFilter, 
    Scrolling, 
    SearchPanel, 
    ColumnChooser, 
    Export, 
    Column, 
    Toolbar, 
    Item,
} from 'devextreme-react/data-grid';
import {  ColumnCellTemplateData } from 'devextreme/ui/data_grid';
import { 
    Button,
    DropDownButton,
    SelectBox,
    TextBox 
} from 'devextreme-react';
import { SelectionChangedEvent } from 'devextreme/ui/drop_down_button';
import { getContacts } from 'dx-rwa-data';
import { contactStatusList, ContactStatus } from '../../shared/types/contact';
import LoadPanel from 'devextreme-react/load-panel';

type FilterContactStatus = ContactStatus | 'All Contacts';

export default function CRMContactList() {
    let grid: any = null;

    const statusList = contactStatusList;

    const filterStatusList = ['All Contacts', ...contactStatusList];

    const [status, setStatus] = useState(filterStatusList[0]);
    const [gridData, setGridData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getContacts()
          .then((data) => setGridData(data))
          .catch((error) => console.log(error));
      }, []);

    useEffect(() => {
        if(gridData.length !== 0) {
          setLoading(false);
        }
      }, [gridData]);

    const cellNameRender = (cell: ColumnCellTemplateData) => {
        return (
            <div className={'name-template'}>
                <div>{cell.data.name}</div>
                <div className={'position'}>{cell.data.position}</div>
            </div>
        )
    }

    const cellStatusRender = (cell: ColumnCellTemplateData) => {
        return (
            <div>
                <span className={'status status-' + cell.data.status.toLowerCase()}>{cell.data.status}</span>
            </div>
        )
    }

    const statusRender = (data: string) => {
        return (
            <div>
                <span className={'status status-' + data.toLowerCase()}>{data}</span>
            </div>
        )
    }

    const fieldRender = (data: string) => {
        return (
            <div>
                { data && ( statusRender(data) )}
                <TextBox readOnly={true} />
            </div>
        ) 
    }

    const editCellStatusRender = () => {
        return (
            <SelectBox 
                className={'cell-info'}
                dataSource={statusList}
                itemRender={statusRender}
                fieldRender={fieldRender}
            />
        )
    }

    const cellPhoneRender = (cell: ColumnCellTemplateData) : string => {
        return String(cell.data.phone).replace(/(\d{3})(\d{3})(\d{4})/,'+1($1)$2-$3');

    }

    const filterByStatus = (e: SelectionChangedEvent) => {
        const { item: status }: { item: FilterContactStatus } = e;

        if(status === 'All Contacts') {
            grid.instance.clearFilter();
        } else {
            grid.instance.filter(['status', '=', status]);
        }

        setStatus(status);
    } 

    const addRow = () => {
        grid.instance.addRow();
    }

    const refresh = () => {
        grid.instance.refresh();
    }
    
    return (
      <React.Fragment>
          <div className={'view crm-contact-list'}>
            <div className={'view-wrapper'}>
                { !loading ? (
                <DataGrid 
                    className={'grid'}
                    noDataText={''}
                    dataSource={gridData}
                    ref={(ref) => { grid = ref; }}
                >
                    <SearchPanel visible={true} placeholder={'Contact Search'}/>
                    <ColumnChooser enabled={true} />
                    <Export enabled={true} allowExportSelectedData={true}/>
                    <Selection selectAllMode={'allPages'} showCheckBoxesMode={'always'} mode={'multiple'} />
                    <HeaderFilter visible={true} />
                    <Sorting mode={'multiple'} />
                    <Scrolling mode={'virtual'}  />
                    <Toolbar>
                        <Item
                            location={'before'}
                        >
                            <div className={'grid-header'}>Contact List</div>
                        </Item>
                        <Item
                            location={'before'}
                            locateInMenu={'auto'}
                        >
                            <DropDownButton
                                dataSource={filterStatusList}
                                stylingMode={'text'}
                                width={160}
                                selectedItemKey={status}
                                useSelectMode={true}
                                onSelectionChanged={filterByStatus}
                            ></DropDownButton>
                        </Item>
                        <Item
                            location={'after'}
                            locateInMenu={'auto'}
                        >
                            <Button 
                                icon={'plus'}
                                text={'Add Contact'}
                                type={'default'}
                                stylingMode={'contained'}
                                onClick={addRow}
                            ></Button>
                        </Item>
                        <Item
                            location={'after'}
                            locateInMenu={'auto'}
                            showText={'inMenu'}
                            widget={'dxButton'}
                        >
                            <Button 
                                icon={'refresh'}
                                text={'Refresh'}
                                stylingMode={'text'}
                                onClick={refresh}
                            ></Button>
                        </Item>
                        <Item
                            location={'after'}
                            locateInMenu={'auto'}
                        >
                            <div className={'separator'}></div>
                        </Item>
                        <Item
                            name={'exportButton'}
                        >
                        </Item>
                        <Item
                            location={'after'}
                            locateInMenu={'auto'}
                        >
                            <div className={'separator'}></div>
                        </Item>
                        <Item
                            name={'columnChooserButton'}
                            locateInMenu={'auto'}
                        >
                        </Item>
                        <Item
                            name={'searchPanel'}
                            locateInMenu={'auto'}
                        >
                        </Item>
                    </Toolbar>
                    <Column
                        dataField={'name'}
                        caption={'Name'}
                        sortOrder={'asc'}
                        hidingPriority={5}
                        minWidth={150}
                        cellRender={cellNameRender}
                    ></Column>
                    <Column
                        dataField={'company'}
                        caption={'Company'}
                        hidingPriority={5} 
                        minWidth={150}
                    >
                    </Column>
                    <Column
                        dataField={'status'}
                        caption={'Status'} 
                        dataType={'string'}
                        hidingPriority={3}
                        minWidth={100}
                        cellRender={cellStatusRender}
                        editCellRender={editCellStatusRender}
                    ></Column>
                    <Column
                        dataField={'assignedTo'}
                        caption={'Assigned to'} 
                        hidingPriority={4}
                    ></Column>
                    <Column
                        dataField={'phone'}
                        caption={'Phone'} 
                        hidingPriority={2}
                        cellRender={cellPhoneRender}
                    ></Column>
                    <Column
                        dataField={'email'}
                        caption={'Email'} 
                        hidingPriority={1}
                    ></Column>
                </DataGrid> ) : (<LoadPanel visible={true} />)
                }
            </div>
        </div>
      </React.Fragment>
  )}
