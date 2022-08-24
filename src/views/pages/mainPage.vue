<template>
  <div class="fs-1 h-100">
    This is Main Page<br />
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#staticBackdrop"
      @click="loginCheck"
    >
      open global alert
    </button>
    <button class="btn btn-success" @click="loginCheck">loginCheck</button>
  </div>
</template>

<script>
export default {
  methods: {
    openAlert() {
      this.$store.dispatch("alertSet", "alert test !!!");
    },

    async loginCheck() {
      const result = await this.$axios.get("/user/v1/me", {});
      if (result.status === 200) {
        console.log(JSON.stringify(result.data));
      }
    },
  },
};
</script>
