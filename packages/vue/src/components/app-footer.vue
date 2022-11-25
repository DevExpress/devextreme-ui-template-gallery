<template>
  <footer class="footer">
    Copyright © {{ new Date().getFullYear() }} <br> Developer Express Inc.
  </footer>
</template>
<script setup lang="ts">
</script>

<style scoped lang="scss">
@import "../variables.scss";

.footer {
  display: block;
  color: rgba($base-text-color, alpha($base-text-color) * 0.7);
  padding: 20px 0 16px 21px;
  background-color: $side-panel-background;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
