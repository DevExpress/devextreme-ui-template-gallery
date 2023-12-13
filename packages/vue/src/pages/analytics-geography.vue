<template>
  <dx-scroll-view class="view-wrapper-scroll">
    <div class="view-wrapper">
      <toolbar-analytics
        :show-tabs="true"
        @tab-change="tabChange($event)"
      >
        Geography
      </toolbar-analytics>

      <div class="cards wide">
        <sales-map-card :data="salesByStateMarkers" />
      </div>

      <div class="cards">
        <revenue-analysis-card :data="salesByStateAndCity" />
        <revenue-snapshot-card :data="salesByState" />
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
import { ref } from 'vue';
import { DxScrollView } from 'devextreme-vue/scroll-view';
import { DxLoadPanel } from 'devextreme-vue/load-panel';

// eslint-disable-next-line import/no-unresolved
import { getSalesByStateAndCity, calcSalesByState } from 'dx-template-gallery-data';

import { SalesByState, SalesByStateAndCity } from '@/types/analytics';
import ToolbarAnalytics from '@/components/utils/toolbar-analytics.vue';
import SalesMapCard from '@/components/utils/sales-map-card.vue';
import RevenueAnalysisCard from '@/components/utils/revenue-analysis-by-states-card.vue';
import RevenueSnapshotCard from '@/components/utils/revenue-snapshot-by-states-card.vue';

const salesByState = ref<SalesByState | null>(null);
const salesByStateAndCity = ref<SalesByStateAndCity | null>(null);
const salesByStateMarkers = ref<Record<string, unknown> | null>(null);

const loading = ref<boolean>(true);

const createMapCoords = (coords: string) => coords.split(', ').map((coord) => parseFloat(coord));

const getSalesByStateMarkers = () => ({
  type: 'StateCollection',
  features: salesByState.value?.map((item: Record<string, unknown>) => ({
    type: 'State',
    geometry: {
      type: 'Point',
      coordinates: createMapCoords(item.stateCoords),
    },
    properties: {
      text: item.stateName,
      value: item.total,
      tooltip: `<b>${item.stateName}</b>\n${item.total}K`,
    },
  })),
});

const loadData = async (startDate: string, endDate: string) => {
  loading.value = true;
  salesByStateAndCity.value = await getSalesByStateAndCity(startDate, endDate);
  salesByState.value = await calcSalesByState(salesByStateAndCity.value);
  salesByStateMarkers.value = getSalesByStateMarkers();
  loading.value = false;
};

const tabChange = ([startDate, endDate]: string[]) => loadData(startDate, endDate);
</script>

<style scoped lang="scss">
@use "@/variables" as *;

.view-wrapper {
  padding-top: var(--content-padding);
  padding-bottom: var(--content-padding);
}

.cards {
  display: grid;
  width: 100%;
  grid-gap: 20px;
  gap: 20px;
  grid-template-columns: repeat(2, calc(50% - 10px));
}

.cards.wide {
    margin-right: 0;
    grid-template-columns: repeat(1, 100%);
}

@media only screen and (max-width: 900px) {
  .view-wrapper .cards {
    grid-template-columns: repeat(1, 100%);
  }
}
</style>
