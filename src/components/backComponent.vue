<template>
  <div class="input-group mb-3 py-2 text-center shadow-sm rounded back-bar">
    <button
      class="btn fw-bold border-0 h-100"
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
  props: ["title", "toPath"],
  methods: {
    back() {
      if (this.toPath) {
        this.$router.push(this.toPath);
      } else {
        this.$router.go(-1);
      }
    },
  },
};
</script>
