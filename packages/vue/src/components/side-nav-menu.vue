<template>
  <div
    class="dx-swatch-additional side-navigation-menu"
    @click="forwardClick"
  >
    <slot />
    <div class="menu-container">
      <dx-tree-view
        ref="treeViewRef"
        :items="items"
        key-expr="path"
        selection-mode="single"
        :focus-state-enabled="false"
        expand-event="click"
        @item-click="handleItemClick"
        width="100%"
      />
    </div>
  </div>
</template>

<script>
import DxTreeView from "devextreme-vue/ui/tree-view";
import { sizes } from '../utils/media-query';
import navigation from '../app-navigation';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router'; 

export default {
  props: {
    compactMode: Boolean
  },
  setup(props, context) {
    const route = useRoute();
    const router = useRouter();

    const isLargeScreen = sizes()['screen-large'];
    const items = navigation.map((item) => {
      if(item.path && !(/^\//.test(item.path))){ 
        item.path = `/${item.path}`;
      }
      return {...item, expanded: isLargeScreen} 
    });

    const treeViewRef = ref(null);

    function forwardClick (...args) {
      context.emit("click", args);
    }

    function handleItemClick(e) {
      if (!e.itemData.path || props.compactMode) {
        return;
      }
      router.push(e.itemData.path);

      const pointerEvent = e.event;
      pointerEvent.stopPropagation();
    }

    function updateSelection () {
      if (!treeViewRef.value || !treeViewRef.value.instance) {
        return;
      }

      treeViewRef.value.instance.selectItem(route.path);
      treeViewRef.value.instance.expandItem(route.path);
    }

    onMounted(() => { 
      updateSelection();
      if (props.compactMode) {
        treeViewRef.value.instance.collapseAll();
      }
    });
    

    watch(
      () => route.path,
      () => {
        updateSelection();
      }
    );
    
    watch(
      () => props.compactMode,
      () => {
        if (props.compactMode) {
          treeViewRef.value.instance.collapseAll();
        } else {
          updateSelection();
        }
      }
    );

    return {
      treeViewRef,
      items,
      forwardClick,
      handleItemClick,
      updateSelection
    };
  },
  components: {
    DxTreeView
  }
};
</script>

<style lang="scss">
@import "../dx-styles.scss";
@import "../themes/generated/variables.additional.scss";

.side-navigation-menu {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  height: 100%;
  width: 250px !important;

  .menu-container {
    min-height: 100%;
    display: flex;
    flex: 1;

    .dx-treeview {
      // ## Long text positioning
      white-space: nowrap;
      // ##

      // ## Icon width customization
      .dx-treeview-item {
        padding-left: 0;
        padding-right: 0;

        .dx-icon {
          width: $side-panel-min-width !important;
          margin: 0 !important;
        }
      }
      // ##

      // ## Arrow customization
      .dx-treeview-node {
        padding: 0 0 !important;
      }

      .dx-treeview-toggle-item-visibility {
        right: 10px;
        left: auto;
      }

      .dx-rtl .dx-treeview-toggle-item-visibility {
        left: 10px;
        right: auto;
      }
      // ##

      // ## Item levels customization
      .dx-treeview-node {
        &[aria-level="1"] {
          font-weight: bold;
          border-bottom: 1px solid $base-border-color;
        }

        &[aria-level="2"] .dx-treeview-item-content {
          font-weight: normal;
          padding: 0 $side-panel-min-width;
        }
      }
      // ##
    }

    // ## Selected & Focuced items customization
    .dx-treeview {
      .dx-treeview-node-container {
        .dx-treeview-node {
          &.dx-state-selected:not(.dx-state-focused) > .dx-treeview-item {
            background: transparent;
          }

          &.dx-state-selected > .dx-treeview-item * {
            color: $base-accent;
          }

          &:not(.dx-state-focused) > .dx-treeview-item.dx-state-hover {
            background-color: lighten($base-bg, 4);
          }
        }
      }
    }

    .dx-theme-generic .dx-treeview {
      .dx-treeview-node-container
        .dx-treeview-node.dx-state-selected.dx-state-focused
        > .dx-treeview-item
        * {
        color: inherit;
      }
    }
    // ##
  }
}
</style>
