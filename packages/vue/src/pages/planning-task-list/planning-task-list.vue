<template>
  <div class="view-wrapper">
    <dx-toolbar>
      <dx-toolbar-item location="before">
        <span class="toolbar-header">Task</span>
      </dx-toolbar-item>
      <dx-toolbar-item location="before">
        <dx-tabs :selected-index="0"
                 :items="taskPanelItems"
                 @item-click="tabValueChange"/>
      </dx-toolbar-item>

      <dx-toolbar-item location="after"
                       locateInMenu="auto"
                       cssClass="add-grid-row">
        <dx-button icon="plus"
                   text="Add Task"
                   type="default"
                   styling-mode="contained"
                   @click="addDataGridRow"/>
      </dx-toolbar-item>

      <dx-toolbar-item location="after"
                       locateInMenu="auto"
                       widget="dxButton"
                       showText="inMenu"
                       :options="{
             text: 'Refresh',
             icon: 'refresh',
             onClick: reload
        }"/>

      <dx-toolbar-item :visible="activeTabId === 'grid'"
                       location="after"
                       locateInMenu="auto"
                       widget="dxButton"
                       showText="inMenu"
                       :options="{
             text: 'Column Chooser',
             icon: 'columnchooser',
             onClick: chooseColumnDataGrid
         }" />

      <dx-toolbar-item :visible="['grid', 'gantt'].includes(activeTabId)"
                       location="after" locateInMenu="auto">
        <div class="separator"></div>
      </dx-toolbar-item>

      <dx-toolbar-item :visible="['grid', 'gantt'].includes(activeTabId)"
                       location="after"
                       locateInMenu="auto"
                       widget="dxButton"
                       showText="inMenu"
                       :options="{
            text: 'Export to PDF',
            icon: 'exportpdf',
            onClick: exportDataGrid
        }"/>

      <dx-toolbar-item location="after"
                       locateInMenu="auto"
                       widget="dxTextBox"
                       :options="{
            placeholder: 'Task Search',
            mode: 'search',
            onInput: searchDataGrid
        }"/>
    </dx-toolbar>

    <div class="task-list">
      <div  v-if="taskPanelItems[0].text == displayTaskComponent" class="grid">
        <task-list-grid ref="tasksGridCmp" :data-source="dataSource"/>
      </div>
      <div v-if="taskPanelItems[1].text == displayTaskComponent" class="kanban">
        <task-list-kanban :tasks="kanbanData" :is-loading="isLoading"></task-list-kanban>
      </div>
      <div v-else-if="taskPanelItems[2].text == displayTaskComponent" class="gantt">
        <task-list-gantt ref="tasksGanttCmp" :tasks="ganttData"></task-list-gantt>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DxButton from 'devextreme-vue/button';
import DxTabs from 'devextreme-vue/tabs';
import { ItemClickEvent as TabsItemClickEvent } from 'devextreme/ui/tabs';
import { InputEvent as TextBoxInputEvent } from 'devextreme/ui/text_box';
import {
  DxToolbar,
  DxItem as DxToolbarItem,
} from 'devextreme-vue/toolbar';

// eslint-disable-next-line import/no-unresolved
import { getTasks } from 'dx-rwa-data';
import DataSource from 'devextreme/data/data_source';

import { taskPanelItems, TaskPanelItemsIds } from '@/types/resource';
import type { Task } from '@/types/task';

import TaskListGrid from './components/task-list-grid.vue';
import TaskListKanban from './components/task-list-kanban/task-list-kanban.vue';
import TaskListGantt from './components/task-list-gantt.vue';

const isLoading = ref(true);
const displayTaskComponent = ref(taskPanelItems[0].text);
const activeTabId = ref<TaskPanelItemsIds>('grid');
const tasksGridCmp = ref<InstanceType<typeof TaskListGrid> | null>(null);
const tasksGanttCmp = ref<InstanceType<typeof TaskListGantt> | null>(null);

const addDataGridRow = () => tasksGridCmp.value?.addRow();
const chooseColumnDataGrid = () => tasksGridCmp.value.showColumnChooser();
const searchDataGrid = (e: TextBoxInputEvent) => tasksGridCmp.value.search(e.component.option('text'));
const exportDataGrid = () => {
  ({
    grid: tasksGridCmp,
    gantt: tasksGanttCmp,
    kanban: null,
  })[activeTabId.value]?.value.onExporting();
};

const tabValueChange = (e: TabsItemClickEvent) => {
  const { itemData } = e;
  displayTaskComponent.value = itemData.text;
  const tabId = taskPanelItems.find((item) => displayTaskComponent.value === item.text)?.id;
  activeTabId.value = tabId || 'grid';
};
const kanbanData = ref<Task[]>([]);
const ganttData = ref<Task[]>([]);

const getTasksAsync = () => getTasks().then(
  (data: Task[]) => {
    kanbanData.value = [...data];
    ganttData.value = [...data];
    isLoading.value = false;
    return data.filter((item) => !!item.status && !!item.priority);
  },
);

const dataSource = new DataSource({
  key: 'id',
  load: () => getTasksAsync(),
});

const reload = () => {
  isLoading.value = true;
  getTasksAsync();
  if (activeTabId.value === 'grid') {
    dataSource.reload();
  }
};
</script>

<style scoped lang="scss">
@use "@/variables" as *;
@use "sass:math";

@include separator();

.view-wrapper {
  flex-direction: column;
  display: flex;
  flex-grow: 1;
  padding: 20px 16px 0 16px;
}

.task-list {
 min-height: 500px;
}

:deep(.dx-toolbar) {
  .toolbar-header {
    @include header();
  }

  .dx-tabs .dx-tab {
    background-color: $background-color;

    &:nth-child(2) {
      width: 150px;
    }
  }
}

.add-grid-row {
  .dx-icon.dx-icon-plus,
  .dx-button-text {
    color: #fff;
  }
}
</style>
