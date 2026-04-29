import './ChatAssistiant.scss';

import React from 'react';

import { ChatFloatingButton } from '../../utils/chat-floating-button/ChatFloatingButton';
import { ChatCardComponent } from '../../utils/chat-card-component/ChatCardComponent';
import { ChatPopup } from '../../utils/chat-popup/ChatPopup';
import { useChatAssistant } from './useChatAssistant';

export const ChatAssistant = () => {
  const {
    isPopupVisible,
    isPinned,
    messages,
    currentUser,
    openPopup,
    changePopupVisibility,
    pinChat,
    unpinChat,
    closeChat,
    resetChat,
    onMessageEntered,
  } = useChatAssistant();

  return (
    <>
      {!isPinned && !isPopupVisible && <ChatFloatingButton onClick={openPopup} />}
      <ChatPopup
        visible={isPopupVisible}
        setVisible={changePopupVisibility}
        messages={messages}
        currentUser={currentUser}
        onMessageEntered={onMessageEntered}
        onResetClick={resetChat}
        onPinClick={pinChat}
      />
      {isPinned && (
        <div className='chat-assistant__rail'>
          <ChatCardComponent
            messages={messages}
            currentUser={currentUser}
            onMessageEntered={onMessageEntered}
            onResetClick={resetChat}
            onCloseClick={closeChat}
            onUnpinClick={unpinChat}
          />
        </div>
      )}
    </>
  );
};
