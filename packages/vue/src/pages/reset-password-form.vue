<template>
  <CardAuth
    title="Reset Password"
    :description="desc"
  >
    <ResetPasswordForm
      signInLink="/sign-in-form"
      buttonLink="/reset-password-form"
    ></ResetPasswordForm>
  </CardAuth>
</template>

<script setup lang="ts">
import CardAuth from '@/components/card-auth.vue';
import ResetPasswordForm from '@/components/reset-password-form.vue';

const desc = 'Please enter the email address that you used to register, and we will send you a link to reset your password via Email.';
</script>

<style scoped lang="scss">
@use "@/variables" as *;

</style>
