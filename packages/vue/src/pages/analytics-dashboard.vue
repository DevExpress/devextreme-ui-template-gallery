<template>
  <dx-scroll-view class="view-wrapper-scroll">
    <div class="view-wrapper view-wrapper-dashboard">
      <toolbar-analytics
        :show-tabs="true"
        @tab-change="tabChange($event)"
      >
        Dashboard
      </toolbar-analytics>

      <div class="analytics-dashboard__layout">
        <dx-splitter
          v-if="usesSplitterLayout"
          class="analytics-dashboard__splitter"
          orientation="horizontal"
          :separator-size="12"
        >
          <dx-splitter-item min-size="0"
:resizable="true">
            <div class="analytics-dashboard__pane analytics-dashboard__pane--main">
              <div class="analytics-dashboard__content">
                <div class="cards compact">
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
            </div>
          </dx-splitter-item>
          <dx-splitter-item :size="420"
:min-size="340"
max-size="50%"
:resizable="true">
            <div class="analytics-dashboard__pane analytics-dashboard__pane--chat">
              <chat-card-component
                :messages="chat.messages.value"
                :current-user="chat.currentUser"
                :typing-users="chat.typingUsers.value"
                :alerts="chat.alerts.value"
                :is-processing="chat.isProcessing.value"
                @message-entered="chat.onMessageEntered"
                @prompt-click="chat.onPromptClick"
                @reset-click="chat.resetChat"
                @close-click="chat.closeChat"
                @unpin-click="chat.unpinChat"
              />
            </div>
          </dx-splitter-item>
        </dx-splitter>

        <template v-else>
          <div class="analytics-dashboard__content">
            <div class="cards compact">
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

          <chat-floating-button
            v-if="!chat.isPinned.value && !chat.isPopupVisible.value"
            @click="chat.openPopup"
          />
        </template>

        <chat-popup
          :visible="chat.isPopupVisible.value"
          :messages="chat.messages.value"
          :current-user="chat.currentUser"
          :typing-users="chat.typingUsers.value"
          :alerts="chat.alerts.value"
          :is-processing="chat.isProcessing.value"
          @update:visible="chat.changePopupVisibility"
          @message-entered="chat.onMessageEntered"
          @prompt-click="chat.onPromptClick"
          @reset-click="chat.resetChat"
          @pin-click="chat.pinChat"
        />
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
import { ref, computed, watch } from 'vue';
import { DxScrollView } from 'devextreme-vue/scroll-view';
import { DxLoadPanel } from 'devextreme-vue/load-panel';
import { DxSplitter, DxItem as DxSplitterItem } from 'devextreme-vue/splitter';

import {
  getOpportunitiesByCategory,
  getSalesByCategory,
  getSales,
  getSalesByState,
   
} from 'dx-template-gallery-data';
import {
  Sales,
  SalesByState, SalesByStateAndCity,
  SalesOrOpportunitiesByCategory,
} from '@/types/analytics';
import { analyticsPanelItems } from '@/types/resource';
import { DashboardContext } from '@/composables/dashboard-ai-service';

import { screenInfo } from '@/utils/media-query';
import { useChatAssistant } from '@/composables/use-chat-assistant';

import ToolbarAnalytics from '@/components/utils/toolbar-analytics.vue';
import RevenueSnapshotCard from '@/components/utils/revenue-snapshot-card.vue';
import ConversionCard from '@/components/utils/conversion-card.vue';
import RevenueCard from '@/components/utils/revenue-card.vue';
import RevenueAnalysisCard from '@/components/utils/revenue-analysis-card.vue';
import OpportunitiesTicker from '@/components/utils/opportunities-ticker.vue';
import RevenueTotalTicker from '@/components/utils/revenue-total-ticker.vue';
import ConversionTicker from '@/components/utils/conversion-ticker.vue';
import LeadsTicker from '@/components/utils/leads-ticker.vue';
import ChatCardComponent from '@/components/utils/chat-card-component.vue';
import ChatFloatingButton from '@/components/utils/chat-floating-button.vue';
import ChatPopup from '@/components/utils/chat-popup.vue';

const opportunities = ref<SalesOrOpportunitiesByCategory | null>(null);
const sales = ref<Sales | null>(null);
const salesByState = ref<SalesByState | null>(null);
const salesByCategory = ref<SalesByStateAndCity | null>(null);

const loading = ref<boolean>(true);

const periodName = ref(analyticsPanelItems[4].text);
const dateRange = ref(analyticsPanelItems[4].value.split('/'));

const dashboardContext = computed<DashboardContext | undefined>(() => {
  if (loading.value) return undefined;
  const salesTotal = sales.value
    ? sales.value.reduce((sum, s) => sum + s.total, 0) : 0;
  const opportunitiesTotal = opportunities.value
    ? opportunities.value.reduce((sum, o) => sum + o.value, 0) : 0;
  return {
    periodName: periodName.value,
    dateRange: dateRange.value,
    salesTotal,
    opportunitiesTotal,
    sales: sales.value ?? [],
    opportunities: opportunities.value ?? [],
    salesByCategory: salesByCategory.value
      ? salesByCategory.value.map((s) => ({ name: s.stateName, value: s.total }))
      : [],
    salesByState: salesByState.value ?? [],
    conversionRate: 16,
    leads: 51,
  };
});

const chat = useChatAssistant(dashboardContext);

const isSmallScreen = computed(() => !screenInfo.value.isLarge);
const usesSplitterLayout = computed(() => chat.isPinned.value && screenInfo.value.isLarge);

watch(isSmallScreen, (small) => {
  if (small && chat.isPinned.value) {
    chat.unpinChat();
  }
});

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
  const item = analyticsPanelItems.find(
    (p) => p.value === `${startDate}/${endDate}`,
  );
  if (item) {
    periodName.value = item.text;
  }
  dateRange.value = [startDate, endDate];
  loadData(startDate, endDate);
};
</script>

<style scoped lang="scss">
@use "@/variables.scss" as *;

$dashboard-pane-offset: 20px;

.view-wrapper.view-wrapper-dashboard {
  flex: 1 1 auto;
  min-height: 0;
  height: 100%;
  padding-top: var(--content-padding);
  padding-bottom: var(--content-padding);
  position: relative;
  overflow: hidden;

  .cards {
    display: grid;
    width: 100%;
    margin-top: 20px;
    gap: 20px;
    grid-template-columns: repeat(2, minmax(0, 1fr));

    &.compact {
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));

      :deep(.card) {
        background-color: var(--side-panel-background);
        border: none;
        height: 120px;

        :deep(.dx-button) {
          background-color: var(--side-panel-background);
        }

        :deep(.content) {
          height: auto;
        }
      }

      :deep(.dx-loadpanel-indicator) {
        width: 24px;
        height: 24px;
      }
    }

    .card-wrapper {
      flex: 1 50%;
    }
  }
}

.analytics-dashboard__layout {
  display: flex;
  flex: 1 1 auto;
  align-items: stretch;
  min-height: 0;
  min-width: 0;
  position: relative;
  overflow: hidden;
}

.analytics-dashboard__splitter {
  width: 100%;
  height: 100%;
  min-height: 0;
  min-width: 0;
  overflow: hidden;

  :deep(.dx-splitter-item) {
    min-height: 0;
    min-width: 0;
  }

  :deep(.dx-splitter-item-content) {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 0;
    min-width: 0;
    overflow: hidden;
  }

  :deep(> .dx-resize-handle) {
    margin-top: $dashboard-pane-offset;
  }
}

.analytics-dashboard__pane {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  height: 100%;
  min-height: 0;
  min-width: 0;
  overflow: hidden;
}

.analytics-dashboard__pane--main {
  padding-right: 10px;
  overflow-y: auto;
}

.analytics-dashboard__pane--chat {
  padding-left: 10px;
  padding-top: $dashboard-pane-offset;
  overflow: hidden;
  max-height: 100%;
}

.analytics-dashboard__content {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  min-width: 0;
}

.analytics-dashboard__content .cards {
  flex-shrink: 0;
}

@media only screen and (max-width: 1400px) {
  .view-wrapper.view-wrapper-dashboard {
    .cards.compact {
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    }
  }
}

@media only screen and (max-width: 1100px) {
  .analytics-dashboard__layout {
    flex-direction: column;
  }
}

@media only screen and (max-width: 900px) {
  .view-wrapper.view-wrapper-dashboard {
    .cards {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
  }
}

@media only screen and (max-width: 700px) {
  .view-wrapper.view-wrapper-dashboard {
    .cards.compact {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
  }
}
</style>
