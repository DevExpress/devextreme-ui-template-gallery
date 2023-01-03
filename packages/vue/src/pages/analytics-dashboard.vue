<template>
  <dx-scroll-view class="view-wrapper-scroll">
    <div class="view-wrapper">
      <analytics-toolbar
        :show-tabs="true"
        @tab-change="tabChange($event)"
      >
        Dashboard
      </analytics-toolbar>

      <div class="tiles">
        <analytic-tile
          title="Opportunities"
          :data="opportunities"
          :percentage="20.3"
        />

        <analytic-tile
          title="Revenue Total"
          :data="sales"
          :percentage="14.7"
        />

        <analytic-tile
          title="Conversion"
          total="16%"
          :percentage="-2.3"
        />

        <analytic-tile
          title="Leads"
          total="51"
          :percentage="8.5"
        />
      </div>

      <div class="cards">
        <revenue-card :data="sales" />
        <conversion-card :data="opportunities" />
        <revenue-analysis-card :data="salesByState" />
        <revenue-snapshot-card :data="salesByCategory" />
      </div>
    </div>
  </dx-scroll-view>
  <loading-panel :loading="loading" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { DxScrollView } from 'devextreme-vue/scroll-view';

import {
  getOpportunitiesByCategory,
  getSalesByCategory,
  getSales,
  getSalesByState,
  // eslint-disable-next-line
} from 'dx-template-gallery-data';
import {
  Sales,
  SalesByState, SalesByStateAndCity,
  SalesOrOpportunitiesByCategory,
} from '@/types/analytics';

import LoadingPanel from '@/components/loading-panel.vue';
import AnalyticsToolbar from '@/components/analytics-toolbar.vue';

import RevenueSnapshotCard from '@/components/revenue-snapshot-card.vue';
import AnalyticTile from '@/components/analytic-tile.vue';
import ConversionCard from '@/components/conversion-card.vue';
import RevenueCard from '@/components/revenue-card.vue';
import RevenueAnalysisCard from '@/components/revenue-analysis-card.vue';

const opportunities = ref<SalesOrOpportunitiesByCategory | null>(null);
const sales = ref<Sales | null>(null);
const salesByState = ref<SalesByState | null>(null);
const salesByCategory = ref<SalesByStateAndCity | null>(null);

const loading = ref<boolean>(true);

const loadData = async (startDate: string, endDate: string) => {
  loading.value = true;

  await Promise.all([
    getOpportunitiesByCategory(startDate, endDate)
      .then((result: SalesOrOpportunitiesByCategory) => { opportunities.value = result; }),
    getSalesByCategory(startDate, endDate)
      .then((result: SalesByStateAndCity) => { salesByCategory.value = result; }),
    getSales(startDate, endDate)
      .then((result: Sales) => { sales.value = result; }),
    getSalesByState(startDate, endDate)
      .then((result: SalesByState) => { salesByState.value = result; }),
  ]).then(() => { loading.value = false; });
};

const tabChange = ([startDate, endDate]: string[]) => {
  loadData(startDate, endDate);
};
</script>

<style scoped lang="scss">
@use "@/variables.scss" as *;

.view-wrapper {
  padding: $content-padding;

  .cards, .tiles {
    display: grid;
    width: 100%;
    grid-gap: 20px;
    gap: 20px;
  }

  .tiles {
    margin: 20px 0;
    grid-template-columns: repeat(4, calc(25% - 15px));
  }

  .cards {
    grid-template-columns: repeat(2, calc(50% - 10px));

    .card-wrapper {
      flex: 1 50%;
    }
  }
}

@media only screen and (max-width: 900px) {
  .view-wrapper {
    .tiles {
      grid-template-columns: repeat(2, calc(50% - 10px));
    }

    .cards {
      grid-template-columns: repeat(1, 100%);
    }
  }
}

@media only screen and (max-width: 400px) {
  .view-wrapper {
    .tiles, .cards {
      grid-template-columns: repeat(1, 100%);
    }
  }
}
</style>
