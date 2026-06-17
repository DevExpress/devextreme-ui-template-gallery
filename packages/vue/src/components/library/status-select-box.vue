<template>
  <dx-select-box
    label="Status"
    :value="modelValue"
    :class="['status-select-box', classList]"
    @value-changed="emitChangedValue"
    :items="items"
    :read-only="readOnly"
    :styling-mode="stylingMode"
    :label-mode="labelMode"
    width="100%"
    placeholder=""
    :field-addons="{ beforeTemplate: 'before' }"
    :display-expr="() => ''"
  >
    <template #before="{ data }">
      <contact-status
        class="status-indicator"
        :value="data"
      />
    </template>

    <template #item="{ data }">
      <contact-status :value="data" />
    </template>
  </dx-select-box>
</template>

<script setup lang="ts">
import { DxSelectBox } from 'devextreme-vue/select-box';
import type { EditorStyle, LabelMode } from 'devextreme/common';
import type { ValueChangedEvent } from 'devextreme/ui/select_box';
import ContactStatus from '@/components/utils/contact-status.vue';

withDefaults(defineProps<{
  modelValue: string,
  items: unknown[],
  readOnly?: boolean,
  editable?: boolean,
  labelMode?: LabelMode,
  stylingMode?: EditorStyle,
  classList: string,
}>(), {
  modelValue: '',
  editable: true,
  readOnly: false,
  classList: '',
});

const emit = defineEmits(['update:modelValue']);

function emitChangedValue(changedData: ValueChangedEvent) {
  emit('update:modelValue', changedData.value);
}
</script>

<style scoped lang="scss">
@use "@/variables.scss" as *;

.status-select-box {
  :deep(.dx-dropdowneditor-field-before-template-wrapper) {
    min-width: 0;

    .status.contact-status {
      display: inline-flex;
      align-items: center;
      font-size: var(--dx-font-size);
      white-space: nowrap;
    }
  }

  &:not(.dx-state-readonly) {
    :deep(.dx-dropdowneditor-field-before-template-wrapper .status.contact-status) {
      padding-left: var(--list-padding-left);
    }
  }
}

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

  :deep(input.status-editor-input.dx-texteditor-input) {
    padding-left: 0;
  }
}
</style>
