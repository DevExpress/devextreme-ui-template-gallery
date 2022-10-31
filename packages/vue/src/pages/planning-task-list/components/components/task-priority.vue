<template>
  <div
    class="priority"
    :class="'priority-' + props.value?.toLowerCase()"
  >
    <div class="separator" />
    <span>{{ props.value }}</span>
  </div>
</template>
<script setup lang="ts">

const props = withDefaults(
  defineProps<{value: string}>(),
  {
    value: '',
  },
);
</script>
<style scoped lang="scss">
.priority {
  display: flex;
  align-items: center;

  &.priority-low {
    color: #d3a268;

    .separator {
      background: #d3a268;
    }
  }

  &.priority-normal {
    color: #6fbaca;

    .separator {
      background: #6fbaca;
    }
  }

  &.priority-high {
    color: #ff5722;

    .separator {
      background: #ff5722;
    }
  }

  .separator {
    width: 2px;
    height: 18px;
    margin-right: 6px;
    border-radius: 2px;
    display: inline-block;
  }

  span {
    font-weight: 600;
    font-size: 12px;
  }
}
</style>
