import React, { useState, useCallback, useEffect } from 'react';

import TextBox from 'devextreme-react/text-box';
import TextArea from 'devextreme-react/text-area';
import Toolbar, { Item } from 'devextreme-react/toolbar';
import Button from 'devextreme-react/button';
import FileUploder from 'devextreme-react/file-uploader';
import ScrollView from 'devextreme-react/scroll-view';

import { formatDate } from 'devextreme/localization';

import { Message, Messages } from '../../shared/types/card-messages';
import { Avatar } from '../avatar/Avatar';

import './CardMessages.scss';

const getText = (text: string, user: string) => {
  return text.replace('{username}', user);
};

const Card = ({ data, user }: { data: Message; user: string }) => (
  <div className='message-container'>
    <Avatar owner={data.manager} />
    <div className='message dx-card'>
      <div className='message-title'>
        <div className='left-title'>
          <div className='subject'>{data.subject}</div>
          <div>
            {formatDate(new Date(data.date), 'MM/dd/yyyy')} - {data.manager}
          </div>
        </div>
        <div>
          <Button icon='overflow' />
        </div>
      </div>
      <div className='message-text'>{getText(data.text, user)}</div>
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

  const send = useCallback(() => {
    if ((message === '' && title === '') || !messages || !user) {
      return;
    }
    setMessages([...messages, { manager: user, date: new Date(), text: message, subject: title }]);
    setTitle('');
    setMessage('');
    onMessagesCountChanged(messages.length + 1);
  }, [message, title, messages, user, onMessagesCountChanged]);

  const onTitleChanged = useCallback((value) => {
    setTitle(value);
  }, []);

  const onMessageChanged = useCallback((value) => {
    setMessage(value);
  }, []);

  return (
    <div className='messages'>
      <div className='input-messages'>
        <TextBox label='Subject' stylingMode='outlined' value={title} valueChangeEvent='keyup' onValueChange={onTitleChanged} />
        <TextArea label='Message' height={150} stylingMode='outlined' value={message} valueChangeEvent='keyup' onValueChange={onMessageChanged} />
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
      <ScrollView className='message-list'>
        <div className='messages-content'>
          {user && messages?.map((message, index) => (
            <Card key={index} data={message} user={user} />
          ))}
        </div>
      </ScrollView>
    </div>
  );
};
