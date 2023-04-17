<template>
  <footer class="footer">
    Copyright © {{ new Date().getFullYear() }} <br> Developer Express Inc.
  </footer>
</template>
<script setup lang="ts">
</script>

<style scoped lang="scss">
@use "@/variables" as *;

.footer {
  display: block;
  color: $base-text-color-alpha;
  padding: 20px 0 16px $footer-left-padding;
  background-color: $side-panel-background;
  height: $footer-height;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;

  .dx-drawer-opened & {
    opacity: 1;
    transition-duration: 250ms;
    transition-delay: 400ms;
  }
}
</style>
