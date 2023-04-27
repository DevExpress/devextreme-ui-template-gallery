<template>
  <div
    class="opportunity"
    @click="opportunityClick()"
  >
    <div class="name">
      {{ props.data.name }}
    </div>
    <div class="product-info">
      Products: {{ props.data.products }}, total:
      <span class="total">{{ formatPrice(props.data.total, 2) }}</span>
    </div>
    <div class="owner">
      Owner: <span class="owner-name">{{ props.data.manager }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatPrice } from '@/utils/formatters';
import { Opportunity } from '@/types/opportunities';
import notify from 'devextreme/ui/notify';

const props = defineProps<{
  data: Opportunity
}>();

const opportunityClick = () => {
  notify('Click opportunity event');
};
</script>

<style scoped lang="scss">
@use "@/variables.scss" as *;

.opportunity {
  cursor: pointer;
}

.name {
  font-size: 16px;
  font-weight: 700;
  padding-bottom: 8px;
}

.product-info {
  font-size: 12px;
  padding-bottom: 16px;

  .total {
    font-size: 16px;
  }
}

.owner {
  color: $texteditor-label-color;
  font-size: 14px;

  .owner-name {
    color: $base-text-color;
  }
}
</style>
