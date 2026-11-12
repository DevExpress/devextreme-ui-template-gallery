import { Injectable, signal } from '@angular/core';
import { DxChatTypes } from 'devextreme-angular/ui/chat';
import { DashboardContext, ConversationMessage, getAIResponse, ALERT_TIMEOUT } from './dashboard-ai.service';

type Message = DxChatTypes.Message;
type MessageEnteredEvent = DxChatTypes.MessageEnteredEvent;
type User = DxChatTypes.User;
type Alert = DxChatTypes.Alert;

type ChatMessageDraft = Partial<Message> & { text?: string };

const currentUser: User = {
  id: 'current-user',
  name: 'You',
};

const assistantUser: User = {
  id: 'ai-assistant',
  name: 'AI Assistant',
};

export const createInitialMessages = (): Message[] => [];

@Injectable()
export class ChatAssistantService {
  isPopupVisible = signal(false);

  isPinned = signal(false);

  messages = signal<Message[]>(createInitialMessages());

  typingUsers = signal<User[]>([]);

  alerts = signal<Alert[]>([]);

  isProcessing = signal(false);

  context: DashboardContext | undefined;

  readonly currentUser = currentUser;

  private conversationHistory: ConversationMessage[] = [];

  private async submitUserMessage(messageDraft: ChatMessageDraft) {
    const nextUserMessage: Message = {
      ...messageDraft,
      id: `user-${Date.now()}`,
      author: currentUser,
      timestamp: new Date(),
    };

    this.messages.update((messages) => [...messages, nextUserMessage]);
    this.isProcessing.set(true);
    this.typingUsers.set([assistantUser]);

    this.conversationHistory.push({
      role: 'user',
      content: nextUserMessage.text ?? '',
    });

    try {
      let responseText: string;

      if (this.context) {
        responseText = await getAIResponse(this.conversationHistory, this.context);
      } else {
        responseText = 'Dashboard data is not yet available. Please wait for the data to load.';
      }

      this.conversationHistory.push({
        role: 'assistant',
        content: responseText,
      });

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        author: assistantUser,
        text: responseText,
        timestamp: new Date(),
      };

      this.messages.update((messages) => [...messages, assistantMessage]);
    } catch {
      this.alerts.set([{ message: 'Request limit reached, try again in a minute.' }]);
      setTimeout(() => { this.alerts.set([]); }, ALERT_TIMEOUT);

      this.conversationHistory.pop();
    } finally {
      this.typingUsers.set([]);
      this.isProcessing.set(false);
    }
  }

  openPopup() {
    this.isPinned.set(false);
    this.isPopupVisible.set(true);
  }

  changePopupVisibility(visible: boolean) {
    this.isPopupVisible.set(visible);
  }

  pinChat() {
    this.isPopupVisible.set(false);
    this.isPinned.set(true);
  }

  unpinChat() {
    this.isPinned.set(false);
    this.isPopupVisible.set(true);
  }

  closeChat() {
    this.isPinned.set(false);
    this.isPopupVisible.set(false);
  }

  resetChat() {
    this.messages.set(createInitialMessages());
    this.conversationHistory = [];
    this.alerts.set([]);
  }

  onPromptClick(messageText: string) {
    this.submitUserMessage({ text: messageText });
  }

  onMessageEntered(event: MessageEnteredEvent) {
    this.submitUserMessage(event.message as ChatMessageDraft);
  }
}
