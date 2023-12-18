<template>
  <form-popup
    title="Change Password"
    ref="formPopup"
    :visible="visible"
    :is-save-disabled="isSaveDisabled"
    @update:visible="changeVisibleState"
    :width="360"
    :height="410"
    :wrapper-attr="{ class: 'change-profile-password-popup' }"
    @save="saveNewPassword()"
  >
    <dx-form
      label-mode="outside"
      label-location="top"
      :show-colon-after-label="true"
    >
      <dx-item>
        <dx-label text="Current Password" />
        <password-text-box
          v-model="formData['currentPassword']"
          placeholder="Current Password"
          @value-changed="onFieldChanged()"
        />
      </dx-item>

      <dx-item>
        <div class="h-separator" />
      </dx-item>

      <dx-item>
        <dx-label text="Password" />
        <password-text-box
          v-model="formData['password']"
          placeholder="Password"
          @value-changed="onFieldChanged()"
        />
      </dx-item>
      <dx-item>
        <dx-label text="Confirm Password" />
        <password-text-box
          v-model="formData['confirmedPassword']"
          placeholder="Confirm Password"
          :validators="confirmPasswordValidators"
          @value-changed="onFieldChanged()"
        />
      </dx-item>
    </dx-form>
  </form-popup>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import notify from 'devextreme/ui/notify';
import { DxForm, DxItem, DxLabel } from 'devextreme-vue/form';
import FormPopup from '@/components/utils/form-popup.vue';
import PasswordTextBox from '@/components/library/password-text-box.vue';
import { SimpleObject } from '@/types';
import { DxValidationRule } from 'devextreme-vue/validator';

withDefaults(defineProps<{
  visible: boolean,
}>(), {
  visible: false,
});

const formPopup = ref<InstanceType<typeof FormPopup> | null>(null);

const visibleState = ref(false);

const isSaveDisabled = ref(true);

const emit = defineEmits(['update:visible']);

const formData: SimpleObject = {};

const confirmPasswordValidators: (typeof DxValidationRule)[] = [
  {
    type: 'compare',
    message: 'Passwords do not match',
    comparisonTarget: () => formData.password,
  },
];

function changeVisibleState(value: boolean) {
  visibleState.value = value;
  emit('update:visible', value);
}

function onFieldChanged() {
  const formValues = Object.entries(formData);

  isSaveDisabled.value = !formPopup.value?.isValid() || formValues.length !== 3
    || !!formValues.find(([, value]) => !value);
}

function close() {
  emit('update:visible', false);
}

function saveNewPassword() {
  notify({ message: 'Password Changed', position: { at: 'bottom center', my: 'bottom center' } }, 'success');
  close();
}
</script>
<style lang="scss">
@use "@/variables.scss" as *;

@include separator();

.change-profile-password-popup {
  .dx-form {
    height: var(--change-password-popup-height, auto);
  }

  .dx-popup-normal {
    border-radius: 8px;
    padding: 8px 0;

    .dx-toolbar {
      padding: 0 24px 8px;
    }
  }
}
</style>
