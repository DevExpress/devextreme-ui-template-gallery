<template>
  <div class="content-block">
    <footer class="footer">
      Copyright © 2011-{{new Date().getFullYear()}} {{appInfo?.title}} Inc.
      <br />All trademarks or registered trademarks are property of their
      respective owners.
    </footer>
  </div>
</template>
<script setup lang="ts">
import { inject } from 'vue';
import { AppInfo } from '@/types/app-info';

const appInfo = inject<AppInfo>('app-info');
</script>

<style lang="scss">
@import "../variables.scss";

.footer {
  display: block;
  color: rgba($base-text-color, alpha($base-text-color) * 0.7);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 20px;
  padding-bottom: 24px;
}
</style>
