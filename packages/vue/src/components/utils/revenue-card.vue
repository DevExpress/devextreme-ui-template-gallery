<template>
  <card-analytics
    title="Revenue"
    content-class="sales"
  >
    <dx-chart
      v-if="props.data"
      :data-source="props.data"
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
</template>

<script setup lang="ts">
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

import { Sales } from '@/types/analytics';
import CardAnalytics from '@/components/library/card-analytics.vue';

const props = defineProps<{
  data: Sales
}>();
</script>

<style scoped>

</style>
