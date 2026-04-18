import './ChatAssistiant.scss';

import React, { useCallback, useState } from 'react';
import { ChatTypes } from 'devextreme-react/chat';

import { ChatFloatingButton } from '../../utils/chat-floating-button/ChatFloatingButton';
import { ChatCardComponent } from '../../utils/chat-card-component/ChatCardComponent';
import { ChatPopup } from '../../utils/chat-popup/ChatPopup';

const currentUser: ChatTypes.User = {
  id: 'current-user',
  name: 'You',
};

const assistantUser: ChatTypes.User = {
  id: 'ai-assistant',
  name: 'AI Assistant',
};

const createInitialMessages = (): ChatTypes.Message[] => [
  {
    id: 1,
    author: assistantUser,
    text: 'Hello! Ask me about trends, predictions, or what stands out in this dashboard.',
    timestamp: new Date(),
  },
];

const createAssistantReply = (messageText?: string): ChatTypes.Message => ({
  id: `assistant-${Date.now()}`,
  author: assistantUser,
  text: messageText
    ? `I captured your request: "${messageText}". Connect this handler to your backend assistant to return live insights.`
    : 'I can help analyze this dashboard once the assistant backend is connected.',
  timestamp: new Date(),
});

export const ChatAssistant = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [messages, setMessages] = useState<ChatTypes.Message[]>(
    createInitialMessages
  );

  const openPopup = useCallback(() => {
    setIsPinned(false);
    setIsPopupVisible(true);
  }, []);

  const changePopupVisibility = useCallback((visible: boolean) => {
    setIsPopupVisible(visible);
  }, []);

  const pinChat = useCallback(() => {
    setIsPopupVisible(false);
    setIsPinned(true);
  }, []);

  const unpinChat = useCallback(() => {
    setIsPinned(false);
    setIsPopupVisible(true);
  }, []);

  const closeChat = useCallback(() => {
    setIsPinned(false);
    setIsPopupVisible(false);
  }, []);

  const resetChat = useCallback(() => {
    setMessages(createInitialMessages());
  }, []);

  const onMessageEntered = useCallback(
    ({ message }: ChatTypes.MessageEnteredEvent) => {
      const nextUserMessage: ChatTypes.Message = {
        ...message,
        id: `user-${Date.now()}`,
        author: currentUser,
        timestamp: new Date(),
      };

      setMessages((currentMessages) => [
        ...currentMessages,
        nextUserMessage,
        createAssistantReply(nextUserMessage.text),
      ]);
    },
    []
  );

  return (
    <>
      {!isPinned && <ChatFloatingButton onClick={openPopup} />}
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
