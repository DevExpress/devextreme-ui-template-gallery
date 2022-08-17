<template>
  <div class="contact-form-container">
    <div class="view-wrapper">
      <dx-toolbar>
        <dx-toolbar-item location="before">
          <dx-button icon="arrowleft"></dx-button>
        </dx-toolbar-item>
        <dx-toolbar-item  location="before" :text="contactName"></dx-toolbar-item >
        <dx-toolbar-item  location="after" locateInMenu="auto">
          <dx-button
              text="Terminate"
              type="default"
              stylingMode="contained"
          ></dx-button>
        </dx-toolbar-item >
        <dx-toolbar-item  location="after" locateInMenu="auto"
                          widget="dxDropDownButton"
                          :options="{
        text:'Action',
      stylingMode:'text',
      width:120,
      items: ['Assign to Me', 'Archive']
      }">

        </dx-toolbar-item >
        <dx-toolbar-item  location="after" locateInMenu="auto">
          <div class="separator"></div>
        </dx-toolbar-item>

        <dx-toolbar-item
            location="after"
            locateInMenu="auto"
            widget="dxButton"
            showText="inMenu"
            :options="{
        text: 'Copy',
        icon: 'copy'
      }"
        ></dx-toolbar-item>

        <dx-toolbar-item
            location="after"
            locateInMenu="auto"
            widget="dxButton"
            showText="inMenu"
            :options="{
        text: 'Refresh',
        icon: 'refresh',
        onClick: refresh
      }"
        ></dx-toolbar-item>
      </dx-toolbar>

      <div class="panels">
        <!--      <div class="left">
                <contact-form [contactData]="contactData$"></contact-form>
              </div>-->

        <div class="right">
          <!--        <contact-cards
                      [contactName]="(contactData$ | async)?.name"
                      [tasks]="(contactData$ | async)?.tasks"
                      [activities]="(contactData$ | async)?.activities"
                      [activeOpportunities]="activeOpportunities"
                      [closedOpportunities]="closedOpportunities"
                      [notes]="contactNotes"
                      [messages]="contactMessages"
                  ></contact-cards>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';

import DxButton from 'devextreme-vue/button';
import {
DxToolbar ,
    DxItem as DxToolbarItem,
} from "devextreme-vue/toolbar";

const contactName = ref('');

const refresh = () => {
 loadData();
};

function loadData() {

}

</script>

<style  lang="scss">
@use "@/variables" as *;

@include separator();

.contact-form-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 20px 16px 0 16px;

  .dx-toolbar {
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
