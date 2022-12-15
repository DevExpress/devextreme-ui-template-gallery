<template>
  <dx-validation-group>
    <div
      class="messages"
      id="card-messages"
    >
      <load-component
        :is-loading="props.isLoading"
        :container-selector="'#card-messages'"
      >
        <div class="input-content">
          <dx-text-box
            label="Subject"
            styling-mode="outlined"
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
            styling-mode="outlined"
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
                stylingMode: 'outlined',
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
              <div class="avatar">
                {{ getAvatarText(data.manager) }}
              </div>
              <div class="message dx-card">
                <div class="message-title">
                  <div>
                    <div class="subject">
                      {{ data.subject }}
                    </div>
                    <div>{{ formatDate(new Date(data.date)) }} - {{ data.manager }}</div>
                  </div>
                  <dx-button icon="overflow" />
                </div>
                <div class="message-text">
                  {{ getText(data) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </load-component>
    </div>
  </dx-validation-group>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { DxTextArea } from 'devextreme-vue/text-area';
import { DxTextBox } from 'devextreme-vue/text-box';
import { DxButton } from 'devextreme-vue/button';
import { DxToolbar, DxItem } from 'devextreme-vue/toolbar';
import { DxFileUploader } from 'devextreme-vue/file-uploader';
import { DxValidationGroup } from 'devextreme-vue/validation-group';
import DxValidator, { DxRequiredRule } from 'devextreme-vue/validator';

import { ClickEvent } from 'devextreme/ui/button';

import { formatDate } from '@/utils/formatters';
import LoadComponent from '@/components/load-component.vue';

import type { Message } from '@/types/messages';

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

function send(e: ClickEvent) {
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
