<template>
  <div
    id="dropzone"
    ref="dropzone"
    :class="isDropZoneActive
      ? 'dx-theme-accent-as-border-color'
      : 'dx-theme-border-color'
    "
  >
    <span>Drag and drop a photo here or click the area to select it from a folder</span>
  </div>
  <dx-file-uploader
    :drop-zone="dropzone"
    :dialog-trigger="dropzone"
    :multiple="false"
    :show-file-list="false"
    :visible="false"
    accept="image/*"
    upload-mode="instantly"
    @drop-zone-enter="onDropZoneEnter"
    @drop-zone-leave="onDropZoneLeave"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { DxFileUploader } from 'devextreme-vue/file-uploader';

const isDropZoneActive = ref(false);
const dropzone = ref<InstanceType<typeof HTMLElement>>();

const onDropZoneEnter = (e: {dropZoneElement: HTMLElement}) => {
  if (e.dropZoneElement === dropzone.value) { isDropZoneActive.value = true; }
};

const onDropZoneLeave = (e: {dropZoneElement: HTMLElement}) => {
  if (e.dropZoneElement === dropzone.value) { isDropZoneActive.value = false; }
};
</script>

<style scoped lang="scss">
#dropzone {
  background-color: var(--typography-bg);
  border-width: 1.5px;
  border-style: dashed;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 124px;
  user-select: none;
  line-height: inherit;
  margin-bottom: 10px;

  & > span {
    font-weight: 100;
    text-align: center;
  }
}
</style>
