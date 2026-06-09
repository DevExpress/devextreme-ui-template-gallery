import './ChatCardComponent.scss';

import React, { useCallback } from 'react';

import Chat, { ChatTypes } from 'devextreme-react/chat';
import Button from 'devextreme-react/button';
import { ChatEmptyView, ChatEmptyViewTexts } from '../chat-empty-view/ChatEmptyView';
import { messageRender } from '../chat-message-render/chatMessageRender';

type ChatCardComponentProps = {
  messages: ChatTypes.Message[];
  currentUser: ChatTypes.User;
  typingUsers?: ChatTypes.User[];
  alerts?: ChatTypes.Alert[];
  isProcessing?: boolean;
  onMessageEntered: (event: ChatTypes.MessageEnteredEvent) => void;
  onPromptClick: (messageText: string) => void;
  onResetClick: () => void;
  onCloseClick: () => void;
  onUnpinClick: () => void;
};

export const ChatCardComponent = ({
  messages,
  currentUser,
  typingUsers = [],
  alerts = [],
  isProcessing = false,
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
          <span className='chat-card-icon dx-icon dx-icon-sparkle' aria-hidden />
          <div className='chat-card-component__title-content'>
            <div className='chat-card-component__title'>AI Data Insights</div>
          </div>
        </div>
        <div className='chat-card-component__actions'>
          <Button
            icon='clearformat'
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
          className={`chat-card-component__chat${isProcessing ? ' chat-disabled' : ''}`}
          user={currentUser}
          items={messages}
          typingUsers={typingUsers}
          alerts={alerts}
          height='100%'
          emptyViewRender={renderEmptyView}
          showAvatar={false}
          showDayHeaders={false}
          onMessageEntered={onMessageEntered}
          messageRender={messageRender}
        />
      </div>
    </section>
  );
};
