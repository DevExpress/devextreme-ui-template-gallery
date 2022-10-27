<template>
  <div class="card-wrapper">
    <div
      class="card"
      :class="props.contentClass"
    >
      <dx-button icon="overflow" />
      <div class="title">
        {{ props.title }}
      </div>
      <slot name="filter" />
      <load-component
        :is-loading="!showData"
        :container-selector="`.card.${props.contentClass}`"
      >
        <div class="content {{ props.contentClass }}">
          <slot />
        </div>
      </load-component>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DxButton } from 'devextreme-vue/button';
import LoadComponent from '@/components/load-component.vue';

const props = defineProps<{
  title: string,
  contentClass: string,
  showData: boolean,
}>();

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

  .dx-button {
    position: absolute;
    right: 10px;
    left: auto;
    top: 10px;
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

      &.sales-by-state-map {
        height: 400px;
      }
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

    .card {
      .content {
        height: auto;
      }
    }
  }
}
</style>
