<template>
  <div class="user-panel">
    <dx-drop-down-button
      v-if="menuMode === 'context'"
      :items="menuItems"
      styling-mode="text"
      :icon="user?.avatarUrl"
      :show-arrow-icon="false"
      :element-attr="{
        class: 'user-button'
      }"
      :drop-down-options="{
        width: '150'
      }"
    />

    <div v-if="menuMode === 'list'">
      <div class="user-info">
        <div class="image-container">
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { DxDropDownButton } from 'devextreme-vue/drop-down-button';
import DxList from 'devextreme-vue/list';

withDefaults(defineProps<{
  menuMode: string,
  menuItems: Array,
  user: object,
}>(), {
  menuMode: '',
  menuItems: [],
  user: {},
});

</script>
<style scoped lang="scss">
@use '@/variables.scss' as *;

$user-image-height: $toolbar-height;

.dx-toolbar-menu-section .user-panel {
  .user-info {
    padding: 10px 6px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
}

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
    }
  }

  .user-name {
    font-size: 16px;
    color: $base-text-color;
    margin: 0 9px;
  }
}

.user-panel  {
  display: flex;
  flex-direction: column;

  :deep(.dx-list-item) .dx-icon {
    vertical-align: middle;
    color: $base-text-color;
    margin-right: 16px;
  }

  :deep(.dx-rtl) .dx-list-item .dx-icon {
    margin-right: 0;
    margin-left: 16px;
  }

  :deep(.user-button) {
    margin-left: 5px;

    img.dx-icon {
      border-radius: 50%;
      margin: 0;
      width: auto;
      aspect-ratio: 1 / 1;
      box-sizing: border-box;
      border: 2px solid rgba(0, 0, 0, 0.1);
      object-fit: cover;
      object-position: top;
      background: rgb(255, 255, 255);
      background-clip: padding-box;

      .dx-theme-generic & {
        height: $drop-down-gnrc-button-height;
      }

      .dx-theme-material & {
        height: 100%;
      }
    }

    .dx-buttongroup {
      vertical-align: middle;

      .dx-button.dx-button-has-icon:not(.dx-button-has-text) {
        .dx-button-content {
          padding: 0;
        }

        &.dx-state-hover, &.dx-state-focused {
          background-color: transparent;

          img.dx-icon {
            border-color: $accent-color;
          }
        }
      }
    }
  }
}

</style>
