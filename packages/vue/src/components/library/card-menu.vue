<template>
  <drop-down-button
    :items="props.items"
    :visible="props.visible"
    icon="overflow"
    :show-arrow-icon="false"
    styling-mode="text"
    :drop-down-options="{ width: 'auto' }"
  />
</template>

<script setup lang="ts">
import DropDownButton from 'devextreme-vue/drop-down-button';

const props = withDefaults(defineProps<{
  items: Array<{ text: string }>,
  visible?: boolean
  }>(), {
  visible: true,
});
</script>
<style lang="scss">
.dx-dropdownbutton-content {
  .dx-list-item {
    display: block;
  }
}
</style>
