<template>
  <card-analytics
    class="grey"
    title="props.title"
    :show-data="props.data !== null || props.total !== null"
  >
    <div class="total">
      {{ props.total === null ? formatPrice(getTotal(props.data)) : props.total }}
    </div>
    <div class="percentage">
      <i :class="[`dx-icon-${props.up ? 'spinup' : 'spindown'}`]" />
      <span>{{ props.percent }}%</span>
    </div>
  </card-analytics>
</template>

<script setup lang="ts">
import { formatPrice } from '@/utils/formatters';
import { Sales, SalesOrOpportunitiesByCategory } from '@/types/analytics';
import { withDefaults } from 'vue';
import CardAnalytics from '../../components/card-analytics.vue';

const props = withDefaults(
  defineProps<{
    data?: SalesOrOpportunitiesByCategory | Sales | null,
    total?: string | null,
    up: boolean,
    percent: string,
  }>(),
  {
    data: null,
    total: null,
  },
);

const getTotal = (value: Array<{value?: number, total?: number}>) => (value || [])
  .reduce((total, item) => total + (item.value || item.total || 0), 0);
</script>

<style scoped>

</style>
