import axios from "axios";
import store from "@/store";

// 요청 인터셉터 추가
axios.interceptors.request.use(
  function (config) {
    // 요청을 보내기 전에 수행할 일
    console.log("interceptor In");
    console.log(config);
    // 토큰 valid check를 위해 header 설정
    config.headers["Content-Type"] = "application/json; charset=utf-8";
    config.headers["Authorization"] =
      store.getters["getGrantType"] + " " + store.getters["getAccessToken"];

    return config;
  },
  function (error) {
    // 오류 요청을 보내기전 수행할 일
    // ...
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    // 응답 데이터를 가공 (status : 2xx)
    // 토큰 만료 시 토큰 재발급 요청 후 재발급 된 access token으로 api 재요청

    // response status 코드에 따른 후처리
    // ex) 권한error 인 경우 재로그인 요청 alert와 함께 로그인페이지로 이동
    console.log("success interceptor out");
    return response;
  },
  async (error) => {
    // 오류 응답을 처리

    if (error.response.status === 500) {
      //토큰 만료
      alert("reissue process start");
      const originalRequest = error.config;
      const accessToken = store.getters["getAccessToken"];
      const refreshToken = store.getters["getRefreshToken"];

      const reissue = await axios.post("/reissue", {
        accessToken: accessToken,
        refreshToken: refreshToken,
      });

      if (reissue.status === 200) {
        store.dispatch("reissue", {
          accessToken: reissue.data.accessToken,
          refreshToken: reissue.data.refreshToken,
          accessTokenExpiresIn: reissue.data.accessTokenExpiresIn,
          grantType: reissue.data.grandType,
        });
      }
      alert("reissue process end");

      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);
