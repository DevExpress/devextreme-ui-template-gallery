import { useCallback, useRef, useState } from 'react';
import { ChatTypes } from 'devextreme-react/chat';
import { DashboardContext, ConversationMessage, getAIResponse, ALERT_TIMEOUT } from './dashboardAIService';

const currentUser: ChatTypes.User = {
  id: 'current-user',
  name: 'You',
};

const assistantUser: ChatTypes.User = {
  id: 'ai-assistant',
  name: 'AI Assistant',
};

export const createInitialMessages = (): ChatTypes.Message[] => [];

export const useChatAssistant = (context?: DashboardContext) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [messages, setMessages] = useState<ChatTypes.Message[]>(createInitialMessages);
  const [typingUsers, setTypingUsers] = useState<ChatTypes.User[]>([]);
  const [alerts, setAlerts] = useState<ChatTypes.Alert[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const contextRef = useRef<DashboardContext | undefined>(context);
  contextRef.current = context;
  const conversationRef = useRef<ConversationMessage[]>([]);

  const submitUserMessage = useCallback(
    async (messageDraft: Partial<ChatTypes.Message> & Pick<ChatTypes.Message, 'text'>) => {
      const nextUserMessage: ChatTypes.Message = {
        ...messageDraft,
        id: `user-${Date.now()}`,
        author: currentUser,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, nextUserMessage]);
      setIsProcessing(true);
      setTypingUsers([assistantUser]);

      conversationRef.current.push({
        role: 'user',
        content: nextUserMessage.text ?? '',
      });

      try {
        const ctx = contextRef.current;
        let responseText: string;

        if (ctx) {
          responseText = await getAIResponse(conversationRef.current, ctx);
        } else {
          responseText = 'Dashboard data is not yet available. Please wait for the data to load.';
        }

        conversationRef.current.push({
          role: 'assistant',
          content: responseText,
        });

        const assistantMessage: ChatTypes.Message = {
          id: `assistant-${Date.now()}`,
          author: assistantUser,
          text: responseText,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch {
        setAlerts([{ message: 'Request limit reached, try again in a minute.' }]);
        setTimeout(() => setAlerts([]), ALERT_TIMEOUT);

        conversationRef.current.pop();
      } finally {
        setTypingUsers([]);
        setIsProcessing(false);
      }
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
    conversationRef.current = [];
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
    typingUsers,
    alerts,
    isProcessing,
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
