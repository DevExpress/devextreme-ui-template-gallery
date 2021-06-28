<template>
  <form class="reset-password-form" @submit.prevent="onSubmit">
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
      <dx-button-item>
        <dx-button-options
          :element-attr="{ class: 'submit-button' }"
          width="100%"
          type="default"
          template="resetTemplate"
          :use-submit-behavior="true"
        >
        </dx-button-options>
      </dx-button-item>
      <dx-item>
        <template #default>
          <div class="login-link">
            Return to <router-link to="/login-form">Sign In</router-link>
          </div>
        </template>
      </dx-item>
      <template #resetTemplate>
        <div>
          <span class="dx-button-text">
              <dx-load-indicator v-if="loading" width="24px" height="24px" :visible="true" />
              <span v-if="!loading">Reset my password</span>
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
  DxRequiredRule,
  DxEmailRule
} from 'devextreme-vue/form';
import DxLoadIndicator from 'devextreme-vue/load-indicator';
import notify from 'devextreme/ui/notify';
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

import auth from "../auth";

const notificationText = 'We\'ve sent a link to reset your password. Check your inbox.';

export default {
  components: {
    DxForm,
    DxItem,
    DxLabel,
    DxButtonItem,
    DxButtonOptions,
    DxRequiredRule,
    DxEmailRule,
    DxLoadIndicator
  },
  setup() {
    const router = useRouter();

    const loading = ref(false);
    const formData = reactive({
      email:""
    });

    async function onSubmit() {
      const { email } = formData;
      loading.value = true;

      const result = await auth.resetPassword(email);
      loading.value = false;

      if (result.isOk) {
        router.push("/login-form");
        notify(notificationText, "success", 2500);
      } else {
        notify(result.message, "error", 2000);
      }
    }

    return { 
      loading,
      formData,
      onSubmit
    }
  }
}
</script>

<style lang="scss">
@import "../themes/generated/variables.base.scss";

.reset-password-form {
  .submit-button {
    margin-top: 10px;
  }

  .login-link {
    color: $base-accent;
    font-size: 16px;
    text-align: center;
  }
}
</style>
