import React, { useEffect, useState } from 'react';

import Toolbar, { Item } from 'devextreme-react/toolbar';
import Button from 'devextreme-react/button';
import DropDowmButton from 'devextreme-react/drop-down-button';

import { ContactForm } from '../../components';

import { Contact } from '../../shared/types/crm-contact';
import { withLoadPanel } from '../../shared/utils/withLoadPanel';

import { getContact } from 'dx-rwa-data';

import './crm-contact-details.scss';

const CONTACT_ID = 12;

const ContactFormWithLoadPanel = withLoadPanel(ContactForm);

export const CRMContactDetails = () => {
  const [data, setData] = useState<Contact>();

  useEffect(() => {
    getContact(CONTACT_ID)
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className='view-wrapper-contact-details'>
      <Toolbar className='toolbar-contact-details'>
        <Item location='before'>
          <Button icon='arrowleft'></Button>
        </Item>
        <Item location='before' cssClass='contact-name-toolbar-item' text={data ? data.name : 'Loading...'}></Item>
        <Item location='after' locateInMenu='auto'>
          <Button
            text='Terminate'
            type='default'
            stylingMode='contained'
          ></Button>
        </Item>
        <Item location='after' locateInMenu='auto'>
          <DropDowmButton
            text='Actions'
            stylingMode='text'
            width={120}
            items={['Assign to Me', 'Archive']}
          ></DropDowmButton>
        </Item>
        <Item location='after' locateInMenu='auto'>
          <div className='separator'></div>
        </Item>
        <Item
          location='after'
          locateInMenu='auto'
          widget='dxButton'
          showText='inMenu'
          options={{
            text: 'Copy',
            icon: 'copy'
          }}
        ></Item>
        <Item
          location='after'
          locateInMenu='auto'
          widget='dxButton'
          showText='inMenu'
          options={{
            text: 'Refresh',
            icon: 'refresh',
            // onClick: refresh
          }}
        ></Item>
      </Toolbar>

      <div className='panels'>
        <div className='left'>
          <ContactFormWithLoadPanel
            loading={!data}
            data={data}
            panelProps={{
              container: '.contact-form',
              position: { of: '.contact-form' },
            }}
          />
        </div>

        <div className='right'>

        </div>
      </div>
    </div>
  );
};
