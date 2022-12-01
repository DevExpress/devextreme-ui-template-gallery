<template>
  <div class="view-wrapper">
    <dx-toolbar class="toolbar-details">
      <dx-toolbar-item location="before">
        <span class="toolbar-header">Tasks</span>
      </dx-toolbar-item>
      <dx-toolbar-item location="before">
        <dx-tabs
          :width="screenInfo.isXSmall ? 220 : 'auto'"
          :show-nav-buttons="false"
          :scroll-by-content="true"
          :selected-index="0"
          :items="taskPanelItems"
          @item-click="tabValueChange"
        />
      </dx-toolbar-item>

      <dx-toolbar-item
        location="after"
        locate-in-menu="auto"
        css-class="add-grid-row"
      >
        <div>
          <dx-button
            icon="plus"
            text="Add Task"
            type="default"
            styling-mode="contained"
            @click="addTask"
          />
        </div>
      </dx-toolbar-item>
      <dx-toolbar-item
        location="after"
        locate-in-menu="auto"
        widget="dxButton"
        show-text="inMenu"
        :options="{
          text: 'Refresh',
          icon: 'refresh',
          onClick: reload
        }"
      />

      <dx-toolbar-item
        :disabled="activeTabId !== 'grid'"
        location="after"
        locate-in-menu="auto"
        widget="dxButton"
        show-text="inMenu"
        :options="{
          text: 'Column Chooser',
          icon: 'columnchooser',
          onClick: chooseColumnDataGrid
        }"
      />

      <dx-toolbar-item
        location="after"
        locate-in-menu="auto"
      >
        <div>
          <div class="separator" />
        </div>
      </dx-toolbar-item>

      <dx-toolbar-item
        :disabled="!['grid', 'gantt'].includes(activeTabId)"
        location="after"
        locate-in-menu="auto"
        widget="dxButton"
        show-text="inMenu"
        :options="{
          text: 'Export to PDF',
          icon: 'exportpdf',
          onClick: exportToPdf
        }"
      />

      <dx-toolbar-item
        :disabled="!['grid'].includes(activeTabId)"
        location="after"
        locate-in-menu="auto"
        widget="dxButton"
        show-text="inMenu"
        :options="{
          text: 'Export to Exel',
          icon: 'exportxlsx',
          onClick: exportToXlsx
        }"
      />
      <dx-toolbar-item
        :disabled="!['grid'].includes(activeTabId)"
        location="after"
        locate-in-menu="auto"
        widget="dxTextBox"
        :options="{
          placeholder: 'Task Search',
          mode: 'search',
          onInput: searchDataGrid
        }"
      />
    </dx-toolbar>
    <load-component :is-loading="isLoading">
      <div class="task-list">
        <div
          v-if="taskPanelItems[0].text === displayTaskComponent"
          class="grid"
        >
          <task-list-grid
            ref="tasksGridCmp"
            :data-source="gridData"
          />
        </div>
        <div
          v-else-if="taskPanelItems[1].text === displayTaskComponent"
          class="kanban"
        >
          <task-list-kanban
            :tasks="kanbanData"
            @add-task="addTask"
          />
        </div>
        <div
          v-else-if="taskPanelItems[2].text === displayTaskComponent"
          class="gantt"
        >
          <task-list-gantt
            ref="tasksGanttCmp"
            :tasks="ganttData"
          />
        </div>
      </div>
    </load-component>
  </div>
  <form-popup
    title="New Task"
    v-model:is-visible="isNewTaskPopupOpened"
    @save="onSaveNewTask"
  >
    <task-form
      :content-by-screen="{ xs: 1, sm: 1 }"
      :is-create-mode="true"
    />
  </form-popup>
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
import { getTasks, getFilteredTasks } from 'dx-template-gallery-data';
import { taskPanelItems, TaskPanelItemsIds } from '@/types/resource';
import type { Task } from '@/types/task';
import FormPopup from '@/components/form-popup.vue';
import LoadComponent from '@/components/load-component.vue';
import TaskForm from '../components/task-form.vue';
import TaskListGrid from './components/task-list-grid.vue';
import TaskListKanban from './components/task-list-kanban/task-list-kanban.vue';
import TaskListGantt from './components/task-list-gantt.vue';

import { screenInfo } from '../../../utils/media-query';

const isLoading = ref(true);
const displayTaskComponent = ref(taskPanelItems[0].text);
const activeTabId = ref<TaskPanelItemsIds>('grid');
const tasksGridCmp = ref<InstanceType<typeof TaskListGrid> | null>(null);
const tasksGanttCmp = ref<InstanceType<typeof TaskListGantt> | null>(null);

const gridData = ref<Task[]>([]);
const kanbanData = ref<Task[]>([]);
const ganttData = ref<Task[]>([]);
const isNewTaskPopupOpened = ref(false);

const addTask = () => {
  isNewTaskPopupOpened.value = true;
};
const chooseColumnDataGrid = () => tasksGridCmp.value.showColumnChooser();
const searchDataGrid = (e: TextBoxInputEvent) => tasksGridCmp.value.search(e.component.option('text'));
const exportToPdf = () => {
  ({
    grid: tasksGridCmp,
    gantt: tasksGanttCmp,
    kanban: null,
  })[activeTabId.value]?.value.exportToPdf();
};

const exportToXlsx = () => {
  tasksGridCmp.value.exportToXlsx();
};

const loadFilteredTasksAsync = async () => {
  isLoading.value = true;

  const filteredTasks = await getFilteredTasks();

  kanbanData.value = [...filteredTasks];
  ganttData.value = filteredTasks;
  isLoading.value = false;
};

const loadTasksAsync = async () => {
  isLoading.value = true;
  const tasks = await getTasks();

  gridData.value = tasks.filter((item) => !!item.status && !!item.priority);
  isLoading.value = false;
};

const tabValueChange = (e: TabsItemClickEvent) => {
  const { itemData } = e;
  displayTaskComponent.value = itemData.text;
  const tabId = taskPanelItems.find((item) => displayTaskComponent.value === item.text)?.id;
  activeTabId.value = tabId || 'grid';

  if (tabId !== 'grid' && kanbanData.value.length === 0) {
    loadFilteredTasksAsync();
  } else if (tabId === 'grid' && gridData.value.length === 0) {
    loadTasksAsync();
  }
};

const reload = () => {
  isLoading.value = true;
  if (activeTabId.value === 'grid') {
    loadTasksAsync();
    ganttData.value = [];
    kanbanData.value = [];
  } else {
    gridData.value = [];
    loadFilteredTasksAsync();
  }
};

const onSaveNewTask = () => {
  isNewTaskPopupOpened.value = false;
};

loadTasksAsync();
</script>

<style scoped lang="scss">
@use "@/variables" as *;
@use "sass:math";

@include separator();

.view-wrapper {
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  .dx-toolbar {
    padding: 20px $content-padding $content-padding;
  }
}

:deep(.dx-toolbar) {

  .toolbar-header {
    @include header();
  }

  .dx-tabs .dx-tab {
    background-color: $background-color;
  }
}

.view-wrapper {
  flex-direction: column;
}

.gantt,
.kanban {
  padding: 0 $content-padding;
}
</style>
