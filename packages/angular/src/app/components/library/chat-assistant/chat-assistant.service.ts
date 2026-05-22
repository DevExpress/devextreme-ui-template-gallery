import { Injectable } from '@angular/core';
import {
  Message,
  MessageEnteredEvent,
  User,
} from 'devextreme/ui/chat';

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

const createAssistantReply = (messageText?: string): Message => ({
  id: `assistant-${Date.now()}`,
  author: assistantUser,
  text: messageText
    ? `I captured your request: "${messageText}".`
    : 'I can help analyze this dashboard.',
  timestamp: new Date(),
});

@Injectable()
export class ChatAssistantService {
  isPopupVisible = false;

  isPinned = false;

  messages: Message[] = createInitialMessages();

  readonly currentUser = currentUser;

  private submitUserMessage(messageDraft: ChatMessageDraft) {
    const nextUserMessage: Message = {
      ...messageDraft,
      id: `user-${Date.now()}`,
      author: currentUser,
      timestamp: new Date(),
    };

    this.messages = [
      ...this.messages,
      nextUserMessage,
      createAssistantReply(messageDraft.text),
    ];
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
  }

  onPromptClick(messageText: string) {
    this.submitUserMessage({ text: messageText });
  }

  onMessageEntered(event: MessageEnteredEvent) {
    this.submitUserMessage(event.message as ChatMessageDraft);
  }
}
