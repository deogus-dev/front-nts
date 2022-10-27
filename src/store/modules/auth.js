import axios from "axios";
import Vue, { ref } from "vue";
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
    reissueToken(
      state,
      { accessToken, refreshToken, accessTokenExpiresIn, grantType }
    ) {
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.accessTokenExpiresIn = accessTokenExpiresIn;
      state.grantType = grantType;
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
    async login({ commit }, { email, password }) {
      try {
        const result = await axios.post("/auth", {
          email: email,
          password: password,
        });
        if (result.status === 200) {
          commit("loginSuccess", {
            email: email,
            name: result.data.name,
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

    //로그아웃 구현 시 accessToken param에 추가해서 call

    reissue(
      { commit },
      { accessToken, refreshToken, accessTokenExpiresIn, grantType }
    ) {
      commit("reissueToken", {
        accessToken,
        refreshToken,
        accessTokenExpiresIn,
        grantType,
      });
    },
  },
  getters: {
    getGrantType: (state) => state.grantType,
    getAccessToken: (state) => state.accessToken,
    getRefreshToken: (state) => state.refreshToken,
    getName: (state) => state.name,
    getEmail: (state) => state.email,
    isLoggedIn: (state) => state.loginSuccess,
    hasLoginErrored: (state) => state.loginError,
    getUserName: (state) => state.userName,
  },
  modules: {},
};

export default userInfo;
