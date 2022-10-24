<template>
  <dx-data-grid ref="dxDataGridCmp"
                height="100%"
                id="tasks-grid"
                :data-source="dataSource"
                @row-prepared="onRowPreparedGrid"
                :column-auto-width="true"
  >
    <dx-load-panel :enabled="true" :show-pane="false"/>
    <dx-scrolling row-rendering-mode="virtual"/>
    <dx-paging :page-size="15"/>
    <dx-pager :visible="true" :show-page-size-selector="true"/>
    <dx-editing mode="row"
                :allow-updating="true"/>

    <dx-selection  select-all-mode="allPages"
                   show-check-boxes-mode="always"
                   mode="multiple"/>
    <dx-sorting mode="multiple"/>
    <dx-header-filter :visible="true"/>

    <dx-column data-field="text" caption="Subject" :hiding-priority="7">
      <dx-required-rule/>
    </dx-column>
    <dx-column data-field="company" caption="Company" :hiding-priority="6">
      <dx-required-rule/>
    </dx-column>
    <dx-column data-field="priority"
               caption="Priority"
               :hiding-priority="4"
               cell-template="cellPriority"
               edit-cell-template="editCellPriority"
    >
      <dx-column-lookup :data-source="priorityList"/>
      <dx-required-rule/>
    </dx-column>
    <dx-column data-field="startDate"
               caption="Start Date"
               data-type="date"
               :hiding-priority="2"
    >
      <dx-required-rule/>
    </dx-column>
    <dx-column data-field="dueDate"
               caption="Due Date"
               data-type="date"
               sort-order="asc"
               :hiding-priority="1"
    >
      <dx-required-rule/>
    </dx-column>
    <dx-column data-field="owner" caption="Owner" :hiding-priority="5">
      <dx-required-rule/>
    </dx-column>
    <dx-column data-field="status"
               caption="Status"
               :hiding-priority="3"
               :min-width="120"
               cell-template="cellStatus"
               edit-cell-template="editCellStatus"
    >
      <dx-column-lookup :data-source="statusList"/>
      <dx-required-rule/>
    </dx-column>

    <template #cellPriority="{ data }">
      <task-priority :value="data?.data?.priority || ''"></task-priority>
    </template>

    <template #editCellPriority="{ data: cellData }">
      <dx-select-box class="edit-cell"
                     :value="cellData?.value"
                     :items="priorityList"
                     @value-changed="(e, arg) => {
          cellData.setValue(e.value);
          cellData.component.refresh();
          cellData.component.focus();
        }"
                     @selection-changed="cellData.component.updateDimensions"
                     field-template="field"
      >
        <template #field>
          <div class="form-custom-list-prop">
            <task-priority :value="cellData.value" class="task-priority"></task-priority>
            <dx-text-box :readOnly="true"></dx-text-box>
          </div>
        </template>
        <template #item="{ data }">
          <task-priority :value="data" class="task-priority"></task-priority>
        </template>
      </dx-select-box>
    </template>

    <template #cellStatus="{ data }">
      <div v-html="getStatusHtml(data.value)"/>
    </template>

    <template #editCellStatus="{ data: cellInfo }">
      <dx-select-box
        class="edit-cell"
        :value="cellInfo.value"
        :items="statusList"
        @value-changed="(e) => {
          cellInfo.setValue(e.value);
          cellInfo.component.refresh();
        }"
        @selection-changed="cellInfo.component.updateDimensions"
        fieldTemplate="field"
      >
        <template #field>
          <div class="task-status" v-html="getStatusHtml(cellInfo.value || '')"/>
          <dx-text-box :readOnly="true"></dx-text-box>
        </template>
        <template #item="{data}">
          <div v-html="getStatusHtml(data)"/>
        </template>
      </dx-select-box>
    </template>
  </dx-data-grid>
  <dx-load-panel
    :visible="props.isLoading"
    container=".content"
    :position="{ of: '.content' }"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  DxDataGrid,
  DxColumn,
  DxHeaderFilter,
  DxLoadPanel,
  DxRequiredRule,
  DxSelection,
  DxScrolling,
  DxSorting,
  DxColumnLookup,
  DxPager,
  DxPaging,
  DxEditing,
} from 'devextreme-vue/data-grid';
import 'jspdf-autotable';
import { DxTextBox } from 'devextreme-vue/text-box';
import { DxSelectBox } from 'devextreme-vue/select-box';
import { jsPDF as JsPDF } from 'jspdf';
import { saveAs } from 'file-saver-es';
import { exportDataGrid as exportGridToPdf } from 'devextreme/pdf_exporter';
import { exportDataGrid as exportToXLSX } from 'devextreme/excel_exporter';
import type DataSource from 'devextreme/data/data_source';

import type { Task } from '@/types/task';
import type { RowPreparedEvent } from 'devextreme/ui/data_grid';
import { taskPriorityList as priorityList, taskStatusList as statusList } from '@/types/task';
import { Workbook } from 'exceljs';
import TaskPriority from './components/task-priority.vue';

const props = withDefaults(defineProps<{
  dataSource: DataSource | null
}>(), {
  dataSource: () => null,
});

const dxDataGridCmp = ref<InstanceType<typeof DxDataGrid> | null>(null);

const onRowPreparedGrid = (e: RowPreparedEvent<Task, number>) => {
  const { rowType, rowElement, data } = e;

  if (rowType === 'header') return;

  if (data.status === 'Completed') {
    rowElement.classList.add('completed');
  }
};

const addRow = () => dxDataGridCmp.value?.instance.addRow();
const getStatusHtml = (status: string) => `<span
            class="status status-${status?.replace(/ /g, '-').toLowerCase()}">${status}
      </span>`;

const exportToPdf = () => {
  const doc = new JsPDF();
  exportGridToPdf({
    jsPDFDocument: doc,
    component: dxDataGridCmp.value.instance,
  }).then(() => {
    doc.save('Tasks.pdf');
  });
};

const exportToXlsx = () => {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet('Tasks');

  exportToXLSX({
    component: dxDataGridCmp.value.instance,
    worksheet,
    autoFilterEnabled: true,
  }).then(() => {
    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Tasks.xlsx');
    });
  });
};

defineExpose({
  addRow,
  exportToPdf,
  exportToXlsx,
});
</script>

<style scoped lang="scss">
@use "@/variables" as *;
@use "sass:math";

#tasks-grid {
  min-height: 300px;

  :deep(.priority span) {
    font-size: 13px;
  }
}

:deep(.dx-row.completed) {
  background: $background-gray-color;
}

:deep(.edit-cell) {
  position: relative;

  .task-priority,
  .task-status {
    position: absolute;
    margin-top: 10px;
    margin-left: 11px;
  }
}

:deep(span.status) {
  font-size: 14px;

  &.status-open {
    color: #505ed9;
  }

  &.status-in-progress {
    color: #34aa95;
  }

  &.status-deferred {
    color: #969696;
  }

  &.status-completed {
    color: #2b9029;
  }
}
</style>
