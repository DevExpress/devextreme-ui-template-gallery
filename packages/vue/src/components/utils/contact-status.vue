<template>
  <span :class="'status contact-status status-' + props.value?.toLowerCase()">
    {{ (props.showText ? props.value : '') }}</span>
</template>

<script setup lang="ts">
import { ContactStatus } from '@/types/contact';

const props = withDefaults(defineProps<{
  value: ContactStatus,
  showText?: boolean
  }>(), {
  showText: true,
});
</script>
<style lang="scss">
.contact-status {
  @mixin status($status-color) {
    color: $status-color;

    &.dx-texteditor-input.status-editor-input {
      color: $status-color;
    }

    &::before {
      background: $status-color;
    }
  }
  &.status-commission {
    @include status(#03a9f4);
  }

  &.status-salaried {
    @include status(#2eb52c);
  }

  &.status-terminated {
    @include status(#de8e8c);
  }
}
</style>
<style scoped lang="scss">
@use 'src/variables' as *;
@use "sass:math";

.contact-status {
  font-size: 13px;

  &::before {
    --diameter: 10px;

    content: " ";
    width: var(--diameter);
    height: var(--diameter);
    border-radius: calc(var(--diameter) / 2);
    margin-right: calc(var(--diameter) / 2);
    display: inline-block;
    align-self: center;
  }

  :deep(&.input) {
    display: block;
    padding: 15px 16px 14px;
  }
}
</style>
