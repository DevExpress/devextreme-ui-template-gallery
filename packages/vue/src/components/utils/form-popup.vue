<template>
  <dx-popup
    ref="popup"
    :title="props.title"
    :visible="visibleState"
    :full-screen="screenInfo.isXSmall"
    :width="width"
    :wrapper-attr="wrapperAttrState"
    :height="height"
    @hidden="onHidden()"
    @option-changed="() => popup?.instance?.repaint()"
  >
    <dx-popup-item
      toolbar="bottom"
      location="center"
    >
      <div :class="{ 'form-popup-buttons-container': true, 'flex-buttons': width <= 360 }">
        <dx-button
          text="Cancel"
          styling-mode="outlined"
          type="normal"
          @click="cancel()"
        />
        <dx-button
          text="Save"
          :disabled="isSaveDisabled"
          styling-mode="contained"
          type="default"
          @click="save()"
        />
      </div>
    </dx-popup-item>
    <dx-validation-group ref="validationGroup">
      <slot />
    </dx-validation-group>
  </dx-popup>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { DxPopup, DxToolbarItem as DxPopupItem } from 'devextreme-vue/popup';
import { DxButton } from 'devextreme-vue/button';
import { screenInfo } from '@/utils/media-query';
import { DxValidationGroup } from 'devextreme-vue/validation-group';
import { SimpleObject } from '@/types';

const props = withDefaults(
  defineProps<{
    isSaveDisabled?: boolean,
    title: string,
    visible: boolean,
    width?: number,
    height?: string | number,
    wrapperAttr?: SimpleObject,
}>(),
  {
    isSaveDisabled: false,
    width: 480,
    height: 'auto',
    visible: false,
    wrapperAttr: () => ({}),
  },
);
const validationGroup = ref<InstanceType<typeof DxValidationGroup>>();

const emit = defineEmits(['save', 'update:visible']);

const visibleState = ref(props.visible);

function getWrapperAttr(attrs: Record<string, unknown>) {
  const wrapperAttr = { class: '', ...attrs };
  wrapperAttr.class += ' form-popup';
  return wrapperAttr;
}

const wrapperAttrState = ref(getWrapperAttr(props.wrapperAttr));

const popup = ref<InstanceType<typeof DxPopup>>();

watch(
  () => props.visible,
  (newValue) => {
    visibleState.value = newValue;
  },
);

watch(
  () => props.wrapperAttr,
  (newValue) => {
    wrapperAttrState.value = getWrapperAttr(newValue);
  },
);

const close = () => {
  visibleState.value = false;
  validationGroup.value?.instance.reset();
  emit('update:visible', false);
};

const save = () => {
  if (validationGroup.value?.instance.validate().isValid) {
    close();
    emit('save');
  }
};

const cancel = () => {
  close();
};

function onHidden() {
  validationGroup.value?.instance.reset();
  close();
}

function isValid() {
  return validationGroup.value?.instance.validate().isValid;
}

defineExpose({
  isValid,
});
</script>
<style scoped lang="scss">
:global(.form-popup .dx-toolbar-center) {
  width: 100%;
}

.form-popup-buttons-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--popup-toolbar-item-spacing);

  &.flex-buttons {
    :deep(.dx-button) {
      flex: 1;
    }
  }
}
</style>
