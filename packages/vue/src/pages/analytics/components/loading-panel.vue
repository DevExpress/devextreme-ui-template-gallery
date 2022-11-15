<template>
  <dx-load-panel
    container=".view-wrapper"
    :position="{of: '.app-content-wrapper'}"
    :visible="isLoading"
    :show-pane="true"
  />
</template>

<script setup lang="ts">
import { DxLoadPanel } from 'devextreme-vue/load-panel';
import { computed, Ref } from 'vue';

const props = withDefaults(
  defineProps<{
    data: Ref[]
  }>(),
  {
    data: () => [],
  },
);

const isLoading = computed(
  () => !!props.data.find((item) => !item || item.value === null),
);
</script>
