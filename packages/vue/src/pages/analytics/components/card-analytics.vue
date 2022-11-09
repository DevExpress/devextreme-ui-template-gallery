<template>
  <div class="card-wrapper">
    <div
      class="card"
      :class="props.contentClass"
    >
      <dx-menu
        :visible="props.isMenuVisible"
        class="overflow-menu"
        :items="menuItems"
      />
      <div
        v-if="props.title"
        class="title">
        {{ props.title }}
      </div>
      <slot name="filter" />
      <div
        v-if="showData"
        class="content"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DxMenu } from 'devextreme-vue/menu';

const menuItems: Array<{ icon: string, items: Array<{ text: string }> }> = [{
  icon: 'overflow',
  items: [
    { text: 'Hide' },
  ],
}];

const props = withDefaults(defineProps<{
  title?: string,
  contentClass?: string,
  showData?: boolean,
  isMenuVisible?: boolean,
}>(), {
  showData: true,
  contentClass: '',
  isMenuVisible: true,
});

</script>

<style scoped lang="scss">
@use '@/variables.scss' as *;

.card {
  padding: 16px;
  border-radius: 4px;
  box-shadow: none;
  position: relative;
  background-color: $background-color;
  border: 1px solid $border-color;
  overflow: hidden;

  .overflow-menu {
    position: absolute;
    right: 5px;
    left: auto;
    top: 5px;
  }

  :deep(.content) {
    color: #757575;
    font-size: 14px;
    line-height: 17px;
    height: 270px;
  }

  :deep(.title) {
    color: $base-text-color;
    line-height: 19px;
    font-weight: 500;
    font-size: 16px;
    margin-bottom: 20px;
    display: inline-block;
    padding-right: 25px;
  }

}

@media only screen and (max-width: 900px) {
  .card .content {
    height: auto;
  }
}

@media only screen and (max-width: 400px) {
  .card {
    flex: 1 360px;

    .content {
      height: auto;
    }
  }
}
</style>
