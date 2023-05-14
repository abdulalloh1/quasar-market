<template>
  <div class="q-pa-md">

    <q-btn
      color="positive"
      class="flex q-ml-auto q-mb-lg"
      @click="isEditDialogOpen = true"
    >
      <q-icon name="add" />
      Добавить
    </q-btn>

    <q-table
      title="Products"
      :data="products"
      :columns="columns"
      row-key="id"
      :pagination="{
        rowsPerPage: 10
      }"
      :loading="isRequestPending"
    >
      <template v-slot:body-cell-index="props">
        <td class="text-right">
          {{ props.pageIndex + 1 }}
        </td>
      </template>
      <template v-slot:body-cell-actions="props">
        <td class="text-right">
          <q-btn
            dense
            @click="openEditDialog(props.row)"
          >
            <q-icon name="edit" />
          </q-btn>
          <q-btn
            dense
            color="red"
            class="q-ml-sm"
            @click="confirmDeletion(props.row.id)"
          >
            <q-icon name="delete" />
          </q-btn>
        </td>
      </template>
    </q-table>

    <products-form
      v-model="isEditDialogOpen"
      :product="editingProduct"
      @submit="onFormSubmit"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { date } from "quasar";
import ProductsForm from "components/ProductsFormDialog.vue";

export default {
  name: "Products",
  components: { ProductsForm },
  data() {
    return {
      columns: [
        {
          name: "index",
          label: "#"
        },
        {
          name: "name_uz",
          label: "Name",
          field: row => row.name_uz
        },
        {
          name: "product_type_id",
          label: "Category",
          field: row => {
            const category = JSON.parse(JSON.stringify(this.categories)).find(item => +item.id === +row.product_type_id);
            if (category) return category.name_uz;

            return row.product_type_id;
          }
        },
        {
          name: "address",
          label: "Address",
          field: row => row.address
        },
        {
          name: "cost",
          label: "Cost",
          field: row => `${ row.cost } so'm`
        },
        {
          name: "date",
          label: "Date",
          field: row => {
            const timeStamp = new Date(row.created_date);
            return date.formatDate(timeStamp, "DD.MM.YYYY");
          }
        },
        {
          name: "actions",
          label: ""
        }
      ],
      editingProduct: null,

      isEditDialogOpen: false
    };
  },
  computed: {
    ...mapState("products", ["products", 'isRequestPending']),
    ...mapState("categories", ["categories"])
  },
  methods: {
    ...mapActions('products', ['deleteProduct', 'updateProduct', 'createProduct']),

    openEditDialog(product) {
      this.isEditDialogOpen = true;

      const foundCategory = this.categories.find(category => category.id === product.product_type_id);
      const timeStamp = new Date(product.created_date);

      this.editingProduct = {
        ...product,
        created_date: date.formatDate(timeStamp, "YYYY/MM/DD"),
        product_type: foundCategory
      };
    },

    async update(product) {
      try {
        await this.updateProduct(product);
        this.isEditDialogOpen = false;
        this.$q.notify({
          message: 'Product updated successfully!',
          color: 'green'
        })
      } catch(error) {
        this.$q.notify({
          message: error.message,
          color: 'red'
        })
      }
    },

    confirmDeletion(id) {
      this.$q.dialog({
        title: "Confirm",
        message: "Would you like to delete?",
        cancel: true,
        persistent: true
      }).onOk( () => {
        this.delete(id)
      })
    },

    async delete(id) {
      try {
        await this.deleteProduct(id);
        this.$q.notify({
          message: 'Product successfully deleted!',
          color: 'green'
        })
      } catch(error) {
        this.$q.notify({
          message: error.message,
          color: 'red'
        })
      }
    },

    onFormSubmit(product) {
      if(product.id) this.update(product);
      else this.create(product)
    },

    async create(product) {
      try {
        await this.createProduct(product);
        this.isEditDialogOpen = false;
        this.$q.notify({
          message: 'Product created successfully!',
          color: 'green'
        })
      } catch (error) {
        // Catch is not working on backend
        this.$q.notify({
          message: error.message,
          color: 'red'
        })
      }
    }
  }
};
</script>

<style scoped>

</style>
