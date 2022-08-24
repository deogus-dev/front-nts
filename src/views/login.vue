<template>
  <div class="card border-0 h-100 w-100" style="display: inline-block">
    <div class="card-header border-0">
      <prev-btn></prev-btn>
    </div>
    <div
      class="card-body border-0 h-100 align-middle"
      style="display: inline-block"
    >
      <input
        type="text"
        class="form-control my-1 align-middle"
        v-model="user"
        placeholder="userId"
      />
      <input
        type="password"
        class="form-control my-1"
        v-model="password"
        placeholder="password"
      />
      <button class="btn btn-primary my-1" @click="login">Login</button>
      <!-- <router-link :to="{ name: 'main' }" class="btn btn-primary my-1"
        >Login</router-link
      > -->
    </div>
  </div>
</template>

<script>
import prevBtn from "@/components/button/prevBtn.vue";
export default {
  name: "login",
  components: {
    prevBtn,
  },
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
          email: this.user,
          password: this.password,
        });
        await this.$router.push("/");
      } catch (err) {
        this.loginError = true;
        this.error = true;
        // throw new Error(err)
      }
    },
  },
};
</script>
