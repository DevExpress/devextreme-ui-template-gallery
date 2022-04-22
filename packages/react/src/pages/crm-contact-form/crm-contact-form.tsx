import React from 'react';
import './crm-contact-form.scss';

import Toolbar, { Item as ToolbarItem } from 'devextreme-react/toolbar';
 import TabPanel, { Item as TabPanelItem } from "devextreme-react/tab-panel";
import Form, { Item as FormItem, Label } from "devextreme-react/form";
import { Button, DataGrid, DropDownButton } from 'devextreme-react';
import { getContact } from 'dx-rwa-data';

const viewData = {
  id:12,
  name:"Sammy Hill",
  firstName:"Sam",
  lastName:"Hill",
  city:"Pasadena",
  state:{
    sateId:5,
    stateShort:"CA",
    stateLong:"California",
    flag48p:null,
    flag24px:null,ssmaTimeStamp:"AAAAAAAACQk=",contacts:[]},zipCode: 91103,status:"Salaried",company:"ElectrixMax",
    position:"Sales Assistant",manager:"John Heart",phone:"6265557292",email:"sammyh@dx-email.com",
    address:"645 Prospect Crescent",activities:[{name:"Task created",date:"2020-11-27T00:03:20",manager:"John Heart"},{name:"Call planned",date:"2020-12-02T16:43:20",manager:"John Heart"},
    {name:"Outbound call logged",date:"2020-12-02T18:23:20",manager:"John Heart"},
    {name:"Message sent",date:"2021-12-03T02:03:20",manager:"John Heart"},{name:"Task completed",date:"2020-02-07T18:43:20",manager:"John Heart"}],opportunities:[{name:"Audio/Video Upgrade",price:2125.0000},{name:"Summer Discount Offer",price:3740.0000},{name:"Hospital Conference Room Set",price:898.0000},{name:"POS Touch Screens",price:2530.0000}],tasks:[{text:"Call to clarify customer requirements.",date:"2020-11-27T12:00:00"},{text:"Send pictures/brochures of new products.",date:"2020-11-27T06:26:40"},{text:"Follow up and discuss the offer.",date:"2020-11-26T11:00:00"},{text:"Obtain CEO contact information.",date:"2020-11-26T05:26:40"},{text:"Create requested product comparison report.",date:"2020-11-25T10:00:00"},{text:"Generate a quote.",date:"2020-11-25T04:26:40"},{text:"Apply discounts and generate a binding offer.",date:"2020-11-24T09:00:00"},{text:"Obtain feedback on new equipment.",date:"2020-11-24T03:26:40"},{text:"Send SWAG to customer.",date:"2020-11-23T08:00:00"},{text:"Ask if upgrade is required.",date:"2020-11-23T02:26:40"}]
  };

export default function CRMContactForm() {
  const edit = false;
  // const userId = 12;
  //let viewData: any;

  // getContact(userId).then((data) => {
  //   viewData = data;
  // });


  const formatPhone = (phone: any) : string => {
    return String(phone).replace(/(\d{3})(\d{3})(\d{4})/,"+1($1)$2-$3");
  }

  return (
    <React.Fragment>
      <div className="view crm-contact-form">
        <div className="view-wrapper">
          <Toolbar >
              <ToolbarItem location="before">
                <Button 
                  icon="arrowleft"
                />
              </ToolbarItem>
              <ToolbarItem location="before">
                  <div className="toolbar-header">{viewData.name}</div>
              </ToolbarItem>
              <ToolbarItem location="after" locateInMenu="auto">
                  <Button 
                    text="Terminate"
                    type="default"
                    stylingMode="contained"
                  />
              </ToolbarItem>
              <ToolbarItem location="after" locateInMenu="auto">
                  <DropDownButton 
                      items={['Assign to Me', 'Archive']} 
                      stylingMode="text"
                      width={120}
                      text="Action">
                  </DropDownButton>
              </ToolbarItem>
              <ToolbarItem location="after" locateInMenu="auto">
                  <div className="separator"></div>
              </ToolbarItem>
              <ToolbarItem 
                location="after" 
                locateInMenu="auto" 
                showText="inMenu" 
                widget="dxButton">

                  <Button 
                    text="Copy"
                    icon="copy"
                    stylingMode='text'
                  />
              </ToolbarItem>
              <ToolbarItem 
                location="after" 
                locateInMenu="auto" 
                showText="inMenu" 
                widget="dxButton">

                  <Button 
                    text="Refresh"
                    icon="refresh"
                    stylingMode='text'
                  />
              </ToolbarItem>
          </Toolbar>

          <div className="panels">
              <div className="left">
                  <Toolbar>
                      <ToolbarItem location="before">
                          <div className="panels-header">Details</div>
                      </ToolbarItem>
                      <ToolbarItem location="after" visible={!edit} locateInMenu="after" >
                          <Button 
                            text="Edit"
                            icon="edit"
                            type="default"
                            stylingMode="outlined"
                          />
                      </ToolbarItem>
                      <ToolbarItem location="after" visible={edit} locateInMenu="after">
                          <Button 
                            text="Save"
                            type="default"
                            stylingMode="outlined"
                          />
                      </ToolbarItem>
                      <ToolbarItem location="after" visible={edit} locateInMenu="after">
                          <Button 
                            text="Cancel"
                          />
                      </ToolbarItem>
                  </Toolbar>
                  
                  {edit ? ( 
                    <div>
                      <div className="user-info">
                        <div className="photo" >
                        </div>
                        <div className="text-info">
                          <div className="title">Status</div>
                          <div className="value status ">{viewData.status}</div>
                          <div className="title">First Name</div>
                          <div className="value black">{viewData.firstName}</div>
                          <div className="title">Last Name</div>
                          <div className="value black">{viewData.lastName}</div>
                        </div>
                      </div>
                      <div className="info">
                          <div>
                              <div className="title">Position</div>
                              <div className="value black">{}</div>
                          </div>
                          <div>
                              <div className="title">Assigned to</div>
                              <div className="value">{viewData.manager}</div>
                          </div>
                      </div>
                      <div className="info last">
                          <div>
                              <div className="title">Company</div>
                              <div className="value">{viewData.company}</div>
                          </div>
                      </div>

                      <div className="panels-header">Contacts</div>

                      <div className="info">
                          <div>
                              <div className="title">Address</div>
                              <div className="value black">{viewData.address}</div>
                          </div>
                      </div>
                      <div className="info">
                          <div>
                              <div className="title">City</div>
                              <div className="value black">{viewData.city}</div>
                          </div>
                          <div className="narrow">
                              <div>
                                  <div className="title">State</div>
                                  <div className="value black">{viewData.state.stateShort}</div>
                              </div>
                              <div>
                                  <div className="title">Zip Code</div>
                                  <div className="value black">{viewData.zipCode}</div>
                              </div>
                          </div>
                          
                      </div>
                      <div className="info last small">
                          <div>
                              <div className="title">Phone</div>
                              <div className="value black">{formatPhone(viewData.phone)}</div>
                              <Button 
                                text="Call" 
                                icon="tel" 
                                type="default"
                                stylingMode="outlined" 
                                className="button"
                              />
                          </div>
                          <div>
                              <div className="title">Email</div>
                              <div className="value black">{viewData.email}</div>
                              <Button 
                                  text="Send Email" 
                                  icon="email" 
                                  type="default" 
                                  stylingMode="outlined" 
                                  className="button"
                              />
                          </div>
                      </div>
                      </div>
                    ) : (

                      <Form 
                        className="form last" 
                        formData={viewData} 
                        labelMode="floating" 
                        colCount={1} 
                        labelLocation="top" >
                          
                          <FormItem itemType="group" colCount={2}>
                              <FormItem>
                                  <div className="user-info">
                                      <div className="photo form">
                                      </div>
                                  </div>
                              </FormItem>
                              <FormItem itemType="group" colSpan={3}>
                                  <FormItem dataField="status"></FormItem>
                                  <FormItem dataField="firstName"></FormItem>
                                  <FormItem dataField="lastName"></FormItem>
                              </FormItem>
                          </FormItem>
                          <FormItem itemType="group" colCount={2}>
                              <FormItem dataField="position"></FormItem>
                              <FormItem dataField="manager">
                                <Label text="Assigned to"></Label>
                              </FormItem>
                              <FormItem dataField="company" colSpan={2}></FormItem>
                          </FormItem>
                          <FormItem>
                              <div className="panels-header">Contacts</div>
                          </FormItem>
                          <FormItem itemType="group" colCount={4}>
                              <FormItem dataField="city" colSpan={2}></FormItem>
                              <FormItem dataField="state.stateShort"></FormItem>
                              <FormItem dataField="zipCode"></FormItem>
                              <FormItem dataField="phone" colSpan={2}></FormItem>
                              <FormItem dataField="email" colSpan={2}></FormItem>
                          </FormItem>
                      </Form>
                  )}
              </div>
              <div className="right">
                  <div className="dx-card">
                      {/* <TabPanel showNavButtons={true}>
                          <Item title="Tasks">
                              <div className="tab-content">
                                  <DataGrid dataSource={viewData.tasks} columnAutoWidth={true} selectionFilter={['done', '=', true]}>
                                      <Selection mode="multiple" deferred={true} />
                                      <Column dataField="text" caption="Name" hidingPriority={3}></Column>
                                      <Column dataField="date" dataType="date" hidingPriority={1}></Column>
                                      <Column caption="Assigned To" cellTemplate="assignTemplate" hidingPriority={0} cellRender={}>
                                      </Column>
                                  </DataGrid>
                              </div>
                          </Item>
                          <Item title="Activities">
                              <div className="tab-content">
                                  <app-activities activities={viewData.activities} showBy={true}></app-activities>
                              </div>
                          </Item>
                          <Item title="Opportunities">
                              <div className="tab-content">
                                  <div className="tiles">
                                      <div className="tiles-header">Active</div>
                                      <div className="tile" >
                                          <div className="name">{data.name}</div>
                                          <div className="product-info">Products: {{data.products}}, total: <span className="total">{}</span></div>
                                          <div className="owner">Owner: <span className="owner-name">{data.manager}</span></div>
                                      </div>
                                      <br>
                                      <Button text="Add Opportunity" icon="add" width="320" height="60" stylingMode="outlined" type="default" className="add-tile"></Button>
                                      <div className="tiles-header">Closed</div>
                                      <div className="tile" >
                                          <div className="name">{{data.name}}</div>
                                          <div className="product-info">Products: {data.products}, total: <span className="total">{}</span></div>
                                          <div className="owner">Owner: <span className="owner-name">{data.manager}</span></div>
                                      </div>
                                  </div>
                              </div>
                          </Item>
                          <Item title="Notes">

                          </Item>
                          <Item title="Messages" badge="">

                          </Item>
                      </TabPanel> */}
                  </div>
              </div>
          </div>
        </div>
    </div>
  </React.Fragment>
)}
