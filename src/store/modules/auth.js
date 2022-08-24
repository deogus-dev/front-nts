import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const userInfo = {
  state: {
    loginSuccess: false,
    loginError: false,
    userName: "test",
  },
  mutations: {
    loginSuccess(state, { email, password }) {
      state.loginSuccess = true;
      state.userName = email;
      state.password = password;
    },
    loginError(state, { user, password }) {
      state.loginError = true;
      state.userName = user;
      state.userName = password;
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
      try {
        const result = await axios.post("/auth/login", {
          email: email,
          password: password,
        });
        if (result.status === 200) {
          commit("loginSuccess", {
            email: email,
            password: password,
          });
        }
      } catch (err) {
        commit("loginError", {
          userName: user,
        });
        throw new Error(err);
      }
    },
  },
  getters: {
    isLoggedIn: (state) => state.loginSuccess,
    hasLoginErrored: (state) => state.loginError,
    getUserName: (state) => state.userName,
    getUserPass: (state) => state.userPass,
  },
  modules: {},
};

export default userInfo;
