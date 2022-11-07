<template>
  <div class="view-wrapper">
    <analytics-toolbar>Sales Report</analytics-toolbar>

    <div class="cards">
      <sales-range-card
        :data="sales"
        @range-changed="onRangeChanged"
      />
      <sales-by-range-card :data="salesByCategory" />
      <sales-performance-card
        :data="salesByDateAndCategory"
        :group-by-periods="groupByPeriods"
        @performance-period-changed="performancePeriodChange"
      />
    </div>
  </div>
  <loading-panel :data="data" />
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { SelectionChangedEvent } from 'devextreme/ui/drop_down_button';
import { formatDate } from 'devextreme/localization';
import {
  getSalesByOrderDate,
  getSalesByCategory,
  getSales,
} from 'dx-rwa-data';
import {
  Sales,
  SalesByStateAndCity,
} from '@/types/analytics';
import { analyticsPanelItems } from '@/types/resource';
import LoadingPanel from '@/pages/analytics/components/loading-panel.vue';
import AnalyticsToolbar from '../components/analytics-toolbar.vue';
import SalesRangeCard from './components/sales-range-card.vue';
import SalesByRangeCard from './components/sales-by-range-card.vue';
import SalesPerformanceCard from './components/sales-performance-card.vue';

const sales = ref<Sales | null>(null);
const salesByDateAndCategory = ref<Sales | null>(null);
const salesByCategory = ref<SalesByStateAndCity | null>(null);

const data = [sales, salesByDateAndCategory, salesByCategory];
const groupByPeriods = ['Day', 'Month'];

const performancePeriodChange = async ({ item: period }: SelectionChangedEvent) => {
  salesByDateAndCategory.value = null;
  salesByDateAndCategory.value = await getSalesByOrderDate(period.toLowerCase());
};

const onRangeChanged = async (dates: [Date, Date]) => {
  salesByCategory.value = null;
  salesByCategory.value = await getSalesByCategory(
    ...dates.map((date) => formatDate(date, 'yyyy-MM-dd')),
  );
};

const loadData = (groupBy: string) => {
  const [startDate, endDate] = analyticsPanelItems[4].value.split('/');

  [getSales(startDate, endDate), getSalesByOrderDate(groupBy)].forEach(async (loader, i) => {
    data[i].value = null;
    data[i].value = await loader;
  });
};

onMounted(() => {
  loadData(groupByPeriods[1].toLowerCase());
});
</script>

<style scoped lang="scss">
@use "../analytics";

.cards  {
  display: grid;
  width: 100%;
  grid-gap: 20px;
  gap: 20px;
  grid-template-columns: repeat(1,100%);
}

@media only screen and (max-width: 400px) {
  .cards :deep(.card) {
    flex: 1 320px;
  }
}
</style>
