<template>
  <div class="form-item-plain">
    <i v-if="icon" class="dx-icon" :class="{['dx-icon-' + icon]: icon}"></i>
    <template v-if="!isEditing">
      <div class="form-item-plain-wrapper"
           :class="{'with-label':!icon}">
        <label v-if="!icon" class="dx-texteditor-label">{{ label }}</label>

        <slot name="valueTpl">
          <span class="form-item-plain-value">{{ renderedValue ? renderedValue : value }}</span>
        </slot>
      </div>
    </template>

    <div v-show="isEditing" class="form-item-plain-editor-wrapper">
      <slot name="editorTpl">
        <dx-text-box
          :label="icon ? '' : label"
          :value="value"
          @valueChange="onChangeValue"
          :mask="mask"
        ></dx-text-box>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DxTextBox } from 'devextreme-vue/text-box';

const props = defineProps<{
  value?: string | number | Date,
  isEditing: boolean,
  label?: string,
  icon?: string,
  mask?: string,
  renderedValue?: string | number | Date,
  editorTpl?: any
  valueTpl?: any
}>();
const emit = defineEmits(['valueChange']);
const onChangeValue = (e: any) => emit(e);
</script>
<style scoped lang="scss">
@use "@/variables" as *;

.form-item-plain {
  display: flex;
  width: 100%;
  gap: 5px;

  &.accent {
    .form-item-plain-value {
      color: $base-accent;
    }
  }

  .dx-icon {
    display: flex;
    align-items: center;
  }

  dx-text-box {
    flex: 1;
  }

  .form-item-plain-wrapper {
    position: relative;
    padding: 9px 11px 8px;
    block-size: 32.2px;
    flex: 1;

    .form-item-plain-value {
      font-size: 13px;
    }

    &.with-label {
      padding-top: 15px;
      padding-bottom: 1px;

      .dx-texteditor-label {
        top: 4px;
        height: 11px;
        line-height: 11px;
        padding-left: 11px;
      }
    }
  }

  .form-item-plain-editor-wrapper {
    flex: 1;
  }
}
</style>
