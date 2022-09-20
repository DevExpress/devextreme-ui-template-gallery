<template>
  <div id="contact-form" >
    <dx-toolbar>
      <dx-toolbar-item location="before">
        <span class="dx-form-group-caption">Details</span>
      </dx-toolbar-item>
      <dx-toolbar-item location="after" locateInMenu="after" :visible="!isEditing">
        <dx-button
          text="Edit"
          icon="edit"
          stylingMode="outlined"
          type="default"
          :visible="!isLoading"
          @click="startEdit()"
        ></dx-button>
      </dx-toolbar-item>
      <dx-toolbar-item location="after" locateInMenu="after" :visible="isEditing">
        <dx-button
          text="Save"
          stylingMode="outlined"
          type="default"
          @click="saveEdit()"
        ></dx-button>
      </dx-toolbar-item>
      <dx-toolbar-item location="after" locateInMenu="after" :visible="isEditing">
        <dx-button
          text="Cancel"
          @click="cancelEdit()"
          styling-mode="text"
        ></dx-button>
      </dx-toolbar-item>
    </dx-toolbar>
    <load-component
      :is-loading="isLoading"
      :container-selector="'#contact-form'"
    >
      <div class="form-compact">
        <dx-form>
          <dx-form-group-item :col-count="2">
            <dx-form-item>
              <user-photo :link="contactData.image" :size="184"></user-photo>
            </dx-form-item>

            <dx-form-group-item>
              <dx-form-item>
                <form-item-plain v-model="contactData.status"
                                 :label="'Status'"
                                 :isEditing = "isEditing"
                >
                  <template v-slot:valueTpl>
                    <contact-status :status="contactData?.status"/>
                  </template>

                  <template v-slot:editorTpl>
                    <dx-select-box label="Status"
                                   v-model="contactData.status"
                                   :items="contactStatusList"
                                   field-template="field"
                                   item-template="item"
                    >
                      <template #field>
                        <div class="form-custom-list-prop">
                          <contact-status :status="contactData?.status"></contact-status>
                          <dx-text-box :readOnly="true"></dx-text-box>
                        </div>

                      </template>
                      <template #item="{ data }">
                        <contact-status :status="data"></contact-status>
                      </template>
                    </dx-select-box>
                  </template>
                </form-item-plain>
              </dx-form-item>

              <dx-form-item>
                <form-item-plain v-model="contactData.firstName"
                                 :label="'First Name'"
                                 :isEditing = "isEditing"
                />
              </dx-form-item>

              <dx-form-item>
                <form-item-plain v-model="contactData.lastName"
                                 :label="'Last Name'"
                                 :isEditing = "isEditing"
                />
              </dx-form-item>
            </dx-form-group-item>

            <dx-form-item>
              <form-item-plain v-model="contactData.position"
                               :label="'Position'"
                               :isEditing = "isEditing"
              />
            </dx-form-item>

            <dx-form-item>
              <form-item-plain class="accent"
                               v-model="contactData.manager"
                               :label="'Assigned to'"
                               :isEditing = "isEditing"
              />
            </dx-form-item>

            <dx-form-item :col-span="2">
              <form-item-plain class="accent"
                               :label="'Company'"
                               v-model="contactData.company"
                               :isEditing = "isEditing"
              />
            </dx-form-item>
          </dx-form-group-item>

          <dx-form-group-item :col-count="4" caption="Contacts">
            <dx-form-item :col-span="4" >
              <form-item-plain :label="'Address'"
                               v-model="contactData.address"
                               :isEditing = "isEditing"
              />
            </dx-form-item>
            <dx-form-item :col-span="2">
              <form-item-plain :label="'City'"
                               v-model="contactData.city"
                               :isEditing = "isEditing"
              />
            </dx-form-item>

            <dx-form-item>
              <form-item-plain :label="'State'"
                               v-model="contactData.state.stateShort"
                               :isEditing = "isEditing"
              />
            </dx-form-item>
            <dx-form-item>
              <form-item-plain :label="'Zip Code'"
                               v-model.number="contactData.zipCode"
                               :isEditing = "isEditing"
              />
            </dx-form-item>
            <dx-form-item :col-span="2" >
              <form-item-with-button
                v-model="contactData.phone"
                :is-editing = "isEditing"
                :rendered-value="formatPhone(contactData.phone)"
                :text-box-options="{
                                 label: 'Phone',
                                 mask: '+1(000)000-0000', }"
                :button-options="{
                               text: 'Call',
                               icon: 'tel',
                               type: 'default',
                               stylingMode: 'outlined'
                              }"
              ></form-item-with-button>
            </dx-form-item>
            <dx-form-item :col-span="2" >
              <form-item-with-button
                v-model="contactData.email"
                :is-editing = "isEditing"
                :text-box-options="{ label: 'Email'}"
                :button-options="{
                               text: 'Send Email',
                               icon: 'email',
                               type: 'default',
                               stylingMode: 'outlined'
                              }"
              ></form-item-with-button>
            </dx-form-item>
          </dx-form-group-item>
        </dx-form>
      </div>
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
} from 'devextreme-vue/form';
import { DxTextBox } from 'devextreme-vue/text-box';
import { DxSelectBox } from 'devextreme-vue';
import LoadComponent from '@/components/load-component.vue';
import { Contact, contactStatusList } from '@/types/contact';
import UserPhoto from '@/components/user-photo.vue';
import ContactStatus from '@/components/user-status.vue';
import FormItemWithButton from '@/components/form-item-with-button.vue';
import FormItemPlain from '@/components/form-item-plain.vue';
import { formatPhone } from '@/utils/formatters';

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

  .info {
    position: relative;
    padding-bottom: 30px;

    .status {
      position: absolute;
      margin-top: 20px;
    }
  }

  .status {
    font-size: $base-font-size;
  }
}

.form-custom-list-prop {
  padding-left: 11px;

  .status {
    position: absolute;
    margin-top: 15px;
  }
}
</style>
