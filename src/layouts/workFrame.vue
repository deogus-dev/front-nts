<template>
  <div class="card h-100 p-0 border-0 shadow">
    <div class="card-header p-0" v-if="this.$route.path != '/'">
      <Header></Header>
    </div>
    <div class="card-body p-0 border-0">
      <div class="col-12 p-0 h-100">
        <transition name="slide-fade" mode="out-in">
          <router-view />
        </transition>
      </div>
    </div>
    <div class="card-footer p-0 border-0 bg-transparent">
      <Footer></Footer>
    </div>

    <div
      class="offcanvas offcanvas-bottom h-25"
      tabindex="-1"
      id="offcanvasHoly"
      aria-labelledby="offcanvasHolyLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasHolyLabel">
          휴가 및 기타일정 관리
        </h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body small h-100 p-0"></div>
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
