<template>
  <dx-scroll-view class="view-wrapper-scroll">
    <div class="view-wrapper">
      <dx-toolbar class="toolbar-details theme-dependent">
        <dx-toolbar-item location="before">
          <dx-button
            icon="arrowleft"
            styling-mode="text"
          />
        </dx-toolbar-item>
        <dx-toolbar-item
          location="before"
          :text="contactName"
          class="contact-name-toolbar-item"
        />
        <dx-toolbar-item
          location="after"
          locate-in-menu="auto"
        >
          <div>
            <dx-button
              text="Terminate"
              type="default"
              styling-mode="contained"
            />
          </div>
        </dx-toolbar-item>
        <dx-toolbar-item
          location="after"
        >
          <dx-drop-down-button
            text="Actions"
            :drop-down-options="{ width: 'auto' }"
            styling-mode="text"
          >
            <dx-drop-down-item text="Assign to Me" />
            <dx-drop-down-item text="Archive" />
          </dx-drop-down-button>
        </dx-toolbar-item>
        <dx-toolbar-item
          location="after"
          locate-in-menu="auto"
        >
          <div>
            <div class="separator" />
          </div>
        </dx-toolbar-item>
        <dx-toolbar-item
          location="after"
          locate-in-menu="auto"
          widget="dxButton"
          show-text="inMenu"
          :options="copyOptions"
        />
        <dx-toolbar-item
          location="after"
          locate-in-menu="auto"
          widget="dxButton"
          show-text="inMenu"
          :options="refreshOptions"
        />
      </dx-toolbar>

      <div class="panels">
        <div class="left">
          <contact-form
            :contact-data="contactData"
            :is-editing="false"
            :is-loading="isLoading"
          />
        </div>

        <div class="right">
          <contact-cards
            :is-loading="isLoading"
            :contact-name="contactData?.name"
            :contact-id="contactId"
            :tasks="contactData?.tasks"
            :activities="contactData?.activities"
          />
        </div>
      </div>
    </div>
  </dx-scroll-view>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { DxScrollView } from 'devextreme-vue/scroll-view';
import { DxButton } from 'devextreme-vue/button';
import { DxDropDownButton, DxItem as DxDropDownItem } from 'devextreme-vue/drop-down-button';
import {
  DxToolbar,
  DxItem as DxToolbarItem,
} from 'devextreme-vue/toolbar';
// eslint-disable-next-line import/no-unresolved
import { getContact } from 'dx-template-gallery-data';
import type { Contact } from '@/types/contact';

import ContactForm from '@/components/library/contact-form.vue';
import ContactCards from '@/components/utils/contact-cards.vue';

const contactId = 12;
const contactName = ref('');
const contactData = ref<Contact>();
const isLoading = ref(false);

async function loadData() {
  isLoading.value = true;
  const data = await getContact(contactId);

  contactData.value = data;
  contactName.value = data.name;
  isLoading.value = false;
}

const refresh = () => {
  loadData();
};

onMounted(() => {
  loadData();
});

const copyOptions = {
  text: 'Copy',
  icon: 'copy',
  stylingMode: 'text',
};

const refreshOptions = {
  text: 'Refresh',
  icon: 'refresh',
  onClick: refresh,
  stylingMode: 'text',
};
</script>

<style scoped lang="scss">
@use "@/variables" as *;
@use "sass:math";

@media only screen and (max-width: 875px) {
  :deep(.contact-name-toolbar-item) {
    min-width: calc(var(--left-panel-width) + var(--right-panel-width) - 145px);
  }
}

.dx-toolbar {
  margin-bottom: calc(var(--toolbar-margin-bottom) / 2);

  :deep(.dx-toolbar-label > div) {
    @include header();
  }
}

.view-wrapper {
  --left-panel-width: 400px;
  --right-panel-width: 360px;

  padding-top: var(--content-padding);
  padding-bottom: var(--content-padding);

  .panels {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;

    .left {
      flex: 1 var(--left-panel-width);
      margin-top: 8px;
    }

    .right {
      flex: 1 calc(100% - var(--left-panel-width) - 20px);
      margin-top: 8px;
      min-width: 340px;
    }
  }
}
</style>
