<template>
    <form-item-blue v-if="!props.isEditing"
                    :label="title"
                    :value="props.data[props.dataField]"
    ></form-item-blue>

    <dx-text-box v-if="props.isEditing"
                 :value="props.data[props.dataField]"
                 :label="title"
                 @value-changed="e => props.data[props.dataField] = e.value"
    ></dx-text-box>
</template>

<script setup lang="ts">
import {computed} from "vue";

import FormItemBlue from '@/components/form-item-blue.vue'
import {DxTextBox} from 'devextreme-vue/text-box';

const props = withDefaults(
    defineProps<{
      data: any,
      dataField: string,
      isEditing: boolean,
      editorOptions: any,
      label?: string
    }>(), {
  data: {},
  dataField: '',
  isEditing: false,
  editorOptions: {},
  label: ''
})

const title = computed(() => {
  return props.label ? props.label : props.dataField.replace(/^./, a => a.toUpperCase())
})
</script>
