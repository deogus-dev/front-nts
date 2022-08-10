import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const msg = {
  state: {
    msg: "init alert",
  },
  mutations: {
    setMsg(state, { msg }) {
      state.msg = msg;
    },
  },
  actions: {
    alertSet({ commit }, msg) {
      commit("setMsg", {
        msg: msg,
      });
    },
  },
  getters: {
    getAlertMsg: (state) => state.msg,
  },
  modules: {},
};

export default msg;
