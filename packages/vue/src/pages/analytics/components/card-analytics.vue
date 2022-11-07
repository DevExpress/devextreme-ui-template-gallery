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
  background-color: #fff;
  border: 1px solid #e0e0e0;
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

.grey {
  &.card-wrapper {
    .card {
      background-color: #f5f5f5;
      border: none;
      height: 120px;
    }

    .dx-button {
      background-color: #f5f5f5;
    }

    :deep(.content) {
      color: #757575;
      font-size: 14px;
      line-height: 17px;
      height: 270px;

      .total {
        display: inline-block;
        font-size: 26px;
        font-weight: 700;
        color: #000;
        margin-right: 27px;
      }

      .percentage {
        display: inline-block;
        font-size: 16px;
        font-weight: 400;
        color: #000;
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

@media only screen and (max-width: 400px) {
  .card {
    flex: 1 360px;

    .content {
      height: auto;
    }
  }
}
</style>
