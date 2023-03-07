<template>
  <dx-button
    class="theme-button"
    :icon="`icons/${currentTheme === 'dark' ? 'sun' : 'moon'}.svg`"
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
