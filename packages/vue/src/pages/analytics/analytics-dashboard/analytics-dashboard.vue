<template>
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
        :up="true"
        percent="20.3"
      />

      <analytic-tile
        title="Revenue Total"
        :data="sales"
        :up="true"
        percent="14.7"
      />

      <analytic-tile
        title="Conversion"
        total="16%"
        :up="false"
        percent="2.3"
      />

      <analytic-tile
        title="Leads"
        total="51"
        :up="false"
        percent="8.5"
      />
    </div>

    <div class="cards">
      <revenue-card :data="sales" />
      <conversion-card :data="opportunities" />
      <revenue-analysis-card :data="salesByState" />
      <revenue-snapshot-card :data="salesByCategory" />
    </div>
  </div>
  <loading-panel :data="data" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

import {
  getOpportunitiesByCategory,
  getSalesByCategory,
  getSales,
  getSalesByState,
} from 'dx-rwa-data';
import {
  Sales,
  SalesByState, SalesByStateAndCity,
  SalesOrOpportunitiesByCategory,
} from '@/types/analytics';

import LoadingPanel from '../components/loading-panel.vue';
import AnalyticsToolbar from '../components/analytics-toolbar.vue';

import RevenueSnapshotCard from './components/revenue-snapshot-card.vue';
import AnalyticTile from './components/analytic-tile.vue';
import ConversionCard from './components/conversion-card.vue';
import RevenueCard from './components/revenue-card.vue';
import RevenueAnalysisCard from './components/revenue-analysis-card.vue';

const opportunities = ref<SalesOrOpportunitiesByCategory | null>(null);
const sales = ref<Sales | null>(null);
const salesByState = ref<SalesByState | null>(null);
const salesByCategory = ref<SalesByStateAndCity | null>(null);

const data = [opportunities, salesByCategory, sales, salesByState];

const loadData = (startDate: string, endDate: string) => {
  [getOpportunitiesByCategory, getSalesByCategory, getSales, getSalesByState]
    .forEach(async (loader, i) => {
      data[i].value = null;
      data[i].value = await loader(startDate, endDate);
    });
};

const tabChange = ([startDate, endDate]: string[]) => {
  loadData(startDate, endDate);
};
</script>

<style scoped lang="scss">
@use "@/variables.scss" as *;
@use "sass:math";
@use "../analytics";

.view-wrapper {
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
