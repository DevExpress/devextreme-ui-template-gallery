<template>
  <dx-list
    :data-source="items"
    @item-click="handleItemClick"
  >
    <template #item="{ data: task }">
      <div class="agenda-item">
        <agenda-list-item
          :appointment="task"
          :resources="resources"
        />
      </div>
    </template>
  </dx-list>
</template>

<script setup lang="ts">
import { DxList } from 'devextreme-vue';
import AgendaListItem from './agenda-list-item.vue';

export type AgendaItem = { startDate: Date };

withDefaults(defineProps<{
  items: AgendaItem[],
  resources: Record<string, unknown>[],
}>(), {
  items: () => [],
  resources: () => [],
});

const emit = defineEmits(['clickAppointment']);

function handleItemClick(
  { itemData, element }: {itemData: Record<string, unknown>, element: HTMLElement},
) {
  emit('clickAppointment', { itemData, element });
}
</script>

<style scoped lang="scss">
@use "@/variables.scss" as *;

.dx-list :deep(.dx-item:not(:first-child)) .agenda-item {
  border-top: solid 1px var(--border-color);
}
</style>
