<template>
  <div class="user-panel">
    <div class="user-info">
      <div class="image-container">
        <div class="user-image" />
      </div>
      <div class="user-name">{{user?.name}} {{user?.lastName}}</div>
    </div>

    <dx-context-menu
      v-if="menuMode === 'context'"
      target=".user-button"
      :items="menuItems"
      :width="210"
      show-event="dxclick"
      css-class="user-menu"
    >
      <dx-position my="top center" at="bottom center" />
    </dx-context-menu>

    <dx-list v-if="menuMode === 'list'"
             class="dx-toolbar-menu-action"
             :items="menuItems" />
  </div>
</template>

<script setup lang="ts">
import DxContextMenu, { DxPosition } from 'devextreme-vue/context-menu';
import DxList from 'devextreme-vue/list';

defineProps({
  menuMode: String,
  menuItems: Array,
  user: Object,
});
</script>
<style></style>
<style scoped lang="scss">
@use '@/variables.scss' as *;

$user-image-height: $toolbar-height;

.user-info {
  display: flex;
  align-items: center;

  .image-container {
    overflow: hidden;
    border-radius: 50%;
    height: 28px;
    width: 28px;
    margin: 0 4px;
    border: 1px solid rgba(0, 0, 0, 0.1);

    .user-image {
      width: 100%;
      height: 100%;
      background: url("https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/01.png") no-repeat #fff;
      background-size: cover;
    }
  }

  .user-name {
    font-size: 16px;
    color: $base-text-color;
    margin: 0 9px;
  }
}

.user-panel  {
  :deep(.dx-list-item) .dx-icon {
    vertical-align: middle;
    color: $base-text-color;
    margin-right: 16px;
  }

  :deep(.dx-rtl) .dx-list-item .dx-icon {
    margin-right: 0;
    margin-left: 16px;
  }
}

:deep(.dx-context-menu.user-menu) {
  &.dx-rtl {
    .dx-submenu .dx-menu-items-container .dx-icon {
      margin-left: 16px;
    }
  }

  .dx-submenu .dx-menu-items-container .dx-icon {
    margin-right: 16px;
  }

  .dx-menu-item .dx-menu-item-content {
    padding: 3px 15px 4px;
  }
}

.dx-theme-generic .user-menu .dx-menu-item-content .dx-menu-item-text {
  padding-left: 4px;
  padding-right: 4px;
}
</style>
