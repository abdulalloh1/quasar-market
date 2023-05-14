import api from "src/api";

export default {
  namespaced: true,
  state: () => ({
    products: [],
    searchingProduct: '',

    isRequestPending: true
  }),
  mutations: {
    GET_PRODUCTS(state, data) {
      state.products = data;
    },

    SEARCHING_PRODUCT(state, data) {
      state.searchingProduct = data;
    },

    DELETE_PRODUCT(state, id) {
      const productIndex = state.products.findIndex(item => item.id === id);
      if(productIndex) state.products.splice(productIndex, 1);
    },

    CHANGE_REQUEST_PENDING(state, value) {
      state.isRequestPending = value;
    },

    UPDATE_PRODUCT(state, data) {
      const foundProduct = state.products.find(item => item.id === data.id);

      if(foundProduct) {
        Object
          .keys(data)
          .forEach(key => {
            foundProduct[key] = data[key];
          })
      }
    },

    ADD_PRODUCT(state, data) {
      if(!data.id) {
        data.id = new Date().toString();
      }
      console.log(data);
      state.products.push(data);
    }
  },
  actions: {
    async getProducts({commit}) {
      commit('CHANGE_REQUEST_PENDING', true);

      const {data} = await api.products.getAll()
        .catch((error) => {
          commit('CHANGE_REQUEST_PENDING', false);
          return throw error;
        })
        .finally(() => {
          commit('CHANGE_REQUEST_PENDING', false)
        })

      commit('GET_PRODUCTS', data);
    },

    async deleteProduct({commit}, id) {
      commit('CHANGE_REQUEST_PENDING', true);

      return await api.products.delete(id)
        .then(() => {
          commit('DELETE_PRODUCT', id);
        })
        .catch((error) => {
          return throw error;
        })
        .finally(() => commit('CHANGE_REQUEST_PENDING', false))
    },

    async updateProduct({commit}, payload) {
      return await api.products.update(payload)
        .then(() => {
          commit('UPDATE_PRODUCT', payload)
        })
    },

    async createProduct({commit}, payload) {
      return await api.products.create(payload)
        .then(() => {
          commit('ADD_PRODUCT', payload)
        })
    }
  }
}
