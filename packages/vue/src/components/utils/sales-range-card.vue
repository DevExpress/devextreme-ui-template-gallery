<template>
  <card-analytics
    content-class="sales-range"
    selected-range-update-mode="reset"
    :is-menu-visible="false"
  >
    <dx-range-selector
      :data-source="props.data"
      :value="props.value"
      @value-changed="(e) => emit('range-changed', e)"
    >
      <dx-scale
        minor-tick-interval="day"
        tick-interval="month"
        value-type="datetime"
      >
        <dx-minor-tick :visible="false" />
        <dx-marker :visible="false" />
        <dx-range-selector-label format="MMM yyyy" />
      </dx-scale>
      <dx-size :height="90" />

      <dx-loading-indicator :show="false" />
      <dx-slider-marker :visible="true" />
      <dx-slider-handle
        :opacity="0.5"
        :width="2"
      />

      <dx-range-selector-chart>
        <dx-series
          type="line"
          argument-field="date"
          value-field="total"
        />
      </dx-range-selector-chart>
    </dx-range-selector>
  </card-analytics>
</template>

<script setup lang="ts">
import {
  DxRangeSelector,
  DxScale,
  DxMinorTick,
  DxSize,
  DxMarker,
  DxLoadingIndicator,
  DxSliderMarker,
  DxSliderHandle,
  DxChart as DxRangeSelectorChart,
  DxLabel as DxRangeSelectorLabel,
  DxSeries,
} from 'devextreme-vue/range-selector';

import { Sales, SalesByState } from '@/types/analytics';
import CardAnalytics from '@/components/library/card-analytics.vue';

const emit = defineEmits(['range-changed']);

const props = defineProps<{
  data: Sales | SalesByState,
  value?: [Date, Date]
}>();
</script>
<style scoped lang="scss">
:deep(.sales-range) {
  margin-top: 20px;

  .content {
    min-height: 90px;
  }
}
</style>
