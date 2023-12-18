<template>
  <dx-select-box
    label="Status"
    :value="modelValue"
    :class="classList"
    @value-changed="emitChangedValue"
    :items="items"
    :read-only="readOnly"
    :styling-mode="stylingMode"
    :label-mode="labelMode"
    width="100%"
    field-template="field"
  >
    <template #field="{ data }">
      <div class="status-editor-field">
        <contact-status
          class="status-indicator"
          :show-text="false"
          :value="data"
        />
        <dx-text-box
          class="status-{{data.toLowerCase()}}"
          :hover-state-enabled="false"
          :input-attr="{
            class: `status-editor-input contact-status status-${data?.toLowerCase()}`,
          }"
          :read-only="true"
          :value="data"
        />
      </div>
    </template>

    <template #item="{ data }">
      <contact-status :value="data" />
    </template>
  </dx-select-box>
</template>

<script setup lang="ts">
import { DxSelectBox } from 'devextreme-vue/select-box';
import { DxTextBox } from 'devextreme-vue/text-box';
import ContactStatus from '@/components/utils/contact-status.vue';
import { SimpleObject } from '@/types';

withDefaults(defineProps<{
  modelValue: string,
  items: unknown[],
  readOnly?: boolean,
  editable?: boolean,
  labelMode?: string,
  stylingMode?: string,
  classList: string,
}>(), {
  modelValue: '',
  editable: true,
  readOnly: false,
  stylingMode: '',
  labelMode: '',
  classList: '',
});

const emit = defineEmits(['update:modelValue']);

function emitChangedValue(changedData: SimpleObject) {
  emit('update:modelValue', changedData.value);
}
</script>

<style scoped lang="scss">
@use "@/variables.scss" as *;

.dx-texteditor-with-floating-label.contact-status {
    .status-editor-field {
      .status-indicator {
        align-self: flex-end;
        display: inline;
      }
    }
  }

.status-editor-field {
  display: flex;

  .status-indicator {
    display: flex;
    align-self: center;
    padding-left: var(--list-padding-left);
  }

  :deep(.status-editor-input) {
    padding-left: 0;
  }
}
</style>
