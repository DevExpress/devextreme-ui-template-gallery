<template>
  <header>
    <dx-toolbar class="header-toolbar">
      <dx-item
        :visible="menuToggleEnabled"
        location="before"
        css-class="menu-button"
      >
        <template #default>
          <dx-button
            icon="menu"
            styling-mode="text"
            @click="toggleMenuFunc"
          />
        </template>
      </dx-item>

      <dx-item
        v-if="title"
        location="before"
        css-class="header-title dx-toolbar-label"
      >
        <div>{{ title }}</div>
      </dx-item>
      <dx-item
        location="after"
        locate-in-menu="auto"
        widget="dxTextBox"
        css-class="global-search-box"
        :options="{
          stylingMode: 'filled',
          mode: 'search',
          placeholder: 'Search',
          width: 180,
        }"
      />
      <dx-item
        location="after"
        locate-in-menu="never"
      >
        <theme-switcher />
      </dx-item>
      <dx-item location="after">
        <div class="messages">
          <dx-button
            icon="belloutline"
            styling-mode="text"
          />
          <div class="dx-badge">
            4
          </div>
        </div>
      </dx-item>
      <dx-item
        location="after"
        locate-in-menu="auto"
        menu-item-template="menuUserItem"
      >
        <template #default>
          <div>
            <user-panel
              :user="user"
              :menu-items="userMenuItems"
              menu-mode="context"
            />
          </div>
        </template>
      </dx-item>

      <template #menuUserItem>
        <user-panel
          :user="user"
          :menu-items="userMenuItems"
          menu-mode="list"
        />
      </template>
    </dx-toolbar>
  </header>
</template>

<script setup lang="ts">
import { DxButton } from 'devextreme-vue/button';
import { DxToolbar, DxItem } from 'devextreme-vue/toolbar';
import { useRouter, useRoute } from 'vue-router';
import { ref } from 'vue';

import { authInfo as auth, AuthUser } from '../../auth';
import ThemeSwitcher from './theme-switcher.vue';
import UserPanel from './user-panel.vue';

const router = useRouter();
const route = useRoute();

const user = ref<Record<string, unknown> | unknown>({});

defineProps<{
  menuToggleEnabled: boolean,
    title: string,
    toggleMenuFunc:(e: unknown) => void,
}>();

auth.getUser().then((e: AuthUser) => {
  user.value = e.data;
});

function onLogoutClick() {
  auth.logOut();
  router.push({
    path: '/login',
    query: { redirect: route.path },
  });
}

const userMenuItems = [
  {
    text: 'Logout',
    icon: 'runner',
    onClick: onLogoutClick,
  }];
</script>
<style scoped lang="scss">
@use "@/variables" as *;

header {
  flex: 0 0 auto;
  z-index: 1;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05), 0 0 4px rgba(0, 0, 0, 0.15);
  padding: var(--header-toolbar-vertical-padding) 0;
  background-color: var(--base-bg);

  .header-toolbar {
    padding-right: var(--content-padding);

    :deep(.global-search-box){
      padding-right: 11px;
    }

    .messages {
      position: relative;

      .dx-badge {
        position: absolute;
        background-color: red;
        color: white;
        right: -10%;
        top: -10%;
        font-size: 12px;
        display: flex;
        align-items: center;
        border-radius: 10px;
        justify-content: center;
      }
    }

    :deep(.dx-toolbar-item.menu-button) {
      width: var(--side-panel-min-width);
      text-align: center;
      padding: 0;
    }
  }
}
</style>
