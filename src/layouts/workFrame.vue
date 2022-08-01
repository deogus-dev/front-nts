<template>
  <div class="card h-100 p-0 border border-0">
    <div class="card-header p-0 border border-0">
      <Header></Header>
    </div>
    <div class="card-body p-0 h-100">
      <router-view class="h-100 w-100" />
    </div>
    <div class="card-footer p-0 border border-0">
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
