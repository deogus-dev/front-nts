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

axios.interceptors.response.use(
  (response) => {
    // 응답 데이터를 가공 (status : 2xx)

    // response status 코드에 따른 후처리

    console.log("interceptor out");
    console.log(response);
    return response;
  },
  async (error) => {
    try {
      console.log(error);
      // 오류 응답을 처리
      const errorCode = error.response.data.status;
      const errorMsg = error.response.data.message;

      // access Token 만료 시 refresh Token으로 토큰 재발급 과정 진행
      if (errorCode === 401) {
        console.log("토큰 재발급 start");
        const originalRequest = error.config;
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
        }
        console.log("토큰 재발급 end");

        // 재발급 된 access token으로 기존 api 재요청
        console.log("실패한 api 재호출");
        return axios(originalRequest);
      } else {
        alert("errorCode : " + errorCode + "\r\nerrorMsg : " + errorMsg);
        // alert("세션이 만료되었습니다. \r\n재로그인 해주시기 바랍니다.");
        localStorage.clear();
        router.push("/login");
      }
    } catch (err) {
      console.log("catch err" + err);
      throw new Error(err);
    }
    return Promise.reject(error);
  }
);
