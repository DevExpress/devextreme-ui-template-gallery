<template>
  <dx-gantt
    ref="dxGanttCmp"
    :task-list-width="500"
    :scale-type="'weeks'"
    @task-click="onTaskClick"
    :height="700"
  >
    <dx-tasks
      :data-source="props.tasks"
      :start-expr="'startDate'"
      :end-expr="'dueDate'"
      title-expr="text"
    />

    <dx-gantt-column
      data-field="text"
      caption="Subject"
      :width="300"
    />
    <dx-gantt-column
      data-field="startDate"
      caption="Start Date"
      data-type="date"
      sort-order="asc"
    />
    <dx-gantt-column
      data-field="dueDate"
      caption="Due Date"
      data-type="date"
    />

    <dx-gantt-toolbar>
      <dx-item name="undo" />
      <dx-item name="redo" />
      <dx-item name="separator" />
      <dx-item name="collapseAll" />
      <dx-item name="expandAll" />
      <dx-item name="separator" />
      <dx-item name="addTask" />
      <dx-item name="deleteTask" />
      <dx-item name="separator" />
      <dx-item name="zoomIn" />
      <dx-item name="zoomOut" />
    </dx-gantt-toolbar>

    <dx-validation :auto-update-parent-tasks="true" />
    <dx-editing :enabled="true" />
  </dx-gantt>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { router } from '@/router';
import {
  DxGantt,
  DxTasks,
  DxEditing,
  DxValidation,
  DxColumn as DxGanttColumn,
  DxToolbar as DxGanttToolbar,
  DxItem,
} from 'devextreme-vue/gantt';
import { Task } from '@/types/task';
import { jsPDF as JsPDF } from 'jspdf';
import { exportGantt } from 'devextreme/pdf_exporter';
import { TaskClickEvent } from 'devextreme/ui/gantt';

const props = withDefaults(defineProps<{
  tasks: Task[]
}>(), {
  tasks: () => [],
});

const dxGanttCmp = ref<InstanceType<typeof DxGantt> | null>(null);

const onExporting = () => {
  const doc = new JsPDF();
  exportGantt({
    jsPDFDocument: doc,
    component: dxGanttCmp.value.instance,
  }).then(() => {
    doc.save('Tasks.pdf');
  });
};

const navigateToDetails = () => {
  router.push('/planning-task-details');
};

const onTaskClick = (e: TaskClickEvent) => {
  if (!e.event?.target?.closest('.dx-treelist-expanded, .dx-treelist-collapsed')) {
    navigateToDetails();
  }
};

defineExpose({
  onExporting,
});
</script>

<style scoped lang="scss">
</style>
