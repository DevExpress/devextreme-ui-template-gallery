<template>
  <dx-scroll-view
    height="100%"
    width="100%"
    class="with-footer single-card"
  >
    <div class="dx-card content">
      <div class="header">
        <div class="title">
          {{ title }}
        </div>
        <div class="description">
          {{ description }}
        </div>
      </div>
      <slot />
    </div>
  </dx-scroll-view>
</template>

<script setup lang="ts">
import DxScrollView from 'devextreme-vue/scroll-view';
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';

const route = useRoute();

const title = ref(route.meta.title);
const description = ref<string>('');

watch(
  () => route.path,
  () => {
    title.value = route.meta.title;
    description.value = route.meta.description as string;
  },
);
</script>

<style scoped lang="scss">
@use '@/variables' as *;
.single-card {
  width: 100%;
  height: 100%;

  .dx-card {
    width: 330px;
    margin: auto auto;
    padding: 40px;
    flex-grow: 0;

    .screen-x-small & {
      width: 100%;
      height: 100%;
      border-radius: 0;
      box-shadow: none;
      margin: 0;
      border: 0;
      flex-grow: 1;
    }

    .header {
      margin-bottom: 30px;

      .title {
        color: $base-text-color;
        line-height: 28px;
        font-weight: 500;
        font-size: 24px;
      }

      .description {
        color: rgba($base-text-color, alpha($base-text-color) * 0.7);
        line-height: 18px;
      }
    }
  }
}
</style>
