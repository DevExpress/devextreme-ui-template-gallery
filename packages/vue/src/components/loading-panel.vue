<template>
  <dx-load-panel
    container=".view-wrapper"
    :position="{of: '.dx-drawer-content'}"
    :visible="props.loading"
    :show-pane="true"
  />
</template>

<script setup lang="ts">
import { DxLoadPanel } from 'devextreme-vue/load-panel';

const props = withDefaults(
  defineProps<{
    loading: boolean
  }>(),
  {
    loading: true,
  },
);
</script>
