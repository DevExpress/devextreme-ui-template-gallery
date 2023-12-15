<template>
  <form
    class="create-account-form"
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
        data-field="confirmedPassword"
        editor-type="dxTextBox"
        :editor-options="{
          stylingMode: 'filled',
          placeholder: 'Confirm Password',
          mode: 'password',
          value: 'password',
        }"
      >
        <dx-required-rule message="Password is required" />
        <dx-custom-rule
          message="Passwords do not match"
          :validation-callback="confirmPassword"
        />
        <dx-label :visible="false" />
      </dx-item>
      <dx-item>
        <template #default>
          <div class="policy-info">
            By creating an account, you agree to the
            <router-link :to="props.redirectLink">
              Terms of Service
            </router-link> and
            <router-link :to="props.redirectLink">
              Privacy Policy
            </router-link>
          </div>
        </template>
      </dx-item>
      <dx-button-item>
        <dx-button-options
          width="100%"
          type="default"
          template="createAccount"
          :use-submit-behavior="true"
        />
      </dx-button-item>
      <template #createAccount>
        <div>
          <span class="dx-button-text">
            <dx-load-indicator
              v-if="loading"
              width="24px"
              height="24px"
              :visible="true"
            />
            <span v-if="!loading">Create a new account</span>
          </span>
        </div>
      </template>
    </dx-form>
    <div class="login-link">
      Have an account? <router-link :to="props.redirectLink">
        Sign In
      </router-link>
    </div>
    <login-oauth />
  </form>
</template>

<script setup lang="ts">
import DxForm, {
  DxItem,
  DxLabel,
  DxButtonItem,
  DxButtonOptions,
  DxCustomRule,
  DxRequiredRule,
  DxEmailRule,
} from 'devextreme-vue/form';
import DxLoadIndicator from 'devextreme-vue/load-indicator';
import notify from 'devextreme/ui/notify';
import { useRouter } from 'vue-router';
import { ref, reactive } from 'vue';
import { authInfo as auth } from '@/auth';
import LoginOauth from '@/components/library/login-oauth.vue';

const props = defineProps<{
  redirectLink?: string,
  buttonLink?: string
}>();

const router = useRouter();

const loading = ref(false);
const formData = reactive({
  email: '',
  password: '',
});

const onSubmit = async () => {
  const { email, password } = formData;
  loading.value = true;

  const result = await auth.createAccount(email, password);
  loading.value = false;

  if (result.isOk) {
    router.push(props.buttonLink);
  } else {
    notify(result.message, 'error', 2000);
  }
};

function confirmPassword(e: {value: ''}) {
  return e.value === formData.password;
}</script>

<style scoped lang="scss">
@use "@/variables" as *;

.create-account-form {
  .policy-info {
    color: var(--base-text-color-alpha);
    font-size: 12px;
    font-style: normal;

    a {
      color: var(--base-text-color-alpha);
    }
  }

  .login-link {
    color: var(--accent-color);
    font-size: 12px;
    text-align: center;
    padding: 6px 0 32px 0;
    border-bottom: 1px solid var(--border-color);
  }
}
</style>
