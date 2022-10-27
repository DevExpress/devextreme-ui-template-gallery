<template>
  <div class="view-wrapper">
    <analytics-toolbar
      :show-tabs="true"
      @tab-change="tabChange($event)"
    >
      Dashboard
    </analytics-toolbar>

    <div class="tiles">
      <card-analytics
        class="grey"
        title="Opportunities"
        :show-data="getTotal(opportunities) >= 0"
        content-class="opportunities-total"
      >
        <div class="total">
          {{ formatPrice(getTotal(opportunities)) }}
        </div>
        <div class="percentage">
          <i class="dx-icon-spinup" />
          <span>20.3%</span>
        </div>
      </card-analytics>
      <card-analytics
        class="grey"
        title="Revenue Total"
        :show-data="!!getTotal(sales)"
        content-class="revenue-total"
      >
        <div class="total">
          {{ formatPrice(getTotal(sales)) }}
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
        :show-data="!!sales"
      >
        <dx-chart :data-source="sales">
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
        :show-data="!!opportunities"
      >
        <dx-funnel
          :data-source="opportunities"
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
        :show-data="!!salesByState"
      >
        <dx-data-grid
          :data-source="salesByState"
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
        :show-data="!!salesByCategory"
      >
        <dx-pie-chart
          :data-source="salesByCategory"
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
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { DxDataGrid, DxColumn } from 'devextreme-vue/data-grid';
import { DxBullet, DxTooltip as DxBulletTooltip, DxSize as DxBulletSize } from 'devextreme-vue/bullet';
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
  SalesByState,
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

import CardAnalytics from '../components/card-analytics.vue';
import AnalyticsToolbar from '../components/analytics-toolbar.vue';

const salesByState = ref<SalesByState>();
const salesByCategory = ref<SalesOrOpportunitiesByCategory>();
const opportunities = ref<SalesOrOpportunitiesByCategory>();
const sales = ref<Sales>();

const loadData = async (startDate: string, endDate: string) => {
  [opportunities.value, salesByCategory.value, sales.value] = await Promise.allSettled(
    [
      getOpportunitiesByCategory(startDate, endDate),
      getSalesByCategory(startDate, endDate),
      getSales(startDate, endDate),
    ],
  ).then((results) => results.map((r) => (r.status === 'fulfilled' ? r.value : [])));

  const salesByStateAndCity = await getSalesByStateAndCity(startDate, endDate);

  salesByState.value = await getSalesByState(salesByStateAndCity);
};

const tabChange = ([startDate, endDate]: string[]) => {
  loadData(startDate, endDate);
};

// eslint-disable-next-line max-len
const getTotal = (data: any[]) => data?.reduce((total, item) => total + (item.value || item.total || 0), 0);
</script>

<style scoped lang="scss">
@use "@/variables.scss" as *;
@use "sass:math";
@use "../analytics";

.tiles {
  margin: 20px 0;
  grid-template-columns: repeat(4, calc(25% - 15px));

}
</style>
