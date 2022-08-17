<template>
  <div :style="{
    position: 'relative',
    display: 'flex'
  }">
    <label class="dx-texteditor-label">
      {{ props.label }}</label>
    <span class="dx-theme-accent-as-text-color">{{ props.value }}</span>
  </div>

</template>

<script setup lang="ts">
  import {watch} from "vue";

  const props = withDefaults(defineProps<
      {
        label: string,
        value: string,
      }>(), {
    label: '',
    value: '',
  })

  watch(() => props.label,
      (newVal) => console.log('---props.test------->', newVal))
</script>

<style scoped lang="scss">
  span {
    margin-top: 12px;
  }
</style>
