<template>
  <span class="task-status" :class="{[className]: true}">
    {{ props.status }}</span>
</template>
<script setup lang="ts">

import { computed } from 'vue';

const props = withDefaults(
  defineProps<{status: string}>(),
  {
    status: '',
  },
);

const className = computed(() => `status-${props.status?.replace(/ /g, '-').toLowerCase()}`);
</script>
<style scoped lang="scss">
.task-status {
  font-size: 14px;

  &.status-open {
    color: #505ed9;
  }

  &.status-in-progress {
    color: #34aa95;
  }

  &.status-deferred {
    color: #969696;
  }

  &.status-completed {
    color: #2b9029;
  }
}
</style>
