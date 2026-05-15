import './ChatCardComponent.scss';

import React, { useCallback } from 'react';

import Chat, { ChatTypes } from 'devextreme-react/chat';
import Button from 'devextreme-react/button';
import { ChatEmptyView, ChatEmptyViewTexts } from '../chat-empty-view/ChatEmptyView';

type ChatCardComponentProps = {
  messages: ChatTypes.Message[];
  currentUser: ChatTypes.User;
  onMessageEntered: (event: ChatTypes.MessageEnteredEvent) => void;
  onPromptClick: (messageText: string) => void;
  onResetClick: () => void;
  onCloseClick: () => void;
  onUnpinClick: () => void;
};

export const ChatCardComponent = ({
  messages,
  currentUser,
  onMessageEntered,
  onPromptClick,
  onResetClick,
  onCloseClick,
  onUnpinClick,
}: ChatCardComponentProps) => {
  const renderEmptyView = useCallback(
    (texts: ChatEmptyViewTexts) => (
      <ChatEmptyView texts={texts} onPromptClick={onPromptClick} />
    ),
    [onPromptClick]
  );

  return (
    <section className='chat-card-component'>
      <div className='chat-card-component__header'>
        <div className='chat-card-component__title-section'>
          <div className='chat-card-component__icon'>
            <span className='dx-icon-sparkle' />
          </div>
          <div className='chat-card-component__title-content'>
            <div className='chat-card-component__title'>AI Data Insights</div>
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
          emptyViewRender={renderEmptyView}
          showAvatar={false}
          showDayHeaders={false}
          onMessageEntered={onMessageEntered}
        />
      </div>
    </section>
  );
};
