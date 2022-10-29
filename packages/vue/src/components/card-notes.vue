<template>
  <div
    class="notes"
    id="card-notes"
  >
    <load-component
      :is-loading="isLoading"
      :container-selector="'#card-notes'"
    >
      <div class="input-content">
        <dx-text-area
          label="New Note"
          styling-mode="outlined"
          :value="nodeText"
          @value-changed="e => nodeText = e.value"
        />

        <dx-toolbar>
          <dx-item
            widget="dxButton"
            location="after"
            :options="{
              text: 'Add',
              stylingMode: 'outlined',
              type: 'default',
              onClick: addNote
            }"
          />
        </dx-toolbar>
      </div>
      <div class="notes-content">
        <div
          class="note dx-card"
          v-for="note in items"
        >
          <div class="note-title">
            <div>{{ formatDate(new Date(note.date)) }} - {{ note.manager }}</div>
            <dx-button icon="overflow" />
          </div>
          <div class="note-text">
            {{ note.text }}
          </div>
        </div>
      </div>
    </load-component>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { DxTextArea } from 'devextreme-vue/text-area';
import { DxButton } from 'devextreme-vue/button';
import { DxToolbar, DxItem } from 'devextreme-vue/toolbar';
import { formatDate } from '@/utils/formatters';
// eslint-disable-next-line import/no-unresolved
import { getContactNotes } from 'dx-rwa-data';
import type { Note } from '@/types/notes';
import LoadComponent from '@/components/load-component.vue';

const props = withDefaults(defineProps<{
  contactName: string,
  contactId: number | null,
}>(), {
  contactId: null,
  contactName: '',
});

const isLoading = ref(true);
const items = ref<Note[]>([]);

const nodeText = ref<string>('');

function defaultText() {
  nodeText.value = '';
}

function addNote() {
  if (nodeText.value === '') {
    return;
  }

  const newNote: Note = {
    manager: props.contactName,
    date: new Date(),
    text: nodeText.value,
  };

  items.value.push(newNote);

  defaultText();
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
  loadData();
});
</script>

<style scoped lang="scss">
@use "@/variables" as *;

.input-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-content,
.notes-content {
  padding: 20px;
}

.notes-content {
  border-top: 1px solid $base-border-color;
  background-color: $side-panel-background;
}

.note {
  background-color: $base-bg;
  padding: 10px;
  margin-bottom: 10px;

  &:deep(.note-title) {
    @include message-title();
  }

  .note-text {
   @include message-text();
  }
}
</style>
