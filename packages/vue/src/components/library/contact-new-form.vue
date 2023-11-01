<template>
  <dx-form
    class="plain-styled-form"
    :screen-by-width="getSizeQualifier"
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

    <dx-form-item
      item-type="group"
    >
      <dx-col-count-by-screen
        :xs="1"
        :sm="2"
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
        />
      </dx-form-item>
      <dx-form-item>
        <form-textbox
          label="Position"
          v-model="contact.position"
          :is-editing="true"
        />
      </dx-form-item>
    </dx-form-item>

    <dx-form-item
      item-type="group"
      css-class="contact-fields-group"
    >
      <dx-col-count-by-screen
        :xs="1"
        :sm="2"
        :md="2"
        :lg="2"
      />
      <dx-form-item css-class="accent">
        <form-textbox
          label="Assigned to"
          v-model="contact.manager"
          :is-editing="true"
        />
      </dx-form-item>
      <dx-form-item>
        <form-textbox
          v-model="contact.phone"
          :is-editing="true"
          icon="tel"
          mask="+1(000)000-0000"
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
        />
      </dx-form-item>
    </dx-form-item>
  </dx-form>
</template>

<script setup lang="ts">
import { getSizeQualifier } from '@/utils/media-query';
import {
  DxForm,
  DxItem as DxFormItem,
  DxColCountByScreen,
} from 'devextreme-vue/form';
import { reactive, watch } from 'vue';
import { ContactBase, newContact } from '@/types/contact';
import FormTextbox from '@/components/utils/form-textbox.vue';
import FormPhotoUploader from '../utils/form-photo-uploader.vue';

const contact = reactive({ ...newContact });
let newContactData = { ...newContact };

watch(
  contact,
  (newValue) => {
    newContactData = { ...newValue };
  },
);

defineExpose<{getNewContactData:() => ContactBase}>({
  getNewContactData: () => newContactData,
});
</script>
