<template>
  <card-analytics
    title="Revenue Analysis by States"
    content-class="sales-by-state-and-city grid"
  >
    <dx-data-grid
      :data-source="props.data"
      :height="290"
      :load-panel="{ enabled: false }"
    >
      <dx-column
        caption="State"
        data-field="stateName"
        :hiding-priority="2"
      />

      <dx-column
        caption="City"
        data-field="city"
      />

      <dx-column
        alignment="left"
        caption="Amount"
        data-field="total"
        data-type="number"
        format="currency"
        :hiding-priority="1"
      />

      <dx-column
        alignment="left"
        caption="Percentage"
        data-field="percentage"
        cell-template="salesBullet"
        :width="200"
      />

      <template #salesBullet="sales">
        <dx-bullet
          :show-target="false"
          :show-zero-level="false"
          :value="sales.data.data.percentage * 100"
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
import { DxBullet, DxTooltip as DxBulletTooltip, DxSize as DxBulletSize } from 'devextreme-vue/bullet';
import { SalesByStateAndCity } from '@/types/analytics';
import { DxDataGrid, DxColumn } from 'devextreme-vue/data-grid';
import CardAnalytics from '@/components/library/card-analytics.vue';

const props = defineProps<{
  data: SalesByStateAndCity
}>();
</script>

<style scoped lang="scss">
@use '@/variables.scss' as *;

:deep(.card.grid) .content {
  border-top: 1px solid var(--border-color);
  padding-left: 0;
  padding-right: 0;
}
</style>
