<template>
  <card-auth title="Sign Up">
    <create-account-form
      redirect-link="/sign-in-form"
      button-link="/sign-up-form"
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
