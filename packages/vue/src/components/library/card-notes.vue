<template>
  <dx-validation-group>
    <div id="card-notes">
      <dx-load-panel
        :visible="isLoading"
        :show-pane="false"
        width="auto"
        container="#card-notes"
        :position="{ of: '#card-notes' }"
      />
      <template v-if="!isLoading">
        <div class="input-content">
          <dx-text-area
            label="New Note"
            styling-mode="filled"
            :value="nodeText"
            value-change-event="keyup"
            @value-changed="e => nodeText = e.value"
          >
            <dx-validator>
              <dx-required-rule />
            </dx-validator>
          </dx-text-area>

          <dx-toolbar>
            <dx-item
              widget="dxButton"
              location="after"
              :options="{
                text: 'Add',
                stylingMode: 'contained',
                type: 'default',
                onClick: addNote,
              }"
            />
          </dx-toolbar>
        </div>
        <div class="messages-content">
          <dx-scroll-view>
            <div class="message-list">
              <div
                class="note dx-card"
                v-for="note in items"
              >
                <div class="note-title">
                  <div>{{ formatDate(new Date(note.date)) }} - {{ note.manager }}</div>
                  <dx-button
                    icon="overflow"
                    styling-mode="text"
                  />
                </div>
                <div class="note-text">
                  {{ note.text }}
                </div>
              </div>
            </div>
          </dx-scroll-view>
        </div>
      </template>
    </div>
  </dx-validation-group>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { DxTextArea } from 'devextreme-vue/text-area';
import { DxButton, DxButtonTypes } from 'devextreme-vue/button';
import { DxToolbar, DxItem } from 'devextreme-vue/toolbar';
import { DxValidationGroup } from 'devextreme-vue/validation-group';
import DxValidator, { DxRequiredRule } from 'devextreme-vue/validator';
import { DxScrollView } from 'devextreme-vue/scroll-view';
import { formatDate } from '@/utils/formatters';

import { getContactNotes } from 'dx-template-gallery-data';
import type { Note } from '@/types/notes';
import DxLoadPanel from 'devextreme-vue/load-panel';

const props = withDefaults(defineProps<{
  user: string,
  contactId?: number | null,
  items?: Note[],
}>(), {
  contactId: null,
  user: '',
  items: undefined,
});

const isLoading = ref(true);
const items = ref<Note[]>(props.items);

const nodeText = ref<string>('');

watch(
  () => props.items,
  (newValue) => {
    if (newValue && newValue.length > 0) {
      items.value = newValue;
      isLoading.value = false;
    }
  },
);

function addNote(e: DxButtonTypes.ClickEvent) {
  if (!e.validationGroup.validate().isValid) {
    return;
  }
  const newNote: Note = {
    manager: props.user,
    date: new Date(),
    text: nodeText.value,
  };

  items.value.push(newNote);

  e.validationGroup.reset();
}

async function loadData() {
  if (props.contactId == null) {
    return;
  }

  isLoading.value = true;
  items.value = await getContactNotes(props.contactId);
  isLoading.value = false;
}

onMounted(() => {
  if (props.contactId) {
    loadData();
  }
});
</script>

<style scoped lang="scss">
@use "@/variables" as *;

@include messages-content();

#card-notes {
  min-height: 300px;
}

.input-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}

.note {
  @include card-shadow();

  border: 0.5px solid var(--border-color);
  background-color: var(--base-bg);
  padding: 10px;
  margin-bottom: 10px;

  .note-title {
    @include message-title();
  }

  .note-text {
    @include message-text();
  }
}
</style>
