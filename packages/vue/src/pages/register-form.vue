<template>
  <card-auth title="Register">
    <create-account-form
      redirect-link="/sign-in-form"
      button-link="/register-form"
    />
  </card-auth>
</template>

<script setup lang="ts">
import CardAuth from '@/components/library/card-auth.vue';
import CreateAccountForm from '@/components/library/create-account-form.vue';

</script>

<style scoped lang="scss">
@use "@/variables" as *;

</style>
