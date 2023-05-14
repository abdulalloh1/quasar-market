<template>
  <q-header>
    <div class="q-px-xl row">
      <q-item class="col-md-4">
        <q-item-label>
          <h4 class="text-h4 text-weight-bold q-ma-none">QMarket</h4>
        </q-item-label>
      </q-item>
      <q-item class="col-md-4">
        <q-input
          v-model="computedSearchingProduct"
          borderless
          rounded
          placeholder="Search..."
          dense
          input-style="padding: 0 20px; flex-grow: 1; background: #fff; border-radius: 5px"
          style="flex-grow: 1"
        />
      </q-item>
      <q-item class="col-md-4">
        <q-btn
          flat
          round
          class="q-ml-auto"
          to="/dashboard"
        >
          <q-icon name="person"/>
        </q-btn>
      </q-item>
    </div>
    <div class="q-px-xl row">
      <q-item
        clickable
        class="flex-center text-weight-bold text-capitalize"
        exact
        :to="{
          name: $route.name
        }"
      >
        Barchasi
      </q-item>
      <q-item
        v-for="(category, index) in categories"
        :key="index"
        clickable
        class="flex-center text-weight-bold text-capitalize"
        exact
        :to="{
          name: $route.name,
          query: {
            category: category.id
          }
        }"
      >
        {{ category.name_uz }}
      </q-item>
    </div>
  </q-header>
</template>

<script>
import {mapState, mapMutations} from 'vuex';

export default {
  name: "AppHeader",
  data() {
    return {

    }
  },
  computed: {
    ...mapState('categories', ['categories']),
    ...mapState('products', ['searchingProduct']),

    computedSearchingProduct: {
      get() {
        return this.searchingProduct;
      },
      set(newValue) {
        this.SEARCHING_PRODUCT(newValue);
      }
    }
  },
  methods: {
    ...mapMutations('products', ['SEARCHING_PRODUCT'])
  }
};
</script>

<style lang="scss">
.q-item.q-router-link--active, .q-item--active {
  color: $positive;
}
</style>
