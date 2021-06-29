<template>
  <div class="side-nav-inner-toolbar">
    <dx-drawer
      class="drawer"
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
      <div class="container">
        <header-toolbar
          :menu-toggle-enabled="headerMenuTogglerEnabled"
          :toggle-menu-func="toggleMenu"
        />
        <dx-scroll-view ref="scrollViewRef" class="layout-body with-footer">
          <slot />
          <slot name="footer" />
        </dx-scroll-view>
      </div>
      <template #menuTemplate>
        <side-nav-menu
          :compact-mode="!menuOpened"
          @click="handleSideBarClick"
        >
          <dx-toolbar id="navigation-header">
            <dx-item v-if="!isXSmall" location="before" css-class="menu-button">
              <template #default>
              <dx-button
                icon="menu"
                styling-mode="text"
                @click="toggleMenu"
              />
              </template>
            </dx-item>
            <dx-item location="before" css-class="header-title dx-toolbar-label">
              <template #default>
                <div>{{ title }}</div>
                </template>
            </dx-item>
          </dx-toolbar>
        </side-nav-menu>
      </template>
    </dx-drawer>
  </div>
</template>

<script>
import DxButton from "devextreme-vue/button";
import DxDrawer from "devextreme-vue/drawer";
import DxScrollView from "devextreme-vue/scroll-view";
import DxToolbar, { DxItem } from "devextreme-vue/toolbar";

import HeaderToolbar from "../components/header-toolbar";
import SideNavMenu from "../components/side-nav-menu";
import menuItems from "../app-navigation";
import { ref, watch, computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
  props: {
    title: String,
    isXSmall: Boolean,
    isLarge: Boolean
  },
  setup(props) {
    const route = useRoute();
    
    const scrollViewRef = ref(null);
    const menuOpened = ref(props.isLarge);
    const menuTemporaryOpened = ref(false);

    function toggleMenu (e) {
      const pointerEvent = e.event;
      pointerEvent.stopPropagation();
      if (menuOpened.value) {
        menuTemporaryOpened.value = false;
      }

      menuOpened.value = !menuOpened.value;
    }

    function handleSideBarClick () {
      if (menuOpened.value === false) {
        menuTemporaryOpened.value = true;
      }

      menuOpened.value = true;
    }

    const drawerOptions = computed(() => {
      const shaderEnabled = !props.isLarge;

      return {
        menuMode: props.isLarge ? "shrink" : "overlap",
        menuRevealMode: props.isXSmall ? "slide" : "expand",
        minMenuSize: props.isXSmall ? 0 : 60,
        maxMenuSize: props.isXSmall ? 250 : undefined,
        closeOnOutsideClick: shaderEnabled,
        shaderEnabled
      };
    });

    const headerMenuTogglerEnabled = computed(() => {
      return props.isXSmall;
    });

    watch(
      () => props.isLarge,
      () => {
        if (!menuTemporaryOpened.value) {
          menuOpened.value = props.isLarge;
        }
      }
    );
    
    watch(
      () => route.path,
      () => {
        if (menuTemporaryOpened.value || !props.isLarge) {
          menuOpened.value = false;
          menuTemporaryOpened.value = false;
        }
        scrollViewRef.value.instance.scrollTo(0);
      }
    );

    return {
      scrollViewRef,
      menuOpened,
      drawerOptions,
      menuItems,
      headerMenuTogglerEnabled,
      toggleMenu,
      handleSideBarClick
    };
  },
  components: {
    DxButton,
    DxDrawer,
    DxScrollView,
    DxToolbar,
    DxItem,
    HeaderToolbar,
    SideNavMenu
  }
};
</script>

<style lang="scss">
.side-nav-inner-toolbar {
  width: 100%;
}

.container {
  height: 100%;
  flex-direction: column;
  display: flex;
}

.layout-body {
  flex: 1;
  min-height: 0;
}

.content {
  flex-grow: 1;
}

#navigation-header {
  @import "../themes/generated/variables.additional.scss";
  background-color: $base-accent;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  .menu-button .dx-icon {
    color: $base-text-color;
  }

  .screen-x-small & {
    padding-left: 20px;
  }

  .dx-theme-generic & {
    padding-top: 10px;
    padding-bottom: 10px;
  }
}
</style>
