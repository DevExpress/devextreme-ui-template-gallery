<template>
  <dx-form
    class="plain-styled-form"
    label-mode="floating"
  >
    <dx-form-item item-type="group">
      <dx-col-count-by-screen
        :xs="1"
        :sm="1"
        :md="1"
        :lg="1"
      />
      <dx-form-item class="uploader">
        <div>
          <form-photo-uploader />
        </div>
      </dx-form-item>
    </dx-form-item>

    <dx-form-item item-type="group">
      <dx-col-count-by-screen
        :xs="1"
        :sm="1"
        :md="2"
        :lg="2"
      />
      <dx-form-item>
        <form-textbox
          label="First Name"
          v-model="contact.firstName"
          :is-editing="true"
        />
      </dx-form-item>
      <dx-form-item css-class="accent">
        <form-textbox
          label="Last Name"
          v-model="contact.lastName"
          :is-editing="true"
        />
      </dx-form-item>
      <dx-form-item css-class="accent">
        <form-textbox
          label="Company"
          v-model="contact.company"
          :is-editing="true"
          :validators="[]"
        />
      </dx-form-item>
      <dx-form-item>
        <form-textbox
          label="Position"
          v-model="contact.position"
          :is-editing="true"
          :validators="[]"
        />
      </dx-form-item>
    </dx-form-item>

    <dx-form-item
      item-type="group"
      css-class="contact-fields-group"
    >
      <dx-col-count-by-screen
        :xs="1"
        :sm="1"
        :md="2"
        :lg="2"
      />

      <dx-form-item css-class="accent">
        <form-textbox
          label="Assigned to"
          v-model="contact.manager"
          :is-editing="true"
          :validators="[]"
        />
      </dx-form-item>
      <dx-form-item>
        <form-textbox
          v-model="contact.phone"
          :is-editing="true"
          icon="tel"
          mask="+1(000)000-0000"
          :validators="[]"
        />
      </dx-form-item>
      <dx-form-item>
        <form-textbox
          v-model="contact.email"
          :is-editing="true"
          icon="email"
          :validators="[{type: 'email'}, {type: 'required'}]"
        />
      </dx-form-item>
      <dx-form-item>
        <form-textbox
          v-model="contact.address"
          :is-editing="true"
          icon="home"
          :validators="[]"
        />
      </dx-form-item>
    </dx-form-item>
  </dx-form>
</template>

<script setup lang="ts">
import {
  DxForm,
  DxItem as DxFormItem,
  DxColCountByScreen,
} from 'devextreme-vue/form';
import { ref } from 'vue';
import { newContact } from '@/types/contact';
import FormTextbox from '@/components/form-textbox.vue';
import FormPhotoUploader from './form-photo-uploader.vue';

const contact = ref({ ...newContact });
</script>
