<template>
  <dx-button
    class="theme-button"
    styling-mode="text"
    :icon="currentTheme === 'dark' ? 'sun' : 'moon'"
    @click="onClickButton"
  />
</template>

<script setup lang="ts">
import { DxButton } from 'devextreme-vue/button';
import { themeService } from '@/theme/theme-service';

const { currentTheme } = themeService;

function onClickButton() {
  themeService.switchAppTheme();
}
</script>
