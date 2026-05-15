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
];

const createAssistantReply = (messageText?: string): ChatTypes.Message => ({
  id: `assistant-${Date.now()}`,
  author: assistantUser,
  text: messageText
    ? `I captured your request: "${messageText}".`
    : 'I can help analyze this dashboard.',
  timestamp: new Date(),
});

export const useChatAssistant = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [messages, setMessages] = useState<ChatTypes.Message[]>(createInitialMessages);

  const submitUserMessage = useCallback(
    (messageDraft: Partial<ChatTypes.Message> & Pick<ChatTypes.Message, 'text'>) => {
      const nextUserMessage: ChatTypes.Message = {
        ...messageDraft,
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

  const onPromptClick = useCallback(
    (messageText: string) => {
      submitUserMessage({ text: messageText });
    },
    [submitUserMessage]
  );

  const onMessageEntered = useCallback(
    ({ message }: ChatTypes.MessageEnteredEvent) => {
      submitUserMessage(message);
    },
    [submitUserMessage]
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
    onPromptClick,
    onMessageEntered,
  };
};
