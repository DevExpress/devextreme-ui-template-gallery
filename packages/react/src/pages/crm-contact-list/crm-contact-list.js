import React, { useState } from 'react';
import DataGrid, {
  Column,
  Selection,
  Export,
  Toolbar as GridToolbar,
  Item as GridToolbarItem,
  SearchPanel
} from 'devextreme-react/data-grid';
import Toolbar, { Item } from 'devextreme-react/toolbar';
import ScrollView from 'devextreme-react/scroll-view';
import Accordion, { Item as AccordionItem } from 'devextreme-react/accordion';
import './crm-contact-list.scss';

const CrmContactList = () => {
  const gridData = [{
    name: 'Robert Reaga',
    status: 1,
    id: 120545,
    products: [
      { productId: 1, productStatus: 1 },
      { productId: 2, productStatus: 2 }
    ],
    manager: 'Sarah Davix',
    organization: 'SV Consult',
    address: '69 Ruthven St #24, Boston, MA 02121, United States of America',
    email: '1@2',
  }, {
    name: 'Samuel Browick',
    status: 2,
    id: 120545,
    products: [
      { productId: 1, productStatus: 2 },
      { productId: 2, productStatus: 1 }
    ],
    manager: 'Brett Johnson',
    organization: 'SV Consult',
    address: '69 Ruthven St #24, Boston, MA 02121, United States of America',
    email: '2@2',
  }];

  const statuses = {
    1: 'New',
    2: 'Active',
  };

  const products = {
    1: 'CRM System',
    2: 'Task Management',
  };

  const productStatuses = {
    1: 'Lead',
    2: 'Trial sent'
  };

  const [isPanelOpen, setPanelOpen] = useState(false);
  const [isPanelPin, setPanelPin] = useState(false);
  const [panelData, setPanelData] = useState(gridData[0]);

  function console(message) {
    console.log(message);
  }

  function rowClick(e) {
    setPanelData(e.data);
    setPanelOpen(true);
  }

  function closePanel() {
    setPanelOpen(false);
  }

  function pinClick() {
    setPanelPin(!isPanelPin);
  };

  function renderStatus(data) {
    return <span className={'status status-' + data.data.status}>{statuses[data.data.status]}</span>;
  }

  function renderProducts(data) {
    return <span>
      {data.data.products.map((product, i) =>
        <span key={i}>
          <span>{products[product.productId]} </span>
          <span className={'cloud cloud-' + product.productStatus}>
            {productStatuses[product.productStatus]}
          </span>
        </span>)}
    </span>
  }
  return (<React.Fragment>
    <div className="view-wrapper">
      <DataGrid
        dataSource={gridData}
        height="100%"
        onRowClick={rowClick}
      >
        <SearchPanel visible={true}
          width={240}
          placeholder="Contact Search" />
        <Export
          enabled={true}
          allowExportSelectedData={true} />
        <GridToolbar>
          <GridToolbarItem location="before">
            <div className="grid-header">Contact List</div>
          </GridToolbarItem>
          <GridToolbarItem
            location="after"
            locateInMenu="auto"
            widget="dxButton"
            options={{ text: 'Add Contact', icon: 'plus', type: 'default', stylingMode: 'contained' }}
          ></GridToolbarItem>
          <GridToolbarItem
            location="after"
            locateInMenu="auto"
            showText="inMenu"
            widget="dxButton"
            options={{ text: 'Refresh', icon: 'refresh' }}
          ></GridToolbarItem>
          <GridToolbarItem
            location="after"
            locateInMenu="auto">
            <div className="separator"></div>
          </GridToolbarItem>
          <GridToolbarItem name="exportButton"></GridToolbarItem>
          <GridToolbarItem
            location="after"
            locateInMenu="auto">
            <div className="separator"></div>
          </GridToolbarItem>
          <GridToolbarItem
            location="after"
            locateInMenu="auto"
            showText="inMenu"
            widget="dxButton"
            options={{ text: 'Remove', icon: 'trash' }}
          ></GridToolbarItem>
          <GridToolbarItem name="searchPanel"></GridToolbarItem>
        </GridToolbar>
        <Selection
          selectAllMode="allPages"
          showCheckBoxesMode="always"
          mode="multiple"
        />
        <Column dataField="name" caption="Name" hidingPriority={5} minWidth={150} />
        <Column dataField="status" caption="Status" dataType="string" cellRender={renderStatus} hidingPriority={3} minWidth={100} />
        <Column dataField="id" caption="ID" hidingPriority={1} />
        <Column dataField="Products" caption="Products" hidingPriority={0} minWidth={400} cellRender={renderProducts} />
        <Column dataField="manager" caption="Manager" hidingPriority={4} />
        <Column dataField="organization" caption="Organization" hidingPriority={2} />
      </DataGrid>

      <div className={'panel ' + (isPanelPin ? 'pin ' : '') + (isPanelOpen ? 'open' : '')}>
        {panelData &&
          <div className="data-wrapper">
            <Toolbar>
              <Item location="before">
                <div className="contact-name">{panelData.name}</div>
              </Item>
              <Item location="before">
                <span className={'status status-' + panelData.status}>{statuses[panelData.status]}</span>
              </Item>
              <Item
                location="after"
                widget="dxButton"
                options={{ icon: isPanelPin ? 'unpin' : 'pin', onClick: pinClick }}
              ></Item>
              <Item
                location="after"
                widget="dxButton"
                options={{ icon: 'close', onClick: closePanel }}
              ></Item>
            </Toolbar>
            <ScrollView>
              <div className="user-info">
                <div className="photo"></div>
                <div className="info">
                  <div>{panelData.id}</div>
                  <div><i className="dx-icon-user"></i> <span>{panelData.manager}</span></div>
                  <div><i className="dx-icon-product"></i> <span>{panelData.organization}</span></div>
                  <div><i className="dx-icon-email"></i> <span>{panelData.email}</span></div>
                </div>
              </div>
              <div>{panelData.address}</div>
              <Toolbar>
                <Item
                  location="before"
                  widget="dxButton"
                  options={{ icon: 'edit', stylingMode: 'outlined', text: 'Edit' }}
                ></Item>
                <Item
                  location="center"
                  widget="dxButton"
                  options={{ stylingMode: 'text', text: 'Send email' }}
                ></Item>
                <Item
                  location="after"
                  widget="dxDropDownButton"
                  options={{ text: 'Action' }}
                ></Item>
              </Toolbar>
              <Accordion
                multiple={true}
                collapsible={true}
              >
                <AccordionItem
                  title="Licenses"
                >
                  <div className="licenses">
                    <div>
                      <div className="caption">Income</div>
                      <div className="value">$1,650,00</div>
                    </div>
                    <div>
                      <div className="caption">Licences</div>
                      <div className="value">1</div>
                    </div>
                    <div>
                      <div className="caption">Active Licences</div>
                      <div className="value">1</div>
                    </div>
                  </div>
                </AccordionItem>
                <AccordionItem
                  title="Opportunities"
                >
                    {panelData.products.map((product, i) =>
                      <span className="oportunities" key={i}>
                        <span className="item">{products[product.productId]} </span>
                        <span className={'cloud cloud-' + product.productStatus}>{productStatuses[product.productStatus]}</span>
                        <br/>
                      </span>
                    )}
                </AccordionItem>
                <AccordionItem
                  title="Activities"
                >
                  c
                </AccordionItem>
              </Accordion>
            </ScrollView>
          </div>
        }
      </div>
    </div>
  </React.Fragment>
  )
};

export default CrmContactList;


