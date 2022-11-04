<template>
  <div
    id="uploader"
    :class="isDropZoneActive
      ? 'dx-theme-accent-as-border-color'
      : 'dx-theme-border-color'
    "
  >
    <span>Drag and drop a photo here or click the area to select it from a folder</span>
  </div>
  <dx-file-uploader
    dialog-trigger="#uploader"
    drop-zone="#uploader"
    :multiple="false"
    accept="image/*"
    upload-mode="instantly"
    :show-file-list="false"
    :visible="false"
    @drop-zone-enter="onDropZoneEnter"
    @drop-zone-leave="onDropZoneLeave"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { DxFileUploader } from 'devextreme-vue/file-uploader';

const isDropZoneActive = ref(false);

const onDropZoneEnter = (e: {dropZoneElement: {id: string}}) => {
  if (e.dropZoneElement.id === 'uploader') { isDropZoneActive.value = true; }
};

const onDropZoneLeave = (e: {dropZoneElement: {id: string}}) => {
  if (e.dropZoneElement.id === 'uploader') { isDropZoneActive.value = false; }
};
</script>

<style scoped lang="scss">
#uploader {
  background-color: rgba(183, 183, 183, 0.1);
  border-width: 2px;
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
    opacity: 0.5;
    text-align: center;
  }
}
</style>
