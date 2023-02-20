<template>
  <dx-button class="theme-button"
             :icon="`icons/${theme === 'dark' ? 'sun' : 'moon'}.svg`"
             @click="onClickButton">
  </dx-button>
</template>

<script setup lang="ts">
import { DxButton } from 'devextreme-vue/button';
import { ref } from 'vue';
import { currentTheme, refreshTheme } from 'devextreme/viz/themes';

const storageKey = 'themeViewer';
const themeMarker = 'theme-';

function getCurrentTheme(): 'dark' | 'light' {
  return window.localStorage[storageKey] || 'light';
}

function getThemeStyleSheets() {
  return [...document.styleSheets]
    .filter((styleSheet) => styleSheet?.href?.includes(themeMarker));
}

function switchTheme(themeName?: string) {
  themeName = themeName || getCurrentTheme();

  getThemeStyleSheets().forEach((styleSheet) => {
    styleSheet.disabled = !styleSheet?.href?.includes(`${themeMarker}${themeName}`);
  });

  window.localStorage[storageKey] = themeName;
  currentTheme(`material.${themeName}`);
  refreshTheme();
}

switchTheme();

const theme = ref(getCurrentTheme());

function onClickButton() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
  switchTheme(theme.value);
}
</script>

<style scoped lang="scss">
</style>
