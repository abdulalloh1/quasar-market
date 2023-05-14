import api from "src/api";

export default {
  namespaced: true,
  state: () => ({
    categories: []
  }),
  mutations: {
    GET_CATEGORIES(state, data) {
      state.categories = data;
    }
  },
  actions: {
    async getCategories({commit}) {
      const {data} = await api.categories.getAll();
      commit('GET_CATEGORIES', data);
    }
  }
}
