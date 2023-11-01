<template>
  <div class="view-wrapper">
    <dx-data-grid
      ref="dataGrid"
      :data-source="dataSource"
      :allow-column-reordering="true"
      :focused-row-enabled="true"
      :focused-row-key="focusedRowKey"
      height="100%"
      class="grid"
      @row-click="rowClick"
      @exporting="onExporting"
    >
      <!-- Options -->
      <dx-scrolling :mode="'virtual'" />
      <dx-column-chooser :enabled="true" />
      <dx-sorting mode="multiple" />
      <dx-header-filter :visible="true" />
      <dx-load-panel :show-pane="false" />
      <dx-selection
        select-all-mode="allPages"
        show-check-boxes-mode="always"
        mode="multiple"
      />
      <dx-search-panel
        :visible="true"
        placeholder="Contact Search"
      />
      <dx-export
        :enabled="true"
        :allow-export-selected-data="true"
        :formats="['xlsx', 'pdf']"
      />

      <!-- Toolbar -->
      <dx-grid-toolbar>
        <dx-grid-toolbar-item location="before">
          <div class="grid-header">
            Contacts
          </div>
        </dx-grid-toolbar-item>

        <dx-grid-toolbar-item
          location="before"
          locate-in-menu="auto"
        >
          <dx-drop-down-button
            styling-mode="text"
            :use-select-mode="true"
            :items="filterStatusList"
            :selected-item-key="filterStatusList[0]"
            :drop-down-options="{ width: 'auto' }"
            @selection-changed="filterByStatus"
          />
        </dx-grid-toolbar-item>

        <dx-grid-toolbar-item
          location="after"
          locate-in-menu="auto"
        >
          <div>
            <dx-button
              text="Add Contact"
              icon="plus"
              type="default"
              styling-mode="contained"
              @click="addContact"
            />
          </div>
        </dx-grid-toolbar-item>

        <dx-grid-toolbar-item
          location="after"
          locate-in-menu="auto"
          show-text="inMenu"
          widget="dxButton"
          :options="refreshOptions"
        />

        <dx-grid-toolbar-item
          location="after"
          locate-in-menu="auto"
        >
          <div>
            <div class="separator" />
          </div>
        </dx-grid-toolbar-item>

        <dx-grid-toolbar-item name="exportButton" />

        <dx-grid-toolbar-item
          location="after"
          locate-in-menu="auto"
        >
          <div>
            <div class="separator" />
          </div>
        </dx-grid-toolbar-item>

        <dx-grid-toolbar-item
          name="columnChooserButton"
          locate-in-menu="auto"
        />

        <dx-grid-toolbar-item
          name="searchPanel"
          locate-in-menu="auto"
        />
      </dx-grid-toolbar>

      <!-- Columns -->
      <dx-column
        data-field="name"
        caption="Name"
        sort-order="asc"
        cell-template="nameCellTemplate"
        :hiding-priority="5"
        :min-width="150"
      >
        <dx-required-rule />
      </dx-column>
      <dx-column
        data-field="company"
        caption="Company"
        :hiding-priority="5"
        :min-width="150"
      />
      <dx-column
        data-field="status"
        caption="Status"
        data-type="string"
        cell-template="statusCellTemplate"
        :hiding-priority="3"
        :min-width="100"
      />
      <dx-column
        data-field="assignedTo"
        caption="Assigned to"
        :hiding-priority="4"
      />
      <dx-column
        data-field="phone"
        caption="Phone"
        :hiding-priority="2"
        :customize-text="customizePhoneCell"
      >
        <dx-required-rule />
      </dx-column>
      <dx-column
        data-field="email"
        caption="Email"
        :hiding-priority="1"
      >
        <dx-required-rule />
      </dx-column>

      <!-- Templates  -->
      <template #nameCellTemplate="{ data }">
        <div class="name-template">
          <div>{{ data.data.name }}</div>
          <div class="position">
            {{ data.data.position }}
          </div>
        </div>
      </template>

      <template #statusCellTemplate="{ data }">
        <contact-status :value="data.data?.status" />
      </template>
    </dx-data-grid>

    <!--  Contact panel  -->
    <contact-panel
      :contact-id="panelData?.id"
      :is-panel-opened="isPanelOpened"
      @close="onClose"
      @pin-changed="onPanelPinChanged"
    />
  </div>

  <form-popup
    title="New Contact"
    v-model:visible="isAddContactPopupOpened"
    @save="onSaveContactNewForm"
  >
    <contact-new-form ref="contactNewFormCmp" />
  </form-popup>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DxDropDownButton, { DxDropDownButtonTypes } from 'devextreme-vue/drop-down-button';
import { DxButton } from 'devextreme-vue/button';
import DxDataGrid, {
  DxColumn,
  DxColumnChooser,
  DxHeaderFilter,
  DxExport,
  DxLoadPanel,
  DxRequiredRule,
  DxSelection,
  DxScrolling,
  DxSorting,
  DxToolbar as DxGridToolbar,
  DxItem as DxGridToolbarItem,
  DxSearchPanel,
  DxDataGridTypes,
} from 'devextreme-vue/data-grid';
import { getContacts } from 'dx-template-gallery-data';
import { saveAs } from 'file-saver-es';
import { Workbook } from 'exceljs';

import { jsPDF as JsPdf } from 'jspdf';
import { contactStatusList, Contact } from '@/types/contact';
import DataSource from 'devextreme/data/data_source';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { exportDataGrid as exportDataGridToXLSX } from 'devextreme/excel_exporter';
import notify from 'devextreme/ui/notify';
import { formatPhone } from '@/utils/formatters';
import ContactStatus from '@/components/utils/contact-status.vue';
import FormPopup from '@/components/utils/form-popup.vue';
import ContactNewForm from '@/components/library/contact-new-form.vue';
import ContactPanel from '@/components/library/contact-panel.vue';

const filterStatusList = ['All', ...contactStatusList];
type FilterContactStatus = typeof filterStatusList[number];

const contactNewFormCmp = ref<InstanceType<typeof ContactNewForm>>();
const panelData = ref<Array<Contact> | null>(null);
const isPanelOpened = ref(false);
const dataGrid = ref<InstanceType<typeof DxDataGrid> | null>(null);

const isAddContactPopupOpened = ref(false);
const focusedRowKey = ref(null);

const dataSource = new DataSource({
  key: 'id',
  load: () => getContacts(),
});

const rowClick = (e: DxDataGridTypes.RowClickEvent) => {
  if (e.data.id) {
    panelData.value = e.data;
    isPanelOpened.value = true;
    focusedRowKey.value = e.data.id;
  }
};

const addContact = () => {
  isAddContactPopupOpened.value = true;
};

const filterByStatus = (e: DxDropDownButtonTypes.SelectionChangedEvent) => {
  const { item: status }: { item: FilterContactStatus } = e;

  if (status === 'All') {
    dataGrid.value?.instance.clearFilter();
  } else {
    dataGrid.value?.instance.filter(['status', '=', status]);
  }
};

const onExporting = (e: DxDataGridTypes.ExportingEvent) => {
  if (e.format === 'pdf') {
    const doc = new JsPdf();
    exportDataGridToPdf({
      jsPDFDocument: doc,
      component: e.component,
    }).then(() => {
      doc.save('Contacts.pdf');
    });
  } else {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Contacts');

    exportDataGridToXLSX({
      component: e.component,
      worksheet,
      autoFilterEnabled: true,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Contacts.xlsx');
      });
    });
    e.cancel = true;
  }
};

const onPanelPinChanged = () => {
  dataGrid.value?.instance.updateDimensions();
};

const refresh = () => {
  dataSource.reload();
};

const customizePhoneCell = (cellInfo: {value: string}) => {
  const { value } = cellInfo;

  if (!value) {
    return undefined;
  }

  return formatPhone(value.toString());
};

const onSaveContactNewForm = () => {
  const { firstName, lastName } = contactNewFormCmp.value.getNewContactData();

  notify(
    {
      message: `New contact "${firstName} ${lastName}" saved`,
      position: { at: 'bottom center', my: 'bottom center' },
    },
    'success',
  );

  isAddContactPopupOpened.value = false;
};

const onClose = () => {
  isPanelOpened.value = false;
  focusedRowKey.value = null;
};

const refreshOptions = {
  text: 'Refresh',
  icon: 'refresh',
  onClick: refresh,
  stylingMode: 'text',
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
  flex-direction: row;

  .grid  {
    .name-template {

      .position {
        font-size: 12px;
        color: var(--texteditor-label-color);
      }
    }

    :deep(.dx-row-focused) {
      .name-template.name-template {
        color: var(--base-focus-color);

        .position {
          color: var(--base-focus-color);
        }
      }
      .status {
        @include status(var(--base-focus-color));
      }
    }

    :deep(.dx-datagrid-header-panel) {
      padding: 0 var(--content-padding);

      .dx-toolbar {
        margin-bottom: 0;
        padding: var(--toolbar-margin-bottom) 0;
      }
    }

    :deep(.dx-datagrid-content .dx-row) {
        cursor: pointer;
    }

    .grid-header {
      @include header();
    }
  }
}

.edit-cell {
  position: relative;

  contact-status {
    position: absolute;
    margin-top: 10px;
    margin-left: 11px;
  }
}
</style>
