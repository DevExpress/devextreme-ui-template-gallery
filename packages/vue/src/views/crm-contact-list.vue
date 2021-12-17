<template>
  <div class="view-wrapper">
    <dx-data-grid :data-source="gridData" height="100%" @row-click="rowClick">
      <dx-search-panel
        :visible="true"
        placeholder="Contact Search"
      ></dx-search-panel>
      <dx-export :enabled="true" :allow-export-selected-data="true"></dx-export>
      <dx-grid-toolbar>
        <dx-grid-toolbar-item location="before">
          <div class="grid-header">Contact List</div>
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
          }"
        >
        </dx-grid-toolbar-item>
        <dx-grid-toolbar-item
          location="after"
          locate-in-menu="auto"
          show-text="inMenu"
          widget="dxButton"
          :options="{ text: 'Refresh', icon: 'refresh' }"
        >
        </dx-grid-toolbar-item>
        <dx-grid-toolbar-item location="after" locate-in-menu="auto">
          <div class="separator"></div>
        </dx-grid-toolbar-item>
        <dx-grid-toolbar-item name="exportButton"></dx-grid-toolbar-item>
        <dx-grid-toolbar-item location="after" locate-in-menu="auto">
          <div class="separator"></div>
        </dx-grid-toolbar-item>
        <dx-grid-toolbar-item
          location="after"
          locate-in-menu="auto"
          show-text="inMenu"
          widget="dxButton"
          :options="{ text: 'Remove', icon: 'trash' }"
        >
        </dx-grid-toolbar-item>
        <dx-grid-toolbar-item name="searchPanel"></dx-grid-toolbar-item>
      </dx-grid-toolbar>
      <dx-selection
        select-all-mode="allPages"
        show-check-boxes-mode="always"
        mode="multiple"
      ></dx-selection>
      <dx-column data-field="name" caption="Name" :hiding-priority="5" :min-width="150" />
      <dx-column
        data-field="status"
        caption="Status"
        data-type="string"
        cell-template="statusTemplate"
         :hiding-priority="3"
         :min-width="100"
      />
      <dx-column data-field="id" caption="ID" :hiding-priority="1" />
      <dx-column
        data-field="Products"
        caption="Products"
        cell-template="productTemplate"
        :min-width="400"
        :hiding-priority="0"
      />
      <dx-column data-field="manager" caption="Manager" :hiding-priority="4" />
      <dx-column data-field="organization" caption="Organization" :hiding-priority="2" />
      <template #statusTemplate="{ data }">
        <span>
          <span :class="'status status-' + data.data.status">{{
            statuses[data.data.status]
          }}</span>
        </span>
      </template>
      <template #productTemplate="{ data }">
        <span class="product-template">
          <span
            v-for="(product, i) in data.data.products"
            v-bind:item="product"
            v-bind:key="i"
          >
            <span>{{ products[product.productId] }}&nbsp;</span>
            <span :class="'cloud cloud-' + product.productStatus">{{
              productStatuses[product.productStatus]
            }}</span>
          </span>
        </span>
      </template>
    </dx-data-grid>

    <div class="panel" v-bind:class="{ pin: isPanelPin, open: isPanelOpen }">
      <div v-if="panelData" class="data-wrapper">
        <dx-toolbar>
          <dx-item location="before">
            <div class="contact-name">{{ panelData.name }}</div>
          </dx-item>
          <dx-item location="before">
            <span :class="'status status-' + panelData.status">{{
              statuses[panelData.status]
            }}</span>
          </dx-item>
          <dx-item
            location="after"
            widget="dxButton"
            :visible="isPinEnabled"
            :options="{ icon: isPanelPin ? 'unpin' : 'pin', onClick: pinClick }"
          >
          </dx-item>
          <dx-item
            location="after"
            widget="dxButton"
            :options="{ icon: 'close', onClick: closePanel }"
          >
          </dx-item>
        </dx-toolbar>
        <dx-scroll-view>
          <div class="user-info">
            <div class="photo"></div>
            <div class="info">
              <div>{{ panelData.id }}</div>
              <div>
                <i class="dx-icon-user"></i>
                <span>{{ panelData.manager }}</span>
              </div>
              <div>
                <i class="dx-icon-product"></i>
                <span>{{ panelData.organization }}</span>
              </div>
              <div>
                <i class="dx-icon-email"></i> <span>{{ panelData.email }}</span>
              </div>
            </div>
          </div>
          <div>{{ panelData.address }}</div>
          <dx-toolbar>
            <dx-item
              location="before"
              widget="dxButton"
              :options="{ icon: 'edit', stylingMode: 'outlined', text: 'Edit' }"
            >
            </dx-item>
            <dx-item
              location="center"
              widget="dxButton"
              :options="{ stylingMode: 'text', text: 'Send email' }"
            >
            </dx-item>
            <dx-item
              location="after"
              widget="dxDropDownButton"
              :options="{ text: 'Action' }"
            >
            </dx-item>
          </dx-toolbar>
          <dx-accordion :multiple="true" :collapsible="true">
            <dx-accordion-item title="Licenses">
              <div>
                <div class="licenses">
                  <div>
                    <div class="caption">Income</div>
                    <div class="value">$1,650,00</div>
                  </div>
                  <div>
                    <div class="caption">Licences</div>
                    <div class="value">1</div>
                  </div>
                  <div>
                    <div class="caption">Active Licences</div>
                    <div class="value">1</div>
                  </div>
                </div>
              </div>
            </dx-accordion-item>
            <dx-accordion-item title="Opportunities">
              <span
                v-for="(product, i) in panelData.products"
                v-bind:item="product"
                v-bind:key="i"
                class="oportunities"
              >
                <span class="item"
                  >{{ products[product.productId] }}&nbsp;</span
                >
                <span :class="'cloud cloud-' + product.productStatus">{{
                  productStatuses[product.productStatus]
                }}</span>
                <br />
              </span>
            </dx-accordion-item>
            <dx-item title="Activities">
              <div>c</div>
            </dx-item>
          </dx-accordion>
        </dx-scroll-view>
      </div>
    </div>
  </div>
</template>

<script>
import {onMounted,onBeforeUnmount} from 'vue';
import DxDataGrid, {
  DxColumn,
  DxSelection,
  DxExport,
  DxToolbar as DxGridToolbar,
  DxItem as DxGridToolbarItem,
  DxSearchPanel,
} from "devextreme-vue/data-grid";
import DxToolbar, { DxItem } from "devextreme-vue/toolbar";
import DxScrollView from "devextreme-vue/scroll-view";
import DxAccordion, {
  DxItem as DxAccordionItem,
} from "devextreme-vue/accordion";
import { sizes, subscribe, unsubscribe } from "../utils/media-query";

export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxSelection,
    DxExport,
    DxGridToolbar,
    DxGridToolbarItem,
    DxSearchPanel,
    DxToolbar,
    DxItem,
    DxScrollView,
    DxAccordion,
    DxAccordionItem,
  },
  setup() {},
  data() {
    const gridData = [
      {
        name: "Robert Reaga",
        status: 1,
        id: 120545,
        products: [
          { productId: 1, productStatus: 1 },
          { productId: 2, productStatus: 2 },
        ],
        manager: "Sarah Davix",
        organization: "SV Consult",
        address:
          "69 Ruthven St #24, Boston, MA 02121, United States of America",
        email: "1@2",
      },
      {
        name: "Samuel Browick",
        status: 2,
        id: 120545,
        products: [
          { productId: 1, productStatus: 2 },
          { productId: 2, productStatus: 1 },
        ],
        manager: "Brett Johnson",
        organization: "SV Consult",
        address:
          "69 Ruthven St #24, Boston, MA 02121, United States of America",
        email: "2@2",
      },
    ];

    const statuses = {
      1: "New",
      2: "Active",
    };

    const products = {
      1: "CRM System",
      2: "Task Management",
    };

    const productStatuses = {
      1: "Lead",
      2: "Trial sent",
    };

    let panelData = gridData[0];

    let isPanelOpen = false;
    let isPanelPin = false;
    let isPinEnabled = sizes()['screen-medium'] || sizes()['screen-large'];

    const rowClick = (e) => {
      this.panelData = e.data;
      this.isPanelOpen = true;
    };

    const closePanel = () => {
      this.isPanelOpen = false;
    };

    const pinClick = () => {
      this.isPanelPin = !this.isPanelPin;
    };

    const screenSizeChanged = () => {
      this.isPinEnabled = sizes()['screen-medium'] || sizes()['screen-large'];
    };

    onMounted(() => {
      subscribe(screenSizeChanged);
    });

    onBeforeUnmount(() => {
      unsubscribe(screenSizeChanged);
    });



    return {
      gridData,
      rowClick,
      statuses,
      products,
      productStatuses,
      panelData,
      isPanelOpen,
      isPanelPin,
      closePanel,
      pinClick,
      isPinEnabled,
    };
  },
};
</script>

<style lang="scss">
@use "../variables" as *;
@use "sass:math";

.separator {
  height: 36px;
  width: 1px;
  background: $base-border-color;
  .dx-toolbar-menu-section & {
    height: 1px;
    width: auto;
  }
}

.grid-header {
  font-size: 22px;
}

.cloud {
  padding: 3px 8px;
  border-radius: 10px;
  font-size: 12px;
  margin-right: 10px;

  &.cloud-1 {
    background-color: #e5ecef;
  }

  &.cloud-2 {
    background-color: #a4f297;
  }
}

.status {
  font-size: 12px;

  &::before {
    $diameter: 10px;
    content: " ";
    width: $diameter;
    height: $diameter;
    border-radius: math.div($diameter, 2);
    margin-right: math.div($diameter, 2);
    display: inline-block;
  }

  &.status-1 {
    color: #2d9cdb;
    &::before {
      background-color: #2d9cdb;
    }
  }

  &.status-2 {
    color: #2eb52c;
    &::before {
      background-color: #2eb52c;
    }
  }
}

.view-wrapper {
  display: flex;
  height: 700px; //tmp
  position: relative;
  overflow: hidden;

  .panel {
    position: absolute;
    right: -350px;
    background: $base-bg;
    transition: all 400ms;
    width: 0;

    &.open {
      width: 350px;
      right: 0;
      box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.12);
    }

    &.pin {
      box-shadow: none;
      transition: none;
      border-left: 1px solid $base-border-color;
      position: relative;
    }

    .data-wrapper {
      width: 350px;
      padding: 16px;
      .contact-name {
        font-size: 16px;
        font-weight: bold;
        margin-right: 8px;
      }

      .user-info {
        margin-bottom: 20px;
        display: flex;
        .photo {
          width: 96px;
          height: 96px;
          margin-right: 20px;
          border-radius: 8px;
          background: gray; //TODO replace with image
        }
        .info {
          > div {
            display: flex;
            height: 20px;
            margin-bottom: 6px;
            > i {
              font-size: 20px;
              color: rgba(117, 117, 117, 0.87);
              margin-right: 8px;
            }
          }
        }
      }

      & {
        .dx-accordion {
          margin: 0;
        }
        .dx-accordion-item {
          box-shadow: none;
          border: none;
          &.dx-accordion-item-opened {
            margin: 0;
          }
        }
        .dx-accordion-item-title {
          padding: 12px 0;
          background-color: transparent;
          .dx-accordion-item-title-caption {
            left: 0;
          }
        }

        .dx-accordion-item-body {
          padding: 0;

          .licenses {
            display: flex;
            justify-content: space-between;

            > div {
              display: flex;
              flex-direction: column;

              .caption {
                font-size: 12px;
                color: rgba(117, 117, 117, 0.87);
              }

              .value {
                color: $base-accent;
                font-size: 22px;
              }
            }
          }

          .oportunities {
            .item {
              font-size: 14px;
              line-height: 30px;
              color: $base-accent;
            }
          }
        }
      }
    }
  }

  .dx-theme-generic & {
    .dx-datagrid-header-panel {
      .dx-toolbar {
        margin: 0;
        padding: 10px;
      }
    }
  }
}
</style>
