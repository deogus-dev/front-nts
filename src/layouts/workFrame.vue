<template>
  <div class="card h-100 p-0 border border-0">
    <div class="card-header p-0 border border-0">
      <Header></Header>
    </div>
    <div class="card-body p-0 h-100">
      <transition name="slide-fade" mode="out-in">
        <router-view class="h-100 w-100" />
      </transition>
    </div>
    <div class="card-footer shadow">
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
