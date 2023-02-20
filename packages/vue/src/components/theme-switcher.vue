<template>
  <dx-button class="theme-button"
             :icon="`assets/icons/${theme === 'dark' ? 'moon' : 'sun'}.svg`"
             @click="onClickButton">
  </dx-button>
</template>

<script setup lang="ts">
import { DxButton } from 'devextreme-vue/button';
import { ref } from 'vue';
import { getCurrentTheme, switchTheme } from '@/utils/theme-switch';

const theme = ref(getCurrentTheme());

function onClickButton() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
  switchTheme(theme.value);
}
</script>

<style scoped lang="scss">
 .theme-button {
   :deep(.dx-icon) {
     height: 24px;
     width: 24px;
   }
 }
</style>
