<template>
  <dx-select-box
    class="pictured-item-select-box"
    :label="label"
    :value="modelValue"
    :items="items"
    :drop-down-options="{wrapperAttr: {class: 'pictured-item-select-box-dropdown'}}"
    value-expr="name"
    styling-mode="outlined"
    label-mode="hidden"
    width="100%"
    field-template="field"
    @value-changed="emitChangedValue"
  >
    <template #field="{ data }">
      <div class="pictured-item-select-field">
        <img
          v-if="modelValue"
          :alt="data?.name"
          class="pictured-item-image"
          :src="`data:image/png;base64,${data?.image}`"
        >
        <dx-text-box
          :hover-state-enabled="false"
          :input-attr="{class: 'pictured-item-editor-input'}"
          :read-only="true"
          :value="data?.name"
        />
      </div>
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
import { DxTextBox } from 'devextreme-vue/text-box';
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
  border: 1px solid $border-color;
  border-radius: 50%;
  margin-right: 8px;
}

:global(.pictured-item-select-box-dropdown .dx-list-item-content),
.pictured-item-select-field {
  display: flex;
  align-items: center;
}

.pictured-item-select-field {
  :deep(.pictured-item-editor-input) {
    padding-left: 0;
  }

  .pictured-item-image {
    margin-left: var(--list-padding-left);
  }
}
</style>
