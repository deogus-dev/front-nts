import axios from "axios";
import store from "@/store";
import router from "@/router";

// 요청 인터셉터 추가
axios.interceptors.request.use(
  (config) => {
    // 요청을 보내기 전에 수행할 일
    console.log("interceptor In");
    console.log(config);
    // 토큰 valid check를 위해 header 설정
    config.headers["Content-Type"] = "application/json; charset=utf-8";

    // 로그인, 토큰 재발급 일때는 header에 토큰을 넣지 않는다.
    if (config.url != "/reissue" && config.url != "/auth") {
      config.headers["Authorization"] =
        store.getters["getGrantType"] + " " + store.getters["getAccessToken"];
    }

    return config;
  },
  (error) => {
    // 오류 요청을 보내기전 수행할 일
    // ...
    return Promise.reject(error);
  }
);

// 다중 요청 대응 코드 추가
let isTokenRefreshing = false;
let refreshSubscribers = [];

const onTokenRefreshed = (accessToken) => {
  refreshSubscribers.map((callback) => callback(accessToken));
};

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;
    if (status === 401) {
      if (!isTokenRefreshing) {
        console.log("토큰 재발급 start");
        // isTokenRefreshing이 false인 경우에만 token refresh 요청
        isTokenRefreshing = true;
        const accessToken = store.getters["getAccessToken"];
        const refreshToken = store.getters["getRefreshToken"];

        // 토큰 재발급 요청
        const result = await axios.post("/reissue", {
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
        // 새로운 토큰 저장
        if (result.status === 200) {
          store.dispatch("reissue", {
            accessToken: result.data.accessToken,
            refreshToken: result.data.refreshToken,
            accessTokenExpiresIn: result.data.accessTokenExpiresIn,
            grantType: result.data.grantType,
          });
          isTokenRefreshing = false;
        }

        // 새로운 토큰으로 지연되었던 요청 진행
        onTokenRefreshed(store.getters["getAccessToken"]);
      }

      // token이 재발급 되는 동안의 요청은 refreshSubscribers에 저장
      const retryOriginalRequest = new Promise((resolve) => {
        addRefreshSubscriber(() => {
          originalRequest.headers.Authorization =
            store.getters["getGrantType"] +
            " " +
            store.getters["getAccessToken"];
          resolve(axios(originalRequest));
        });
      });

      return retryOriginalRequest;
    }
    return Promise.reject(error);
  }
);
