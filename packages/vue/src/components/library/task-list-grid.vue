<template>
  <dx-data-grid
    ref="dxDataGridCmp"
    id="tasks-grid"
    class="theme-dependent"
    height="100%"
    :data-source="dataSource"
    @row-click="navigateToDetails($event)"
    @editing-start="toogleUseNavigation"
    @edit-canceled="toogleUseNavigation"
    @saved="toogleUseNavigation"
    :hover-state-enabled="true"
    :column-auto-width="true"
    :show-borders="true"
  >
    <dx-load-panel
      :enabled="false"
    />
    <dx-scrolling mode="virtual" />
    <dx-paging :page-size="15" />
    <dx-pager
      :visible="true"
      :show-page-size-selector="true"
    />
    <dx-editing
      mode="row"
      :allow-updating="true"
    />

    <dx-selection
      select-all-mode="allPages"
      show-check-boxes-mode="always"
      mode="multiple"
    />
    <dx-sorting mode="multiple" />
    <dx-header-filter :visible="true" />

    <dx-column
      data-field="text"
      caption="Subject"
      :hiding-priority="7"
    >
      <dx-required-rule />
    </dx-column>
    <dx-column
      data-field="company"
      caption="Company"
      :hiding-priority="6"
    >
      <dx-required-rule />
    </dx-column>
    <dx-column
      data-field="priority"
      caption="Priority"
      :hiding-priority="4"
      cell-template="cellPriority"
      edit-cell-template="editCellPriority"
    >
      <dx-column-lookup :data-source="priorityList" />
      <dx-required-rule />
    </dx-column>
    <dx-column
      data-field="startDate"
      caption="Start Date"
      data-type="date"
      :hiding-priority="2"
    >
      <dx-required-rule />
    </dx-column>
    <dx-column
      data-field="dueDate"
      caption="Due Date"
      data-type="date"
      sort-order="asc"
      :hiding-priority="1"
    >
      <dx-required-rule />
    </dx-column>
    <dx-column
      data-field="owner"
      caption="Owner"
      :hiding-priority="5"
    >
      <dx-required-rule />
    </dx-column>
    <dx-column
      data-field="status"
      caption="Status"
      :hiding-priority="3"
      :min-width="120"
      cell-template="cellStatus"
      edit-cell-template="editCellStatus"
    >
      <dx-column-lookup :data-source="statusList" />
      <dx-required-rule />
    </dx-column>

    <template #cellPriority="{ data }">
      <status-indicator
        :show-bar="true"
        :value="data?.data?.priority || ''"
      />
    </template>

    <template #editCellPriority="{ data: cellData }">
      <dx-select-box
        class="edit-cell"
        :value="cellData?.value"
        :items="priorityList"
        @value-changed="(e) => onPrioritySelectChange(e.value, cellData)"
        @selection-changed="cellData.component.updateDimensions"
        field-template="field"
      >
        <template #field>
          <div class="form-custom-list-prop">
            <status-indicator
              :show-bar="true"
              :is-field="true"
              :value="cellData.value"
            />
          </div>
        </template>
        <template #item="{ data }">
          <status-indicator
            :show-bar="true"
            :value="data"
          />
        </template>
      </dx-select-box>
    </template>

    <template #cellStatus="{ data }">
      <status-indicator :value="data.value" />
    </template>

    <template #editCellStatus="{ data: cellInfo }">
      <dx-select-box
        class="edit-cell"
        :value="cellInfo.value"
        :items="statusList"
        @value-changed="(e) => onStatusSelectChange(e.value, cellInfo)"
        @selection-changed="cellInfo.component.updateDimensions"
        field-template="field"
      >
        <template #field>
          <status-indicator
            :is-field="true"
            :value="cellInfo.value"
          />
        </template>
        <template #item="{ data }">
          <status-indicator
            :value="data"
          />
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
  DxDataGridTypes,
} from 'devextreme-vue/data-grid';
import 'jspdf-autotable';
import { DxSelectBox } from 'devextreme-vue/select-box';
import { jsPDF as JsPDF } from 'jspdf';
import { saveAs } from 'file-saver-es';
import { exportDataGrid as exportGridToPdf } from 'devextreme/pdf_exporter';
import { exportDataGrid as exportToXLSX } from 'devextreme/excel_exporter';

import { router } from '@/router';
import type { Task } from '@/types/task';
import { taskPriorityList as priorityList, taskStatusList as statusList } from '@/types/task';
import { Workbook } from 'exceljs';
import StatusIndicator from '@/components/library/status-indicator.vue';

const props = withDefaults(defineProps<{
  dataSource: Task[] | null
}>(), {
  dataSource: () => null,
});

const dxDataGridCmp = ref<InstanceType<typeof DxDataGrid> | null>(null);
let useNavigation = true;

const navigateToDetails = (e: DxDataGridTypes.RowClickEvent) => {
  if (useNavigation && e.rowType !== 'detailAdaptive') {
    router.push('/planning-task-details');
  }
};

const toogleUseNavigation = () => {
  useNavigation = !useNavigation;
};

const addRow = () => dxDataGridCmp.value?.instance.addRow();
const onPrioritySelectChange = (value: string, cellData: Record<string, unknown>) => {
  cellData.setValue(value);
  cellData.component.refresh();
  cellData.component.focus();
};

const onStatusSelectChange = (value: string, cellInfo: Record<string, unknown>) => {
  cellInfo.setValue(value);
  cellInfo.component.refresh();
};

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
  showColumnChooser() {
    dxDataGridCmp.value.instance.showColumnChooser();
  },
  search(text: string) {
    dxDataGridCmp.value.instance.searchByText(text);
  },
  refresh() {
    dxDataGridCmp.value.instance.refresh();
  },
});
</script>

<style scoped lang="scss">
@use "@/variables" as *;

#tasks-grid {
  min-height: 300px;

  :deep(.priority span) {
    font-size: 13px;
  }
}

:deep(.edit-cell) {
  position: relative;
}
</style>
