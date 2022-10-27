<template>
  <span :class="'status status-' + props.status?.toLowerCase()">
    {{ (props.status || '') }}</span>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
    status: string
  }>(), {
  status: '',
});
</script>

<style scoped lang="scss">
@use 'src/variables' as *;
@use "sass:math";

span.status {
  @mixin status($status-color) {
    color: $status-color;

    &::before {
      background: $status-color;
    }
  }

  font-size: 13px;

  &::before {
    $diameter: 10px;

    content: " ";
    width: $diameter;
    height: $diameter;
    border-radius: math.div($diameter, 2);
    margin-right: math.div($diameter, 2);
    display: inline-block;
  }

  &.input {
    display: block;
    padding: 15px 16px 14px;
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
