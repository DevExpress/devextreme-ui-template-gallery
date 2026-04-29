import { useCallback, useState } from 'react';
import { ChatTypes } from 'devextreme-react/chat';

const currentUser: ChatTypes.User = {
  id: 'current-user',
  name: 'You',
};

const assistantUser: ChatTypes.User = {
  id: 'ai-assistant',
  name: 'AI Assistant',
};

export const createInitialMessages = (): ChatTypes.Message[] => [
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

export const useChatAssistant = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [messages, setMessages] = useState<ChatTypes.Message[]>(createInitialMessages);

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

  return {
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
  };
};
