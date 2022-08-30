<template>
  <div :style="{
    position: 'relative',
    display: 'flex'
  }">
    <div class="dx-texteditor-label">
      {{ props.label }}</div>
    <span class="dx-theme-accent-as-text-color">{{ props.value }}</span>
  </div>

</template>

<script setup lang="ts">
const props = withDefaults(defineProps<
      {
        label: string,
        value: string,
      }>(), {
  label: '',
  value: '',
});
</script>

<style scoped lang="scss">
  span {
    margin-top: 12px;
  }
</style>
