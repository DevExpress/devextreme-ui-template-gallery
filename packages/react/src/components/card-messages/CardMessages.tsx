import React, { useState, useCallback, useEffect } from 'react';

import { defaultUser } from '../../utils/default-user';

import TextBox from 'devextreme-react/text-box';
import TextArea from 'devextreme-react/text-area';
import Toolbar, { Item } from 'devextreme-react/toolbar';
import Button from 'devextreme-react/button';
import FileUploder from 'devextreme-react/file-uploader';
import Validator, { RequiredRule } from 'devextreme-react/validator';
import ValidationGroup from 'devextreme-react/validation-group';

import { formatDate } from 'devextreme/localization';

import { Message, Messages } from '../../types/card-messages';

import { Avatar } from '../avatar/Avatar';

import './CardMessages.scss';

const getText = (data: Message, user: string) => {
  return data.text.replace('{username}', data.manager === user ? defaultUser.name : user);
};

const Card = ({ data, user }: { data: Message; user: string }) => (
  <div className='message-container'>
    <Avatar owner={data.manager} />
    <div className='message dx-card'>
      <div className='message-title'>
        <div>
          <div className='subject'>{data.subject}</div>
          <div>
            {formatDate(new Date(data.date), 'MM/dd/yyyy')} - {data.manager}
          </div>
        </div>
        <div>
          <Button icon='overflow' />
        </div>
      </div>
      <div className='message-text'>{getText(data, user)}</div>
    </div>
  </div>
);

export const CardMessages = ({ items, user, onMessagesCountChanged }: {
  items?: Messages; user?: string; onMessagesCountChanged: (count: number) => void
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
    onMessagesCountChanged(messages.length + 1);
    e.validationGroup.reset();
  }, [message, title, messages, user, onMessagesCountChanged]);

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
          <TextBox label='Subject' stylingMode='outlined' value={title} valueChangeEvent='keyup' onValueChange={onTitleChanged}>
            <Validator>
              <RequiredRule />
            </Validator>
          </TextBox>
          <TextArea label='Message' height={150} stylingMode='outlined' value={message} valueChangeEvent='keyup' onValueChange={onMessageChanged}>
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
                stylingMode: 'outlined',
                type: 'default',
                onClick: send,
              }}
            />
          </Toolbar>
        </div>
        <div className='messages-content'>
          <div className='message-list'>
            {user && messages?.map((message, index) => (
              <Card key={index} data={message} user={user} />
            ))}
          </div>
        </div>
      </div>
    </ValidationGroup>
  );
};
