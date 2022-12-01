<template>
  <div class="h-100 card">
    <header id="header" v-if="$route.path !== '/'">
      <back-component :title="$route.name"></back-component>
    </header>
    <div class="card-body p-0 overflow-auto">
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
import BackComponent from "@/components/backComponent.vue";

export default {
  data: function () {
    return {};
  },
  components: {
    Footer,
    Offcanvas,
    BackComponent,
  },
  created() {},
};
</script>
