<script setup lang="ts">
import {
  getCurrentInstance,
  reactive,
  onMounted,
  onBeforeUnmount,
  computed,
} from 'vue';
import AppFooter from './components/app-footer.vue';
import { sizes, subscribe, unsubscribe } from './utils/media-query';

interface ScreenSizeInfo {cssClasses: string[], isXSmall?: boolean, isLarge?: boolean}

function getScreenSizeInfo(): ScreenSizeInfo {
  const screenSizes: {[key: string]: boolean} = sizes();

  return {
    isXSmall: screenSizes['screen-x-small'],
    isLarge: screenSizes['screen-large'],
    cssClasses: Object.keys(screenSizes).filter((cl: string) => screenSizes[cl]),
  };
}

const vm = getCurrentInstance();

const { title } = (vm?.proxy as unknown as {$appInfo: {title: string}}).$appInfo;
const screen: {getScreenSizeInfo: ScreenSizeInfo} = reactive({
  getScreenSizeInfo: { cssClasses: [] },
});

screen.getScreenSizeInfo = getScreenSizeInfo();

function screenSizeChanged() {
  screen.getScreenSizeInfo = getScreenSizeInfo();
}

onMounted(() => {
  subscribe(screenSizeChanged);
});

onBeforeUnmount(() => {
  unsubscribe(screenSizeChanged);
});

const cssClasses = computed(() => ['app'].concat(screen.getScreenSizeInfo.cssClasses));

</script>

<template>
  <div id="root" class="dx-theme-generic">
    <div :class="cssClasses">
      <component
          :is="$route.meta.layout"
          :title="title"
          :is-x-small="screen.getScreenSizeInfo.isXSmall"
          :is-large="screen.getScreenSizeInfo.isLarge"
      >
        <div class="content">
          <router-view></router-view>
        </div>
        <app-footer />
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

.app {
  @import "@/variables.scss";
  background-color: darken($base-bg, 5);
  display: flex;
  height: 100%;
  width: 100%;

  .content {
    position: relative;
    flex-grow: 1;
    width: 100%;

    .view-wrapper {
      display: flex;
      overflow: hidden;
    }
  }
}

</style>
