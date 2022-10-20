<template>
  <dx-text-box :label="label"
               v-model="value"
               :readOnly="!isEditing"
               :mask="mask"
               :elementAttr="{class: 'form-editor'}"
               :inputAttr="{class: 'form-editor-input'}"
               stylingMode="filled"
               valueChangeEvent="keyup input change"
  >
    <dx-validator :validationRules="validators || [{type: 'required'}]"
                  :validationGroup="validationGroup"/>
    <dx-text-box-button v-if="icon"
                :options="{icon: icon, type: 'back', elementAttr: { class: 'form-editor-icon' }}"
                name="icon"
                location="before"
    ></dx-text-box-button>
  </dx-text-box>
</template>

<script setup lang="ts">
import { DxTextBox, DxButton as DxTextBoxButton } from 'devextreme-vue/text-box';
import { DxValidator } from 'devextreme-vue/validator';
import { computed } from 'vue';

const props = defineProps<{
  modelValue?: number | string | Date,
  isEditing: boolean,
  label?: string,
  icon?: string,
  mask?: string,
  validationGroup?: string,
  validators?: Record<string, any>[],
}>();
const emit = defineEmits(['update:modelValue']);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit('update:modelValue', newValue);
  },
});
</script>
<style scoped lang="scss">
@use "@/variables" as *;

.dx-texteditor.form-editor :deep(.form-editor-icon:first-child) {
  margin-left: 0;
  pointer-events: none;
  border-color: transparent;
  background-color: transparent;
}
</style>
