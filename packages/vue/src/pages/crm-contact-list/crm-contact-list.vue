<template>
  <div class="view-wrapper">
    <dx-data-grid ref="dataGrid"
                  :data-source="gridData"
                  height="100%"
                  class="grid"
                  @row-click="rowClick">

      <!-- Options -->
      <dx-scrolling :mode="'virtual'"/>
      <dx-column-chooser :enabled="true"/>
      <dx-sorting mode="multiple"/>
      <dx-header-filter :visible="true"/>
      <dx-load-panel :enabled="true"/>
      <dx-selection
          selectAllMode="allPages"
          showCheckBoxesMode="always"
          mode="multiple"
      ></dx-selection>
      <dx-search-panel
          :visible="true"
          placeholder="Contact Search"
      ></dx-search-panel>
      <dx-export :enabled="true" :allow-export-selected-data="true"></dx-export>

      <!-- Toolbar -->
      <dx-grid-toolbar>
        <dx-grid-toolbar-item location="before">
          <div class="grid-header">Contact List</div>
        </dx-grid-toolbar-item>

        <dx-grid-toolbar-item location="before" locateInMenu="auto">
          <dx-drop-down-button
              stylingMode="text"
              :width="160"
              :useSelectMode="true"
              :items="filterStatusList"
              :selectedItemKey="filterStatusList[0]"
              @selection-changed="filterByStatus"
          ></dx-drop-down-button>
        </dx-grid-toolbar-item>

        <dx-grid-toolbar-item
            location="after"
            locate-in-menu="auto"
            widget="dxButton"
            :options="{
            icon: 'plus',
            text: 'Add Contact',
            type: 'default',
            stylingMode: 'contained',
            onClick: addRow
          }"
        >
        </dx-grid-toolbar-item>

        <dx-grid-toolbar-item
            location="after"
            locate-in-menu="auto"
            show-text="inMenu"
            widget="dxButton"
            :options="{ text: 'Refresh', icon: 'refresh', onClick: refresh }"
        >
        </dx-grid-toolbar-item>

        <dx-grid-toolbar-item location="after" locate-in-menu="auto">
          <div class="separator"></div>
        </dx-grid-toolbar-item>

        <dx-grid-toolbar-item name="exportButton"></dx-grid-toolbar-item>

        <dx-grid-toolbar-item location="after" locate-in-menu="auto">
          <div class="separator"></div>
        </dx-grid-toolbar-item>

        <dx-grid-toolbar-item name="columnChooserButton"></dx-grid-toolbar-item>

        <dx-grid-toolbar-item name="searchPanel"></dx-grid-toolbar-item>
      </dx-grid-toolbar>

      <!-- Columns -->
      <dx-column data-field="name"
                  caption="Name"
                 sortOrder="asc"
                 cell-template="nameCellTemplate"
                 :hiding-priority="5"
                 :min-width="150" ><dx-required-rule/></dx-column>
      <dx-column data-field="company" caption="Company" :hiding-priority="5" :min-width="150" />
      <dx-column data-field="status"
          caption="Status"
          data-type="string"
          cell-template="statusCellTemplate"
          :hiding-priority="3"
          :min-width="100"
      />
      <dx-column data-field="assignedTo" caption="Assigned to" :hiding-priority="4" />
      <dx-column data-field="phone" caption="Phone" :hiding-priority="2" :customizeText="customizePhoneCell" ><dx-required-rule/></dx-column>
      <dx-column data-field="email" caption="Email" :hiding-priority="1" ><dx-required-rule/></dx-column>

      <!-- Templates  -->
      <template #nameCellTemplate="{ data }">
        <div class="name-template">
          <div>{{data.data.name}}</div>
          <div class="position">{{ data.data.position }}</div>
        </div>
      </template>

      <template #statusCellTemplate="{ data }">
        <user-status :status="data.data?.status"/>
      </template>

    </dx-data-grid>

    <!--  Contact panel  -->
    <contact-panel :userId="panelData?.id" :is-panel-open="isPanelOpen" @close="isPanelOpen = false"></contact-panel>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import DxDropDownButton from 'devextreme-vue/drop-down-button';
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
} from "devextreme-vue/data-grid";

import ContactPanel from './contact-panel/contact-panel.vue';
import CrmContactService from './api/crm-contact-service';
import {contactStatusList, Contact, ContactStatus} from '@/types/contact';
import {RowClickEvent} from 'devextreme/ui/data_grid';
import {SelectionChangedEvent} from 'devextreme/ui/drop_down_button';
import {formatPhone} from '@/utils/formatters';
import UserStatus from '@/components/user-status.vue'

type FilterContactStatus = ContactStatus | 'All Contacts';

const gridData = ref<Contact[]>([]);
const panelData = ref<Array<any> | null>(null);
const isPanelOpen = ref(false);
const dataGrid = ref<InstanceType<typeof DxDataGrid> | null>(null);

const filterStatusList = ['All Contacts', ...contactStatusList];

onMounted(() => {
  getContacts()
} )

const getContacts = () => {
  gridData.value = [];
  dataGrid.value?.instance.beginCustomLoading();
  CrmContactService.getAll().then((response:any) => {
    gridData.value = response.data;
    dataGrid.value?.instance.endCustomLoading();
  }).catch((e: string) => {
    console.log(e);
  });
}

const rowClick = (e: RowClickEvent) => {
  if ( e.data.id ) {
    panelData.value = e.data;
    isPanelOpen.value = true;
  }
};

const addRow = () => {
  dataGrid.value?.instance.addRow();
};

const filterByStatus = (e: SelectionChangedEvent) => {
  const { item: status }: { item: FilterContactStatus } = e;

  if (status === 'All Contacts') {
    dataGrid.value?.instance.clearFilter();
  } else {
    dataGrid.value?.instance.filter(['status', '=', status]);
  }
};

const refresh = () => {
  getContacts();
}

const customizePhoneCell = (cellInfo: {value: any}) => {
  const { value } = cellInfo;

  if (!value) {
    return undefined;
  }

  return formatPhone(value.toString());
}
</script>

<style scoped lang="scss">
@use "@/variables" as *;

.view-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  &:deep(.grid)  {
    @include separator();

    .name-template {
      margin: -6px 0;
      .position {
        font-size: 12px;
        color: #757575de;
      }
    }

    .dx-datagrid-header-panel {
      padding-top: 20px;
      padding-bottom: 10px;
    }

    .clickable-row {
      cursor: pointer;
    }

    .grid-header {
      font-size: 22px;
      font-weight: 500;
      padding-right: 25px;
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



