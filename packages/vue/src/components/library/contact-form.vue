<template>
  <div id="contact-form">
    <dx-validation-group>
      <toolbar-form
        :is-editing="isEditing"
        @edit-canceled="cancelEdit()"
        @edit-toggled="startEdit()"
        @save-clicked="handleSaveClick"
      />
      <dx-load-panel
        :visible="isLoading"
        :show-pane="false"
        width="auto"
        container="#contact-form"
        :position="{ of: '#contact-form' }"
      />
      <dx-form
        class="plain-styled-form dx-form"
        :class="{'view-mode': !isEditing}"
        v-if="!!props.contactData"
      >
        <dx-form-group-item :col-count="2">
          <dx-col-count-by-screen :xs="2" />
          <dx-form-item>
            <form-photo
              :link="contactData.image"
              :size="184"
            />
          </dx-form-item>

          <dx-form-group-item>
            <dx-form-item>
              <status-select-box
                v-model="contactData.status"
                :items="contactStatusList"
                :read-only="!isEditing"
                styling-mode="filled"
              />
            </dx-form-item>

            <dx-form-item>
              <form-textbox
                label="First Name"
                v-model="contactData.firstName"
                :is-editing="isEditing"
              />
            </dx-form-item>

            <dx-form-item>
              <form-textbox
                label="Last Name"
                v-model="contactData.lastName"
                :is-editing="isEditing"
              />
            </dx-form-item>
          </dx-form-group-item>

          <dx-form-item>
            <form-textbox
              label="Position"
              v-model="contactData.position"
              :is-editing="isEditing"
            />
          </dx-form-item>

          <dx-form-item css-class="accent">
            <form-textbox
              label="Assigned to"
              v-model="contactData.manager"
              :is-editing="isEditing"
            />
          </dx-form-item>

          <dx-form-item
            :col-span="2"
            css-class="accent"
          >
            <form-textbox
              label="Company"
              v-model="contactData.company"
              :is-editing="isEditing"
            />
          </dx-form-item>
        </dx-form-group-item>

        <dx-form-group-item
          :col-count="4"
          caption="Contacts"
        >
          <dx-col-count-by-screen :xs="2" />
          <dx-form-item :col-span="4">
            <form-textbox
              label="Address"
              v-model="contactData.address"
              :is-editing="isEditing"
            />
          </dx-form-item>
          <dx-form-item :col-span="2">
            <form-textbox
              label="City"
              v-model="contactData.city"
              :is-editing="isEditing"
            />
          </dx-form-item>

          <dx-form-item>
            <form-textbox
              label="State"
              v-model="contactData.state.stateShort"
              :is-editing="isEditing"
            />
          </dx-form-item>
          <dx-form-item>
            <dx-number-box
              label="Zip Code"
              v-model.number="contactData.zipCode"
              :is-editing="isEditing"
              v-bind="formEditorProps"
            >
              <dx-validator :validation-rules="[zipCodeValidator]" />
            </dx-number-box>
          </dx-form-item>
        </dx-form-group-item>
        <dx-form-group-item
          :col-count="2"
          css-class="contact-fields-group"
        >
          <dx-col-count-by-screen :xs="2" />
          <dx-form-item>
            <form-textbox
              label="Phone"
              v-model.number="contactData.phone"
              :is-editing="isEditing"
              mask="+1(000)000-0000"
            />
            <dx-button
              v-if="!isEditing"
              class="form-item-button"
              v-bind="{
                text: 'Call',
                icon: 'tel',
                type: 'default',
                stylingMode: 'outlined'
              }"
              :validators="[]"
            />
          </dx-form-item>
          <dx-form-item>
            <form-textbox
              label="Email"
              v-model.number="contactData.email"
              :is-editing="isEditing"
              :validators="[{type: 'email'}]"
            />
            <dx-button
              v-if="!isEditing"
              class="form-item-button"
              v-bind="{
                text: 'Send Email',
                icon: 'email',
                type: 'default',
                stylingMode: 'outlined'
              }"
            />
          </dx-form-item>
        </dx-form-group-item>
      </dx-form>
    </dx-validation-group>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';

import { DxButton } from 'devextreme-vue/button';
import {
  DxForm,
  DxItem as DxFormItem,
  DxGroupItem as DxFormGroupItem,
  DxColCountByScreen,
} from 'devextreme-vue/form';
import { DxNumberBox } from 'devextreme-vue/number-box';
import { DxValidator } from 'devextreme-vue/validator';
import { DxValidationGroup } from 'devextreme-vue/validation-group';
import { ClickEvent } from 'devextreme/ui/button';
import { formEditorProps } from '@/shared/form-editor-config';
import DxLoadPanel from 'devextreme-vue/load-panel';
import { Contact, contactStatusList } from '@/types/contact';
import FormPhoto from '@/components/utils/form-photo.vue';
import FormTextbox from '@/components/utils/form-textbox.vue';
import StatusSelectBox from '@/components/library/status-select-box.vue';
import ToolbarForm from '@/components/utils/toolbar-form.vue';

const emptyContact = { state: { stateShort: '' } } as Contact;

const props = withDefaults(defineProps<{
  isLoading: boolean,
  contactData: Contact | null
}>(), {
  isLoading: true,
  contactData: null,
});

const isEditing = ref(false);
const contactData = ref(emptyContact);

let contactDataSaved = emptyContact;
const zipCodeValidator = { type: 'pattern', pattern: /^\d{5}$/, message: 'Zip is invalid' };

watch(
  () => props.contactData,
  (contactDataNew: Contact| null) => {
    contactData.value = contactDataNew || emptyContact;
  },
);

function startEdit() {
  contactDataSaved = { ...contactData.value };
  isEditing.value = true;
}

function handleSaveClick({ validationGroup }: ClickEvent) {
  if (validationGroup.validate().isValid) {
    isEditing.value = false;
  }
}

function cancelEdit() {
  contactData.value = contactDataSaved;
  isEditing.value = false;
}
</script>

<style scoped lang="scss">
@use "@/variables.scss" as *;

#contact-form {
  min-height: 300px;

  .form-title {
    font-size: 16px;
  }
}

.info {
  position: relative;
  padding-bottom: 30px;
}
</style>
