<template>
  <div
    :class="[{ 'input-with-bar': props.showBar }, 'status-indicator-' + props.value?.toLowerCase()]"
    class="status status-indicator"
  >
    <span
      v-if="!props.isField"
      :class="['status-indicator-' + props.value.toLowerCase()]"
    >{{ getValue() }}
    </span>
    <dx-text-box
      v-if="props.isField"
      :class="['status-indicator-' + props.value.replace(' ', '-').toLowerCase()]"
      :input-attr="{ class: 'status-input status-editor-input' }"
      :hover-state-enabled="false"
      :read-only="true"
      :value="getValue()"
    />
  </div>
</template>
<script setup lang="ts">
import { DxTextBox } from 'devextreme-vue/text-box';

const props = withDefaults(
  defineProps<{
    value: string,
    showBar: boolean,
    isField: boolean,
  }>(),
  {
    value: '',
    showBar: false,
    isField: false,
  },
);

function getValue(): string {
  return (props.showBar ? '| ' : '') + props.value;
}
</script>
<style scoped lang="scss">
span.status {
  font-size: 14px;
}

.status {
  display: flex;
  align-items: center;
}
</style>
