<template>
  <dx-toolbar>
    <dx-item location="before">
      <span class="toolbar-header">
        <slot />
      </span>
    </dx-item>

    <dx-item
      v-if="props.showTabs"
      location="before"
      locate-in-menu="auto"
    >
      <dx-tabs
        :selected-item-keys="[5]"
        key-expr="key"
        :items="analyticsPanelItems"
        @item-click="selectionChange($event)"
      />
    </dx-item>

    <dx-item
      location="after"
      locate-in-menu="auto"
      cssclass="add-card"
    >
      <dx-button
        icon="plus"
        text="Add Card"
        type="default"
        styling-mode="contained"
      />
    </dx-item>

    <dx-item
      location="after"
      locate-in-menu="auto"
      widget="dxButton"
      show-text="inMenu"
      :options="{
        text: 'Refresh',
        icon: 'refresh'
      }"
    />

    <dx-item
      location="after"
      locate-in-menu="auto"
    >
      <div class="separator" />
    </dx-item>

    <dx-item
      location="after"
      locate-in-menu="auto"
      widget="dxButton"
      show-text="inMenu"
      :options="{
        icon: 'export'
      }"
    />
  </dx-toolbar>
</template>

<script setup lang="ts">
import DxButton from 'devextreme-vue/button';
import {
  DxToolbar,
  DxItem,
} from 'devextreme-vue/toolbar';
import { DxTabs } from 'devextreme-vue/tabs';
import { ItemClickEvent as TabsItemClickEvent } from 'devextreme/ui/tabs';
import { onMounted } from 'vue';
import { analyticsPanelItems } from '@/types/resource';

const props = withDefaults(defineProps<{
  showTabs?: boolean
}>(), { showTabs: false });

const emit = defineEmits(['tab-change']);
const [initialStartDate, initialEndDate] = analyticsPanelItems[4].value.split('/');

const selectionChange = (e: TabsItemClickEvent) => {
  const [startDate, endDate] = e.itemData.value.split('/');
  emit('tab-change', [startDate, endDate]);
};

onMounted(() => {
  emit('tab-change', [initialStartDate, initialEndDate]);
});
</script>

<style scoped lang="scss">
@use "@/variables.scss" as *;
@use "sass:math";

@include separator();
.toolbar-header {
  @include header();
}

.dx-tabs :deep(.dx-tab) {
  background-color: $background-color;

  &:nth-child(2) {
    width: 82px;
  }
}

.add-card {
  .dx-icon.dx-icon-plus,
  .dx-button-text {
    color: #fff;
  }
}
</style>
