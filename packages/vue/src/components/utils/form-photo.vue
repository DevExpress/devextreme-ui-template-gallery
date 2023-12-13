<template>
  <div
    ref="hostRef"
    class="host"
  >
    <div
      :style="{
        width: props.size + 'px',
        height: props.size + 'px',
        maxHeight: props.size + 'px',
        backgroundImage: `url('data:image/png;base64,${props.link}')`,
      }"
      class="photo"
      :class="['photo', editable ? ' editable' : '']"
    >
      <i
        v-if="editable"
        class="edit-icon dx-icon-photooutline"
      />
    </div>
    <dx-file-uploader
      v-if="editable"
      :dialog-trigger="hostRef"
      :visible="false"
      accept="image/*"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { DxFileUploader } from 'devextreme-vue/file-uploader';

const hostRef = ref(null);
const props = withDefaults(defineProps<{
  link: string,
  size?: number
  editable?: boolean
}>(), {
  size: 124,
  link: '',
  editable: false,
});
</script>

<style scoped lang="scss">
@use "@/variables" as *;

.host {
  position: relative;
  display: flex;

  .photo {
    border-radius: 8px;
    background-repeat: no-repeat;
    background-size: cover;
    border: 1px solid var(--border-color);
    overflow: hidden;
  }

  &:hover {
    .editable {
      &:before, .edit-icon {
        opacity: 1;
        transition: opacity 400ms;
      }
    }
  }

  .editable {
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:before {
      content: '';
      opacity: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0, 0.5);
    }

    .edit-icon {
      opacity: 0;
      display: block;
      position: absolute;
      color: white;
      font-size: 28px;
    }
  }
}
</style>
