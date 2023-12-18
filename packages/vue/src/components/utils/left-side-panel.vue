<template>
  <div
    :class="{ 'left-side-panel': true, overlapping: isSmallScreen, open: isOpened }"
  >
    <div class="side-panel-container">
      <div
        v-if="isSmallScreen"
        class="button-container"
      >
        <dx-button
          class="open-button"
          :icon="isOpened ? 'hidepanel' : 'showpanel'"
          @click="isOpened = !isOpened"
        />
      </div>

      <div class="side-panel-content-wrapper">
        <dx-scroll-view style="max-height:100%">
          <slot />
        </dx-scroll-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DxButton, DxScrollView } from 'devextreme-vue';
import { computed, ref, watchEffect } from 'vue';
import { screenInfo } from '@/utils/media-query';

const isOpened = ref(!(screenInfo.value.isXSmall || screenInfo.value.isSmall));
const isSmallScreen = computed(() => screenInfo.value.isXSmall || screenInfo.value.isSmall);

watchEffect(() => {
  isOpened.value = !(screenInfo.value.isXSmall || screenInfo.value.isSmall);
});
</script>

<style scoped lang="scss">
@use "@/variables.scss" as *;

.left-side-panel {
  --left-side-panel-width: 320px;
  --transition: 0;

  height: 100%;
  position: relative;
  border: 1px solid transparent;

  .side-panel-container {
    display: flex;
    height: 100%;

    .side-panel-content-wrapper {
      .side-panel-content {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }

  .side-panel-content-wrapper {
    width: 0;
    transition: width var(--transition);
    overflow: hidden;
    white-space: nowrap;

    .dx-scrollview {
      min-width: var(--left-side-panel-width);
    }
  }

  &.open {
    .side-panel-content-wrapper {
      width: var(--left-side-panel-width);
      padding-left: 0;
    }
  }

  &.overlapping {
    --button-height: 28px;
    --transition: 400ms;

    .button-container {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: var(--scheduler-toolbar-height);
    }

    .side-panel-content-wrapper {
      position: absolute;
      background-color: var(--base-bg);
      z-index: 3;
      top: calc(-1 * var(--theme-padding));
      left: var(--button-height);
      padding-top: var(--theme-padding);
      height: calc(100% + var(--content-padding) * 2);
      box-shadow: 8px 0 16px -8px var(--border-color);
    }
  }
}
</style>
