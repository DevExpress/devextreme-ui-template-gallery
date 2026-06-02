<template>
  <dx-speed-dial-action
    icon="sparkle"
    :label="screenInfo.isLarge ? 'AI Insights' : ''"
    @click="$emit('click')"
  />
</template>

<script setup lang="ts">
import { DxSpeedDialAction } from 'devextreme-vue/speed-dial-action';
import { screenInfo } from '@/utils/media-query';

defineEmits<{
  (e: 'click'): void;
}>();
</script>
