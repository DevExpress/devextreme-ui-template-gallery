<template>
  <CardAuth title="Sign Up">
    <CreateAccountForm
      redirectLink="/sign-in-form"
      buttonLink="/sign-up-form"
    ></CreateAccountForm>
  </CardAuth>
</template>

<script setup lang="ts">
import CardAuth from '@/components/card-auth.vue';
import CreateAccountForm from '@/components/create-account-form.vue';

</script>

<style scoped lang="scss">
@use "@/variables" as *;

</style>
