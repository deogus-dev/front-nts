import axios from "axios";
import store from "@/store";
import router from "@/router";

// 요청 인터셉터 추가
axios.interceptors.request.use(
  function (config) {
    // 요청을 보내기 전에 수행할 일
    console.log("interceptor In");
    console.log(config);
    // 토큰 valid check를 위해 header 설정
    config.headers["Content-Type"] = "application/json; charset=utf-8";

    // 토큰 valid check이 안되는 이유? grantType 대소문자!
    // reissue일때는 header에 토큰을 넣지 않는다.
    if (config.url != "/reissue") {
      config.headers["Authorization"] =
        store.getters["getGrantType"] + " " + store.getters["getAccessToken"];
    }

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

    // response status 코드에 따른 후처리

    console.log("interceptor out");
    console.log(response);
    return response;
  },
  async (error) => {
    // 오류 응답을 처리

    // 권한error 인 경우 재로그인 요청 alert와 함께 로그인페이지로 이동
    console.log("[error]");
    console.log(error);
    if (error.response.status === 401) {
      // 추후 에러코드 401받아서 처리
      console.log("토큰 재발급 start");
      const originalRequest = error.config;
      const accessToken = store.getters["getAccessToken"];
      const refreshToken = store.getters["getRefreshToken"];

      //reissue때 기존 토큰 체크를 하기 때문에 header 변경
      error.config.headers.Authorization = "refresh_token";
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
      }
      console.log("토큰 재발급 end");

      // 재발급 된 access token으로 기존 api 재요청
      console.log("실패한 api 재호출");
      return axios(originalRequest);
    } else {
      router.push("/login");
    }

    return Promise.reject(error);
  }
);
