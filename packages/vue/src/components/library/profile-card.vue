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
        :screen-by-width="getSizeQualifier as any"
        label-location="top"
        label-mode="outside"
        :on-field-data-changed="evt => onFieldChange(evt.dataField as any, evt.value)"
      >
        <dx-item
          v-for="item in computedItems"
          v-memo="[computedItems]"
          :key="item.dataField as string"
          :data-field="item.dataField as string"
          :editor-type="item.editorType as any"
          :editor-options="{
            stylingMode: 'filled',
            valueChangeEvent: 'input',
            ...(item.editorOptions as any || {}),
          }"
          :col-span="item.colSpan as number"
        >
          <dx-label
            v-if="item.label"
            :text="(item.label as string) || ''"
          />
          <dx-validation-rule
            v-for="rule in item.validators"
            :key="rule"
            :type="(rule as any).type"
          />
          <status-select-box
            v-if="item.dataField === 'status'"
            class-list=""
            :items="(item.itemsList as unknown[]) || []"
            :model-value="(cardData as any)[item.dataField as any]"
            styling-mode="filled"
            label-mode="hidden"
            @update:model-value="onFieldChange(item.dataField as any, $event)"
          />
          <pictured-item-select-box
            v-else-if="item.dataField === 'supervisor'"
            :label="(item.label as string) || ''"
            :model-value="(cardData as any)[item.dataField as any]"
            :items="(item.itemsList as any[]) || []"
            @update:model-value="onFieldChange(item.dataField as any, $event)"
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
import {
  reactive, ref, computed,
} from 'vue';

const props = withDefaults(defineProps<{
  title: string,
  cardData: Profile,
  colCount?: number,
  items: SimpleObject[]
}>(), {
  colCount: 2,
  title: '',
});

const emit = defineEmits(['data-changed']);
const computedCardData = reactive({ ...props.cardData });

const computedItems = computed(() => props.items);
const form = ref<InstanceType<typeof DxForm> | null>(null);

function onFieldChange<T extends keyof Profile>(fieldName: T, value: Profile[T]) {
  const { isValid } = form.value?.instance.validate() || {};

  if (!isValid) {
    return;
  }

  if (fieldName) {
    computedCardData[fieldName] = value;
  }

  emit('data-changed', computedCardData);
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
