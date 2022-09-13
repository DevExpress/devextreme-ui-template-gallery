<template>
  <form-item-plain :label="props.textBoxOptions.label"
                   :mask="props.textBoxOptions.mask"
                   :rendered-value="props.renderedValue"
                   v-model="value"
                   :isEditing = "props.isEditing"
  />

  <dx-button
    v-if="!props.isEditing"
    v-bind="props.buttonOptions"
  ></dx-button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { DxButton } from 'devextreme-vue/button';
import FormItemPlain from '@/components/form-item-plain.vue';

const emit = defineEmits(['update:modelValue']);

const props = withDefaults(defineProps<{
      modelValue: unknown,
      isEditing: boolean,
      renderedValue?: string,
      textBoxOptions: {[key:string]: unknown},
      buttonOptions: {[key:string]: unknown},
    }>(), {
  data: () => ({}),
  isEditing: false,
  textBoxOptions: () => ({}),
  buttonOptions: () => ({}),
});

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
.dx-button {
  margin-top: 10px;
  margin-left: 11px;
}
</style>
