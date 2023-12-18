<template>
  <form
    class="reset-password-form"
    @submit.prevent="onSubmit"
  >
    <dx-form
      :form-data="formData"
      :disabled="loading"
    >
      <dx-item
        data-field="email"
        editor-type="dxTextBox"
        :editor-options="{
          stylingMode: 'filled',
          placeholder: 'Email',
          mode: 'email',
          value: 'jheart@dx-email.com',
        }"
      >
        <dx-required-rule message="Email is required" />
        <dx-email-rule message="Email is invalid" />
        <dx-label :visible="false" />
      </dx-item>
      <dx-button-item>
        <dx-button-options
          :element-attr="{ class: 'submit-button' }"
          width="100%"
          type="default"
          template="resetTemplate"
          :use-submit-behavior="true"
        />
      </dx-button-item>
      <template #resetTemplate>
        <div>
          <span class="dx-button-text">
            <dx-load-indicator
              v-if="loading"
              width="24px"
              height="24px"
              :visible="true"
            />
            <span v-if="!loading">Reset my password</span>
          </span>
        </div>
      </template>
    </dx-form>
    <div class="login-link">
      Return to <router-link :to="props.signInLink">
        Sign In
      </router-link>
    </div>
  </form>
</template>

<script setup lang="ts">
import DxForm, {
  DxItem,
  DxLabel,
  DxButtonItem,
  DxButtonOptions,
  DxRequiredRule,
  DxEmailRule,
} from 'devextreme-vue/form';
import DxLoadIndicator from 'devextreme-vue/load-indicator';
import notify from 'devextreme/ui/notify';
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

import { authInfo as auth } from '@/auth';

const props = defineProps<{
  signInLink?: string,
  buttonLink?: string
}>();

const notificationText = 'We\'ve sent a link to reset your password. Check your inbox.';
const router = useRouter();

const loading = ref(false);
const formData = reactive({
  email: '',
});

async function onSubmit() {
  const { email } = formData;
  loading.value = true;

  const result = await auth.resetPassword(email);
  loading.value = false;

  if (result.isOk) {
    router.push(props.buttonLink);
    notify(notificationText, 'success', 2500);
  } else {
    notify(result.message, 'error', 2000);
  }
}
</script>

<style scoped lang="scss">
@use "@/variables" as *;

.reset-password-form {
  :deep(.submit-button) {
    margin-top: 18px;
  }

  .login-link {
    color: var(--accent-color);
    font-size: 12px;
    text-align: center;
    margin-top: 6px;
  }
}
</style>
