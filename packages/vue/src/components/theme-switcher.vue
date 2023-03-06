<template>
  <dx-button
    class="theme-button"
    :icon="`icons/${theme === 'dark' ? 'sun' : 'moon'}.svg`"
    @click="onClickButton"
  />
</template>

<script setup lang="ts">
import { DxButton } from 'devextreme-vue/button';
import { ref } from 'vue';
import { getCurrentTheme, setAppTheme } from '@/theme/theme';
import type { Theme } from '@/theme/theme';

const theme = ref<Theme>(getCurrentTheme());

function onClickButton() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
  setAppTheme(theme.value);
}
</script>
