<template>
  <card-analytics
    title="Product Sale by Range"
  >
    <dx-pie-chart
      class="sales-pie"
      :data-source="props.data"
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
      <dx-pie-legend :visible="false" />
    </dx-pie-chart>

    <dx-chart
      class="sales-bars"
      :data-source="props.data"
      :rotated="true"
    >
      <dx-common-axis-settings :visible="false">
        <dx-tick :visible="false" />
      </dx-common-axis-settings>

      <dx-legend :visible="false" />
      <dx-common-series-settings
        argument-field="name"
        value-field="value"
        type="bar"
        :ignore-empty-points="true"
      />

      <dx-series-template name-field="name" />

      <dx-value-axis>
        <dx-label>
          <dx-format type="largeNumber" />
        </dx-label>
      </dx-value-axis>
    </dx-chart>
  </card-analytics>
</template>

<script setup lang="ts">
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
  DxChart,
  DxCommonAxisSettings,
  DxTick,
  DxLegend,
  DxCommonSeriesSettings,
  DxSeriesTemplate,
  DxValueAxis,
  DxLabel,
  DxFormat,
} from 'devextreme-vue/chart';

import { SalesByState } from '@/types/analytics';
import CardAnalytics from '@/components/library/card-analytics.vue';

const props = defineProps<{
  data: SalesByState
}>();
</script>

<style scoped lang="scss">
:deep(.sales-pie),
:deep(.sales-bars) {
  display: inline-block;
  height: 100%;
}

:deep(.sales-pie) {
  width: 400px;
}

:deep(.sales-bars) {
  width: calc(100% - 600px);
}

@media only screen and (max-width: 400px) {
  :deep(.sales-pie,
  .sales-bars) {
    display: block;
  }

  :deep(.sales-pie) {
    width: 320px;
  }

  :deep(.sales-bars) {
    width: 320px;
  }
}
</style>
