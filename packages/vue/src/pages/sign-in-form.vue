<template>
  <CardAuth title="Sign In">
    <LoginForm
      resetLink="/reset-password-form"
      createAccountLink="/sign-up-form"
    ></LoginForm>
  </CardAuth>
</template>

<script setup lang="ts">
import CardAuth from '@/components/card-auth.vue';
import LoginForm from '@/components/login-form.vue';

</script>

<style scoped lang="scss">
@use "@/variables" as *;

</style>
