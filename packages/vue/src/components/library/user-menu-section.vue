<template>
  <div class="user-info">
    <div
      class="image-container"
      v-if="showAvatar"
    >
      <div
        :style="{
          backgroundImage: `url(${user?.avatarUrl})`,
        }"
        class="user-image"
      />
    </div>
    <div class="user-name">
      {{ user?.name }} {{ user?.lastName }}
    </div>
  </div>
  <dx-list
    ref="userInfoListRef"
    :items="menuItems"
    @item-click="onItemClick"
    :element-attr="{
      class: 'user-info-list',
    }"
  />
</template>

<script setup lang="ts">
import DxList from 'devextreme-vue/list';
import { ref } from 'vue';

withDefaults(defineProps<{
  showAvatar: boolean,
  menuItems: Array,
  user: object,
}>(), {
  showAvatar: false,
  menuItems: [],
  user: {},
});

const userInfoListRef = ref(null);
const onItemClick = ({ itemData }) => itemData.onClick();

function focusList() {
  userInfoListRef.value.instance.focus();
}

defineExpose({ focusList });

</script>
<style scoped lang="scss">
@use '@/variables.scss' as *;

.user-info {
  display: flex;
  align-items: center;
  cursor: default;
  padding: var(--list-padding-vertical) var(--list-padding-left);
  border-bottom: 1px solid var(--border-color);

  .user-name {
    font-size: 14px;
    color: var(--base-text-color);
  }

  .image-container {
    overflow: hidden;
    border-radius: 50%;
    height: 28px;
    width: 28px;
    margin-right: var(--list-padding-left);
    border: 1px solid var(--border-color);

    .user-image {
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-color: #fff;
      background-size: cover;
    }
  }
}

.dx-list.user-info-list.dx-scrollable.dx-widget {
  height: auto;
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
