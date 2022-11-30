<template>
  <div class="input-group mb-3 text-start py-2 shadow-sm rounded">
    <button
      class="btn btn-outline-secondary fw-bold border-0"
      type="button"
      id="button-addon1"
      @click="back()"
    >
      &lt;
    </button>
    <span class="form-control fw-bold border-0" placeholder="">{{
      title
    }}</span>
  </div>
</template>

<script>
export default {
  props: ["title", "toMain"],
  methods: {
    back() {
      if (this.toMain) {
        this.$router.push("/");
      } else {
        this.$router.go(-1);
      }
    },
  },
};
</script>

<style></style>
