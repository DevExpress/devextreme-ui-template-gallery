<template>
  <div class="view-wrapper">
    <analytics-toolbar
      ref="tabs"
      :show-tabs="true"
      @tab-change="tabChange($event)"
    >
      Dashboard
    </analytics-toolbar>
    <div class="tiles">
      <card-analytics
        class="grey"
        title="Opportunities"
        :show-data="data.opportunities !== null"
        content-class="opportunities-total"
      >
        <div class="total">
          {{ formatPrice(getTotal(data.opportunities)) }}
        </div>
        <div class="percentage">
          <i class="dx-icon-spinup" />
          <span>20.3%</span>
        </div>
      </card-analytics>
      <card-analytics
        class="grey"
        title="Revenue Total"
        :show-data="data.sales !== null"
        content-class="revenue-total"
      >
        <div class="total">
          {{ formatPrice(getTotal(data.sales)) }}
        </div>
        <div class="percentage">
          <i class="dx-icon-spinup" />
          <span>14.7%</span>
        </div>
      </card-analytics>
      <card-analytics
        class="grey"
        title="Conversion"
        :show-data="true"
        content-class="revenue-total"
      >
        <div class="total">
          16%
        </div>
        <div class="percentage">
          <i class="dx-icon-spindown" />
          <span>2.3%</span>
        </div>
      </card-analytics>
      <card-analytics
        class="grey"
        title="Leads"
        :show-data="true"
        content-class="revenue-total"
      >
        <div class="total">
          51
        </div>
        <div class="percentage">
          <i class="dx-icon-spinup" />
          <span>8.5%</span>
        </div>
      </card-analytics>
    </div>

    <div class="cards">
      <card-analytics
        title="Revenue"
        content-class="sales"
      >
        <dx-chart
          v-if="data.sales"
          :data-source="data.sales"
        >
          <dx-series value-field="total" />
          <dx-common-series-settings
            argument-field="date"
            type="splinearea"
          >
            <dx-border :visible="true" />
          </dx-common-series-settings>
          <dx-argument-axis argument-type="datetime" />
          <dx-value-axis>
            <dx-chart-label>
              <dx-chart-format
                type="currency"
                currency="USD"
              />
            </dx-chart-label>
          </dx-value-axis>
          <dx-legend :visible="false" />
          <dx-size :height="270" />
        </dx-chart>
      </card-analytics>

      <card-analytics
        title="Conversion Funnel (All Products)"
        content-class="opportunities"
      >
        <dx-funnel
          v-if="data.opportunities"
          :data-source="data.opportunities"
          argument-field="name"
          value-field="value"
        >
          <dx-label
            :visible="true"
            position="inside"
            background-color="none"
            :customize-text="arg => `$${arg.valueText}`"
          >
            <dx-format
              type="largeNumber"
              :precision="1"
            />
          </dx-label>

          <dx-funnel-legend :visible="true">
            <dx-margin :top="70" />
          </dx-funnel-legend>

          <dx-size :height="270" />
        </dx-funnel>
      </card-analytics>

      <card-analytics
        title="Revenue Analysis"
        content-class="sales-by-state"
      >
        <dx-data-grid
          :data-source="data.salesByState"
          :height="270"
        >
          <dx-column
            caption="State"
            data-field="stateName"
          />
          <dx-column
            alignment="left"
            caption="Sales"
            data-field="total"
            data-type="number"
            format="currency"
            sort-order="desc"
            :hiding-priority="2"
          />
          <dx-column
            alignment="left"
            caption="% Sold"
            data-field="percentage"
            name="percentN"
            format="percent"
            :hiding-priority="1"
          />
          <dx-column
            alignment="left"
            caption="Percentage"
            data-field="percentage"
            name="percentB"
            cell-template="salesBullet"
            :width="200"
          />

          <template #salesBullet="{ data }">
            <dx-bullet
              :show-target="false"
              :show-zero-level="false"
              :value="data.data?.percentage * 100"
              :start-scale-value="0"
              :end-scale-value="100"
            >
              <dx-bullet-tooltip :enabled="false" />
              <dx-bullet-size
                :width="200"
                :height="20"
              />
            </dx-bullet>
          </template>
        </dx-data-grid>
      </card-analytics>

      <card-analytics
        title="Revenue Snapshot (All Products)"
        content-class="sales-by-category"
      >
        <dx-pie-chart
          v-if="data.salesByCategory"
          :data-source="data.salesByCategory"
          type="doughnut"
          :diameter="0.8"
          :inner-radius="0.6"
        >
          <dx-pie-series
            argument-field="name"
            value-field="value"
          >
            <dx-pie-label
              background-color="none"
              :radial-offset="-20"
              :visible="true"
              :customize-text="(arg) => arg.percentText"
            >
              <dx-pie-font
                color="#757575"
                :size="15"
              />
            </dx-pie-label>
          </dx-pie-series>

          <dx-pie-legend>
            <dx-pie-margin :top="70" />
          </dx-pie-legend>

          <dx-pie-size :height="270" />
        </dx-pie-chart>
      </card-analytics>
    </div>
  </div>
  <dx-load-panel
    container=".view-wrapper"
    :visible="isLoading(data)"
    :show-pane="true"
    width="100%"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { DxDataGrid, DxColumn } from 'devextreme-vue/data-grid';
import { DxBullet, DxTooltip as DxBulletTooltip, DxSize as DxBulletSize } from 'devextreme-vue/bullet';
import { DxLoadPanel } from 'devextreme-vue/load-panel';
import {
  DxChart,
  DxSeries,
  DxCommonSeriesSettings,
  DxBorder,
  DxSize,
  DxLegend,
  DxArgumentAxis,
  DxValueAxis,
  DxLabel as DxChartLabel,
  DxFormat as DxChartFormat,
} from 'devextreme-vue/chart';

import {
  DxPieChart,
  DxLabel as DxPieLabel,
  DxSeries as DxPieSeries,
  DxFont as DxPieFont,
  DxMargin as DxPieMargin,
  DxLegend as DxPieLegend,
  DxSize as DxPieSize,
} from 'devextreme-vue/pie-chart';

import {
  DxFunnel,
  DxMargin,
  DxLabel,
  DxFormat,
  DxLegend as DxFunnelLegend,
} from 'devextreme-vue/funnel';

import { formatPrice } from '@/utils/formatters';
import {
  Sales,
  SalesByState, SalesByStateAndCity,
  SalesOrOpportunitiesByCategory,
} from '@/types/analytics';

// eslint-disable-next-line import/no-unresolved
import {
  getOpportunitiesByCategory,
  getSalesByCategory,
  getSales,
  getSalesByStateAndCity,
  getSalesByState,
} from 'dx-rwa-data';

import CardAnalytics from './components/card-analytics.vue';
import AnalyticsToolbar from './components/analytics-toolbar.vue';

type DashboardData = {
  opportunities: SalesOrOpportunitiesByCategory | null,
  sales: Sales | null,
  salesByState: SalesByState | null,
  salesByCategory: SalesByStateAndCity | null,
};

type DashboardDataName = keyof DashboardData;
type DashboardDataType = DashboardData[keyof DashboardData];
type DataLoader = (startDate: string, endDate: string) => Promise<any[]>;

const loaders: { [key in DashboardDataName]: DataLoader } = {
  opportunities: getOpportunitiesByCategory,
  salesByCategory: getSalesByCategory,
  sales: getSales,
  salesByState: (startDate: string, endDate: string) => getSalesByStateAndCity(startDate, endDate)
    .then((result: SalesByStateAndCity) => getSalesByState(result)),
};

const data = ref({} as DashboardData);

const getTotal = (value: Array<{value?: number, total?: number}>) => (value || [])
  .reduce((total, item) => total + (item.value || item.total || 0), 0);

const updateData = (propName: DashboardDataName, value: DashboardDataType = null) => {
  data.value = { ...data.value, [propName]: value };
};

const loadData = (startDate: string, endDate: string) => {
  (Object.entries(loaders) as [[DashboardDataName, DataLoader]]).forEach(([dataName, loader]) => {
    updateData(dataName);

    loader(startDate, endDate).then((result: DashboardDataType) => updateData(dataName, result));
  });
};

const isLoading = (dashboardData: DashboardData) => Object.values(dashboardData).includes(null);

const tabChange = ([startDate, endDate]: string[]) => {
  loadData(startDate, endDate);
};
</script>

<style scoped lang="scss">
@use "@/variables.scss" as *;
@use "sass:math";
@use "./analytics";

.view-wrapper {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 20px 16px 0 16px;
}

.tiles {
  margin: 20px 0;
  grid-template-columns: repeat(4, calc(25% - 15px));
}

@media only screen and (max-width: 900px) {
  .tiles {
    grid-template-columns: repeat(2, calc(50% - 10px));
  }
}

@media only screen and (max-width: 400px) {
  .tiles {
    grid-template-columns: repeat(1, 100%);
  }
}
</style>
