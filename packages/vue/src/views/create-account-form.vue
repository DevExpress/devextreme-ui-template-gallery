<template>
  <form class="create-account-form" @submit.prevent="onSubmit">
    <dx-form :form-data="formData" :disabled="loading">
      <dx-item
        data-field="email"
        editor-type="dxTextBox"
        :editor-options="{ stylingMode: 'filled', placeholder: 'Email', mode: 'email' }"
      >
        <dx-required-rule message="Email is required" />
        <dx-email-rule message="Email is invalid" />
        <dx-label :visible="false" />
      </dx-item>
      <dx-item
        data-field="password"
        editor-type="dxTextBox"
        :editor-options="{ stylingMode: 'filled', placeholder: 'Password', mode: 'password' }"
      >
        <dx-required-rule message="Password is required" />
        <dx-label :visible="false" />
      </dx-item>
      <dx-item
        data-field="confirmedPassword"
        editor-type="dxTextBox"
        :editor-options="{ stylingMode: 'filled', placeholder: 'Confirm Password', mode: 'password' }"
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
          <div class='policy-info'>
            By creating an account, you agree to the <router-link to="#">Terms of Service</router-link> and <router-link to="#">Privacy Policy</router-link>
          </div>
        </template>
      </dx-item>
      <dx-button-item>
        <dx-button-options
          width="100%"
          type="default"
          template="createAccount"
          :use-submit-behavior="true"
        >
        </dx-button-options>
      </dx-button-item>
      <dx-item>
        <template #default>
          <div class="login-link">
            Have an account? <router-link to="/login-form">Sign In</router-link>
          </div>
        </template>
      </dx-item>
      <template #createAccount>
        <div>
          <span class="dx-button-text">
              <dx-loadIndicator v-if="loading" width="24px" height="24px" :visible="true" />
              <span v-if="!loading">Create a new account</span>
          </span>
        </div>
      </template>
    </dx-form>
  </form>
</template>

<script>
import DxForm, {
  DxItem,
  DxLabel,
  DxButtonItem,
  DxButtonOptions,
  DxCustomRule,
  DxRequiredRule,
  DxEmailRule
} from 'devextreme-vue/form';
import DxLoadIndicator from 'devextreme-vue/load-indicator';
import notify from 'devextreme/ui/notify';
import { useRouter } from 'vue-router';
import { ref, reactive } from 'vue';

import auth from "../auth";

export default {
  components: {
    DxForm,
    DxItem,
    DxLabel,
    DxButtonItem,
    DxButtonOptions,
    DxRequiredRule,
    DxCustomRule,
    DxEmailRule,
    DxLoadIndicator
  },
  setup() {
    const router = useRouter();
    
    const loading = ref(false);
    const formData = reactive({
      email:"",
      password:""
    });

    const onSubmit = async () => {
    const { email, password } = formData;
    loading.value = true;

    const result = await auth.createAccount(email, password);
    loading.value = false;

    if (result.isOk) {
      router.push("/login-form");
    } else {
      notify(result.message, 'error', 2000);
    }
  };

    function confirmPassword(e) {
      return e.value === formData.password;
    }
    
    return {
        formData,
        loading,
        onSubmit,
        confirmPassword
    }
  }
}
</script>

<style lang="scss">
@import "../themes/generated/variables.base.scss";

.create-account-form {
  .policy-info {
    margin: 10px 0;
    color: rgba($base-text-color, alpha($base-text-color) * 0.7);
    font-size: 14px;
    font-style: normal;

    a {
      color: rgba($base-text-color, alpha($base-text-color) * 0.7);
    }
  }

  .login-link {
    color: $base-accent;
    font-size: 16px;
    text-align: center;
  }
}
</style>
