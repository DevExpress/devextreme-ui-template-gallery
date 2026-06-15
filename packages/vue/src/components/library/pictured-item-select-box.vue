<template>
  <dx-select-box
    class="pictured-item-select-box"
    :label="label"
    :value="modelValue"
    :items="items"
    :drop-down-options="{ wrapperAttr: { class: 'pictured-item-select-box-dropdown' } }"
    value-expr="name"
    styling-mode="filled"
    label-mode="hidden"
    width="100%"
    :field-addons="{ beforeTemplate: 'before' }"
    :display-expr="displayExpr"
    @value-changed="emitChangedValue"
  >
    <template #before="{ data }">
      <img
        v-if="data?.image"
        :alt="data?.name"
        class="pictured-item-image"
        :src="`data:image/png;base64,${data?.image}`"
      >
    </template>

    <template #item="{ data }">
      <div>
        <img
          :alt="data?.name"
          class="pictured-item-image"
          :src="`data:image/png;base64,${data?.image}`"
        >
        {{ data?.name }}
      </div>
    </template>
  </dx-select-box>
</template>

<script setup lang="ts">
import { DxSelectBox } from 'devextreme-vue/select-box';
import { SimpleObject } from '@/types';

withDefaults(defineProps<{
  label?: string,
  modelValue: string,
  items: Record<string, unknown>[]
}>(), {
  label: '',
  modelValue: '',
  items: () => [],
});

const emit = defineEmits(['update:modelValue']);

function displayExpr(data?: Record<string, unknown> | string) {
  if (!data) return '';

  return typeof data === 'string' ? data : `${data.name ?? ''}`;
}

function emitChangedValue(changedData: SimpleObject) {
  emit('update:modelValue', changedData.value);
}
</script>

<style scoped lang="scss">
@use "@/variables.scss" as *;

:global(.pictured-item-select-box-dropdown .pictured-item-image),
.pictured-item-select-box .pictured-item-image {
  flex: 0 0 2em;
  width: 2em;
  height: 2em;
  border: 1px solid var(--border-color);
  border-radius: 50%;
  margin-right: 8px;
  object-fit: cover;
  object-position: top;
}

:global(.pictured-item-select-box-dropdown .dx-list-item-content),
.pictured-item-select-field {
  display: flex;
  align-items: center;
}

.pictured-item-select-box:not(.dx-state-readonly) {
  :deep(.dx-dropdowneditor-field-before-template-wrapper .pictured-item-image) {
    margin-left: var(--list-padding-left);
  }
}

.pictured-item-select-field {
  :deep(input.pictured-item-editor-input.dx-texteditor-input) {
    padding-left: 0;
    color: var(--base-text-color);
  }

  .pictured-item-image {
    margin-left: var(--list-padding-left);
  }
}
</style>
