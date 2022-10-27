<template>
  <div class="host">
    <div
      :style="{
        width: props.size + 'px',
        height: props.size+ 'px',
        'backgroundImage': `url('data:image/png;base64,${props.link}')`
      }"
      class="photo dx-card"
    />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  link: string,
  size?: number
}>(), {
  size: 124,
  link: '',
});
</script>

<style scoped lang="scss">
.host {
  position: relative;
  display: flex;

  .photo {

    border-radius: 8px;
    background-repeat: no-repeat;
    background-size: cover;
  }
}
</style>
