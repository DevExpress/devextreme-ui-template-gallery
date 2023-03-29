<template>
  <div class="panel">
    <div class="title-text panel-header">
      {{ title }}
    </div>
    <div class="form-container">
      <slot />
      <dx-form
        :form-data="cardValue"
        :show-colon-after-label="true"
        :col-count="screenInfo.isXSmall ? 2 : colCount"
        :screen-by-width="getSizeQualifier"
        label-location="top"
        label-mode="outside"
      >
        <dxi-item
          v-for="item in items"
          :key="item.dataField"
          :data-field="item.dataField"
          :editor-type="item.editorType"
          :editor-options="{ stylingMode: 'outlined', ...item.editorOptions } "
          :col-span="item.colSpan"
        >
          <dxo-label
            v-if="item.label"
            :text="item.label"
          />
          <status-select-box
            v-if="item.dataField === 'status'"
            :items="item.itemsList"
            v-model="cardValue[item.dataField]"
            label-mode="hidden"
          />
          <pictured-item-select-box
            v-else-if="item.dataField === 'supervisor'"
            :label="item.label"
            v-model="cardValue[item.dataField]"
            :items="item.itemsList"
          />
        </dxi-item>
      </dx-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DxForm, DxItem as DxiItem, DxLabel as DxoLabel } from 'devextreme-vue/form';
import { screenInfo, getSizeQualifier } from '@/utils/media-query';
import PicturedItemSelectBox from '@/components/pictured-item-select-box.vue';
import StatusSelectBox from '@/components/status-select-box.vue';
import { Profile, SimpleObject } from '@/types';
import { reactive } from 'vue';

const props = withDefaults(defineProps<{
  title: '',
  cardData: Profile,
  colCount?: number,
  items: SimpleObject[]
}>(), {
  colCount: 2,
});

const cardValue = reactive(props.cardData);
</script>

<style scoped lang="scss">
@use "@/variables.scss" as *;
@use "sass:math";

.panel {
  @include shadow();

  width: 100%;
  padding: 0 0 $content-padding 0;
  border-radius: 8px;

  .panel-header {
    padding: $content-padding;
    border-bottom: 1px solid $border-color;
  }

  .top-item-wrapper {
    display: flex;
  }

  :deep(.dx-field-item) {
    padding-top: calc($content-padding / 2);
    padding-right: 0;
  }

  .form-container {
    margin: calc($content-padding * 2) $content-padding 0;
  }
}
</style>
