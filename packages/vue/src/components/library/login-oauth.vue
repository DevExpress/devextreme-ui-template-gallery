<template>
  <div class="oauth-button-container">
    <p>or</p>
    <dx-button
      width="100%"
      icon="icons/google-logo.svg"
      text="Login with Google"
      :styling-mode="getButtonStylingMode(currentTheme)"
    />
    <dx-button
      width="100%"
      icon="icons/microsoft-logo.svg"
      text="Login with Microsoft"
      :styling-mode="getButtonStylingMode(currentTheme)"
    />
  </div>
</template>

<script setup lang="ts">
import DxButton, { DxButtonTypes } from 'devextreme-vue/button';
import { themeService } from '@/theme/theme-service';

const { currentTheme } = themeService;

function getButtonStylingMode(theme: string | undefined): DxButtonTypes.ButtonStyle {
  return theme === 'dark' ? 'outlined' : 'contained';
}
</script>

<style scoped lang="scss">
@use "@/variables.scss" as *;

.oauth-button-container {
  text-align: center;

  > p {
    margin: 16px 0;
  }

  .dx-button {
    margin-top: 8px;
  }
}
</style>
