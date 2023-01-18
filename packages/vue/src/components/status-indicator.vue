<template>
  <div
    :class="[{ 'input-with-bar': props.showBar }, 'status-indicator-' + statusClass]"
    class="status status-indicator"
  >
    <span
      v-if="!props.isField"
      :class="['status-indicator-' + statusClass]"
    >{{ getValue() }}
    </span>
    <dx-text-box
      v-if="props.isField"
      :class="['status-indicator-' + statusClass]"
      :input-attr="{ class: 'status-input status-editor-input' }"
      :hover-state-enabled="false"
      :read-only="true"
      :value="getValue()"
    />
  </div>
</template>
<script setup lang="ts">
import { DxTextBox } from 'devextreme-vue/text-box';
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    value: string,
    showBar?: boolean,
    isField?: boolean,
  }>(),
  {
    value: '',
    showBar: false,
    isField: false,
  },
);

const statusClass = computed(() => props.value.replace(/\s+/g, '-').toLowerCase());

function getValue(): string {
  return (props.showBar ? '| ' : '') + props.value;
}
</script>
<style scoped lang="scss">

.status {
  span {
    font-size: 13px;
  }
}
</style>
