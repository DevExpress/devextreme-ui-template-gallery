<template>
  <dx-list
    class="calendar-list"
    :data-source="dataSource"
    :active-state-enabled="false"
    :focus-state-enabled="false"
    :hover-state-enabled="false"
    :grouped="true"
    :collapsible-groups="true"
    :scrolling-enabled="false"
  >
    <template #group="{ data: item }">
      <div class="list-header">
        {{ item.key }}
      </div>
    </template>

    <template #item="{ data: item }">
      <div>
        <div class="list-item">
          <dx-check-box
            :value="selectedItems.includes(item)"
            :focus-state-enabled="false"
            @value-changed="(value) => selectionChanged(item, value)"
          />
          <span class="list-item-text">{{ item.text }}</span>
        </div>
      </div>
    </template>
  </dx-list>
</template>

<script setup lang="ts">
import { DxList, DxCheckBox } from 'devextreme-vue';
import { watchEffect } from 'vue';

const props = withDefaults(defineProps<{
  dataSource: {items: Record<string, unknown>[]}[],
}>(), {
  dataSource: () => [],
});

let selectedItems: Record<string, unknown>[] = [];

watchEffect(() => {
  selectedItems = [...props.dataSource.flatMap((el) => el.items)];
});

const emit = defineEmits(['listSelectionChanged']);

function selectionChanged(item: Record<string, unknown>, { value }: { value: boolean }) {
  selectedItems = value ? [...selectedItems, item] : selectedItems.filter((el) => el !== item);
  emit('listSelectionChanged', selectedItems);
}
</script>

<style scoped lang="scss">
@use "@/variables.scss" as *;

.calendar-list {
  width: 100%;

  :deep(.dx-list-group-header) {
    .dx-inkripple {
      border-radius: 4px;
    }
  }

  .list-header {
    display: flex;
    vertical-align: middle;
    align-items: center;
    gap: 8px;
    color: var(--base-text-color);

    @include h1-header-text();
  }

  :deep(.dx-list-group-body) .dx-list-item.dx-list-item-selected {
    background-color: var(--base-bg);
  }

  :deep(.dx-list-group):not(.dx-list-group-collapsed):not(:last-child) {
    border-style: none;
  }

  .list-item {
    display: flex;
    vertical-align: middle;
    align-items: center;
    border-radius: 4px;
  }

  .list-item-text {
    padding: 0 8px;

    @include calendar-items-text();
  }
}
</style>
