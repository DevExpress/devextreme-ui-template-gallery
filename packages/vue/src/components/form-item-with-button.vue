<template>
  <form-item-plain :label="props.textBoxOptions.label"
                   :mask="props.textBoxOptions.mask"
                   :rendered-value="props.renderedValue"
                   :value="props.data[props.dataField]"
                   :isEditing = "props.isEditing"
                   @value-changed="e => emit('valueChanged', e)"
  />

  <dx-button
    v-if="!props.isEditing"
    v-bind="props.buttonOptions"
  ></dx-button>
</template>

<script setup lang="ts">
import { DxButton } from 'devextreme-vue/button';
import FormItemPlain from '@/components/form-item-plain.vue';

const emit = defineEmits(['valueChanged']);

const props = withDefaults(defineProps<{
      data: {[key:string]: unknown},
      dataField: string,
      isEditing: boolean,
      renderedValue?: string,
      textBoxOptions: {[key:string]: unknown},
      buttonOptions: {[key:string]: unknown},
    }>(), {
  data: () => ({}),
  dataField: '',
  isEditing: false,
  textBoxOptions: () => ({}),
  buttonOptions: () => ({}),
});

</script>

<style scoped lang="scss">
.dx-button {
  margin-top: 10px;
  margin-left: 11px;
}
</style>
