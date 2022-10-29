<template>
  <div class="view-wrapper">
    <dx-toolbar>
      <dx-toolbar-item location="before">
        <dx-button icon="arrowleft" />
      </dx-toolbar-item>
      <dx-toolbar-item
        :text="contactName"
        location="before"
        css-class="contact-name-toolbar-item"
      />
      <dx-toolbar-item
        location="after"
        locate-in-menu="auto"
      >
        <dx-button
          text="Terminate"
          type="default"
          styling-mode="contained"
        />
      </dx-toolbar-item>
      <dx-toolbar-item
        widget="dxDropDownButton"
        location="after"
        locate-in-menu="auto"
        :options="{
          text:'Actions',
          stylingMode:'text',
          width:120,
          items: ['Assign to Me', 'Archive']
        }"
      />
      <dx-toolbar-item
        location="after"
        locate-in-menu="auto"
      >
        <div class="separator" />
      </dx-toolbar-item>
      <dx-toolbar-item
        widget="dxButton"
        location="after"
        locate-in-menu="auto"
        show-text="inMenu"
        :options="{
          text: 'Copy',
          icon: 'copy'
        }"
      />
      <dx-toolbar-item
        widget="dxButton"
        location="after"
        locate-in-menu="auto"
        show-text="inMenu"
        :options="{
          text: 'Refresh',
          icon: 'refresh',
          onClick: refresh
        }"
      />
    </dx-toolbar>

    <div class="panels">
      <div class="left">
        <contact-form
          :contact-data="contactData"
          :is-editing="false"
          :is-loading="isLoading && !contactData.name"
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
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { DxButton } from 'devextreme-vue/button';
import {
  DxToolbar,
  DxItem as DxToolbarItem,
} from 'devextreme-vue/toolbar';
// eslint-disable-next-line import/no-unresolved
import { getContact } from 'dx-rwa-data';
import type { Contact } from '@/types/contact';

import ContactForm from './components/contact-form.vue';
import ContactCards from './components/contact-cards/contact-cards.vue';

const contactId = 12;
const contactName = ref('');
const contactData = ref<Contact | Record<string, unknown>>({});
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
</script>

<style scoped lang="scss">
@use "@/variables" as *;
@include separator();

$left-panel-width: 400px;
$right-panel-width: 360px;

@media only screen and (max-width: 875px) {
  :deep(.contact-name-toolbar-item) {
    min-width: calc(#{$left-panel-width} + #{$right-panel-width} - 145px);
  }
}

.dx-toolbar {
  margin-bottom: calc(#{$toolbar-margin-bottom} / 2);

  :deep(.dx-toolbar-label > div) {
    @include header();
  }
}

.view-wrapper {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 20px 16px 0 16px;

  .panels {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;

    .left {
      flex: 1 $left-panel-width;
      margin-top: 8px;
    }

    .right {
      flex: 1 calc(100% - #{$left-panel-width} - 20px);
      margin-top: 8px;
      min-width: 360px;
    }
  }
}

</style>
