<template>
  <div class="h-100">
    <loading class="splash h-100" v-if="getLoadingState"></loading>
    <h6 class="fixed-top opacity-50 m-2">version 1.0</h6>
    <Header></Header>
    <transition name="slide-fade" mode="out-in">
      <router-view />
    </transition>
    <Footer></Footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Header from "@/layouts/header.vue";
import Footer from "@/layouts/footer.vue";
export default {
  computed: {
    ...mapGetters(["getLoadingState"]),
  },
  components: {
    Header,
    Footer,
  },
};
</script>
<!-- <style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
</style> -->
