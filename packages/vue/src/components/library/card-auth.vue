<template>
  <div class="auth-card">
    <div class="dx-card content">
      <div class="header">
        <div class="title">
          {{ props.title }}
        </div>
        <div class="description">
          {{ props.description }}
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  title?: string,
  description?: string
}>();
</script>

<style scoped lang="scss">
@use '@/variables.scss' as *;

.auth-card {
  display: flex;
  height: 100%;

  :deep(.dx-button-text) {
    text-transform: none;
  }

  .dx-card {
    margin: auto auto;
    padding: 24px;
    flex-grow: 0;
    max-width: 360px;
    border-radius: 8px;

    &.content {
      height: auto;
    }

    .screen-x-small & {
      width: 100%;
      height: 100%;
      max-width: 100%;
      border-radius: 0;
      box-shadow: none;
      margin: 0;
      border: 0;
      flex-grow: 1;
    }

    .header {
      margin-bottom: 24px;
      margin-top: 24px;

      .title {
        color: var(--base-text-color);
        text-align: center;
        line-height: 24px;
        font-weight: 500;
        font-size: 24px;
      }

      .description {
        color: var(--base-text-color-alpha);
        line-height: 16px;
        font-size: 12px;
        margin-top: 32px;
        text-align: center;
      }
    }
  }
}
</style>
