<template>
  <header id="header" v-if="$route.path !== '/'">
    <div class="inner">
      <button class="is-back" @click="back()">
        <font-awesome-icon icon="arrow-left" />
      </button>
      <div class="has-text-centered">
        <h2 class="title is-3">{{ $route.name }}</h2>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    back() {
      switch (this.$route.path) {
        case "/":
        case "/attendhistory":
        case "/mypage":
          this.$router.push("/");
          return;
        default:
          this.$router.go(-1);
          return;
      }
    },
  },
};
</script>
