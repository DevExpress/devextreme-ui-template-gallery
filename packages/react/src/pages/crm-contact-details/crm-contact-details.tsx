import React, { useEffect, useState, useCallback } from 'react';

import { Item } from 'devextreme-react/toolbar';
import Button from 'devextreme-react/button';
import DropDownButton from 'devextreme-react/drop-down-button';
import TabPanel, { Item as TabPanelItem } from 'devextreme-react/tab-panel';

import {
  ContactForm,
  ToolbarDetails,
  CardActivities,
  CardNotes,
  CardMessages,
  CardTasks,
  CardOpportunities
} from '../../components';

import { Contact } from '../../types/crm-contact';

import {
  getContact,
  getContactNotes,
  getContactMessages,
  getActiveContactOpportunities,
  getClosedContactOpportunities
} from 'dx-template-gallery-data';

import './crm-contact-details.scss';

const CONTACT_ID = 12;

export const CRMContactDetails = () => {
  const [data, setData] = useState<Contact>();
  const [messagesCount, setMessagesCount] = useState(0);
  const [notes, setNotes] = useState();
  const [messages, setMessages] = useState([]);
  const [activeOpportunities, setActiveOpportunities] = useState();
  const [closedOpportunities, setClosedOpportunities] = useState();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = useCallback(() => {
    Promise.all([
      getContact(CONTACT_ID)
        .then((data) => {
          setData(data);
        }),
      getContactNotes(CONTACT_ID)
        .then((data) => {
          setNotes(data);
        }),
      getContactMessages(CONTACT_ID)
        .then((data) => {
          setMessages(data);
          setMessagesCount(data.length);
        }),
      getActiveContactOpportunities(CONTACT_ID)
        .then((data) => {
          setActiveOpportunities(data);
        }),
      getClosedContactOpportunities(CONTACT_ID)
        .then((data) => {
          setClosedOpportunities(data);
        }),
    ]).catch((error) => console.log(error));
  }, []);

  const refresh = useCallback(() => {
    loadData();
  }, []);

  const onMessagesCountChanged = useCallback((count) => {
    setMessagesCount(count);
  }, []);

  return (
    <div className='view-wrapper view-wrapper-contact-details'>
      <ToolbarDetails name={data?.name}>
        <Item location='after' locateInMenu='auto'>
          <Button
            text='Terminate'
            type='default'
            stylingMode='contained'
          />
        </Item>
        <Item location='after'>
          <DropDownButton
            text='Actions'
            stylingMode='text'
            width={120}
            items={['Assign to Me', 'Archive']}
          />
        </Item>
        <Item location='after' locateInMenu='auto'>
          <div className='separator' />
        </Item>
        <Item
          location='after'
          locateInMenu='auto'
          widget='dxButton'
          showText='inMenu'
        >
          <Button
            text='Copy'
            icon='copy'
            stylingMode='text'
          />
        </Item>
        <Item
          location='after'
          locateInMenu='auto'
          widget='dxButton'
          showText='inMenu'
        >
          <Button
            text='Refresh'
            icon='refresh'
            stylingMode='text'
            onClick={refresh}
          />
        </Item>
      </ToolbarDetails>

      <div className='panels'>
        <div className='left'>
          <ContactForm
            data={data}
          />
        </div>

        <div className='right'>
          <div className='dx-card'>
            <TabPanel showNavButtons deferRendering={false}>
              <TabPanelItem title='Tasks'>
                <CardTasks
                  tasks={data?.tasks}
                />
              </TabPanelItem>
              <TabPanelItem title='Activities'>
                <CardActivities activities={data?.activities} />
              </TabPanelItem>
              <TabPanelItem title='Opportunities'>
                <CardOpportunities
                  active={activeOpportunities}
                  closed={closedOpportunities}
                />
              </TabPanelItem>
              <TabPanelItem title='Notes'>
                <CardNotes items={notes} user={data?.name} />
              </TabPanelItem>
              <TabPanelItem title='Messages' badge={messagesCount}>
                <CardMessages items={messages} user={data?.name} onMessagesCountChanged={onMessagesCountChanged} />
              </TabPanelItem>
            </TabPanel>
          </div>
        </div>
      </div>
    </div>
  );
};
