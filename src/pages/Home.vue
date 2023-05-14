<template>
  <q-page class="flex q-pt-md content-start">
    <div
      v-if="!computedProducts.length"
      class="full-width flex flex-center"
    >
      <h4 class="text-h4 q-mx-auto q-my-auto">Empty...</h4>
    </div>
    <template v-else>
      <q-item class="full-width items-center justify-end">
        Per page:
        <q-select
          outlined
          v-model="selectedPerPage"
          :options="perPageList"
          dense
          style="width: fit-content; margin-left: 10px"
        />
      </q-item>

      <div class="q-py-md row q-col-gutter-md content-start full-width">
        <div
          v-for="(product, index) in paginatedProducts"
          :key="index"
          class="col-md-3"
        >
          <q-card>
            <img src="https://cdn.quasar.dev/img/mountains.jpg">

            <q-card-section>
              <div class="text-overline text-orange-9">{{ product.created_date }}</div>
              <div class="text-h6">{{ product.name_uz }}</div>
              <div class="text-subtitle2">{{ product.cost }} so'm</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <div class="text-caption text-grey">{{ product.address }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="q-pa-lg flex flex-center q-mx-auto">
        <q-pagination
          v-if="productsAmountPerPage > 1"
          v-model="currentPage"
          color="black"
          :max="productsAmountPerPage"
          :max-pages="5"
          :boundary-numbers="false"
        />
      </div>
    </template>
  </q-page>
</template>

<script>
import { mapState } from "vuex";
import { date } from "quasar";

export default {
  name: "PageIndex",
  data() {
    return {
      perPageList: [2, 4, 6, 8, 10],
      selectedPerPage: 2,
      currentPage: 1
    };
  },
  computed: {
    ...mapState("products", ["products", "searchingProduct"]),

    computedProducts() {
      const categoryID = this.$route.query.category;
      let products = JSON.parse(JSON.stringify(this.products))
        .map(item => {
          const timeStamp = new Date(item.created_date);
          item.created_date = date.formatDate(timeStamp, "D MMMM YYYY");

          return item;
        });

      if (categoryID) {
        products = products.filter(product => +product.product_type_id === +categoryID);
      }

      products = products.filter(product => {
        const isFirstLetterEqual = product.name_uz.toLowerCase().startsWith(this.searchingProduct.toLowerCase().charAt(0));
        const isNameEqual = product.name_uz.toLowerCase().includes(this.searchingProduct.toLowerCase());

        if (isFirstLetterEqual && isNameEqual) return product;
      });

      return products;
    },

    paginatedProducts() {
      const from = (this.currentPage * this.selectedPerPage) - this.selectedPerPage;
      const to = this.currentPage * this.selectedPerPage;

      return this.computedProducts.slice(from, to);
    },

    productsAmountPerPage() {
      return Math.round(this.computedProducts.length / this.selectedPerPage);
    }
  },
  methods: {
    resetCurrentPage() {
      this.currentPage = 1;
    }
  },
  mounted() {
    const perPage = localStorage.getItem('per_page');

    if(perPage) this.selectedPerPage = perPage;
  },
  watch: {
    selectedPerPage() {
      this.resetCurrentPage();
      localStorage.setItem('per_page', this.selectedPerPage)
    },
    '$route.params.category': {
      handler: function() {
       this.resetCurrentPage();
      },
      deep: true
    }
  }
};
</script>
