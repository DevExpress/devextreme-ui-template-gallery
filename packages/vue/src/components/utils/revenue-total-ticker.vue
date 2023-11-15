<template>
  <ticker-card
    title="Revenue Total"
    icon="dataarea"
    :data="props.data"
    :percentage="-14.7"
  />
</template>

<script setup lang="ts">
import TickerCard from '@/components/library/ticker-card.vue';
import { Sales } from '../../types/analytics';

const props = withDefaults(defineProps<{
  data: Sales | null
}>(), {
  data: () => null,
});
</script>
