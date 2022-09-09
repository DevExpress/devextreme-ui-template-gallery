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
      ></dx-selection>

      <!--  Grid Columns    -->
      <dx-column
        dataField="text"
        caption="Subject"
        :hiding-priority="3"
      ></dx-column>
      <dx-column
        dataField="date"
        dataType="date"
        caption="Due Date"
        :hiding-priority="1"
      ></dx-column>
      <dx-column
        caption="Assigned To"
        cellTemplate="assignTemplate"
        :hiding-priority="0"
      >
        <div>
          {{ props.manager }}
        </div>
      </dx-column>
    </dx-data-grid>
    </load-component>
  </div>

</template>

<script setup lang="ts">
import { computed } from 'vue';
import DxDataGrid, {
  DxColumn,
  DxSelection,
} from 'devextreme-vue/data-grid';
import LoadComponent from '@/components/load-component.vue';
import { Task } from '@/types/task';

const props = withDefaults(defineProps<{
  isLoading: boolean,
  manager: string,
  tasks: Task[]
}>(), {
  tasks: () => [],
  isLoading: true,
  manager: '',
});

const filteredTasks = computed(
  () => props.tasks.filter((item) => !!item.status && !!item.priority),
);
</script>

<style scoped>
#card-tasks {
  min-height: 300px;
  padding: 20px;
}
</style>
