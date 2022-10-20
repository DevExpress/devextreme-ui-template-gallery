<template>
  <div class="messages" id="card-messages">
    <load-component :is-loading="isLoading"
                    :container-selector="'#card-messages'">
      <div class="input-content" >
        <dx-text-box
          label="Subject"
          styling-mode="outlined"
          :value="messageTitle"
          @value-changed="e => messageTitle = e.value"
        />
        <dx-text-area
          label="Message"
          styling-mode="outlined"
          :value="messageText"
          :height="150"
          @value-changed="e => messageText = e.value"
        />

        <dx-toolbar>
          <dx-item location="before">
            <dx-file-uploader
              class="file-uploader"
              labelText=""
              selectButtonText="Attach file"/>
          </dx-item>
          <dx-item widget="dxButton"
                   location="after"
                   :options="{
                       text: 'Send',
                       stylingMode: 'outlined',
                       type: 'default',
                       onClick: send,
          }"/>
          <dx-item widget="dxButton"
                   location="after"
                   :options="{
                        text: 'Cancel',
                       onClick: defaultText
              }"/>
        </dx-toolbar>
      </div>
      <div class="messages-content" >
        <div class="message-container" v-for="data in items">
          <div class="avatar">
            {{ getAvatarText(data.manager) }}
          </div>
          <div class="message dx-card">
            <div class="message-title">
              <div class="left-title">
                <div class="subject">{{ data.subject }}</div>
                <div>{{ formatDate(new Date(data.date)) }} - {{ data.manager }}</div>
              </div>
              <dx-button icon="overflow"></dx-button>
            </div>
            <div class="message-text">{{ setUserName(data.text) }}</div>
          </div>
        </div>
      </div>
    </load-component>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { DxTextArea } from 'devextreme-vue/text-area';
import { DxTextBox } from 'devextreme-vue/text-box';
import { DxButton } from 'devextreme-vue/button';
import { DxToolbar, DxItem } from 'devextreme-vue/toolbar';
import { DxFileUploader } from 'devextreme-vue/file-uploader';
import { formatDate } from '@/utils/formatters';
import LoadComponent from '@/components/load-component.vue';

import type { Message } from '@/types/messages';

const props = withDefaults(defineProps<{
  isLoading: boolean,
  contactName: string,
  messages: Message[],
}>(), {
  contactName: '',
  isLoading: true,
  messages: () => [],
});

const items = computed(() => [...props.messages]);
const messageText = ref<string>('');
const messageTitle = ref<string>('');

function defaultText() {
  messageTitle.value = '';
  messageText.value = '';
}

function getAvatarText(name: string) {
  return name.split(' ').map((namePart) => namePart[0]).join('');
}

function setUserName(text: string) {
  return text.replace('{username}', props.contactName);
}

function send() {
  if (messageText.value === '' || messageTitle.value === '') {
    return;
  }

  const newMessage: Message = {
    subject: messageTitle.value,
    text: messageText.value,
    manager: props.contactName,
    date: new Date(),
  };

  items.value.push(newMessage);

  defaultText();
}
</script>

<style scoped lang="scss">
@use "@/variables" as *;

#card-messages {
  min-height: 300px;
}

.input-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

:deep(.file-uploader) {
  .dx-fileuploader-wrapper {
    padding: 0;

    .dx-fileuploader-input-wrapper {
      padding: 0;
    }
  }
}

.input-content,
.messages-content {
  padding: 20px;
  height: 320px;
}

.messages-content {
  border-top: 1px solid $base-border-color;
  background-color: $side-panel-background;
}

.message-container {
  display: flex;

  &:nth-child(odd) {
    flex-direction: row-reverse;
  }

  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 16px;
    flex-shrink: 0;
    margin: 2px 5px;
    background: $base-accent;
    font-size: 12px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $base-bg;
  }

  .message {
    background-color: $base-bg;
    padding: 10px;
    margin-bottom: 10px;

    .message-title {
      @include message-title();

      .subject {
        color: $base-text-color;
        font-weight: 700;
      }
    }

    .message-text {
      @include message-text();
    }
  }
}
</style>
