<template>
  <div>
    <Header></Header>

    <transition name="slide-fade" mode="out-in">
      <router-view id="body" class="h-100" />
    </transition>

    <Footer></Footer>
    <offcanvas class="h-25"></offcanvas>
  </div>
</template>

<script>
import Header from "@/layouts/header.vue";
import Footer from "@/layouts/footer.vue";
import Offcanvas from "@/views/attend/component/holynpmComponent.vue";

export default {
  data: function () {
    return {};
  },
  components: {
    Header,
    Footer,
    Offcanvas,
  },
  created() {},
};
</script>
