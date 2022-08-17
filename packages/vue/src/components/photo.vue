<template>
  <div class="host">
    <div :style="{
        width: props.size + 'px',
        height: props.size+ 'px',
        'backgroundImage': `url('data:image/png;base64,${props.link}')`
      }"
         class="photo dx-card"
    ></div>
  </div>

</template>

<script setup lang="ts">
import {watch} from "vue";

const props = withDefaults(defineProps<{
  link: string,
  size?: number
}>(), {
  size: 124,
  link: ''
})

watch(
    () => props.link,
    (newVal) => console.log('------link---->', newVal)
)

/*const styles = reactive({
  color: 'red',
  fontSize: '13px'
})*/
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
