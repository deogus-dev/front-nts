<template>
  <footer id="footer" v-if="isVisible">
    <nav class="bottom-navbar w-100 rounded-top">
      <ul class="p-0">
        <li class="py-1">
          <router-link to="/" class="footer-icon">
            <font-awesome-icon icon="house" />
            <span class="menu-text mt-2">메인</span>
          </router-link>
        </li>
        <li class="py-1">
          <router-link to="/attendhistory" class="footer-icon">
            <font-awesome-icon icon="clock" />
            <span class="menu-text mt-2">기록</span>
          </router-link>
        </li>
        <li class="py-1">
          <button
            class="footer-icon"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasHoly"
            aria-controls="offcanvasHoly"
          >
            <font-awesome-icon icon="plane" />
            <span class="menu-text mt-2">휴가</span>
          </button>
        </li>
        <li class="py-1">
          <router-link to="/mypage" class="footer-icon">
            <font-awesome-icon icon="sliders" />
            <span class="menu-text mt-2">설정</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </footer>
</template>

<script>
export default {
  computed: {
    isVisible() {
      switch (this.$route.path) {
        case "/index":
        case "/login":
          return false;
        default:
          return true;
      }
    },
  },
};
</script>
