<template>
  <div class="view-wrapper list-page">
    <dx-toolbar class="toolbar-details theme-dependent">
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
        :options="refreshOptions"
      />

      <dx-toolbar-item
        :disabled="activeTabId !== 'grid'"
        location="after"
        locate-in-menu="auto"
        widget="dxButton"
        show-text="inMenu"
        :options="columnChooserOptions"
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
        :options="exportToPdfOptions"
      />

      <dx-toolbar-item
        :disabled="!['grid'].includes(activeTabId)"
        location="after"
        locate-in-menu="auto"
        widget="dxButton"
        show-text="inMenu"
        :options="exportToXlsxOptions"
      />
      <dx-toolbar-item
        :disabled="!['grid'].includes(activeTabId)"
        location="after"
        locate-in-menu="auto"
        widget="dxTextBox"
        :options="taskSearchOptions"
      />
    </dx-toolbar>
    <dx-load-panel
      :visible="isLoading"
      :show-pane="false"
      width="auto"
    />
    <template v-if="!!gridData.length">
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
    </template>
  </div>
  <form-popup
    title="New Task"
    v-model:visible="isNewTaskPopupOpened"
    @save="onSaveNewTask"
  >
    <task-form
      ref="taskFormCmp"
      :content-by-screen="{ xs: screenInfo.isSmallMobileMedia ? 1 : 2, sm: 2 }"
      :is-create-mode="true"
      :data="popupTask"
    />
  </form-popup>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DxButton from 'devextreme-vue/button';
import DxTabs, { DxTabsTypes } from 'devextreme-vue/tabs';
import { DxTextBoxTypes } from 'devextreme-vue/text-box';
import {
  DxToolbar,
  DxItem as DxToolbarItem,
} from 'devextreme-vue/toolbar';

// eslint-disable-next-line import/no-unresolved
import { getTasks, getFilteredTasks } from 'dx-template-gallery-data';
import { taskPanelItems, TaskPanelItemsIds } from '@/types/resource';
import type { Task } from '@/types/task';
import FormPopup from '@/components/utils/form-popup.vue';
import DxLoadPanel from 'devextreme-vue/load-panel';
import TaskForm from '@/components/library/task-form.vue';
import TaskListGrid from '@/components/library/task-list-grid.vue';
import TaskListKanban from '@/components/library/task-list-kanban.vue';
import TaskListGantt from '@/components/library/task-list-gantt.vue';
import { newTask } from '@/types/task';

import { screenInfo } from '@/utils/media-query';
import notify from 'devextreme/ui/notify';

const isLoading = ref(true);
const displayTaskComponent = ref(taskPanelItems[0].text);
const activeTabId = ref<TaskPanelItemsIds>('grid');
const taskFormCmp = ref<InstanceType<typeof TaskForm>>();
const tasksGridCmp = ref<InstanceType<typeof TaskListGrid>>();
const tasksGanttCmp = ref<InstanceType<typeof TaskListGantt>>();
const popupTask = ref<Task>(newTask);

const gridData = ref<Task[]>([]);
const kanbanData = ref<Task[]>([]);
const ganttData = ref<Task[]>([]);
const isNewTaskPopupOpened = ref(false);

const addTask = () => {
  isNewTaskPopupOpened.value = true;
};
const chooseColumnDataGrid = () => tasksGridCmp.value.showColumnChooser();
const searchDataGrid = (e: DxTextBoxTypes.InputEvent) => tasksGridCmp.value.search(e.component.option('text'));
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

  gridData.value = tasks.filter((item: Task) => !!item.status && !!item.priority);
  isLoading.value = false;
};

const tabValueChange = (e: DxTabsTypes.ItemClickEvent) => {
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
  tasksGridCmp.value.refresh();
};

const onSaveNewTask = () => {
  notify(
    {
      message: `New task "${taskFormCmp.value?.getNewTaskData().text}" saved`,
      position: { at: 'bottom center', my: 'bottom center' },
    },
    'success',
  );

  isNewTaskPopupOpened.value = false;
};

loadTasksAsync();

const refreshOptions = {
  text: 'Refresh',
  icon: 'refresh',
  onClick: reload,
  stylingMode: 'text',
};

const columnChooserOptions = {
  text: 'Column Chooser',
  icon: 'columnchooser',
  onClick: chooseColumnDataGrid,
  stylingMode: 'text',
};

const exportToPdfOptions = {
  text: 'Export to PDF',
  icon: 'exportpdf',
  onClick: exportToPdf,
  stylingMode: 'text',
};

const exportToXlsxOptions = {
  text: 'Export to Exel',
  icon: 'exportxlsx',
  onClick: exportToXlsx,
  stylingMode: 'text',
};

const taskSearchOptions = {
  placeholder: 'Task Search',
  mode: 'search',
  onInput: searchDataGrid,
};
</script>

<style scoped lang="scss">
@use "@/variables" as *;

.view-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  .dx-toolbar {
    padding: var(--toolbar-margin-bottom) var(--content-padding);
  }

  :deep(.dx-toolbar) {
    .toolbar-header {
      @include header();
    }
  }

  .grid, .kanban, .gantt {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    max-height: calc(100% - var(--toolbar-height) - var(--content-padding) * 2);
  }

  .gantt {
    padding: 0 var(--content-padding) var(--content-padding);
  }

  .kanban {
    padding: 0 0 var(--content-padding) calc(var(--content-padding) / 2);
  }
}
</style>
