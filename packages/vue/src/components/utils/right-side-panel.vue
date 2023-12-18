<template>
  <div
    :class="{
      'right-side-panel-wrapper': true,
      overlapping: !screenInfo.isLarge,
      open: openState,
      'closed-state-hidden': !showOpenButton,
    }"
  >
    <div class="right-side-panel">
      <div class="side-panel-container">
        <div class="side-panel-header">
          <div
            v-if="title"
            class="side-panel-title"
          >
            <div class="side-panel-title-text">
              {{ title }}
            </div>
          </div>
          <dx-button
            class="open-button"
            styling-mode="text"
            :icon="(isOpened ? (screenInfo.isLarge ? 'panelleft' : 'close') : 'panelright')"
            @click="toggleOpen"
          />
        </div>

        <div class="side-panel-content-wrapper">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { DxButton } from 'devextreme-vue';
import { screenInfo } from '@/utils/media-query';

const props = withDefaults(defineProps<{
  title: string,
  isOpened: boolean,
  showOpenButton: boolean,
}>(), {
  title: '',
  isOpened: false,
  showOpenButton: true,
});

const openState = ref(false);
const emit = defineEmits(['openedChange']);

watchEffect(() => {
  openState.value = props.isOpened;
});

function toggleOpen() {
  openState.value = !openState.value;
  emit('openedChange', openState.value);
}
</script>

<style scoped lang="scss">
@use "@/variables.scss" as *;

.right-side-panel-wrapper {
  --side-panel-width: calc(var(--calendar-width) + var(--content-padding));

  display: flex;
  flex-direction: column;
  height: 100%;

  &:not(.overlapping) {
    &:not(.open).closed-state-hidden {
      display: none;
    }

    .right-side-panel {
      .side-panel-content-wrapper,
      .side-panel-title {
        display: none;
      }
    }

    &.open .right-side-panel {
      border: 1px solid var(--border-color);
      border-radius: 8px;

      .side-panel-content-wrapper,
      .side-panel-title {
        display: initial;
      }
    }
  }

  &.overlapping {
    position: absolute;
    background-color: var(--base-bg);
    z-index: 3;
    right: 0;
    top: 0;
    width: var(--contact-side-panel-width);

    &:not(.open) {
      width: 0;
    }

    .right-side-panel {
      padding: var(--content-padding) 0;
    }

    &.open .right-side-panel {
      box-shadow: 0 0 8px var(--border-color);
    }
  }

  .open-button :deep(.dx-icon) {
    color: var(--accent-color);
  }

  &.open .right-side-panel {
    width: var(--side-panel-width);

    .side-panel-header {
      padding: var(--content-padding);
      border-bottom-color: var(--border-color);
    }

    .side-panel-content-wrapper {
      padding-left: 0;
    }
  }
}

.right-side-panel {
  position: relative;
  border: 0 solid transparent;
  height: 100%;

  .side-panel-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: var(--content-padding) 0;
    border-bottom: solid 1px transparent;

    &.hide-open-button {
      display: none;
    }
  }

  .side-panel-title {
    flex: 1 1 0;

    .side-panel-title-text {
      color: var(--accent-color);
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
    }
  }

  .side-panel-content-wrapper {
    white-space: nowrap;
    padding-left: var(--toolbar-vertical-padding);
  }
}
</style>
