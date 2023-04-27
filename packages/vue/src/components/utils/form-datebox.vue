<template>
  <dx-date-box
    :label="props.label"
    v-model="value"
    :read-only="!props.isEditing"
    placeholder="MM/dd/y"
    display-format="MM/dd/y"
    v-bind="formEditorProps"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { DxDateBox } from 'devextreme-vue/date-box';
import { formEditorProps } from '@/shared/form-editor-config';

const props = defineProps<{
  modelValue?: number | string | Date,
  isEditing: boolean,
  label?: string,
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
</style>
