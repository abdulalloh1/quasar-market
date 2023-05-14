<template>
  <q-dialog v-model="computedModelValue">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">
          <template v-if="editingProduct.id">
            Редактирование продукта: {{ editingProduct.name_uz }}
          </template>
          <template v-else>
            Добавить новый продукт
          </template>
        </div>
        <q-space />
        <q-btn
          icon="close"
          flat
          round
          dense
          v-close-popup
        />
      </q-card-section>

      <q-card-section>
        <q-input
          outlined
          v-model="editingProduct.name_uz"
          label="Name"
          class="q-mb-md"
        />

        <q-input
          outlined
          v-model="editingProduct.address"
          label="Address"
          class="q-mb-md"
        />

        <q-input
          outlined
          type="number"
          v-model="editingProduct.cost"
          label="Cost"
          class="q-mb-md"
        />

        <q-select
          outlined
          v-model="editingProduct.product_type"
          :options="categories"
          option-value="id"
          option-label="name_uz"
          label="Category"
          class="q-mb-md"
        />

        <q-input
          outlined
          v-model="editingProduct.created_date"
          mask="date"
          :rules="['date']"
        >
          <template v-slot:append>
            <q-icon
              name="event"
              class="cursor-pointer"
            >
              <q-popup-proxy
                ref="qDateProxy"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="editingProduct.created_date">
                  <div class="row items-center justify-end">
                    <q-btn
                      v-close-popup
                      label="Close"
                      color="primary"
                      flat
                    />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

      </q-card-section>

      <q-card-section>
        <q-btn
          class="flex q-ml-auto"
          color="primary"
          @click="submitForm"
        >
          {{ editingProduct.id ? 'Обновить' : 'Добавить' }}
        </q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ProductsForm",
  props: {
    value: Boolean,
    product: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      editingProduct: {
        name_uz: '',
        address: '',
        cost: 0,
        product_type: '',
        created_date: '',
      }
    };
  },
  computed: {
    ...mapState("categories", ["categories"]),

    computedModelValue: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
        if(!newValue) {
          this.editingProduct = {
            name_uz: '',
            address: '',
            cost: 0,
            product_type: '',
            created_date: '',
          }
        }
      }
    },
  },
  methods: {
    submitForm() {
      const timeStamp = new Date(this.editingProduct.created_date);

      const modifiedProduct = {
        name_uz: this.editingProduct.name_uz,
        address: this.editingProduct.address,
        cost: this.editingProduct.cost,
        product_type_id: this.editingProduct.product_type.id
      }

      if(this.editingProduct.id) modifiedProduct.id = this.editingProduct.id;
      if(this.editingProduct.created_date && timeStamp) modifiedProduct.created_date = timeStamp.toISOString();

      this.$emit('submit', modifiedProduct)
    }
  },
  watch: {
    product: {
      handler: function(value) {
        this.editingProduct = value;
      },
      deep: true
    }
  }
};
</script>

<style scoped>

</style>
