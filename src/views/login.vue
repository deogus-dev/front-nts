<template>
  <div class="limiter">
    <div class="container-login100">
      <div class="wrap-login100">
        <div class="login100-form-title">
          <span class="login100-form-title-1"> Sign In </span>
        </div>

        <div class="login100-form validate-form">
          <div
            class="wrap-input100 validate-input m-b-26"
            data-validate="Username is required"
          >
            <span class="label-input100">Username</span>
            <input
              class="input100"
              type="text"
              name="username"
              placeholder="Enter username"
              v-model="user"
            />
            <span class="focus-input100"></span>
          </div>

          <div
            class="wrap-input100 validate-input m-b-18"
            data-validate="Password is required"
          >
            <span class="label-input100">Password</span>
            <input
              class="input100"
              type="password"
              name="pass"
              placeholder="Enter password"
              v-model="password"
            />
            <span class="focus-input100"></span>
          </div>

          <div class="flex-sb-m w-full p-b-30">
            <div class="contact100-form-checkbox">
              <input
                class="input-checkbox100"
                id="ckb1"
                type="checkbox"
                name="remember-me"
              />
              <label class="label-checkbox100" for="ckb1"> Remember me </label>
            </div>

            <div>
              <!-- <button type="button" class="txt1" data-toggle="modal" data-target="#exampleModalCenter">
                        사용자등록
                        </button> -->
              <!-- <button type="button" class="txt1" @click="signUp">
                        사용자등록
                        </button> -->
            </div>
          </div>

          <div class="container-login100-form-btn">
            <button class="login100-form-btn" @click="login">Login</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>

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
  methods: {
    async login() {
      try {
        await this.$store.dispatch("login", {
          user: this.user,
          password: this.password,
        });
        await this.$router.push({
          name:"main"});
      } catch (err) {
        this.loginError = true;
        this.error = true;
        // throw new Error(err)
      }
    },
  },
};
</script>
