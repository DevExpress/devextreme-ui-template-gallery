<template>
  <dx-load-panel
    :visible="props.isLoading"
    :show-pane="false"
    :width="props.width"
    :container="props.containerSelector"
    :position="{ of: props.containerSelector }"
  />
  <slot v-if="props.showContent" />
</template>

<script setup lang="ts">
import DxLoadPanel from 'devextreme-vue/load-panel';

const props = withDefaults(defineProps<{
  isLoading: boolean,
  containerSelector?: string,
  width?: number | string,
  showContent?: boolean,
}>(), {
  isLoading: false,
  containerSelector: '',
  width: 'auto',
  showContent: true,
});
</script>

<style scoped lang="scss">

</style>
