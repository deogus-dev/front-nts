<template>
  <section class="vh-100">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-6 text-black">
          <div class="px-5 ms-xl-4" style="text-align: left">
            <span class="h1 fw-bold mb-0">안녕하세요.</span>
            <p>회원 서비스 이용 위해 로그인 해주세요.fds</p>
            <p>{{ apiServerUrl }}</p>
          </div>

          <div
            class="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5"
          >
            <form style="width: 23rem">
              <div class="form-outline mb-4">
                <label class="form-label" for="email" style="text-align: left"
                  >Email</label
                >
                <input
                  type="email"
                  id="email"
                  v-model="user"
                  class="form-control form-control-lg"
                />
              </div>
              <div class="form-outline mb-4">
                <label
                  class="form-label"
                  for="password"
                  style="text-align: left"
                  >Password</label
                >
                <input
                  type="password"
                  id="password"
                  v-model="password"
                  class="form-control form-control-lg"
                />
              </div>
              <div class="pt-1 mb-4">
                <button
                  class="btn btn-secondary btn-lg btn-block mb-3"
                  style="width: 100%"
                  type="button"
                  @click="login"
                >
                  로그인
                </button>
                <button
                  class="btn btn-secondary btn-lg btn-block"
                  style="width: 100%"
                  type="button"
                  @click="signup"
                >
                  회원가입
                </button>
              </div>
              <p class="small mb-5 pb-lg-2">
                <a class="text-muted" href="#!">비밀번호 찾기</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      loginSuccess: false,
      loginError: false,
      user: "",
      password: "",
      error: false,
    };
  },
  created() {},
  computed: {
    apiServerUrl() {
      return process.env.VUE_APP_API_URL;
    },
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch("login", {
          email: this.user,
          password: this.password,
        });
        await this.$router.push("/main");
      } catch (err) {
        alert(err);
        this.loginError = true;
        this.error = true;
        throw new Error(err);
      }
    },
    async signup() {
      await this.$router.push("/signup");
    },
  },
};
</script>
<style>
.bg-image-vertical {
  position: relative;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: right center;
  background-size: auto 100%;
}

@media (min-width: 1025px) {
  .h-custom-2 {
    height: 100%;
  }
}
</style>
