<template>
  <div
    class="dx-swatch-additional side-navigation-menu"
    @click="forwardClick"
  >
    <slot />
    <div class="menu-container theme-dependent">
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
    <app-footer />
  </div>
</template>

<script setup lang="ts">
import DxTreeView from 'devextreme-vue/tree-view';
import { sizes } from '@/utils/media-query';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { navigation } from '@/app-navigation';
import AppFooter from '@/components/library/app-footer.vue';

const route = useRoute();
const router = useRouter();

const isLargeScreen = sizes()['screen-large'];
const items = navigation.map((item) => {
  if (item.path && !(/^\//.test(item.path))) {
    // eslint-disable-next-line no-param-reassign
    item.path = `/${item.path}`;
  }
  return { ...item, expanded: isLargeScreen };
});

const treeViewRef = ref<InstanceType<typeof DxTreeView> | null>(null);

const props = defineProps<{
  compactMode: boolean,
}>();

const emit = defineEmits(['click']);

function forwardClick(...args: unknown[]) {
  emit('click', args);
}

function handleItemClick(e) {
  if (!e.itemData.path || props.compactMode) {
    return;
  }
  router.push(e.itemData.path);

  e.event.stopPropagation();
}

function updateSelection() {
  if (!treeViewRef.value || !treeViewRef.value.instance) {
    return;
  }

  treeViewRef.value.instance.selectItem(route.path);
  treeViewRef.value.instance.expandItem(route.path);
}

onMounted(() => {
  updateSelection();
  if (props.compactMode) {
    treeViewRef?.value?.instance.collapseAll();
  }
});

watch(
  () => route.path,
  updateSelection,
);

watch(
  () => props.compactMode,
  () => {
    if (props.compactMode) {
      treeViewRef.value?.instance.collapseAll();
    } else {
      updateSelection();
    }
  },
);
</script>

<style scoped lang="scss">
@use "@/variables" as *;
.side-navigation-menu {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  height: 100%;
  width: 250px !important;

  &:deep(.menu-container) {
    min-height: 100%;
    display: flex;
    flex: 1;
    background-color: var(--side-panel-background);
    padding-top: var(--toolbar-vertical-padding);
    padding-bottom: var(--footer-height);
    .dx-treeview {
      // ## Long text positioning
      white-space: nowrap;
      // ##
      // ## Icon width customization
      .dx-treeview-item {
        padding-left: 0;
        flex-direction: row-reverse;
        border-radius: 0;

        .dx-icon {
          width: var(--side-panel-min-width) !important;
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
          border-bottom: 1px solid var(--border-color);
        }
        &[aria-level="2"] .dx-treeview-item-content {
          font-weight: normal;
          padding: 0 0 0 var(--side-panel-min-width);
        }
      }
      // ##
    }
    // ##
  }
}
</style>
