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
import { currentTheme as currentVizTheme, refreshTheme } from 'devextreme/viz/themes';

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

  const enabledStyleSheet: CSSStyleSheet[] = [];
  getThemeStyleSheets().forEach((styleSheet) => {
    if (styleSheet?.href?.includes(`${themeMarker}${themeName}`)) {
      enabledStyleSheet.push(styleSheet);
    } else {
      styleSheet.disabled = true;
    }
  });

  enabledStyleSheet.forEach((styleSheet) => {
    styleSheet.disabled = false;
  });

  window.localStorage[storageKey] = themeName;
  currentVizTheme(currentVizTheme().replace(/\.[a-z]+\.compact$/, `.${themeName}.compact`));
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
