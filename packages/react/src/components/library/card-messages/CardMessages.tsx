import React, { useState, useCallback, useEffect } from 'react';

import TextBox from 'devextreme-react/text-box';
import TextArea from 'devextreme-react/text-area';
import Toolbar, { Item } from 'devextreme-react/toolbar';
import Button from 'devextreme-react/button';
import FileUploder from 'devextreme-react/file-uploader';
import Validator, { RequiredRule } from 'devextreme-react/validator';
import ValidationGroup from 'devextreme-react/validation-group';

import { formatDate } from 'devextreme/localization';

import { Message, Messages } from '../../../types/card-messages';

import { UserAvatar } from '../user-avatar/UserAvatar';

import './CardMessages.scss';

const getText = (data: Message, user: string, manager: string) => {
  return data.text.replace('{username}', data.manager !== manager ? manager : user);
};

const Card = ({ data, user, manager }: { data: Message; user: string, manager: string }) => (
  <div className='message-container'>
    <UserAvatar owner={data.manager} />
    <div className='message dx-card'>
      <div className='message-title'>
        <div>
          <div className='subject'>{data.subject}</div>
          <div>
            {formatDate(new Date(data.date), 'MM/dd/yyyy')} - {data.manager}
          </div>
        </div>
        <div>
          <Button icon='overflow' stylingMode='text' />
        </div>
      </div>
      <div className='message-text'>{getText(data, user, manager)}</div>
    </div>
  </div>
);

export const CardMessages = ({ items, user }: {
  items?: Messages; user?: string;
}) => {
  const [messages, setMessages] = useState(items);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setMessages(items);
  }, [items]);

  const send = useCallback((e) => {
    if (!e.validationGroup.validate().isValid || !messages || !user) {
      return;
    }
    setMessages([...messages, { manager: user, date: new Date(), text: message, subject: title }]);
    e.validationGroup.reset();
  }, [message, title, messages, user]);

  const onTitleChanged = useCallback((value) => {
    setTitle(value);
  }, []);

  const onMessageChanged = useCallback((value) => {
    setMessage(value);
  }, []);

  return (
    <ValidationGroup>
      <div className='messages'>
        <div className='input-messages'>
          <TextBox label='Subject' stylingMode='filled' value={title} valueChangeEvent='keyup' onValueChange={onTitleChanged}>
            <Validator>
              <RequiredRule />
            </Validator>
          </TextBox>
          <TextArea label='Message' height={150} stylingMode='filled' value={message} valueChangeEvent='keyup' onValueChange={onMessageChanged}>
            <Validator>
              <RequiredRule />
            </Validator>
          </TextArea>
          <Toolbar>
            <Item
              location='before'
            >
              <FileUploder className='file-uploader' labelText='' selectButtonText='Attach file' />
            </Item>
            <Item
              location='after'
              widget='dxButton'
              options={{
                text: 'Send',
                stylingMode: 'contained',
                type: 'default',
                onClick: send,
              }}
            />
          </Toolbar>
        </div>
        <div className='messages-content'>
          <div className='message-list'>
            {user && messages?.map((message, index) => (
              <Card key={index} data={message} user={messages[1].manager} manager={messages[0].manager} />
            ))}
          </div>
        </div>
      </div>
    </ValidationGroup>
  );
};
