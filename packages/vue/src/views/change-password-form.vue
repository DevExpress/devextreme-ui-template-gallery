<template>
  <form @submit.prevent="onSubmit">
    <dx-form :form-data="formData" :disabled="loading">
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
      <dx-button-item>
        <dx-button-options
          width="100%"
          type="default"
          template="changePassword"
          :use-submit-behavior="true"
        >
        </dx-button-options>
      </dx-button-item>

      <template #changePassword>
        <div>
          <span class="dx-button-text">
              <dx-loadIndicator v-if="loading" width="24px" height="24px" :visible="true" />
              <span v-if="!loading">Continue</span>
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
  DxRequiredRule
} from 'devextreme-vue/form';
import DxLoadIndicator from 'devextreme-vue/load-indicator';
import notify from 'devextreme/ui/notify';
import { useRouter, useRoute } from 'vue-router';
import { ref, reactive } from "vue";

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
    DxLoadIndicator
  },
  setup() {
    const router = useRouter();
    const route = useRoute();

    const recoveryCode = ref("");
    const loading = ref(false);
    const formData = reactive({
      password:""
    });

    recoveryCode.value = route.params.recoveryCode;

    async function onSubmit() {
      const { password } = formData;
      loading.value = true;
  
      const result = await auth.changePassword(password, recoveryCode.value);
      loading.value = false;
  
      if (result.isOk) {
        router.push("/login-form");
      } else {
        notify(result.message, 'error', 2000);
      }
    }

    function confirmPassword (e) {
      return e.value === formData.password;
    }

    return {
      loading,
      formData,
      onSubmit,
      confirmPassword
    }
  }
}
</script>

<style>

</style>
