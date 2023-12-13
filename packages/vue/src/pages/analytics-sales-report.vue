<template>
  <dx-scroll-view class="view-wrapper-scroll">
    <div class="view-wrapper">
      <toolbar-analytics>Sales Report</toolbar-analytics>

      <div class="cards">
        <sales-range-card
          :data="sales"
          class="sales-range-card"
          @range-changed="onRangeChanged"
        />
        <sales-by-range-card :data="salesByCategory" />
        <sales-performance-card
          :data="salesByDateAndCategory"
          :group-by-periods="groupByPeriods"
          :visual-range="visualRange"
          @performance-period-changed="performancePeriodChange"
        />
      </div>
    </div>
  </dx-scroll-view>
  <dx-load-panel
    container=".view-wrapper"
    :position="{ of: '.dx-drawer-content' }"
    :visible="loading"
    :show-pane="true"
  />
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { DxDropDownButtonTypes } from 'devextreme-vue/drop-down-button';
import { DxScrollView } from 'devextreme-vue/scroll-view';
import { DxLoadPanel } from 'devextreme-vue/load-panel';
import { formatDate } from 'devextreme/localization';

import {
  getSalesByOrderDate,
  getSalesByCategory,
  getSales,
} from 'dx-template-gallery-data';
import {
  Sales,
  SalesByStateAndCity,
} from '@/types/analytics';
import { analyticsPanelItems } from '@/types/resource';
import ToolbarAnalytics from '@/components/utils/toolbar-analytics.vue';
import SalesRangeCard from '@/components/utils/sales-range-card.vue';
import SalesByRangeCard from '@/components/utils/sales-by-range-card.vue';
import SalesPerformanceCard from '@/components/utils/sales-performance-card.vue';

const sales = ref<Sales | null>(null);
const salesByDateAndCategory = ref<Sales | null>(null);
const salesByCategory = ref<SalesByStateAndCity | null>(null);

const visualRange = ref<[Date, Date]>([]);

const groupByPeriods = ['Day', 'Month'];

const loading = ref<boolean>(true);

const performancePeriodChange = async (e: DxDropDownButtonTypes.SelectionChangedEvent) => {
  loading.value = true;
  salesByDateAndCategory.value = await getSalesByOrderDate(e.item.toLowerCase());
  loading.value = false;
};

const onRangeChanged = async (dates: [Date, Date]) => {
  visualRange.value = dates;
  loading.value = true;
  salesByCategory.value = await getSalesByCategory(
    ...dates.map((date) => formatDate(date, 'yyyy-MM-dd')),
  );
  loading.value = false;
};

const loadData = async (groupBy: string) => {
  loading.value = true;
  const [startDate, endDate] = analyticsPanelItems[4].value.split('/');

  await Promise.all([
    getSales(startDate, endDate)
      .then((result: Sales) => { sales.value = result; }),
    getSalesByOrderDate(groupBy)
      .then((result: Sales) => { salesByDateAndCategory.value = result; }),
  ]).then(() => { loading.value = false; });
};

onMounted(() => {
  loadData(groupByPeriods[1].toLowerCase());
});
</script>

<style scoped lang="scss">
@use "@/variables" as *;
.view-wrapper {
  padding-top: var(--content-padding);
  padding-bottom: var(--content-padding);
}

.cards  {
  display: grid;
  width: 100%;
  grid-gap: 20px;
  gap: 20px;
  grid-template-columns: repeat(1,100%);

  .sales-range-card :deep(.content) {
    height: auto;
  }
}

@media only screen and (max-width: 900px) {
  .view-wrapper .cards {
    grid-template-columns: repeat(1, 100%);
  }
}

@media only screen and (max-width: 400px) {
  .cards :deep(.card) {
    flex: 1 320px;
  }
}
</style>
