<template>
  <dx-button
    class="theme-button"
    :icon="`icons/${theme !== 'dark' ? 'moon' : 'sun'}.svg`"
    @click="onClickButton"
  />
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
 .dx-button.theme-button.dx-button-has-icon {
   margin-left: 10px;

   :deep(.dx-icon) {
     height: 24px;
     width: 24px;
   }
 }
</style>
