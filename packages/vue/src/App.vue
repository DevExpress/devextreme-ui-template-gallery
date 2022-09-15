<script setup lang="ts">
import {
  computed, inject,
} from 'vue';
import { AppInfo, appInfoInjectKey } from '@/types/app-info';
import simpleLayout from '@/layouts/single-card.vue';
import AppFooter from './components/app-footer.vue';
import { screenInfo } from './utils/media-query';

const appInfo = inject<AppInfo>(appInfoInjectKey);
const cssClasses = computed(() => ['app'].concat(screenInfo.value.cssClasses));
</script>

<template>
  <div id="root" class="dx-theme-generic">
    <div :class="cssClasses">
      <component
          :is="$route.meta.layout"
          :title="appInfo?.title"
          :is-x-small="screenInfo.isXSmall"
          :is-large="screenInfo.isLarge"
      >
        <div class="content">
          <router-view></router-view>
        </div>
        <app-footer v-if="$route.meta.layout !== simpleLayout"/>
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

  &:deep(.form-compact) {
    .dx-layout-manager .dx-field-item:not(.dx-first-col) {
      padding-left: 0;
    }

    .dx-field-item {
      padding: 0;

      &:not(.dx-first-row):not(.dx-field-item-has-group) {
        padding-top: 15px;
      }

      &.dx-field-item-has-group.dx-first-col.dx-last-row {
        padding: 15px 0;
      }
    }
  }
}
</style>
