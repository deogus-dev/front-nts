<template>
  <div class="fs-1 h-100">
    This is Main Page<br />
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#staticBackdrop"
      @click="openAlert"
    >
      open global alert
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    openAlert() {
      this.$store.dispatch("alertSet", "alert test !!!");
    },
  },
};
</script>
