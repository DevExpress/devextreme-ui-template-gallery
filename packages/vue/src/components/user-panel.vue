<template>
  <div class="user-panel">
    <dx-drop-down-button
      v-if="menuMode === 'context'"
      :items="menuItems"
      styling-mode="text"
      width="150"
      :icon="user?.avatarUrl"
      :text="`${user?.name} ${user?.lastName}`"
      :show-arrow-icon="false"
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
  :deep(.dx-list-item) .dx-icon {
    vertical-align: middle;
    color: $base-text-color;
    margin-right: 16px;
  }

  :deep(.dx-rtl) .dx-list-item .dx-icon {
    margin-right: 0;
    margin-left: 16px;
  }

  :deep(.dx-dropdownbutton:not(.dx-dropdownbutton-has-arrow)) {
    margin-left: 5px;
    height: 100%;

    img.dx-icon {
      border-radius: 50%;
      margin: 0 4px;
      height: 26px;
      width: 26px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      object-fit: cover;
      object-position: top;
      background: rgb(255, 255, 255);
    }

    .dx-buttongroup {
      vertical-align: middle;

      .dx-button-has-icon.dx-button-has-text {
        justify-content: center;

        .dx-button-content {
          padding: 0;
        }

        .dx-button-text {
          text-transform: none;
          font-size: 16px;
          color: $base-text-color;
          font-weight: 400;
          letter-spacing: normal;
          margin: 0 9px;
        }
      }
    }
  }
}

</style>
