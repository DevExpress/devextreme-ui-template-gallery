<template>
  <dx-text-box
    :label="label"
    v-model="value"
    :read-only="!isEditing"
    :mask="mask"
    v-bind="formEditorProps"
  >
    <dx-validator
      :validation-rules="validators"
      :validation-group="validationGroup"
    />
    <dx-text-box-button
      v-if="icon"
      :options="{ icon: icon, elementAttr: { class: 'form-editor-icon' }, stylingMode: 'text' }"
      name="icon"
      location="before"
    />
  </dx-text-box>
</template>

<script setup lang="ts">
import { DxTextBox, DxButton as DxTextBoxButton } from 'devextreme-vue/text-box';
import { DxValidator, DxValidationRule } from 'devextreme-vue/validator';
import { computed } from 'vue';
import { formEditorProps } from '@/shared/form-editor-config';

const props = withDefaults(
  defineProps<{
  modelValue?: number | string | Date,
  isEditing: boolean,
  label?: string,
  icon?: string,
  mask?: string,
  validationGroup?: string,
  validators?: Array<typeof DxValidationRule>,
}>(),
  {
    validators: () => [{ type: 'required' }],
    modelValue: null,
    isEditing: false,
    label: '',
    icon: '',
    mask: '',
    validationGroup: '',
  },
);
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
