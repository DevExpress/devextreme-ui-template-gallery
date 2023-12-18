<template>
  <div id="card-opportunities">
    <dx-load-panel
      :visible="isLoading"
      :show-pane="false"
      width="auto"
      container="#card-opportunities"
      :position="{ of: '#card-opportunities' }"
    />
    <template v-if="!isLoading">
      <dx-button
        text="Add Opportunity"
        icon="add"
        width="300"
        height="115"
        styling-mode="outlined"
        type="default"
        class="add-tile"
      />

      <div>
        <div class="opportunities-block">
          <div class="dx-form-group-caption">
            Active
          </div>
          <div class="opportunities-container">
            <div
              class="opportunities"
              v-for="item in activeItems"
            >
              <opportunity-tile :data="item" />
            </div>
          </div>
        </div>

        <div class="opportunities-block">
          <div class="dx-form-group-caption">
            Closed
          </div>
          <div class="opportunities-container">
            <div
              class="opportunities"
              v-for="item in closedItems"
            >
              <opportunity-tile :data="item" />
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { DxButton } from 'devextreme-vue/button';
import DxLoadPanel from 'devextreme-vue/load-panel';
// eslint-disable-next-line import/no-unresolved
import { getActiveContactOpportunities, getClosedContactOpportunities } from 'dx-template-gallery-data';
import type { Opportunity } from '@/types/opportunities';
import OpportunityTile from '../utils/opportunity-tile.vue';

const props = withDefaults(defineProps<{
  contactId?: number,
}>(), {
  contactId: undefined,
});

const activeItems = ref<Opportunity[]>([]);
const closedItems = ref<Opportunity[]>([]);
const isLoading = ref<boolean>(false);

async function loadData() {
  if (!props.contactId) return;
  isLoading.value = true;

  const promiseActiveItems = getActiveContactOpportunities(props.contactId);
  const promiseClosedItems = getClosedContactOpportunities(props.contactId);

  [activeItems.value, closedItems.value] = await Promise.all(
    [promiseActiveItems, promiseClosedItems],
  );

  isLoading.value = false;
}

onMounted(() => {
  loadData();
});
</script>

<style scoped lang="scss">
@use "@/variables.scss" as *;

#card-opportunities {
  min-height: 300px;
  padding: 20px;

  .opportunities-block {
    padding: 10px 0;

    .opportunities-container {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;

      .opportunities {
        padding: 16px;
        border-radius: 4px;
        background: var(--side-panel-background);
        flex: 1 300px;
        max-width: 300px;
      }
    }
  }
}
</style>
