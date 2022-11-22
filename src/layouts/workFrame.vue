<template>
  <div class="container h-100">
    <div class="h-100 py-3">
      <transition name="slide-fade" mode="out-in">
        <router-view />
      </transition>
    </div>
    <Footer></Footer>
    <offcanvas></offcanvas>
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
