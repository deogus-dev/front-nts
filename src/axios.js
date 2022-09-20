import axios from "axios";

// 요청 인터셉터 추가
axios.interceptors.request.use(
  function (config) {
    // 요청을 보내기 전에 수행할 일

    // 토큰 valid check를 위해 header 설정
    config.headers["Content-Type"] = "application/json; charset=utf-8";
    config.headers["Authorization"] = "baerer test"; //localstorage 또는 vuex에 저장된 사용자 access 토큰값

    return config;
  },
  function (error) {
    // 오류 요청을 보내기전 수행할 일
    // ...
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가
axios.interceptors.response.use(
  function (response) {
    // 응답 데이터를 가공
    // 토큰 만료 시 토큰 재발급 요청 후 재발급 된 access token으로 api 재요청

    // response status 코드에 따른 후처리
    // ex) 권한error 인 경우 재로그인 요청 alert와 함께 로그인페이지로 이동
    console.log(response);
    return response;
  },
  function (error) {
    // 오류 응답을 처리
    // ...
    return Promise.reject(error);
  }
);
