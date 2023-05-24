<template>
  <div class="oauth-button-container">
    <p>or</p>
    <dx-button
      width="100%"
      icon="icons/google-logo.svg"
      text="Login with Google"
    />
    <dx-button
      width="100%"
      icon="icons/microsoft-logo.svg"
      text="Login with Microsoft"
    />
  </div>
</template>

<script setup lang="ts">
import DxButton from 'devextreme-vue/button';
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
