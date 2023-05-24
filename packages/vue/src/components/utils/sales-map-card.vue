<template>
  <card-analytics
    title="Revenue by States"
    content-class="sales-by-state-map"
  >
    <dx-vector-map
      id="vector-map"
      :bounds="[-118, 50, -80, 25]"
    >
      <dx-layer
        :data-source="usaMap"
        :hover-enabled="false"
      />
      <dx-layer
        :data-source="props.data"
        :min-size="20"
        :max-size="40"
        :size-groups="[0, 80000, 100000, 400000, 500000]"
        :opacity="0.8"
        name="bubbles"
        element-type="bubble"
        data-field="value"
      />
      <dx-tooltip
        :enabled="true"
        :customize-tooltip="customizeTooltip"
      />
      <dx-legend
        marker-shape="circle"
        :customize-text="customizeLegendText"
        :customize-items="customizeItems"
      >
        <dx-source
          layer="bubbles"
          grouping="size"
        />
      </dx-legend>
    </dx-vector-map>
  </card-analytics>
</template>

<script setup lang="ts">
// eslint-disable-next-line import/extensions
import * as mapsData from 'devextreme/dist/js/vectormap-data/usa.js';
import {
  DxVectorMap, DxLayer, DxSource, DxLegend, DxTooltip,
} from 'devextreme-vue/vector-map';
import { SalesByStateAndCity } from '@/types/analytics';
import { LegendItem, MapLayerElement } from 'devextreme/viz/vector_map';
import CardAnalytics from '@/components/library/card-analytics.vue';

const props = defineProps<{
  data: SalesByStateAndCity
}>();

const usaMap = mapsData.usa;

const customizeTooltip = (arg: MapLayerElement) => ({
  text: arg.layer.type === 'marker' ? arg.attribute('tooltip') : '',
});

const customizeLegendText = (arg: { index: number }) => ['< 80000$', '80000$ to 100000$', '100000$ to 400000$', '> 400000$'][arg.index];

const customizeItems = (items: Array<LegendItem>) => items.reverse();
</script>

<style scoped lang="scss">
:deep(.sales-by-state-map) {
  margin: 20px 0;

  .content {
    height: 400px;
  }
}

</style>
