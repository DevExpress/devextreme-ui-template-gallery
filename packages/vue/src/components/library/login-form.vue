<template>
  <form
    class="login-form"
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
      <dx-item
        data-field="password"
        editor-type="dxTextBox"
        :editor-options="{
          stylingMode: 'filled',
          placeholder: 'Password',
          mode: 'password',
          value: 'password',
        }"
      >
        <dx-required-rule message="Password is required" />
        <dx-label :visible="false" />
      </dx-item>
      <dx-item
        data-field="rememberMe"
        editor-type="dxCheckBox"
        :editor-options="{ text: 'Remember me', elementAttr: { class: 'form-text' } }"
      >
        <dx-label :visible="false" />
      </dx-item>
      <dx-button-item>
        <dx-button-options
          width="100%"
          type="default"
          template="signInTemplate"
          :use-submit-behavior="true"
        />
      </dx-button-item>
      <template #signInTemplate>
        <div>
          <span class="dx-button-text">
            <dx-load-indicator
              v-if="loading"
              width="24px"
              height="24px"
              :visible="true"
            />
            <span v-if="!loading">Sign In</span>
          </span>
        </div>
      </template>
    </dx-form>
    <div class="reset-link">
      <router-link :to="props.resetLink">
        Forgot password?
      </router-link>
    </div>
    <dx-button
      text="Create an account"
      width="100%"
      @click="onCreateAccountClick"
      :styling-mode="buttonStylingMode"
    />
    <login-oauth />
  </form>
</template>

<script setup lang="ts">
import DxLoadIndicator from 'devextreme-vue/load-indicator';
import DxForm, {
  DxItem,
  DxEmailRule,
  DxRequiredRule,
  DxLabel,
  DxButtonItem,
  DxButtonOptions,
} from 'devextreme-vue/form';
import DxButton, { DxButtonTypes } from 'devextreme-vue/button';
import notify from 'devextreme/ui/notify';

import { reactive, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { authInfo as auth } from '@/auth';
import LoginOauth from '@/components/library/login-oauth.vue';
import { themeService } from '@/theme/theme-service';

const { currentTheme } = themeService;

// eslint-disable-next-line arrow-body-style
const buttonStylingMode = computed<DxButtonTypes.ButtonStyle>(() => {
  return currentTheme.value === 'dark' ? 'outlined' : 'contained';
});

const props = defineProps<{
  resetLink?: string,
  createAccountLink?: string
}>();

const router = useRouter();

const formData = reactive({
  email: '',
  password: '',
});
const loading = ref(false);

function onCreateAccountClick() {
  router.push(props.createAccountLink);
}

async function onSubmit() {
  const { email, password } = formData;
  loading.value = true;
  const result = await auth.logIn(email, password);
  if (!result.isOk) {
    loading.value = false;
    notify(result.message, 'error', 2000);
  } else {
    router.push('/');
  }
}
</script>

<style scoped lang="scss">
@use "@/variables" as *;

.login-form {
  :deep(.form-text) {
    color: var(--base-text-color-alpha);
  }
}

.reset-link {
  text-align: center;
  font-size: 12px;
  font-style: normal;
  margin: 6px 0 50px 0;

  a {
    cursor: pointer;
  }
}
</style>
