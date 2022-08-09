<template>
  <div class="container text-center">
    <div class="row row-cols-5">
      <div class="col m-0 px-1">
        <button class="btn shadow w-100" @click="goHome">ico1</button>
      </div>
      <div class="col m-0 px-1">
        <router-link :to="{ name: 'page2' }">
          <button class="btn shadow w-100">ico2</button>
        </router-link>
      </div>
      <div class="col m-0 px-1">
        <router-link :to="{ name: 'page3' }">
          <button class="btn shadow w-100">ico3</button>
        </router-link>
      </div>
      <div class="col m-0 px-1">
        <router-link :to="{ name: 'page4' }">
          <button class="btn shadow w-100">ico4</button>
        </router-link>
      </div>
      <div class="col m-0 px-1">
        <router-link :to="{ name: 'page5' }">
          <button class="btn shadow w-100">ico5</button>
        </router-link>
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
      console.log("[ api call test 1 ]\r\n", res1.data);
    },
  },
};
</script>
