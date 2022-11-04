<template>
  <dx-popup
    v-if="isVisible"
    :title="props.title"
    :visible="isVisible"
    :full-screen="isFullScreen"
    width="auto"
    height="auto"
  >
    <dx-toolbar-item
      widget="dxButton"
      toolbar="bottom"
      location="after"
      :options="{
        text: 'Save',
        stylingMode: 'outlined',
        type: 'default',
        onClick: save
      }"
    />

    <dx-toolbar-item
      widget="dxButton"
      toolbar="bottom"
      location="after"
      :options="{
        text: 'Cancel',
        stylingMode: 'text',
        type: 'default',
        onClick: close
      }"
    />
    <slot />
  </dx-popup>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { DxPopup, DxToolbarItem } from 'devextreme-vue/popup';

const props = withDefaults(
  defineProps<{
    title: string,
  isVisible: boolean,
}>(),
  {
    isVisible: false,
  },
);

const emit = defineEmits(['save', 'update:isVisible']);

const isVisible = ref(props.isVisible);
const isFullScreen = ref(false);

watch(
  () => props.isVisible,
  (newValue) => {
    isVisible.value = newValue;
  },
);

const save = () => {
  emit('save');
};

const close = () => { /**/
  isVisible.value = false;
  emit('update:isVisible', false);
};

</script>
<style scoped lang="scss">

</style>
