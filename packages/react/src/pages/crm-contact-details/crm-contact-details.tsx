import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { Item, Toolbar } from 'devextreme-react/toolbar';
import Button from 'devextreme-react/button';
import DropDownButton from 'devextreme-react/drop-down-button';

import {
  ContactCards,
  ContactForm,
} from '../../components';

import { Contact } from '../../types/crm-contact';

import {
  getContact,
  getContactNotes,
  getContactMessages,
  getActiveContactOpportunities,
  getClosedContactOpportunities,
} from 'dx-template-gallery-data';

import './crm-contact-details.scss';
import ScrollView from 'devextreme-react/scroll-view';

const DEFAULT_CONTACT_ID = 12;

export const CRMContactDetails = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const navigate = useNavigate();
  const contactId = id ? parseInt(id, 10) : DEFAULT_CONTACT_ID;
  const [data, setData] = useState<Contact>();
  const [notes, setNotes] = useState();
  const [messages, setMessages] = useState([]);
  const [activeOpportunities, setActiveOpportunities] = useState();
  const [closedOpportunities, setClosedOpportunities] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = useCallback(() => {
    Promise.all([
      getContact(contactId)
        .then((data) => {
          setData(data);
        }),
      getContactNotes(contactId)
        .then((data) => {
          setNotes(data);
        }),
      getContactMessages(contactId)
        .then((data) => {
          setMessages(data);
        }),
      getActiveContactOpportunities(contactId)
        .then((data) => {
          setActiveOpportunities(data);
        }),
      getClosedContactOpportunities(contactId)
        .then((data) => {
          setClosedOpportunities(data);
        }),
    ]).then(() => { setIsLoading(false); }).catch((error) => console.log(error));
  }, [contactId]);

  const refresh = useCallback(() => {
    setIsLoading(true);
    loadData();
  }, [loadData]);

  return (
    <ScrollView className='view-wrapper-scroll'>
      <div className='view-wrapper view-wrapper-contact-details'>
        <Toolbar className='toolbar-details theme-dependent'>
          <Item location='before'>
            <Button
              icon='arrowleft'
              stylingMode='text'
              onClick={() => navigate('/crm-contact-list')}
            />
          </Item>
          <Item location='before' text={ data?.name ?? 'Loading...' } />
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
              dropDownOptions={{ width: 'auto' }}
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
        </Toolbar>

        <div className='panels'>
          <div className='left'>
            <ContactForm
              data={data}
              isLoading={isLoading}
            />
          </div>

          <div className='right'>
            <ContactCards
              isLoading={isLoading}
              activeOpportunities={activeOpportunities}
              closedOpportunities={closedOpportunities}
              notes={notes}
              messages={messages}
              tasks={data?.tasks}
              activities={data?.activities}
              name={data?.name} />
          </div>
        </div>
      </div>
    </ScrollView>
  );
};
