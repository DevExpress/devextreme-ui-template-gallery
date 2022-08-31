<template>
  <div id="contact-form">
    <dx-toolbar>
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

    <dx-form v-if="!isLoading"
      :formData="contactData"
      label-mode="floating"
      :read-only="!isEditing"
    >
      <dx-form-group-item :col-count="2" caption="Details">
        <dx-form-item data-field="image">
          <user-photo :link="contactData.image" :size="184"></user-photo>
        </dx-form-item>

        <dx-form-group-item>

          <dx-form-item data-field="status">
            <div class="info" v-if="!isEditing">
                <label class="dx-texteditor-label">Status</label>
                <contact-status :status="contactData?.status"/>
              </div>

              <dx-select-box v-else
                :value="contactData?.status"
                :items="contactStatusList"
                :styling-mode="editorOptions.stylingMode"
                label="Status"
                :read-only="false"
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
          </dx-form-item>

          <dx-form-item
            data-field="firstName"
            :editor-options="editorOptions"
          >
          </dx-form-item>

          <dx-form-item
            data-field="lastName"
            :editor-options="editorOptions"
          >
          </dx-form-item>
        </dx-form-group-item>

        <dx-form-item
          dataField="position"
          :editor-options="editorOptions"
        />

        <dx-form-item
          dataField="manager"
          :editor-options="editorOptions"
        >
          <form-item-editable
            :data="contactData"
            :data-field="'manager'"
            label="Assigned to"
            :is-editing = "isEditing"
            :editor-options="editorOptions"
          ></form-item-editable>
        </dx-form-item>

        <dx-form-item
          dataField="company"
          :editor-options="editorOptions"
          :col-span="2"
        >
          <form-item-editable
            :data="contactData"
            :data-field="'company'"
            :is-editing = "isEditing"
            :editor-options="editorOptions"
          ></form-item-editable>
        </dx-form-item>
      </dx-form-group-item>

      <dx-form-group-item :col-count="4" caption="Contacts">
        <dx-form-item
          data-field="address"
          :col-span="4"
          :editor-options="editorOptions"
        />
        <dx-form-item
          data-field="city"
          :col-span="2"
          :editor-options="editorOptions"
        />
        <dx-form-item
          data-field="state.stateShort"
          :editor-options="editorOptions"
          :label="{text: 'State'}"
        />
        <dx-form-item data-field="zipCode" :editor-options="editorOptions"/>
        <dx-form-item data-field="phone" :col-span="2" >
          <form-item-with-button
            :data="contactData"
            :data-field="'phone'"
            :is-editing = "isEditing"
            :text-box-options="{ stylingMode: editorOptions.stylingMode,
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
            :text-box-options="{ stylingMode: editorOptions.stylingMode,
                                 label: 'Email',}"
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

    <dx-load-panel
      container="#contact-form"
      :position="{ of: '#contact-form' }"
      :visible="isLoading"
    ></dx-load-panel>
  </div>

</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import DxButton from 'devextreme-vue/button';
import { DxSelectBox } from 'devextreme-vue';
import { DxTextBox } from 'devextreme-vue/text-box';
import {
  DxToolbar,
  DxItem as DxToolbarItem,
} from 'devextreme-vue/toolbar';

import {
  DxForm,
  DxItem as DxFormItem,
  DxGroupItem as DxFormGroupItem,
} from 'devextreme-vue/form';
import DxLoadPanel from 'devextreme-vue/load-panel';

import { Contact, ContactStatus as ContactStatusType, contactStatusList } from '@/types/contact';
import UserPhoto from '@/components/user-photo.vue';
import ContactStatus from '@/components/user-status.vue';
import FormItemEditable from '@/components/form-item-editable.vue';
import FormItemWithButton from '@/components/form-item-with-button.vue';

const props = withDefaults(defineProps<{
  isEditing: boolean,
  isLoading: boolean,
  contactData: Contact | null
}>(), {
  isEditing: false,
  isLoading: true,
  contactData: null,
});

const isEditing = ref(false);
const editorOptions = computed(() => ({ stylingMode: isEditing.value ? 'filled' : 'underlined' }));
const contactData = ref<Contact | Record<string, any>>({});

let contactDataSaved: Contact | Record<string, any>;

const onChangeStatusSelect = ({ value }: {[value: string]: ContactStatusType}) => {
  contactData.value.status = value;
};

watch(
  () => props.isEditing,
  (isEditingValue, _) => {
    isEditing.value = isEditingValue;
  },
);

watch(
  () => props.contactData,
  (contactDataNew: Contact | null, _) => {
    if (contactDataNew != null) {
      contactDataSaved = structuredClone(contactDataNew);
      contactData.value = contactDataNew;
    }
  },
);

function toggleStylingMode() {
  isEditing.value = !isEditing.value;
}

function startEdit() {
  toggleStylingMode();
}

function saveEdit() {
  contactDataSaved = contactData.value;
  toggleStylingMode();
}

function cancelEdit() {
  contactData.value = structuredClone(contactDataSaved);
  toggleStylingMode();
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
