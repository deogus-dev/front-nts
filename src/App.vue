<template>
  <div class="h-100">
    <loading-splash
      class="splash h-100"
      v-if="getLoadingState"
    ></loading-splash>
    <h6 class="fixed-top opacity-50 m-2">version 1.0</h6>
    <transition class="h-100" name="slide-fade" mode="out-in">
      <router-view class="h-100" />
    </transition>
    <!-- <global-alert /> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  created() {},
  computed: {
    ...mapGetters(["getLoadingState"]),
  },
};
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow-y: hidden;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
