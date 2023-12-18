<template>
  <card-analytics
    title="Revenue Analysis"
    content-class="sales-by-state grid"
  >
    <dx-data-grid
      :data-source="props.data"
      :height="290"
      :load-panel="{ enabled: false }"
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
        css-class="sales-bullet"
        :width="200"
      />

      <template #salesBullet="sales">
        <dx-bullet
          :show-target="false"
          :show-zero-level="false"
          :value="sales.data.data?.percentage * 100"
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
</template>

<script setup lang="ts">
import { DxDataGrid, DxColumn } from 'devextreme-vue/data-grid';
import { DxBullet, DxTooltip as DxBulletTooltip, DxSize as DxBulletSize } from 'devextreme-vue/bullet';

import { SalesByState } from '@/types/analytics';
import CardAnalytics from '@/components/library/card-analytics.vue';

const props = defineProps<{
  data: SalesByState
}>();
</script>

<style scoped lang="scss">
@use '@/variables.scss' as *;

:deep(td.dx-command-adaptive.dx-command-adaptive),
:deep(td.sales-bullet.sales-bullet) {
  border-left: none;
  border-right: none;
}

:deep(.card.grid) .content {
  border-top: 1px solid var(--border-color);
  padding-left: 0;
  padding-right: 0;
}
</style>
