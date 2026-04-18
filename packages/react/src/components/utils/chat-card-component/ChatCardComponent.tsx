import './ChatCardComponent.scss';

import React from 'react';

import Chat, { ChatTypes } from 'devextreme-react/chat';
import Button from 'devextreme-react/button';

type ChatCardComponentProps = {
  messages: ChatTypes.Message[];
  currentUser: ChatTypes.User;
  onMessageEntered: (event: ChatTypes.MessageEnteredEvent) => void;
  onResetClick: () => void;
  onCloseClick: () => void;
  onUnpinClick: () => void;
};

export const ChatCardComponent = ({
  messages,
  currentUser,
  onMessageEntered,
  onResetClick,
  onCloseClick,
  onUnpinClick,
}: ChatCardComponentProps) => {
  return (
    <section className='chat-card-component'>
      <div className='chat-card-component__header'>
        <div className='chat-card-component__title-section'>
          <div className='chat-card-component__icon'>
            <span className='dx-icon-sparkle' />
          </div>
          <div>
            <div className='chat-card-component__title'>AI Data Insights</div>
            <div className='chat-card-component__subtitle'>
              Pinned assistant
            </div>
          </div>
        </div>
        <div className='chat-card-component__actions'>
          <Button
            icon='refresh'
            stylingMode='text'
            hint='Reset chat'
            onClick={onResetClick}
          />
          <Button
            icon='unpin'
            stylingMode='text'
            hint='Unpin'
            onClick={onUnpinClick}
          />
          <Button
            icon='close'
            stylingMode='text'
            hint='Close chat'
            onClick={onCloseClick}
          />
        </div>
      </div>

      <div className='chat-card-component__body'>
        <Chat
          className='chat-card-component__chat'
          user={currentUser}
          items={messages}
          height='100%'
          showAvatar={false}
          showDayHeaders={false}
          onMessageEntered={onMessageEntered}
        />
      </div>
    </section>
  );
};
