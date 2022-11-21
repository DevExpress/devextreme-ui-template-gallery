<template>
  <div id="contact-form">
    <dx-toolbar>
      <dx-toolbar-item location="before">
        <span class="dx-form-group-caption">Details</span>
      </dx-toolbar-item>
      <dx-toolbar-item
        location="after"
        locate-in-menu="after"
        :visible="!isEditing"
      >
        <dx-button
          text="Edit"
          icon="edit"
          styling-mode="outlined"
          type="default"
          :visible="!isLoading"
          @click="startEdit()"
        />
      </dx-toolbar-item>
      <dx-toolbar-item
        location="after"
        locate-in-menu="after"
        :visible="isEditing"
      >
        <dx-button
          text="Save"
          styling-mode="outlined"
          type="default"
          @click="saveEdit()"
        />
      </dx-toolbar-item>
      <dx-toolbar-item
        location="after"
        locate-in-menu="after"
        :visible="isEditing"
      >
        <dx-button
          text="Cancel"
          @click="cancelEdit()"
          styling-mode="text"
        />
      </dx-toolbar-item>
    </dx-toolbar>
    <load-component
      :is-loading="isLoading"
      :container-selector="'#contact-form'"
    >
      <dx-form
        class="plain-styled-form"
        :class="{'view-mode': !isEditing}"
        label-mode="floating"
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
              <dx-select-box
                label="Status"
                v-model="contactData.status"
                :items="contactStatusList"
                :read-only="!isEditing"
                field-template="field"
                item-template="item"
                v-bind="formEditorProps"
              >
                <template #field="{ data }">
                  <div class="status-editor-field">
                    <span class="status-indicator">
                      <contact-status
                        :value="contactData?.status"
                        :show-text="false"
                      />
                    </span>
                    <dx-text-box
                      :read-only="true"
                      :hover-state-enabled="false"
                      :input-attr="{
                        // eslint-disable-next-line max-len
                        class: `status-editor-input contact-status status-${data?.toLowerCase()}`}"
                      :value="data"
                    />
                  </div>
                </template>
                <template #item="{ data }">
                  <contact-status :value="data" />
                </template>
              </dx-select-box>
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
    </load-component>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';

import { DxButton } from 'devextreme-vue/button';
import {
  DxToolbar,
  DxItem as DxToolbarItem,
} from 'devextreme-vue/toolbar';

import {
  DxForm,
  DxItem as DxFormItem,
  DxGroupItem as DxFormGroupItem,
  DxColCountByScreen,
} from 'devextreme-vue/form';
import { DxTextBox } from 'devextreme-vue/text-box';
import { DxNumberBox } from 'devextreme-vue/number-box';
import { DxValidator } from 'devextreme-vue/validator';
import { DxSelectBox } from 'devextreme-vue';
import { formEditorProps } from '@/shared/form-editor-config';
import LoadComponent from '@/components/load-component.vue';
import { Contact, contactStatusList } from '@/types/contact';
import FormPhoto from '@/components/form-photo.vue';
import ContactStatus from '@/components/contact-status.vue';
import FormTextbox from '@/components/form-textbox.vue';

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

function saveEdit() {
  isEditing.value = false;
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

  .dx-toolbar {
    margin-bottom: $toolbar-margin-bottom;
  }
}

.plain-styled-form {
  .form-item-button {
    margin-left: 10px;
    margin-top: 5px;
  }
}

.info {
  position: relative;
  padding-bottom: 30px;
}

.status-editor-field {
  display: flex;

  :deep(.status-indicator) {
    display: flex;
    align-self: flex-end;
    padding-left: $list-padding-left;
  }

  :deep(.status-editor-input) {
    padding-left: 0;
  }
}
</style>
