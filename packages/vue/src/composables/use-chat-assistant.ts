import { ref, computed } from 'vue';

interface ChatUser {
  id: string;
  name: string;
}

interface ChatMessage {
  id?: string;
  author: ChatUser;
  text?: string;
  timestamp: Date;
}

const currentUser: ChatUser = {
  id: 'current-user',
  name: 'You',
};

const assistantUser: ChatUser = {
  id: 'ai-assistant',
  name: 'AI Assistant',
};

const createAssistantReply = (messageText?: string): ChatMessage => ({
  id: `assistant-${Date.now()}`,
  author: assistantUser,
  text: messageText
    ? `I captured your request: "${messageText}".`
    : 'I can help analyze this dashboard.',
  timestamp: new Date(),
});

export function useChatAssistant() {
  const isPopupVisible = ref(false);
  const isPinned = ref(false);
  const messages = ref<ChatMessage[]>([]);

  const submitUserMessage = (messageDraft: Partial<ChatMessage> & Pick<ChatMessage, 'text'>) => {
    const nextUserMessage: ChatMessage = {
      ...messageDraft,
      id: `user-${Date.now()}`,
      author: currentUser,
      timestamp: new Date(),
    };

    messages.value = [
      ...messages.value,
      nextUserMessage,
      createAssistantReply(nextUserMessage.text),
    ];
  };

  const openPopup = () => {
    isPinned.value = false;
    isPopupVisible.value = true;
  };

  const changePopupVisibility = (visible: boolean) => {
    isPopupVisible.value = visible;
  };

  const pinChat = () => {
    isPopupVisible.value = false;
    isPinned.value = true;
  };

  const unpinChat = () => {
    isPinned.value = false;
    isPopupVisible.value = true;
  };

  const closeChat = () => {
    isPinned.value = false;
    isPopupVisible.value = false;
  };

  const resetChat = () => {
    messages.value = [];
  };

  const onPromptClick = (messageText: string) => {
    submitUserMessage({ text: messageText });
  };

  const onMessageEntered = (event: { message: Partial<ChatMessage> & Pick<ChatMessage, 'text'> }) => {
    submitUserMessage(event.message);
  };

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
}
