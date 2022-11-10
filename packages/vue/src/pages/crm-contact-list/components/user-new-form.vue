<template>
  <dx-form
    class="plain-styled-form"
    label-mode="floating"
    :validation-group="props.validationGroup"
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
          v-model="newUser.firstName"
          :is-editing="true"
          :validation-group="props.validationGroup"
        />
      </dx-form-item>
      <dx-form-item css-class="accent">
        <form-textbox
          label="Last Name"
          v-model="newUser.lastName"
          :is-editing="true"
          :validation-group="props.validationGroup"
        />
      </dx-form-item>
      <dx-form-item css-class="accent">
        <form-textbox
          label="Company"
          v-model="newUser.company"
          :is-editing="true"
          :validators="[]"
          :validation-group="props.validationGroup"
        />
      </dx-form-item>
      <dx-form-item>
        <form-textbox
          label="Position"
          v-model="newUser.position"
          :is-editing="true"
          :validators="[]"
          :validation-group="props.validationGroup"
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
          v-model="newUser.manager"
          :is-editing="true"
          :validators="[]"
          :validation-group="props.validationGroup"
        />
      </dx-form-item>
      <dx-form-item>
        <form-textbox
          v-model="newUser.phone"
          :is-editing="true"
          icon="tel"
          mask="+1(000)000-0000"
          :validators="[]"
          :validation-group="props.validationGroup"
        />
      </dx-form-item>
      <dx-form-item>
        <form-textbox
          v-model="newUser.email"
          :is-editing="true"
          icon="email"
          :validators="[{type: 'email'}]"
        />
      </dx-form-item>
      <dx-form-item>
        <form-textbox
          v-model="newUser.address"
          :is-editing="true"
          icon="home"
          :validators="[]"
          :validation-group="props.validationGroup"
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

const props = defineProps<{
  validationGroup: string
}>();

const newUser = ref(newContact);
</script>
