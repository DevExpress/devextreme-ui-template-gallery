import { Injectable } from '@angular/core';
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
  isPopupVisible = false;

  isPinned = false;

  messages: Message[] = createInitialMessages();

  typingUsers: User[] = [];

  alerts: Alert[] = [];

  isProcessing = false;

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

    this.messages = [...this.messages, nextUserMessage];
    this.isProcessing = true;
    this.typingUsers = [assistantUser];

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

      this.messages = [...this.messages, assistantMessage];
    } catch {
      this.alerts = [{ message: 'Request limit reached, try again in a minute.' }];
      setTimeout(() => { this.alerts = []; }, ALERT_TIMEOUT);

      this.conversationHistory.pop();
    } finally {
      this.typingUsers = [];
      this.isProcessing = false;
    }
  }

  openPopup() {
    this.isPinned = false;
    this.isPopupVisible = true;
  }

  changePopupVisibility(visible: boolean) {
    this.isPopupVisible = visible;
  }

  pinChat() {
    this.isPopupVisible = false;
    this.isPinned = true;
  }

  unpinChat() {
    this.isPinned = false;
    this.isPopupVisible = true;
  }

  closeChat() {
    this.isPinned = false;
    this.isPopupVisible = false;
  }

  resetChat() {
    this.messages = createInitialMessages();
    this.conversationHistory = [];
    this.alerts = [];
  }

  onPromptClick(messageText: string) {
    this.submitUserMessage({ text: messageText });
  }

  onMessageEntered(event: MessageEnteredEvent) {
    this.submitUserMessage(event.message as ChatMessageDraft);
  }
}
