<template>
  <card-auth title="Sign In">
    <login-form
      reset-link="/reset-password-form"
      create-account-link="/sign-up-form"
    />
  </card-auth>
</template>

<script setup lang="ts">
import CardAuth from '@/components/library/card-auth.vue';
import LoginForm from '@/components/library/login-form.vue';

</script>

<style scoped lang="scss">
@use "@/variables" as *;

</style>
