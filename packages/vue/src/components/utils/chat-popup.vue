<template>
  <dx-popup
    title="AI Data Insights"
    :visible="visible"
    width="min(420px, calc(100% - 64px))"
    height="min(640px, calc(100% - 48px))"
    :drag-enabled="true"
    :drag-and-resize-area="documentBody"
    :show-close-button="true"
    :shading="false"
    container=".content"
    :position="popupPosition"
    :wrapper-attr="popupWrapperAttr"
    @hidden="$emit('update:visible', false)"
    @showing="$emit('update:visible', true)"
  >
    <dx-animation :show="popupShowAnimation"
:hide="popupHideAnimation" />
    <dx-popup-item toolbar="top"
location="before">
      <div class="chat-popup__title-section">
        <span class="chat-card-icon dx-icon dx-icon-sparkle"
aria-hidden />
        <div class="chat-popup__title">AI Data Insights</div>
      </div>
    </dx-popup-item>

    <dx-popup-item toolbar="top"
location="after">
      <dx-button
        icon="clearformat"
        styling-mode="text"
        hint="Reset chat"
        @click="$emit('reset-click')"
      />
    </dx-popup-item>

    <dx-popup-item toolbar="top"
location="after">
      <dx-button
        icon="pin"
        styling-mode="text"
        hint="Pin"
        :element-attr="{ class: 'chat-popup__pin-button' }"
        @click="$emit('pin-click')"
      />
    </dx-popup-item>

    <div class="chat-popup__body">
      <dx-chat
        :class="'chat-popup__chat' + (isProcessing ? ' chat-disabled' : '')"
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
  </dx-popup>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { DxPopup, DxToolbarItem as DxPopupItem, DxAnimation } from 'devextreme-vue/popup';
import { DxChat } from 'devextreme-vue/chat';
import DxButton from 'devextreme-vue/button';
import ChatEmptyView from '@/components/utils/chat-empty-view.vue';
import ChatMessageRender from '@/components/utils/chat-message-render.vue';
import { screenInfo } from '@/utils/media-query';

defineProps<{
  visible: boolean;
  messages: Array<unknown>;
  currentUser: { id: string; name: string };
  typingUsers?: Array<unknown>;
  alerts?: Array<unknown>;
  isProcessing?: boolean;
}>();

defineEmits<{
  (e: 'update:visible', visible: boolean): void;
  (e: 'message-entered', event: unknown): void;
  (e: 'prompt-click', messageText: string): void;
  (e: 'reset-click'): void;
  (e: 'pin-click'): void;
}>();

const documentBody = document.body;

const popupShowAnimation = computed(() => ({
  duration: screenInfo.value.isLarge ? 300 : 0,
  from: { scale: 0.55 },
  type: 'pop',
}));

const popupHideAnimation = computed(() => ({
  duration: screenInfo.value.isLarge ? 300 : 0,
  from: { opacity: 1, scale: 1 },
  to: { opacity: 0, scale: 0.55 },
  type: 'pop',
}));

const popupPosition = {
  my: { x: 'right', y: 'bottom' },
  at: { x: 'right', y: 'bottom' },
  of: '.content',
  offset: '-32 -24',
};

const popupWrapperAttr = { class: 'chat-popup' };
</script>

<style lang="scss">
.chat-popup {
  .dx-overlay-content {
    max-width: calc(100% - 64px);
    max-height: calc(100% - 48px);
  }

  .dx-popup-title.dx-toolbar {
    padding-block: 16px;
  }

  .dx-toolbar-before {
    overflow: visible;
  }

  .dx-popup-title .dx-toolbar-label {
    display: none;
  }

  .dx-popup-content {
    padding: 0;
    display: flex;
    flex-direction: column;
    min-height: 0;
    overflow: hidden;
  }

  .dx-toolbar-after {
    gap: 4px;
  }
}

.chat-popup__title-section {
  display: flex;
  align-items: center;
  gap: 8px;
}

.chat-popup__title-section .chat-card-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: var(--accent-color);
  font-size: 20px;
  line-height: 20px;
  flex-shrink: 0;
}

.chat-popup__title {
  font-size: 18px;
  font-weight: 600;
  color: var(--base-text-color);
}

.chat-popup__body {
  display: flex;
  flex: 1 1 auto;
  min-height: 0;
  overflow: hidden;
}

.chat-popup__chat {
  flex: 1 1 auto;
  min-height: 0;
  min-width: 0;
}

.chat-popup__chat.dx-chat {
  display: flex;
  flex-direction: column;
  border: 0;
  border-radius: 0;
  background: transparent;
}

.chat-popup__chat .dx-chat-messagelist {
  flex: 1 1 auto;
  min-height: 0;
}

.chat-popup__chat
.dx-chat-messagelist
> .dx-scrollable
> .dx-scrollable-wrapper
> .dx-scrollable-container
> .dx-scrollable-content {
  padding-inline: 24px;
}

.chat-popup__chat .dx-chat-messagelist-day-header:first-child {
  padding-top: 24px;
}

.chat-popup__chat .dx-chat-messagebox {
  flex: 0 0 auto;
  padding: 16px 24px 24px;
}

.chat-disabled .dx-chat-messagebox .dx-texteditor-input {
  pointer-events: none;
  opacity: 0.6;
}

.screen-small,
.screen-x-small {
  .chat-popup {
    .dx-overlay-content {
      top: 50% !important;
      right: auto !important;
      bottom: auto !important;
      left: 50% !important;
      transform: translate(-50%, -50%) !important;
      width: calc(100% - 24px) !important;
      height: min(640px, calc(100% - 24px)) !important;
      max-width: calc(100% - 24px);
      max-height: calc(100% - 24px);
    }

    .chat-popup__pin-button {
      display: none;
    }
  }
}
</style>
