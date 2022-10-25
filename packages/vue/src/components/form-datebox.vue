<template>
  <dx-date-box
    :label="props.label"
    v-model="value"
    :read-only="!props.isEditing"
    placeholder="MM/dd/y"
    display-format="MM/dd/y"
    :element-attr="{class: 'form-editor'}"
    :input-attr="{class: 'form-editor-input'}"
    styling-mode="filled"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { DxDateBox } from 'devextreme-vue/date-box';

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
