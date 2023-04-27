<template>
  <card-analytics
    title="Conversion Funnel (All Products)"
    content-class="opportunities"
  >
    <dx-funnel
      v-if="props.data"
      :data-source="props.data"
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
</template>

<script setup lang="ts">
import {
  DxFunnel,
  DxMargin,
  DxLabel,
  DxFormat,
  DxLegend as DxFunnelLegend,
  DxSize,
} from 'devextreme-vue/funnel';

import { SalesOrOpportunitiesByCategory } from '@/types/analytics';
import CardAnalytics from '@/components/library/card-analytics.vue';

const props = defineProps<{
  data: SalesOrOpportunitiesByCategory
}>();
</script>

<style scoped>

</style>
