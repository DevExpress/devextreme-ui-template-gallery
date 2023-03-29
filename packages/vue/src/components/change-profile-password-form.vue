<template>
  <form-popup
    title="Change Password"
    :visible="visible"
    @update:visible="changeVisibleState"
    :width="360"
    :wrapper-attr="{class: 'change-profile-password-popup'}"
    @save="saveNewPassword()"
  >
    <dx-form
      label-mode="outside"
      label-location="top"
      :show-colon-after-label="true"
    >
      <template
        v-for="(field, index) in fields"
        :key="field.name"
      >
        <dxi-item v-if="index === 1">
          <div class="h-separator" />
        </dxi-item>

        <dxi-item>
          <dxo-label :text="field.label" />
          <password-text-box
            v-model="formData[field.name]"
            :placeholder="field.label"
            :validators="field.validators"
          />
        </dxi-item>
      </template>
    </dx-form>
  </form-popup>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import notify from 'devextreme/ui/notify';
import { DxForm, DxItem as DxiItem, DxLabel as DxoLabel } from 'devextreme-vue/form';
import FormPopup from '@/components/form-popup.vue';
import PasswordTextBox from '@/components/password-text-box.vue';
import { SimpleObject } from '@/types';

withDefaults(defineProps<{
  visible: boolean,
}>(), {
  visible: false,
});

const visibleState = ref(false);

const emit = defineEmits(['update:visible']);

const formData: SimpleObject = {};

const fields: SimpleObject[] = [
  {
    label: 'Current Password',
    name: 'currentPassword',
  },
  {
    label: 'Password',
    name: 'password',
  },
  {
    label: 'Confirm Password',
    name: 'confirmedPassword',
    validators: [
      {
        type: 'custom',
        message: 'Passwords do not match',
        validationCallback: (e: {value:string}) => e.value === formData.password,
      }],
  }];

function changeVisibleState(value: boolean) {
  visibleState.value = value;
  emit('update:visible', value);
}

function close() {
  emit('update:visible', false);
}

function saveNewPassword() {
  notify('Password Changed', 'success');
  close();
}
</script>
<style lang="scss">
.change-profile-password-popup .dx-popup-normal {
  border-radius: 8px;
  padding: 8px 0;

.dx-toolbar {
  padding: 0 24px 8px;
}
}
</style>
<style scoped lang="scss">
@use "@/variables" as *;
@include separator();

dx-form {
  padding: 0 8px;
}
</style>
