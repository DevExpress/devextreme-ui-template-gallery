<template>
  <section class="chat-card-component">
    <div class="chat-card-component__header">
      <div class="chat-card-component__title-section">
        <span class="chat-card-icon dx-icon dx-icon-sparkle"
aria-hidden />
        <div class="chat-card-component__title-content">
          <div class="chat-card-component__title">AI Data Insights</div>
        </div>
      </div>
      <div class="chat-card-component__actions">
        <dx-button
          icon="clearformat"
          styling-mode="text"
          hint="Reset chat"
          @click="$emit('reset-click')"
        />
        <dx-button
          icon="unpin"
          styling-mode="text"
          hint="Unpin"
          @click="$emit('unpin-click')"
        />
        <dx-button
          icon="close"
          styling-mode="text"
          hint="Close chat"
          @click="$emit('close-click')"
        />
      </div>
    </div>

    <div class="chat-card-component__body">
      <dx-chat
        :class="'chat-card-component__chat' + (isProcessing ? ' chat-disabled' : '')"
        :user="currentUser"
        :items="messages"
        :typing-users="typingUsers"
        :alerts="alerts"
        height="100%"
        :show-avatar="false"
        :show-day-headers="false"
        empty-view-template="emptyViewTemplate"
        message-template="messageTemplate"
        @message-entered="$emit('message-entered', $event)"
      >
        <template #emptyViewTemplate="{ data }">
          <chat-empty-view
            :message="data.texts.message"
            :prompt="data.texts.prompt"
            @prompt-click="$emit('prompt-click', $event)"
          />
        </template>
        <template #messageTemplate="{ data }">
          <chat-message-render :text="data.message?.text || ''" />
        </template>
      </dx-chat>
    </div>
  </section>
</template>

<script setup lang="ts">
import { DxChat } from 'devextreme-vue/chat';
import DxButton from 'devextreme-vue/button';
import ChatEmptyView from '@/components/utils/chat-empty-view.vue';
import ChatMessageRender from '@/components/utils/chat-message-render.vue';

defineProps<{
  messages: Array<unknown>;
  currentUser: { id: string; name: string };
  typingUsers?: Array<unknown>;
  alerts?: Array<unknown>;
  isProcessing?: boolean;
}>();

defineEmits<{
  (e: 'message-entered', event: unknown): void;
  (e: 'prompt-click', messageText: string): void;
  (e: 'reset-click'): void;
  (e: 'close-click'): void;
  (e: 'unpin-click'): void;
}>();
</script>

<style lang="scss">
@use '@/variables.scss' as *;

.chat-card-component {
  @include card-shadow();

  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  margin: 0;
  background: var(--base-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
}

.chat-card-component__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
}

.chat-card-component__title-section {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1 1 auto;
  min-width: 0;
}

.chat-card-component__title-content {
  min-width: 0;
}

.chat-card-component__actions {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 0 0 auto;
}

.chat-card-component__title-section .chat-card-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: var(--accent-color);
  font-size: 20px;
  line-height: 20px;
}

.chat-card-component__title {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.1;
  color: var(--base-text-color);
}

.chat-card-component__body {
  display: flex;
  flex: 1 1 0;
  min-height: 0;
  overflow: hidden;
}

.chat-card-component__chat {
  flex: 1 1 auto;
  min-height: 0;
  min-width: 0;
}

.chat-card-component__chat.dx-chat {
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 0;
  border-radius: 0;
  background: transparent;
}

.chat-card-component__chat .dx-chat-messagelist {
  flex: 1 1 auto;
  min-height: 0;
  overflow: hidden;
}

.chat-card-component__chat .dx-chat-messagebox {
  flex: 0 0 auto;
  padding: 20px 24px 24px;
}

.chat-disabled .dx-chat-messagebox .dx-texteditor-input {
  pointer-events: none;
  opacity: 0.6;
}

.chat-card-component__chat
.dx-chat-messagelist
> .dx-scrollable
> .dx-scrollable-wrapper
> .dx-scrollable-container
> .dx-scrollable-content {
  padding-inline: 24px;
}

.chat-card-component__chat .dx-chat-messagelist-day-header:first-child {
  padding-top: 24px;
}

@media only screen and (max-width: 1100px) {
  .chat-card-component {
    height: auto;
    min-height: 560px;
  }

  .chat-card-component__title {
    font-size: 24px;
  }
}

@media only screen and (max-width: 700px) {
  .chat-card-component__header {
    padding: 20px 20px 12px;
  }

  .chat-card-component__title {
    font-size: 22px;
  }
}
</style>
