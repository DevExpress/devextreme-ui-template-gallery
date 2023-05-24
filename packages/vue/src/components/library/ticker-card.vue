<template>
  <card-analytics
    class="tile"
    title="props.title"
    :show-data="props.data !== null || props.total !== null"
  >
    <div class="total">
      {{ props.total === null ? formatPrice(totalCount) : props.total }}
    </div>
    <div
      class="percentage"
      v-if="props.percentage !== 0"
    >
      <i :class="[`dx-icon-${props.percentage > 0 ? 'spinup' : 'spindown'}`]" />
      <span>{{ Math.abs(props.percentage) }}%</span>
    </div>
  </card-analytics>
</template>

<script setup lang="ts">
import { formatPrice } from '@/utils/formatters';
import { Sales, SalesOrOpportunitiesByCategory } from '@/types/analytics';
import { computed, withDefaults } from 'vue';
import CardAnalytics from '@/components/library/card-analytics.vue';

const props = withDefaults(
  defineProps<{
    data?: SalesOrOpportunitiesByCategory | Sales | null,
    total?: string | null,
    percentage: number,
  }>(),
  {
    data: null,
    total: null,
  },
);

const totalCount = computed(() => ((props.data as unknown as Array<{[key:string]: number}>) || [])
  .reduce((result: number, { value, total }) => result + (value || total || 0), 0));

</script>

<style scoped lang="scss">
@use "@/variables.scss" as *;

.tile.card-wrapper {
  :deep(.card) {
    background-color: $side-panel-background;
    border: none;
    height: 120px;

    .content {
      .total {
        display: inline-block;
        font-size: 26px;
        font-weight: 700;
        color: $base-text-color;
        margin-right: 27px;
      }

      .percentage {
        display: inline-block;
        font-size: 16px;
        font-weight: 400;
        color: $base-text-color;
        line-height: 24px;

        span {
          display: inline-block;
          vertical-align: text-bottom;
        }

        .dx-icon-spindown {
          font-size: 24px;
          color: #ff5722;
          display: inline-block;
        }

        .dx-icon-spinup {
          font-size: 24px;
          color: #2eb52c;
          display: inline-block;
        }
      }
    }
  }
}
</style>
