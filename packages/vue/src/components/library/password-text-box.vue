<template>
  <dx-text-box
    :model-value="value"
    :styling-mode="stylingMode"
    :placeholder="placeholder"
    :mode="isPasswordMode ? 'password' : 'text'"
    value-change-event="keyup input change"
    @update:model-value="changeValue"
  >
    <dx-button
      name="today"
      location="after"
      :options="{
        visible: valueState?.length > 0,
        icon: isPasswordMode ? 'eyeopen' : 'eyeclose',
        hoverStateEnabled: false,
        activeStateEnabled: false,
        stylingMode: 'text',
        onClick: switchMode,
      }"
    />
    <dx-validator
      :validation-rules="[
        { type: 'required', message: 'Password is required' }, ...validators]"
    />
  </dx-text-box>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { DxTextBox, DxButton } from 'devextreme-vue/text-box';
import { DxValidationRule, DxValidator } from 'devextreme-vue/validator';

const props = withDefaults(defineProps<{
  value?: string,
  stylingMode?: string,
  placeholder?: string,
  validators?: Array<typeof DxValidationRule>,
}>(), {
  value: '',
  stylingMode: 'filled',
  placeholder: '',
  validators: () => [],
});

const emit = defineEmits(['update:model-value']);

const valueState = ref(props.value);
const isPasswordMode = ref(true);

function changeValue(newValue: string) {
  valueState.value = newValue;
  emit('update:model-value', newValue);
}

function switchMode() {
  isPasswordMode.value = !isPasswordMode.value;
}
</script>
