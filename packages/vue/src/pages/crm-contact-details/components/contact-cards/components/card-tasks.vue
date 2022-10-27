<template>
  <div id="card-tasks">
    <load-component
      :is-loading="props.isLoading"
      :container-selector="'#card-tasks'"
    >
      <dx-data-grid
        v-if="!props.isLoading"
        :data-source="filteredTasks"
        :column-auto-width="true"
        :selection-filter="['done', '=', true]"
      >
        <dx-selection
          :deferred="true"
          show-check-boxes-mode="always"
          mode="multiple"
        />
        <dx-row-dragging
          :allow-reordering="true"
          :on-reorder="onReorder"
          :show-drag-icons="true"
        />

        <!--  Grid Columns    -->
        <dx-column
          data-field="text"
          caption="Subject"
          :hiding-priority="3"
        />
        <dx-column
          data-field="date"
          data-type="date"
          caption="Due Date"
          :hiding-priority="1"
        />
        <dx-column
          caption="Assigned To"
          data-field="manager"
          :hiding-priority="0"
        />
      </dx-data-grid>
    </load-component>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import {
  DxDataGrid,
  DxColumn,
  DxSelection,
  DxRowDragging,
} from 'devextreme-vue/data-grid';
import LoadComponent from '@/components/load-component.vue';
import { Task } from '@/types/task';
import { RowDraggingReorderEvent } from 'devextreme/ui/data_grid';

const props = withDefaults(defineProps<{
  isLoading: boolean,
  manager: string,
  tasks: Task[]
}>(), {
  tasks: () => [],
  isLoading: true,
  manager: '',
});

const tasks = ref<Task[]>([]);

watch(
  () => props.tasks,
  (newTasks) => {
    tasks.value = newTasks;
  },
);

const filteredTasks = computed(
  () => tasks.value.filter((item) => !!item.status && !!item.priority),
);

const onReorder = (e: RowDraggingReorderEvent) => {
  const visibleRows = e.component.getVisibleRows();
  const toIndex = tasks.value.indexOf(visibleRows[e.toIndex].data);
  const fromIndex = tasks.value.indexOf(e.itemData);

  tasks.value.splice(fromIndex, 1);
  tasks.value.splice(toIndex, 0, e.itemData);
};
</script>

<style scoped>
#card-tasks {
  min-height: 300px;
  padding: 20px;
}
</style>
