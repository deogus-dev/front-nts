import Vue from "vue";
import Vuex from "vuex";
import common from "@/store/modules/common.js";
import auth from "@/store/modules/auth.js";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    common,
    auth,
  },
  plugins: [
    createPersistedState({
      paths: ["auth"],
    }),
  ],
});
