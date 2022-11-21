<template>
  <div class="view-wrapper">
    <dx-data-grid
      :data-source="dataSource"
      :allow-column-reordering="true"
      height="100%"
      class="grid"
      @row-click="rowClick"
    >
      <!-- Options -->
      <dx-scrolling :mode="'virtual'" />
      <dx-column-chooser :enabled="true" />
      <dx-sorting mode="multiple" />
      <dx-header-filter :visible="true" />
      <dx-load-panel
        :enabled="true"
        :show-pane="false"
      />
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
            :width="160"
            :use-select-mode="true"
            :items="filterStatusList"
            :selected-item-key="filterStatusList[0]"
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
          :options="{ text: 'Refresh', icon: 'refresh', onClick: refresh }"
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
      @close="isPanelOpened = false"
    />
  </div>

  <form-popup
    title="New Contact"
    v-model:is-visible="isAddContactPopupOpened"
    @save="onSaveContactNewForm"
  >
    <contact-new-form/>
  </form-popup>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DxDropDownButton from 'devextreme-vue/drop-down-button';
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
} from 'devextreme-vue/data-grid';
// eslint-disable-next-line import/no-unresolved
import { getContacts } from 'dx-template-gallery-data';

import { contactStatusList, Contact } from '@/types/contact';
import { RowClickEvent } from 'devextreme/ui/data_grid';
import DataSource from 'devextreme/data/data_source';
import { SelectionChangedEvent } from 'devextreme/ui/drop_down_button';
import { formatPhone } from '@/utils/formatters';
import ContactStatus from '@/components/contact-status.vue';
import FormPopup from '@/components/form-popup.vue';
import validationEngine from 'devextreme/ui/validation_engine';
import ContactNewForm from './components/contact-new-form.vue';
import ContactPanel from './components/contact-panel.vue';

const filterStatusList = ['All', ...contactStatusList];
type FilterContactStatus = typeof filterStatusList[number];

const panelData = ref<Array<Contact> | null>(null);
const isPanelOpened = ref(false);
const dataGrid = ref<InstanceType<typeof DxDataGrid> | null>(null);

const isAddContactPopupOpened = ref(false);

const dataSource = new DataSource({
  key: 'id',
  load: () => getContacts(),
});

const rowClick = (e: RowClickEvent) => {
  console.log('rowClick', e.data.id);
  if (e.data.id) {
    panelData.value = e.data;
    isPanelOpened.value = true;
  }
};

const addContact = () => {
  isAddContactPopupOpened.value = true;
};

const filterByStatus = (e: SelectionChangedEvent) => {
  const { item: status }: { item: FilterContactStatus } = e;

  if (status === 'All') {
    dataGrid.value?.instance.clearFilter();
  } else {
    dataGrid.value?.instance.filter(['status', '=', status]);
  }
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
  isAddContactPopupOpened.value = false;
};
</script>

<style scoped lang="scss">
@use "@/variables" as *;

@include separator();

.view-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  .grid  {
    .name-template {

      .position {
        font-size: 12px;
        color: $texteditor-label-color;
      }
    }

    :deep(.dx-datagrid-header-panel) {
      padding: 0 $content-padding;

      .dx-toolbar {
        margin-bottom: 0;
        padding: $toolbar-margin-bottom 0;
      }
    }

    .clickable-row {
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
