<template>
  <div
    class="circle"
    :data-letters="props.dataLetters"
  />
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  dataLetters: string,
}>(), {
  dataLetters: () => '',
});
</script>

<style scoped lang="scss">
@use "@/variables.scss" as *;

.circle {
  &[data-letters]::before {
    content: attr(data-letters);
    display: inline-block;
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    border-radius: 50%;
    background: $accent-color;
    color: $base-bg;
  }
}
</style>
