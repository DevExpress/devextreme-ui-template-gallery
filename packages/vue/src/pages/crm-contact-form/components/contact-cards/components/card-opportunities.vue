<template>
  <div id="card-opportunies">

    <dx-button
      text="Add Opportunity"
      icon="add"
      width="300"
      height="60"
      styling-mode="outlined"
      type="default"
      class="add-tile"
      @click="addOpportunity"
    ></dx-button>

    <div v-if="!isLoading">
      <div class="opportunities-block">
        <div class="dx-form-group-caption">Active</div>
        <div class="opportunities-container">
          <div class="opportunities" v-for="item in activeItems">
            <opportunity-tile :data="item"/>
          </div>
        </div>
      </div>

      <div class="opportunities-block">
        <div class="dx-form-group-caption">Closed</div>
        <div class="opportunities-container">
          <div class="opportunities" v-for="item in closedItems">
            <opportunity-tile :data="item"/>
          </div>
        </div>
      </div>
    </div>

    <dx-load-panel
      :visible="isLoading"
      container="#card-opportunies"
      :position="{ of: '#card-opportunies' }"
    ></dx-load-panel>
  </div>
</template>

<script setup lang="ts">
import {
  inject,
  onBeforeUnmount,
  onMounted,
  ref,
} from 'vue';
import notify from 'devextreme/ui/notify';
import DxButton from 'devextreme-vue/button';
import DxLoadPanel from 'devextreme-vue/load-panel';
import { getActiveContactOpportunities, getClosedContactOpportunities } from 'dx-rwa-data';
import type { Opportunity } from '@/types/opportunities';
import { SimpleSubject } from '@/utils/simple-subject';
import OpportunityTile from './opportunity-tile.vue';

const props = withDefaults(defineProps<{
  contactId: number | null,
}>(), {
  contactId: null,
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

const refreshSubscription = inject<SimpleSubject>('refresh-notifier')
  ?.subscribe(loadData);

onMounted(() => {
  loadData();
});

onBeforeUnmount(() => {
  refreshSubscription?.unsubscribe();
});

function addOpportunity() {
  notify('Add opportunity event');
}
</script>

<style scoped lang="scss">
@use "@/variables.scss" as *;

#card-opportunies {
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
        background: $side-panel-background;
        flex: 1 300px;
        max-width: 300px;
      }
    }
  }
}
</style>
