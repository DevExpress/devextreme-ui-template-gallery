<template>
  <dx-scroll-view class="view-wrapper-scroll">
    <div class="view-wrapper">
      <toolbar-analytics
        :show-tabs="true"
        @tab-change="tabChange($event)"
      >
        Dashboard
      </toolbar-analytics>

      <div class="tiles">
        <opportunities-ticker :data="opportunities" />
        <revenue-total-ticker :data="sales" />
        <conversion-ticker />
        <leads-ticker />
      </div>

      <div class="cards">
        <revenue-card :data="sales" />
        <conversion-card :data="opportunities" />
        <revenue-analysis-card :data="salesByState" />
        <revenue-snapshot-card :data="salesByCategory" />
      </div>
    </div>
  </dx-scroll-view>
  <dx-load-panel
    container=".view-wrapper"
    :shading="false"
    :position="{ of: '.dx-drawer-content' }"
    :visible="loading"
    :show-pane="true"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { DxScrollView } from 'devextreme-vue/scroll-view';
import { DxLoadPanel } from 'devextreme-vue/load-panel';

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

import ToolbarAnalytics from '@/components/utils/toolbar-analytics.vue';

import RevenueSnapshotCard from '@/components/utils/revenue-snapshot-card.vue';
import ConversionCard from '@/components/utils/conversion-card.vue';
import RevenueCard from '@/components/utils/revenue-card.vue';
import RevenueAnalysisCard from '@/components/utils/revenue-analysis-card.vue';
import OpportunitiesTicker from '@/components/utils/opportunities-ticker.vue';
import RevenueTotalTicker from '@/components/utils/revenue-total-ticker.vue';
import ConversionTicker from '@/components/utils/conversion-ticker.vue';
import LeadsTicker from '@/components/utils/leads-ticker.vue';

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
  padding-top: var(--content-padding);
  padding-bottom: var(--content-padding);

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

@media only screen and (max-width: 1400px) {
  .view-wrapper {
    .tiles {
      grid-template-columns: repeat(2, calc(50% - 10px));
    }
  }
}

@media only screen and (max-width: 900px) {
  .view-wrapper {
    .cards {
      grid-template-columns: repeat(1, 100%);
    }
  }
}

@media only screen and (max-width: 700px) {
  .view-wrapper {
    .cards, .tiles {
      grid-template-columns: repeat(1, 100%);
    }
  }
}

@media only screen and (max-width: 400px) {
  .view-wrapper {
    .cards, .tiles {
      grid-template-columns: repeat(1, 100%);
    }
  }
}
</style>
