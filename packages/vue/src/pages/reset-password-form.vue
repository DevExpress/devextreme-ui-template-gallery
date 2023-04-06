<template>
  <card-auth
    title="Reset Password"
    :description="desc"
  >
    <reset-password-form
      sign-in-link="/sign-in-form"
      button-link="/reset-password-form"
    />
  </card-auth>
</template>

<script setup lang="ts">
import CardAuth from '@/components/library/card-auth.vue';
import ResetPasswordForm from '@/components/library/reset-password-form.vue';

const desc = 'Please enter the email address that you used to register, and we will send you a link to reset your password via Email.';
</script>

<style scoped lang="scss">
@use "@/variables" as *;

</style>
