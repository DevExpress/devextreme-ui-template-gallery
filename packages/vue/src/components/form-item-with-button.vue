<template>
  <dx-text-box
               :value="props.data[props.dataField]"
               :label="props.textBoxOptions.label"
               :stylingMode="props.textBoxOptions.stylingMode"
               :mask="props.textBoxOptions.mask"
               :readOnly="!props.isEditing"
               @value-changed="e => {
                 /* eslint-disable-next-line vue/no-mutating-props */
                 props.data[props.dataField] = e.value}"
  ></dx-text-box>

  <dx-button
    v-if="!props.isEditing"
    :text="props.buttonOptions.text"
    :icon="props.buttonOptions.icon"
    :type="props.buttonOptions.type"
    :stylingMode="props.buttonOptions.stylingMode"
  ></dx-button>
</template>

<script setup lang="ts">
import { DxTextBox } from 'devextreme-vue/text-box';
import { DxButton } from 'devextreme-vue/button';

const props = withDefaults(defineProps<{
      data: {[key:string]: unknown},
      dataField: string,
      isEditing: boolean,
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
}
</style>
