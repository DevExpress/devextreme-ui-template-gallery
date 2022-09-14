<template>
  <header class="header-component">
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
          :options="{
        stylingMode: 'outlined',
        mode: 'search',
        placeholder: 'Search',
        width: 180
      }"
      ></dx-item>
      <dx-item
          location="after">
        <div class="messages">
          <i class="dx-icon-message"></i>
        </div>
      </dx-item>
      <dx-item
        location="after"
        locate-in-menu="auto"
        menu-item-template="menuUserItem"
      >
      <template #default>
          <div>
            <dx-button
              class="user-button authorization"
              :width="160"
              height="100%"
              styling-mode="text"
            >
              <user-panel :user="user" :menu-items="userMenuItems" menu-mode="context" />
            </dx-button>
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
import { authInfo as auth } from '../auth';

import UserPanel from './user-panel.vue';

const router = useRouter();
const route = useRoute();

const user = ref({});

defineProps<{
  menuToggleEnabled: boolean,
    title: string,
    toggleMenuFunc:(e: unknown) => void,
}>();

auth.getUser().then((e: unknown) => {
  user.value = e.data;
});

function onLogoutClick() {
  auth.logOut();
  router.push({
    path: '/login-form',
    query: { redirect: route.path },
  });
}

function onProfileClick() {
  /* router.push({
    path: "/profile",
    query: { redirect: route.path }
  }); */
}

const userMenuItems = [{
  text: 'Profile',
  icon: 'user',
  onClick: onProfileClick,
},
{
  text: 'Logout',
  icon: 'runner',
  onClick: onLogoutClick,
}];
</script>

<style lang="scss">
@use "../variables" as *;

.header-component {
  flex: 0 0 auto;
  z-index: 1;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05), 0 0 4px rgba(0, 0, 0, 0.15);

  .dx-toolbar {
    &.header-toolbar .dx-toolbar-items-container .dx-toolbar-after {
      padding: 0 40px;

      .screen-x-small & {
        padding: 0 20px;
      }
    }

    .dx-toolbar-item.dx-toolbar-button.menu-button {
      width: $side-panel-min-width;
      text-align: center;
      padding: 0;
    }

    .dx-toolbar-item.menu-button > .dx-toolbar-item-content {
      .dx-icon {
        color: $base-accent;
      }
    }

    .messages {
      padding-left: 10px;
      position: relative;

      .dx-icon-message {
        font-size: 24px;
      }

      ::after {
        display: block;
        position: absolute;
        width: 18px;
        height: 18px;
        background-color: red;
        border-radius: 50%;
        right: -6px;
        top: -6px;
        font-size: 12px;
        font-weight: bold;
        content: "4";
        color: white;
        padding: 2px 6px;
      }
    }

    .user-button.authorization {
      margin-left: 10px;
    }
  }
}

.header-title .dx-item-content {
  color: $base-accent;
  padding: 0;
  margin: 0;
}

.dx-theme-generic {
 .layout-header .dx-toolbar {
    padding: 10px 0;
  }

  .user-button > .dx-button-content {
    padding: 5px;
  }
}

.dx-scrollable-content {
  > .dx-treeview-node-container:first-child {
    > .dx-treeview-node:first-child {
      > .dx-treeview-item {
        box-shadow: inset 0 4px 8px rgb(0, 0, 0, 0.05);

        .screen-large & {
          box-shadow: none;
        }
      }
    }
  }
}
</style>
