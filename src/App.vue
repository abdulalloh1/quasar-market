<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  name: 'App',
  methods: {
    ...mapActions('categories', ['getCategories']),
    ...mapActions('products', ['getProducts']),
  },
  mounted() {
    Promise.all([
      this.getCategories(),
      this.getProducts()
    ])
  }
}
</script>
