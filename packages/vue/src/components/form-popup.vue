<template>
  <dx-popup
    ref="popup"
    :title="props.title"
    :visible="isVisible"
    :full-screen="screenInfo.isSmall || screenInfo.isXSmall"
    width="auto"
    height="auto"
    @option-changed="() => popup?.instance?.repaint()"
  >
    <dx-popup-item
      widget="dxButton"
      toolbar="bottom"
      location="after"
      :options="saveOptions"
    />
    <dx-popup-item
      widget="dxButton"
      toolbar="bottom"
      location="after"
      :options="cancelOptions"
    />
    <dx-validation-group ref="validationGroup">
      <slot />
    </dx-validation-group>
  </dx-popup>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { DxPopup, DxToolbarItem as DxPopupItem } from 'devextreme-vue/popup';
import { screenInfo } from '@/utils/media-query';
import { DxValidationGroup } from 'devextreme-vue/validation-group';

const props = withDefaults(
  defineProps<{
    title: string,
  isVisible: boolean,
}>(),
  {
    isVisible: false,
  },
);
const validationGroup = ref<InstanceType<typeof DxValidationGroup>>();

const emit = defineEmits(['save', 'update:isVisible']);

const isVisible = ref(props.isVisible);
const popup = ref<InstanceType<typeof DxPopup>>();

watch(
  () => props.isVisible,
  (newValue) => {
    isVisible.value = newValue;
  },
);

const save = () => {
  if (validationGroup.value?.instance.validate().isValid) {
    validationGroup.value?.instance.reset();
    emit('save');
  }
};

const cancel = () => {
  isVisible.value = false;
  validationGroup.value?.instance.reset();
  emit('update:isVisible', false);
};

const saveOptions = {
  text: 'Save',
  stylingMode: 'outlined',
  type: 'default',
  onClick: save,
};

const cancelOptions = {
  text: 'Cancel',
  stylingMode: 'text',
  type: 'default',
  onClick: cancel,
};
</script>
