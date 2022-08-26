<template>
  <div class="card h-100 p-0 border-0 shadow">
    <div class="card-header p-0" v-if="this.$route.path != '/'">
      <Header></Header>
    </div>
    <div class="card-body p-0 border-0">
      <transition name="slide-fade" mode="out-in">
        <router-view />
      </transition>
    </div>
    <div class="card-footer px-0 border-0 shadow">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Header from "@/layouts/header.vue";
import Footer from "@/layouts/footer.vue";

export default {
  data: function () {
    return {};
  },
  components: {
    Header,
    Footer,
  },
  created() {},
};
</script>
