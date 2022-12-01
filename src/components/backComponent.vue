<template>
  <div class="inner">
    <button class="is-back" @click="back()">
      <font-awesome-icon icon="arrow-left" />
    </button>
    <div class="has-text-centered">
      <h2 class="title is-3">{{ title }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title"],
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
