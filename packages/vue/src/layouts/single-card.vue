<template>
  <dx-scroll-view
    height="100%"
    width="100%"
    class="view-wrapper-scroll single-card"
  >
    <card-auth
      :title="title"
      :description="description"
    >
      <slot />
    </card-auth>
  </dx-scroll-view>
</template>

<script setup lang="ts">
import DxScrollView from 'devextreme-vue/scroll-view';
import CardAuth from '@/components/library/card-auth.vue';
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';

const route = useRoute();

const title = ref<string>(route.meta.title as string || '');
const description = ref<string>(route.meta.description as string);

watch(
  () => route.path,
  () => {
    title.value = route.meta.title as string || '';
    description.value = route.meta.description as string;
  },
);
</script>

<style scoped lang="scss">
@use '@/variables' as *;

.single-card {
  height: 100%;

  :deep(.dx-scrollview-content) {
    height: 100%;
  }
}
</style>
