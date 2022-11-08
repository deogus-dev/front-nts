import axios from "axios";
import store from "@/store";

// 다중 요청 대응 코드 추가
let isTokenRefreshing = false;
let refreshSubscribers = [];

const onTokenRefreshed = (accessToken) => {
  refreshSubscribers.map((callback) => callback(accessToken));
};

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

// 요청 인터셉터 추가
axios.interceptors.request.use(
  (config) => {
    // 토큰 valid check를 위해 header 설정
    config.headers["Content-Type"] = "application/json; charset=utf-8";
    config.headers["Access-Control-Allow-Origin"] =
      "https://www.ninetosixapi.tk"; // CORS 설정(모든 리소스 허용)
    config.headers["Access-Control-Allow-Credentials"] = true; // CORS 설정(모든 리소스 허용)
    // 로그인, 토큰 재발급 일때는 header에 토큰을 넣지 않는다.
    if (config.url != "/reissue" && config.url != "/auth") {
      config.headers["Authorization"] =
        store.getters["getGrantType"] + " " + store.getters["getAccessToken"];
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.data.status === 401) {
      const retryOriginalRequest = new Promise((resolve) => {
        addRefreshSubscriber((accessToken) => {
          originalRequest.headers.Authorization = "Bearer " + accessToken;
          resolve(axios(originalRequest));
        });
      });

      if (!isTokenRefreshing) {
        isTokenRefreshing = true;

        const accessToken = store.getters["getAccessToken"];
        const refreshToken = store.getters["getRefreshToken"];

        // reissue때 기존 access 토큰을 체크를 하기 때문에 header 변경
        error.config.headers.Authorization = "refresh_token";

        // 토큰 재발급 요청
        const result = await axios.post("/reissue", {
          accessToken: accessToken,
          refreshToken: refreshToken,
        });

        if (result.status === 200) {
          store.dispatch("reissue", {
            accessToken: result.data.accessToken,
            refreshToken: result.data.refreshToken,
            accessTokenExpiresIn: result.data.accessTokenExpiresIn,
            grantType: result.data.grantType,
          });

          isTokenRefreshing = false;

          axios.defaults.headers.common.Authorization =
            "Bearer " + result.data.accessToken;

          onTokenRefreshed(result.data.accessToken);
        }
      }

      return retryOriginalRequest;
    }
    return Promise.reject(error);
  }
);
