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
    display: flex;
    width: 32px;
    height: 32px;
    margin: 2px 5px;
    text-align: center;
    justify-content: center;
    border-radius: 50%;
    background: var(--accent-color);
    color: var(--base-bg);
    align-items: center;
    font-size: 12px;
  }
}
</style>
