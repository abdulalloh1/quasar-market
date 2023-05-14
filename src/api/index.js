import CRUDInstance from "src/api/CRUDInstance";

export default {
  products: new CRUDInstance('/product'),
  categories: new CRUDInstance('/product/get-product-types')
}
