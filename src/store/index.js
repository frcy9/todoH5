import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const state = {
  token: "",
  cacheArr: ['index','video']
};

const mutations = {
  setToken(state, data) {
    state.token = data
  },
};

const actions = {};

export default new Vuex.Store({
  state,
  actions,
  mutations
});
