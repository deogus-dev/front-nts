<template>
  <div>
    <transition name="slide-fade" mode="out-in">
      <router-view id="body" class="h-100" />
    </transition>
    <offcanvas class="h-25"></offcanvas>
    <!--     
    <Header></Header>

    <transition name="slide-fade" mode="out-in">
      <router-view id="body" class="h-100" />
    </transition>

    <Footer></Footer>
    <offcanvas class="h-25"></offcanvas> -->
  </div>
</template>

<script>
import Offcanvas from "@/views/attend/component/holynpmComponent.vue";

export default {
  components: {
    Offcanvas,
  },
};
</script>
