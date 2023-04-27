<template>
  <card-analytics
    title="Sales Performance"
    content-class="sales"
  >
    <template #filter>
      <div class="sales-filter">
        <dx-drop-down-button
          styling-mode="text"
          :use-select-mode="true"
          :items="props.groupByPeriods"
          :selected-item-key="props.groupByPeriods[1]"
          @selection-changed="e => emit('performance-period-changed', e)"
        />
      </div>
    </template>

    <dx-chart :data-source="data">
      <dx-argument-axis :visual-range="props.visualRange" />
      <dx-tooltip
        :enabled="true"
        :customize-tooltip="seriesName => ({ text: seriesName })"
      />
      <dx-series-template name-field="category" />

      <dx-common-series-settings
        argument-field="date"
        value-field="total"
        hover-mode="includePoints"
      >
        <dx-point hover-mode="allArgumentPoints" />
      </dx-common-series-settings>

      <dx-argument-axis
        argument-type="datetime"
        :value-margins-enabled="false"
      />
      <dx-legend :visible="false" />
      <dx-size :height="270" />
    </dx-chart>
  </card-analytics>
</template>

<script setup lang="ts">
import {
  DxChart,
  DxLegend,
  DxCommonSeriesSettings,
  DxSeriesTemplate,
  DxPoint,
  DxArgumentAxis,
  DxTooltip,
  DxSize,
} from 'devextreme-vue/chart';

import { DxDropDownButton } from 'devextreme-vue/drop-down-button';

import { Sales } from '@/types/analytics';
import CardAnalytics from '@/components/library/card-analytics.vue';

const emit = defineEmits(['performance-period-changed']);

const props = defineProps<{
  visualRange: [Date, Date],
  groupByPeriods: string[],
  data: Sales
}>();

</script>
<style scoped lang="scss">
.sales-filter {
  display: inline-block;
}
</style>
