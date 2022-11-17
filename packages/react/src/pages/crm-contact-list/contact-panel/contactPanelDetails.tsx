
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import './contactPanel.scss';
import { Button, DropDownButton, ScrollView } from 'devextreme-react';
import Toolbar, { Item as ToolbarItem } from 'devextreme-react/toolbar';
import Form, { Item as FormItem, ColCountByScreen } from 'devextreme-react/form';
import Accordion, { Item as AccordionItem } from 'devextreme-react/accordion';
import { ClickEvent as ButtonClickEvent } from 'devextreme/ui/button';
import { formatNumber } from 'devextreme/localization';
import { Contact } from '../../../shared/types/crm-contact';
import { CardActivities } from '../../../components/card-activities/CardActivities';
import { FormTextbox, FormPhoto, ContactStatus } from '../../../components';
import { useScreenSize } from '../../../utils/media-query';

const accordionTitleClick = (e: ButtonClickEvent) => {
  e.event?.stopPropagation();
};

const renderCustomTitle = (item) => {
  return (
    <div>
      <span>{item.title}</span>
      <Button icon='add' type='default' stylingMode='text' onClick={accordionTitleClick} />
    </div>
  );
};

export const ContactPanelDetails = ({ contact, isOpen, changePanelOpen, onDataChanged } : { contact: Contact, isOpen: boolean, changePanelOpen:()=> void, onDataChanged:(data)=> void }) => {
  const [isPinned, setisPinned] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { isLarge, isMedium } = useScreenSize();

  const navigate = useNavigate();

  const formatPrice = (price) => {
    return formatNumber(price, {
      type: 'currency',
      currency: 'USD',
    });
  };

  const updateField = (field: string) => (value) => {
    onDataChanged({ ...contact, ...{ [field]: value } });
  };

  const onPinClick = useCallback(() => {
    setisPinned(!isPinned);
  }, [isPinned]);

  const onClosePanelClick = useCallback(() => {
    setisPinned(false);
    changePanelOpen();
  }, []);

  const toggleEditHandler = useCallback(() => {
    setIsEditing(!isEditing);
  }, [isEditing]);

  const navigateToDetails = () => {
    navigate('/crm-contact-details');
  };

  const renderCustomOpportunities = () => {
    return (
      contact.opportunities.map((item, idx) => {
        return (
          <div className='opportunities' key={idx}>
            <span className='value'>{item.name}</span>
            <br />
            <span className='value black small'>{formatPrice(item.price)}</span>
          </div>
        );
      }));
  };

  const renderCustomActivities = () => {
    return (<CardActivities activities={contact.activities} />);
  };

  return (
    <div id='contact-panel' className={classNames({ 'panel': true, 'open': isOpen, 'pin': isPinned && (isLarge || isMedium) })}>
      <div className='data-wrapper'>
        <div className='data-part'>
          <Toolbar className='panel-toolbar'>
            <ToolbarItem location='before'>
              <span className='contact-name value'>{contact.name}</span>
            </ToolbarItem>
            <ToolbarItem location='before'>
              <ContactStatus text={contact.status} />
            </ToolbarItem>
            <ToolbarItem
              location='after'
              visible={isLarge || isMedium}
            >
              <Button icon='pin' onClick={onPinClick} />
            </ToolbarItem>
            <ToolbarItem location='after'>
              <Button icon='close' onClick={onClosePanelClick} />
            </ToolbarItem>
          </Toolbar>
        </div>
        <ScrollView className='panel-scroll'>
          <div className='data-part border'>
            <Form
              className={classNames({ 'plain-styled-form': true, 'view-mode': !isEditing })}
            >
              <FormItem itemType='group' colCount={2}>
                <ColCountByScreen xs={2} />
                <FormItem cssClass='photo'>
                  <FormPhoto link={contact.image} size={124} />
                </FormItem>
                <FormItem itemType='group'>
                  <FormItem cssClass='accent'>
                    <FormTextbox
                      label='Company'
                      value={contact.company}
                      isEditing={!isEditing}
                      onValueChange={updateField('company')}
                    />
                  </FormItem>
                  <FormItem>
                    <FormTextbox
                      label='Position'
                      value={contact.position}
                      isEditing={!isEditing}
                      onValueChange={updateField('position')}
                    />
                  </FormItem>
                  <FormItem cssClass='accent'>
                    <FormTextbox
                      label='Assigned to'
                      value={contact.manager}
                      isEditing={!isEditing}
                      onValueChange={updateField('manager')}
                    />
                  </FormItem>
                </FormItem>
              </FormItem>

              <FormItem itemType='group' cssClass='contact-fields-group'>
                <FormItem>
                  <FormTextbox
                    value={contact.phone}
                    isEditing={!isEditing}
                    onValueChange={updateField('phone')}
                    icon='tel'
                    mask='+1(000)000-0000'
                  />
                </FormItem>
                <FormItem>
                  <FormTextbox
                    value={contact.email}
                    isEditing={!isEditing}
                    onValueChange={updateField('email')}
                    icon='email'
                  />
                </FormItem>
                <FormItem>
                  <FormTextbox
                    value={contact.address}
                    isEditing={!isEditing}
                    onValueChange={updateField('address')}
                    icon='home'
                  />
                </FormItem>
              </FormItem>
            </Form>
          </div>

          <div className='data-part data-part-toolbar border'>
            <Toolbar>
              <ToolbarItem location='before' visible={!isEditing}>
                <Button icon='edit' text='Edit' stylingMode='outlined' type='default' onClick={toggleEditHandler} />
              </ToolbarItem>
              <ToolbarItem location='before' visible={!isEditing}>
                <Button text='Details' stylingMode='outlined' type='default' onClick={navigateToDetails} />
              </ToolbarItem>
              <ToolbarItem location='before' locateInMenu='before' visible={isEditing}>
                <Button text='Save' stylingMode='outlined' type='default' onClick={toggleEditHandler} />
              </ToolbarItem>
              <ToolbarItem location='before' locateInMenu='before' visible={isEditing}>
                <Button text='Cancel' stylingMode='text' onClick={toggleEditHandler} />
              </ToolbarItem>
              <ToolbarItem location='after' visible={!isEditing}>
                <DropDownButton text='Actions' width={120} stylingMode='contained' items={['Call', 'Send Fax', 'Send Email', 'Make a Meeting']} />
              </ToolbarItem>
            </Toolbar>
          </div>
          <div className='data-part'>
            <Accordion multiple collapsible itemTitleRender={renderCustomTitle}>
              <AccordionItem title='Opportunities' render={renderCustomOpportunities} />
              <AccordionItem title='Activities' render={renderCustomActivities} />
            </Accordion>
          </div>
        </ScrollView>
      </div>
    </div>
  );
};
