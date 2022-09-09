<template>
  <div class="contact-form-container">
    <div class="view-wrapper">
      <dx-toolbar>
        <dx-toolbar-item location="before">
          <dx-button icon="arrowleft" />
        </dx-toolbar-item>
        <dx-toolbar-item
          location="before"
          :text="contactName"/>
        <dx-toolbar-item
          location="after"
          locate-in-menu="auto">
          <dx-button
            text="Terminate"
            type="default"
            styling-mode="contained"/>
        </dx-toolbar-item>
        <dx-toolbar-item
          location="after"
          locate-in-menu="auto"
          widget="dxDropDownButton"
          :options="{
            text:'Actions',
            stylingMode:'text',
            width:120,
            items: ['Assign to Me', 'Archive']
          }"/>
        <dx-toolbar-item
          location="after"
          locate-in-menu="auto">
          <div class="separator" />
        </dx-toolbar-item>
        <dx-toolbar-item
          location="after"
          locate-in-menu="auto"
          widget="dxButton"
          show-text="inMenu"
          :options="{
            text: 'Copy',
            icon: 'copy'
          }"/>
        <dx-toolbar-item
          location="after"
          locate-in-menu="auto"
          widget="dxButton"
          show-text="inMenu"
          :options="{
            text: 'Refresh',
            icon: 'refresh',
            onClick: refresh
          }"/>
      </dx-toolbar>

      <div class="panels">
        <div class="left">
          <contact-form :contact-data="contactData"
                        :is-editing="false"
                        :is-loading="isLoading"/>
        </div>

        <div class="right">
                  <contact-cards :is-loading="isLoading"
                      :contact-name="contactData?.name"
                      :contact-id="contactId"
                      :tasks="contactData?.tasks"
                      :activities="contactData?.activities"
                  />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, provide, ref } from 'vue';
import DxButton from 'devextreme-vue/button';
import {
  DxToolbar,
  DxItem as DxToolbarItem,
} from 'devextreme-vue/toolbar';

import { getContact } from 'dx-rwa-data';
import type { Contact } from '@/types/contact';
import { SimpleSubject } from '@/utils/simple-subject';

import ContactForm from './components/contact-form.vue';
import ContactCards from './components/contact-cards/contact-cards.vue';

const contactId = 12;
const contactName = ref('');
const contactData = ref<Contact | Record<string, unknown>>({});
const isLoading = ref(false);
const refreshNotifier = new SimpleSubject();

provide('refresh-notifier', refreshNotifier);

async function loadData() {
  isLoading.value = true;
  const data = await getContact(contactId);

  contactData.value = data;
  contactName.value = data.name;
  isLoading.value = false;
}

const refresh = () => {
  refreshNotifier.next();
  loadData();
};

onMounted(() => {
  loadData();
});
</script>

<style scoped lang="scss">
@use "@/variables" as *;
@include separator();

.contact-form-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 20px 16px 0 16px;

  &:deep(.dx-toolbar) {
    .dx-toolbar-label > div {
      @include header();
    }
  }

  .view-wrapper {
    flex-direction: column;

    .panels {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 20px;

      .left {
        flex: 1 400px;
      }

      .right {
        flex: 1 calc(100% - 400px - 20px);
        min-width: 360px;
      }
    }
  }
}
</style>
