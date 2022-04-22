import React from 'react';
import './crm-contact-list.scss';

import { 
    DataGrid,
    Sorting,
    Selection, 
    HeaderFilter, 
    Scrolling, 
    SearchPanel, 
    ColumnChooser, 
    Export, 
    Column, 
    Toolbar, 
    Item
} from 'devextreme-react/data-grid';
import { Button, DropDownButton } from 'devextreme-react';
import CustomStore from 'devextreme/data/custom_store';
import { getContacts, getStatuses } from 'dx-rwa-data';

export default function CRMContactList() {
    const contacts = new CustomStore({
        key: 'id',
        load: getContacts
      });

    const statuses = new CustomStore({
        loadMode: 'raw',
        load: getStatuses
      });

    const cellNameRender = (cell: any) => {
        return (
            <div className='name-template'>
                <div>{cell.data.name}</div>
                <div className="position">{cell.data.position}</div>
            </div>
        )
    }

    const cellStatusRender = (cell: any) => {
        return (
            <div>
                <span className={'status status-' + cell.data.status.toLowerCase()}>{cell.data.status}</span>
            </div>
        )
    }

    const cellPhoneRender = (cell: any) : string => {
        return String(cell.data.phone).replace(/(\d{3})(\d{3})(\d{4})/,"+1($1)$2-$3");

    }
    
    return (
      <React.Fragment>
          <div className="view crm-contact-list">
            <div className='view-wrapper'>
                <DataGrid 
                    className="grid"
                    noDataText=""
                    dataSource={contacts}
                >
                    <SearchPanel visible={true} placeholder="Contact Search"/>
                    <ColumnChooser enabled={true} />
                    <Export enabled={true} allowExportSelectedData={true}/>
                    <Selection selectAllMode="allPages" showCheckBoxesMode="always" mode="multiple" />
                    <HeaderFilter visible={true} />
                    <Scrolling mode="virtual" />
                    <Sorting mode="multiple" />
                    <Toolbar>
                        <Item
                            location="before"
                        >
                            <div className="grid-header">Contact List</div>
                        </Item>
                        <Item
                            location="before"
                            locateInMenu="auto"
                        >
                            <DropDownButton
                                dataSource={statuses}
                                stylingMode="text"
                                displayExpr="text"
                                keyExpr="status"
                                width="160"
                                selectedItemKey=""
                                useSelectMode={true}
                            ></DropDownButton>
                        </Item>
                        <Item
                            location="after"
                            locateInMenu="auto"
                        >
                            <Button 
                                icon="plus"
                                text="Add Contact"
                                type="default"
                                stylingMode="contained"
                            ></Button>
                        </Item>
                        <Item
                            location="after"
                            locateInMenu="auto"
                            showText="inMenu"
                            widget="dxButton"
                        >
                            <Button 
                                icon="refresh"
                                text="Refresh"
                                stylingMode="text"
                            ></Button>
                        </Item>
                        <Item
                            location="after"
                            locateInMenu="auto"
                        >
                            <div className="separator"></div>
                        </Item>
                        <Item
                            name="exportButton"
                        >
                        </Item>
                        <Item
                            location="after"
                            locateInMenu="auto"
                        >
                            <div className="separator"></div>
                        </Item>
                        <Item
                            name="columnChooserButton"
                            locateInMenu="auto"
                        >
                        </Item>
                        <Item
                            name="searchPanel"
                            locateInMenu="auto"
                        >
                        </Item>
                    </Toolbar>
                    <Column
                        dataField="name"
                        caption="Name"
                        sortOrder="asc"
                        hidingPriority={5}
                        minWidth={150}
                        cellRender={cellNameRender}
                    ></Column>
                    <Column
                        dataField="company"
                        caption="Company"
                        hidingPriority={5} 
                        minWidth={150}
                    >
                    </Column>
                    <Column
                        dataField="status"
                        caption="Status" 
                        dataType="string"
                        hidingPriority={3}
                        minWidth={100}
                        cellRender={cellStatusRender}
                    ></Column>
                    <Column
                        dataField="assignedTo"
                        caption="Assigned to" 
                        hidingPriority={4}
                    ></Column>
                    <Column
                        dataField="phone"
                        caption="Phone" 
                        hidingPriority={2}
                        cellRender={cellPhoneRender}
                    ></Column>
                    <Column
                        dataField="email"
                        caption="Email" 
                        hidingPriority={1}
                    ></Column>
                </DataGrid>
            </div>
        </div>
      </React.Fragment>
  )}
