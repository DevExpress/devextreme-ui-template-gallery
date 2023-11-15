<template>
  <ticker-card
    title="Opportunities"
    icon="datatrending"
    :data="props.data"
    :percentage="20.3"
  />
</template>

<script setup lang="ts">
import TickerCard from '@/components/library/ticker-card.vue';
import { SalesOrOpportunitiesByCategory } from '../../types/analytics';

const props = withDefaults(defineProps<{
  data: SalesOrOpportunitiesByCategory | null
}>(), {
  data: () => null,
});
</script>
