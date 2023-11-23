<template>
  <dx-validation-group>
    <div
      class="messages"
      id="card-messages"
    >
      <dx-load-panel
        :visible="props.isLoading"
        :show-pane="false"
        width="auto"
        container="#card-messages"
        :position="{ of: '#card-messages' }"
      />
      <template v-if="!!props.messages.length">
        <div class="input-content">
          <dx-text-box
            label="Subject"
            styling-mode="filled"
            :value="messageTitle"
            value-change-event="keyup"
            @value-changed="e => messageTitle = e.value"
          >
            <dx-validator>
              <dx-required-rule />
            </dx-validator>
          </dx-text-box>
          <dx-text-area
            label="Message"
            styling-mode="filled"
            :value="messageText"
            :height="150"
            value-change-event="keyup"
            @value-changed="e => messageText = e.value"
          >
            <dx-validator>
              <dx-required-rule />
            </dx-validator>
          </dx-text-area>

          <dx-toolbar>
            <dx-item location="before">
              <dx-file-uploader
                class="file-uploader"
                label-text=""
                select-button-text="Attach file"
              />
            </dx-item>
            <dx-item
              widget="dxButton"
              location="after"
              :options="{
                text: 'Send',
                stylingMode: 'contained',
                type: 'default',
                onClick: send,
              }"
            />
          </dx-toolbar>
        </div>
        <div class="messages-content">
          <div class="message-list">
            <div
              class="message-container"
              v-for="data in items"
            >
              <avatar :data-letters="getAvatarText(data.manager)" />
              <div class="message dx-card">
                <div class="message-title">
                  <div>
                    <div class="subject">
                      {{ data.subject }}
                    </div>
                    <div>{{ formatDate(new Date(data.date)) }} - {{ data.manager }}</div>
                  </div>
                  <dx-button
                    icon="overflow"
                    styling-mode="text"
                  />
                </div>
                <div class="message-text">
                  {{ getText(data) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </dx-validation-group>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { DxTextArea } from 'devextreme-vue/text-area';
import { DxTextBox } from 'devextreme-vue/text-box';
import { DxButton, DxButtonTypes } from 'devextreme-vue/button';
import { DxToolbar, DxItem } from 'devextreme-vue/toolbar';
import { DxFileUploader } from 'devextreme-vue/file-uploader';
import { DxValidationGroup } from 'devextreme-vue/validation-group';
import DxValidator, { DxRequiredRule } from 'devextreme-vue/validator';

import { formatDate } from '@/utils/formatters';
import DxLoadPanel from 'devextreme-vue/load-panel';

import type { Message } from '@/types/messages';

import Avatar from '@/components/library/user-avatar.vue';

const props = withDefaults(defineProps<{
  isLoading: boolean,
  user: string,
  messages: Message[],
}>(), {
  user: '',
  isLoading: true,
  messages: () => [],
});

const items = ref<Message[]>(props.messages);
const messageText = ref<string>('');
const messageTitle = ref<string>('');

watch(
  () => props.messages,
  (newValue) => {
    items.value = newValue;
  },
);

function getAvatarText(name: string) {
  return name.split(' ').map((namePart) => namePart[0]).join('');
}

function getText(data: Message) {
  return data.text.replace('{username}', data.manager !== items.value[0].manager ? items.value[0].manager : items.value[1].manager);
}

function send(e: DxButtonTypes.ClickEvent) {
  if (!e.validationGroup.validate().isValid) {
    return;
  }

  const newMessage: Message = {
    subject: messageTitle.value,
    text: messageText.value,
    manager: props.user,
    date: new Date(),
  };

  items.value.push(newMessage);

  e.validationGroup.reset();
}
</script>

<style scoped lang="scss">
@use "@/variables" as *;

@include messages-content();

#card-messages {
  min-height: 300px;
}
.input-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.file-uploader {
  :deep(.dx-fileuploader-wrapper) {
    padding: 0;

    .dx-fileuploader-input-wrapper {
      padding: 0;
    }
  }
}

.input-content {
  padding: 20px;
}

.message-container {
  display: flex;

  &:nth-child(odd) {
    flex-direction: row-reverse;
  }

  .message {
    @include card-shadow();

    border: 0.5px solid var(--border-color);
    background-color: var(--base-bg);
    padding: 10px;
    margin-bottom: 10px;

    .message-title {
      @include message-title();

      .subject {
        color: var(--base-text-color);
        font-weight: 700;
      }
    }

    .message-text {
      @include message-text();
    }
  }
}
</style>
