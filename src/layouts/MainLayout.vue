<template>
  <q-layout view="lHh Lpr lFf">

    <AppHeader/>

    <q-page-container class="q-pa-xl">
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import AppHeader from "components/AppHeader.vue";

export default {
  name: "MainLayout",
  components: { AppHeader }
};
</script>
