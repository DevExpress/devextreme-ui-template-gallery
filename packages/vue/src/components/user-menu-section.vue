<template>
  <div class="user-info">
    <div
      class="image-container"
      v-if="showAvatar"
    >
      <div
        :style="{
          background: `url(${user?.avatarUrl}) no-repeat #fff`,
          backgroundSize: 'cover',
        }"
        class="user-image"
      />
    </div>
    <div class="user-name">
      {{ user?.name }} {{ user?.lastName }}
    </div>
  </div>
  <dx-list :items="menuItems" />
</template>

<script setup lang="ts">
import DxList from 'devextreme-vue/list';

withDefaults(defineProps<{
  showAvatar: boolean,
  menuItems: Array,
  user: object,
}>(), {
  showAvatar: false,
  menuItems: [],
  user: {},
});

</script>
<style scoped lang="scss">
@use '@/variables.scss' as *;

.user-info {
  display: flex;
  align-items: center;
  cursor: default;
  padding: $list-padding-vertical $list-padding-left;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  .user-name {
    font-size: 16px;
    color: $base-text-color;
  }

  .image-container {
    overflow: hidden;
    border-radius: 50%;
    height: 28px;
    width: 28px;
    margin-right: $list-padding-left;
    border: 1px solid rgba(0, 0, 0, 0.1);

    .user-image {
      width: 100%;
      height: 100%;
    }
  }
}

:deep(.dx-list-item) .dx-icon {
  vertical-align: middle;
  margin-right: 16px;
}

:deep(.dx-rtl) .dx-list-item .dx-icon {
  margin-right: 0;
  margin-left: 16px;
}

</style>
