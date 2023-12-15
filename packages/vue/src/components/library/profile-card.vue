<template>
  <div class="panel">
    <div class="title-text panel-header">
      {{ title }}
    </div>
    <div class="form-container">
      <slot />
      <dx-form
        ref="form"
        :form-data="props.cardData"
        :show-colon-after-label="true"
        :col-count="screenInfo.isXSmall ? 2 : colCount"
        :screen-by-width="getSizeQualifier"
        label-location="top"
        label-mode="outside"
        :on-field-data-changed="evt => onFieldChange(evt.dataField, evt.value)"
      >
        <dx-item
          v-for="item in items"
          :key="item.dataField"
          :data-field="item.dataField"
          :editor-type="item.editorType"
          :editor-options="{
            stylingMode: 'filled',
            valueChangeEvent: 'input',
            ...item.editorOptions,
          }"
          :col-span="item.colSpan"
        >
          <dx-label
            v-if="item.label"
            :text="item.label"
          />
          <dx-validation-rule
            v-for="rule in item.validators"
            :key="rule"
            :type="rule.type"
          />
          <status-select-box
            v-if="item.dataField === 'status'"
            :items="item.itemsList"
            :model-value="cardData[item.dataField]"
            styling-mode="filled"
            label-mode="hidden"
            @update:model-value="onFieldChange()"
          />
          <pictured-item-select-box
            v-else-if="item.dataField === 'supervisor'"
            :label="item.label"
            :model-value="cardData[item.dataField]"
            :items="item.itemsList"
            @update:model-value="onFieldChange()"
          />
        </dx-item>
      </dx-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  DxForm,
  DxItem,
  DxLabel,
  DxValidationRule,
} from 'devextreme-vue/form';
import { screenInfo, getSizeQualifier } from '@/utils/media-query';
import PicturedItemSelectBox from '@/components/library/pictured-item-select-box.vue';
import StatusSelectBox from '@/components/library/status-select-box.vue';
import { Profile, SimpleObject } from '@/types';
import { reactive, ref } from 'vue';

const props = withDefaults(defineProps<{
  title: '',
  cardData: Profile,
  colCount?: number,
  items: SimpleObject[]
}>(), {
  colCount: 2,
});

const emit = defineEmits(['data-changed']);

const cardValue = reactive<Profile>(props.cardData);
const form = ref<InstanceType<typeof DxForm> | null>(null);

function onFieldChange<T extends keyof Profile>(fieldName: T, value: Profile[T]) {
  const { isValid } = form.value?.instance.validate() || {};

  if (!isValid) {
    return;
  }

  if (fieldName) {
    cardValue[fieldName] = value;
  }

  emit('data-changed', cardValue);
}

</script>

<style scoped lang="scss">
@use "@/variables.scss" as *;
@use "sass:math";

.panel {
  @include shadow();

  width: 100%;
  padding: 0 0 var(--content-padding) 0;
  border-radius: 8px;
  background-color: var(--card-background);

  .panel-header {
    padding: 12px var(--content-padding);
    border-bottom: 1px solid var(--border-color);
  }

  .top-item-wrapper {
    display: flex;
  }

  :deep(.dx-field-item) {
    padding-top: calc(var(--content-padding) / 2);
    padding-right: 0;
  }

  .form-container {
    margin: calc(var(--content-padding) * 2) var(--content-padding) 0;
  }
}
</style>
