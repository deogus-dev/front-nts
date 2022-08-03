<template>
  <div class="container text-center">
    <div class="row row-cols-5">
      <div class="col m-0 p-0">
        <button class="btn btn-secondary" @click="goHome">Home</button>
      </div>
      <div class="col m-0 p-0">
        <button class="btn btn-secondary">Time</button>
      </div>
      <div class="col m-0 p-0">
        <button class="btn btn-secondary">My Info</button>
      </div>
      <div class="col m-0 p-0">
        <button class="btn btn-secondary">Lock</button>
      </div>
      <div class="col m-0 p-0">
        <button class="btn btn-secondary">Alarm</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      param: {},
    };
  },
  methods: {
    async goHome() {
      const res1 = await this.$axios.get("/api/testApiCall");
      console.log(res1);

      const res2 = await this.$axios.get("/main/testApiCall");
      console.log(res2);
    },
  },
};
</script>
