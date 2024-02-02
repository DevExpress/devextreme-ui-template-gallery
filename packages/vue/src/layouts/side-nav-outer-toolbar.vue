<template>
  <div class="side-nav-outer-toolbar">
    <app-header
      class="layout-header"
      :menu-toggle-enabled="true"
      :toggle-menu-func="toggleMenu"
      :title="title"
    />
    <dx-drawer
      class="layout-body"
      position="before"
      template="menuTemplate"
      v-model:opened="menuOpened"
      :opened-state-mode="drawerOptions.menuMode"
      :reveal-mode="drawerOptions.menuRevealMode"
      :min-size="drawerOptions.minMenuSize"
      :max-size="drawerOptions.maxMenuSize"
      :shading="drawerOptions.shaderEnabled"
      :close-on-outside-click="drawerOptions.closeOnOutsideClick"
    >
      <slot />
      <template #menuTemplate>
        <side-navigation-menu
          :compact-mode="!menuOpened"
          @click="handleSideBarClick"
        />
      </template>
    </dx-drawer>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { DxDrawer } from 'devextreme-vue';
import { DxButtonTypes } from 'devextreme-vue/button';
import AppHeader from '@/components/library/app-header.vue';
import SideNavigationMenu from '@/components/library/side-navigation-menu.vue';

const props = withDefaults(defineProps<{
  title: string,
  isXSmall: boolean,
  isLarge: boolean,
}>(), {
  title: '',
});

const route = useRoute();
const menuOpened = ref(props.isLarge);
const menuTemporaryOpened = ref(false);

watch(
  () => props.isLarge,
  () => {
    if (!menuTemporaryOpened.value) {
      menuOpened.value = props.isLarge;
    }
  },
);

watch(
  () => route.path,
  () => {
    if (menuTemporaryOpened.value || !props.isLarge) {
      menuOpened.value = false;
      menuTemporaryOpened.value = false;
    }
  },
);

function toggleMenu({ event }: DxButtonTypes.ClickEvent) {
  event?.stopPropagation();

  if (menuOpened.value) {
    menuTemporaryOpened.value = false;
  }
  menuOpened.value = !menuOpened.value;
}

function handleSideBarClick() {
  if (menuOpened.value === false) {
    menuTemporaryOpened.value = true;
  }
  menuOpened.value = true;
}

const drawerOptions = computed(() => {
  const shaderEnabled = !props.isLarge;

  return {
    menuMode: props.isLarge ? 'shrink' : 'overlap',
    menuRevealMode: props.isXSmall ? 'slide' : 'expand',
    minMenuSize: props.isXSmall ? 0 : 48,
    maxMenuSize: props.isXSmall ? 250 : undefined,
    closeOnOutsideClick: shaderEnabled,
    shaderEnabled,
  };
});
</script>

<style scoped lang="scss">
@use '@/variables' as *;

.side-nav-outer-toolbar {
  flex-direction: column;
  display: flex;
  height: 100%;
  width: 100%;
}

.layout-header {
  z-index: 1501;
}

.layout-body {
  flex: 1;
  min-height: 0;
  background-color: var(--background-color);
}

.content {
  flex-grow: 1;
}
</style>
