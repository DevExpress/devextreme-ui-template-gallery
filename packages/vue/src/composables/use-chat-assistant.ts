import { ref } from 'vue';
import { DashboardContext, ConversationMessage, getAIResponse, ALERT_TIMEOUT } from './dashboard-ai-service';

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

interface ChatAlert {
  message: string;
}

const currentUser: ChatUser = {
  id: 'current-user',
  name: 'You',
};

const assistantUser: ChatUser = {
  id: 'ai-assistant',
  name: 'AI Assistant',
};

export function useChatAssistant(context?: { value: DashboardContext | undefined }) {
  const isPopupVisible = ref(false);
  const isPinned = ref(false);
  const messages = ref<ChatMessage[]>([]);
  const typingUsers = ref<ChatUser[]>([]);
  const alerts = ref<ChatAlert[]>([]);
  const isProcessing = ref(false);
  const conversationHistory: ConversationMessage[] = [];

  const submitUserMessage = async (messageDraft: Partial<ChatMessage> & Pick<ChatMessage, 'text'>) => {
    const nextUserMessage: ChatMessage = {
      ...messageDraft,
      id: `user-${Date.now()}`,
      author: currentUser,
      timestamp: new Date(),
    };

    messages.value = [...messages.value, nextUserMessage];
    isProcessing.value = true;
    typingUsers.value = [assistantUser];

    conversationHistory.push({
      role: 'user',
      content: nextUserMessage.text ?? '',
    });

    try {
      const ctx = context?.value;
      let responseText: string;

      if (ctx) {
        responseText = await getAIResponse(conversationHistory, ctx);
      } else {
        responseText = 'Dashboard data is not yet available. Please wait for the data to load.';
      }

      conversationHistory.push({
        role: 'assistant',
        content: responseText,
      });

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        author: assistantUser,
        text: responseText,
        timestamp: new Date(),
      };

      messages.value = [...messages.value, assistantMessage];
    } catch (e) {
      console.error('Chat AI error:', e);
      alerts.value = [{ message: 'Request limit reached, try again in a minute.' }];
      setTimeout(() => { alerts.value = []; }, ALERT_TIMEOUT);

      conversationHistory.pop();
    } finally {
      typingUsers.value = [];
      isProcessing.value = false;
    }
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
    conversationHistory.length = 0;
    alerts.value = [];
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
}
