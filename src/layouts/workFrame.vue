<template>
  <div class="h-100 card">
    <div class="card-body p-0 overflow-auto shadow">
      <transition name="slide-fade" mode="out-in">
        <router-view />
      </transition>
    </div>
    <Footer class="card-footer p-0"></Footer>
    <offcanvas></offcanvas>
  </div>
</template>

<script>
import Footer from "@/layouts/footer.vue";
import Offcanvas from "@/views/attend/component/holynpmComponent.vue";

export default {
  data: function () {
    return {};
  },
  components: {
    Footer,
    Offcanvas,
  },
  created() {},
};
</script>
