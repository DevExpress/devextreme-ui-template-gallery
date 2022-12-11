<template>
  <dx-load-panel
    :visible="props.isLoading"
    :show-pane="false"
    :width="props.width"
    :container="props.containerSelector"
    :position="{ of: props.containerSelector }"
  />
  <slot v-if="props.isData" />
</template>

<script setup lang="ts">
import DxLoadPanel from 'devextreme-vue/load-panel';

const props = withDefaults(defineProps<{
  isLoading: boolean,
  containerSelector?: string,
  width?: number,
  isData: boolean,
}>(), {
  isLoading: false,
  containerSelector: '',
  width: null,
  isData: true,
});
</script>

<style scoped lang="scss">

</style>
