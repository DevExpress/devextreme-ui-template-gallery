<template>
  <div class="user-panel">
    <dx-drop-down-button
      v-if="menuMode === 'context'"
      styling-mode="text"
      :icon="user?.avatarUrl"
      :show-arrow-icon="false"
      :element-attr="{
        class: 'user-button'
      }"
      :drop-down-options="{
        width: '150'
      }"
      drop-down-content-template="dropDownContentTemplate"
      @content-ready="handleDropDownButtonContentReady"
    >
      <template #dropDownContentTemplate="{ }">
        <user-menu-section
          :menu-items="menuItems"
          :user="user"
          :show-avatar="false"
          ref="userMenuSection"
        />
      </template>
    </dx-drop-down-button>

    <div v-if="menuMode === 'list'">
      <user-menu-section
        :menu-items="menuItems"
        :user="user"
        :show-avatar="true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { DxDropDownButton, DxDropDownBox } from 'devextreme-vue';
import { ref } from 'vue';
import UserMenuSection from './user-menu-section.vue';

withDefaults(defineProps<{
  menuMode: string,
  menuItems: Array<unknown>,
  user: object,
}>(), {
  menuMode: '',
  menuItems: () => [],
  user: () => ({}),
});

const userMenuSectionRef = ref<InstanceType<typeof UserMenuSection>>(null);

function handleDropDownButtonContentReady({ component }: {component: typeof DxDropDownBox}) {
  component.registerKeyHandler('downArrow', () => {
    userMenuSectionRef.value?.focusList();
  });
}

</script>
<style scoped lang="scss">
@use '@/variables.scss' as *;

.user-panel  {
  display: flex;
  flex-direction: column;

  :deep(.user-button) {
    margin-left: 5px;

    img.dx-icon {
      border-radius: 50%;
      margin: 0;
      width: auto;
      aspect-ratio: 1 / 1;
      box-sizing: border-box;
      border: 2px solid $border-color;
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

        &.dx-state-hover,
        &.dx-state-focused {
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
