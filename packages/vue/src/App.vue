<script setup lang="ts">
import {
  computed, inject,
} from 'vue';
import { AppInfo, appInfoInjectKey } from '@/types/app-info';
import { screenInfo } from './utils/media-query';

const appInfo = inject<AppInfo>(appInfoInjectKey);
const cssClasses = computed(() => ['app'].concat(screenInfo.value.cssClasses));
document.title = appInfo?.title || '';
</script>

<template>
  <div id="root">
    <div :class="cssClasses">
      <component
        :is="$route.meta.layout"
        :title="appInfo?.title"
        :is-x-small="screenInfo.isXSmall"
        :is-large="screenInfo.isLarge"
      >
        <div class="content">
          <router-view />
        </div>
      </component>
    </div>
  </div>
</template>
<style lang="scss">
html,
body {
  margin: 0;
  min-height: 100%;
  height: 100%;

}

#root {
  height: 100%;
}

* {
  box-sizing: border-box;
}
</style>
<style scoped lang="scss">
@use "@/variables" as *;
.app {
  background-color: var(--base-bg-darken-5);
  display: flex;
  height: 100%;
  width: 100%;

  .content {
    position: relative;
    flex-grow: 1;
    width: 100%;
    height: 100%;

    .view-wrapper {
      display: flex;
      overflow: hidden;
    }
  }
}
</style>
