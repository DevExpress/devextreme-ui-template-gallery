<template>
  <div class="content-block">
    <footer class="footer">
      Copyright © {{ new Date().getFullYear() }} Developer Express Inc.
    </footer>
  </div>
</template>
<script setup lang="ts">
</script>

<style scoped lang="scss">
@import "../variables.scss";

.content-block footer {
  display: block;
  color: rgba($base-text-color, alpha($base-text-color) * 0.7);
  border-top: 1px solid $base-border-color;
  padding-top: 20px;
  padding-bottom: 24px;
}
</style>
