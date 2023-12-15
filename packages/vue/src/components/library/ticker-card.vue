<template>
  <div class="ticker">
    <div
      class="icon-wrapper"
      :class="getIconClass()"
    >
      <i :class="`dx-icon dx-icon-${icon} ` " />
    </div>
    <div class="middle">
      <div class="title">
        {{ title }}
      </div>
      <div class="total">
        {{ total === null ? formatPrice(totalCount) : total }}
      </div>
    </div>
    <div
      :class="['percentage', percentage > 0 ? 'positive' : 'negative']"
      v-if="props.percentage !== 0"
    >
      <div :class="[`dx-icon-${percentage > 0 ? 'spinup' : 'spindown'}`]" />
      <div class="value">
        {{ Math.abs(percentage) }}%
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatPrice } from '@/utils/formatters';
import { Sales, SalesOrOpportunitiesByCategory } from '@/types/analytics';
import { computed, withDefaults } from 'vue';
import CardAnalytics from '@/components/library/card-analytics.vue';

const props = withDefaults(
  defineProps<{
    icon: string,
    tone?: 'warning' | 'info',
    title? : string,
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

const getIconClass = () => props.tone || (props.percentage > 0 ? 'positive' : 'negative');
</script>

<style scoped lang="scss">
@use "@/variables.scss" as *;

.ticker {
  --gap-padding: 12px;
  height: auto;
  border-radius: 8px;
  box-shadow: var(--card-shadow);
  background-color: var(--base-bg, #fff);
  border: none;
  padding: 16px;
  display: flex;
  gap: var(--gap-padding);
  align-items: center;
  .positive {
    background-color: color-mix(in sRGB, var(--success-color) 12%, transparent);
    color: var(--success-color);
  }
  .warning {
    background-color: color-mix(in sRGB, var(--warning-color) 12%, transparent);
    color: var(--icon-dark-warning-color);
  }
  .info {
    background-color: color-mix(in sRGB, var(--info-color) 12%, transparent);
    color: var(--info-color);
  }
  .negative {
    background-color: color-mix(in sRGB, var(--error-color) 12%, transparent);
    color: var(--error-color);
  }
  .icon-wrapper {
    display: flex;
    flex: 0 0 48px;
    height: 48px;
    border-radius: 50%;
    .dx-icon {
      margin: auto;
      font-size: 24px;
    }
  }
  .middle {
    flex: 1;
  }
  .title {
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 8px;
  }
  .total {
    display: inline-block;
    font-size: 20px;
    font-weight: 600;
    line-height: 20px;
    color: var(--base-text-color);
  }
  .percentage {
    display: flex;
    align-self: flex-start;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
    line-height: 20px;
    align-items: center;
    padding: 4px 8px 4px 2px;
    .value {
      line-height: 20px;
    }
    .dx-icon-spindown {
      font-size: 20px;
    }
    .dx-icon-spinup {
      font-size: 20px;
    }
  }
}
</style>
