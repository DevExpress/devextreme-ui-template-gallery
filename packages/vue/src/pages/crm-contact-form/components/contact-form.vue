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
        <dx-form :formData="contactData"
               label-mode="floating"
               :read-only="!isEditing"
      >
        <dx-form-group-item :col-count="2">
          <dx-form-item data-field="image">
            <user-photo :link="contactData.image" :size="184"></user-photo>
          </dx-form-item>

          <dx-form-group-item>

            <dx-form-item data-field="status">
              <form-item-plain :label="'Status'"
                               :isEditing = "isEditing"
              >
                <template v-slot:valueTpl>
                  <contact-status :status="contactData?.status"/>
                </template>

                <template v-slot:editorTpl>
                  <dx-select-box :value="contactData?.status"
                                 :items="contactStatusList"
                                 label="Status"
                                 field-template="field"
                                 item-template="item"
                                 @value-changed="onChangeStatusSelect"
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

            <dx-form-item
              data-field="firstName"
              :editor-options="editorOptions"
            >
              <form-item-plain :label="'First Name'"
                               :value="contactData?.firstName"
                               :isEditing = "isEditing"
              />
            </dx-form-item>

            <dx-form-item
              data-field="lastName"
              :editor-options="editorOptions"
            >
              <form-item-plain :label="'Last Name'"
                              :value="contactData?.lastName"
                              :isEditing = "isEditing"
            />
            </dx-form-item>
          </dx-form-group-item>

          <dx-form-item
            dataField="position"
            :editor-options="editorOptions"
          >
            <form-item-plain :label="'Position'"
                             :value="contactData?.position"
                             :isEditing = "isEditing"
            />
          </dx-form-item>

          <dx-form-item
            dataField="manager"
            :editor-options="editorOptions"
          >
            <form-item-plain class="accent"
                             :label="'Assigned to'"
                             :value="contactData?.manager"
                             :isEditing = "isEditing"
          />
          </dx-form-item>

          <dx-form-item
            dataField="company"
            :editor-options="editorOptions"
            :col-span="2"
          >
            <form-item-plain class="accent"
                             :label="'Company'"
                             :value="contactData?.company"
                             :isEditing = "isEditing"
            />
          </dx-form-item>
        </dx-form-group-item>

        <dx-form-group-item :col-count="4" caption="Contacts">
          <dx-form-item
            data-field="address"
            :col-span="4"
            :editor-options="editorOptions"
          >
            <form-item-plain :label="'Address'"
                             :value="contactData?.address"
                             :isEditing = "isEditing"
            />
          </dx-form-item>
          <dx-form-item
            data-field="city"
            :col-span="2"
            :editor-options="editorOptions"
          >
            <form-item-plain :label="'City'"
                             :value="contactData?.city"
                             :isEditing = "isEditing"
            />
          </dx-form-item>

          <dx-form-item
            data-field="state.stateShort"
            :editor-options="editorOptions"
          >
            <form-item-plain :label="'State'"
                             :value="contactData?.state?.stateShort"
                             :isEditing = "isEditing"
            />
          </dx-form-item>
          <dx-form-item data-field="zipCode">
            <form-item-plain :label="'Zip Code'"
                             :value="contactData?.zipCode?.toString()"
                             :isEditing = "isEditing"
            />
          </dx-form-item>
          <dx-form-item data-field="phone" :col-span="2" >
            <form-item-with-button
              :data="contactData"
              :data-field="'phone'"
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
          <dx-form-item data-field="email" :col-span="2" >
            <form-item-with-button
              :data="contactData"
              :data-field="'email'"
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
import { computed, ref, watch } from 'vue';

import DxButton from 'devextreme-vue/button';
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
import { Contact, ContactStatus as ContactStatusType, contactStatusList } from '@/types/contact';
import UserPhoto from '@/components/user-photo.vue';
import ContactStatus from '@/components/user-status.vue';
import FormItemWithButton from '@/components/form-item-with-button.vue';
import FormItemPlain from '@/components/form-item-plain.vue';
import { formatPhone } from '@/utils/formatters';

type FormData = Contact | Record<string, unknown>;

const props = withDefaults(defineProps<{
  isLoading: boolean,
  contactData: Contact | null
}>(), {
  isLoading: true,
  contactData: null,
});

const isEditing = ref(false);
const editorOptions = computed(() => ({ stylingMode: isEditing.value ? 'filled' : 'underlined' }));
const contactData = ref<FormData>({});

let contactDataSaved: FormData;

const onChangeStatusSelect = ({ value }: {[value: string]: ContactStatusType}) => {
  console.log('---------->', value);
  contactData.value.status = value;
};

watch(
  () => props.contactData,
  (contactDataNew: Contact | null) => {
    if (contactDataNew != null) {
      contactData.value = contactDataNew;
    }
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
    font-size: 13px;
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
