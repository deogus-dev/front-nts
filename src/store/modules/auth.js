import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const userInfo = {
  state: {
    loginSuccess: false,
    loginError: false,
    email: "",
    accessToken: "",
    accessTokenExpiresIn: 0,
    grantType: "",
    refreshToken: "",
    name: "",
  },
  mutations: {
    loginSuccess(
      state,
      {
        email,
        name,
        accessToken,
        refreshToken,
        accessTokenExpiresIn,
        grantType,
      }
    ) {
      state.loginSuccess = true;
      state.email = email;
      state.name = name;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.accessTokenExpiresIn = accessTokenExpiresIn;
      state.grantType = grantType;
    },
    loginError(state) {
      state.loginError = true;
    },
  },
  actions: {
    async signup(form) {
      try {
        const result = await axios.post("/auth/signup", {
          email: form.email,
          verifyCode: form.verifyCode,
        });
        if (result.status === 200) {
          // TODO location move
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    // TODO check 코드값만? 아니면 시간까지? || 우선 코드만
    async verifyCode(code) {
      try {
        const result = await axios.post("/auth/verify-code", {
          code: code,
        });
        if (result.status === 200) {
          // TODO 전달값 어떻게 줄건지 확인
        }
      } catch (err) {
        throw new Error(err);
      }
    },

    async login({ commit }, { email, password }) {
      try {
        const result = await axios.post("/auth", {
          email: email,
          password: password,
        });
        if (result.status === 200) {
          commit("loginSuccess", {
            email: email,
            name: result.name ? result.data.name : "장대현",
            accessToken: result.data.accessToken,
            refreshToken: result.data.refreshToken,
            accessTokenExpiresIn: result.data.accessTokenExpiresIn,
            grantType: result.data.grantType,
          });
        }
      } catch (err) {
        commit("loginError");
        throw new Error(err);
      }
    },
  },
  getters: {
    getGrantType: (state) => state.grantType,
    getAccessToken: (state) => state.accessToken,
    getEmail: (state) => state.email,
    isLoggedIn: (state) => state.loginSuccess,
    hasLoginErrored: (state) => state.loginError,
    getUserName: (state) => state.userName,
  },
  modules: {},
};

export default userInfo;
