<template>
  <div class="fs-1">
    <!-- 헤더 공통 레이아웃 (뒤로가기) -->
    <back-component :title="'설정'" :toMain="'Y'" />
    <div class="mb-3">
      {{ getName }}님<br />
      안녕하세요!
    </div>
    <div class="list-group w-100 text-start">
      <router-link to="/profile" class="list-group-item list-group-item-action">
        프로필정보
      </router-link>
      <router-link to="/notice" class="list-group-item list-group-item-action">
        공지사항
      </router-link>
      <router-link to="/terms" class="list-group-item list-group-item-action">
        이용약관
      </router-link>
      <router-link to="/privacy" class="list-group-item list-group-item-action">
        개인정보처리방침
      </router-link>
      <router-link to="/version" class="list-group-item list-group-item-action">
        버전정보
      </router-link>
    </div>
    <button @click="logout()" class="text-start fs-6 text-primary">
      로그아웃
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getName"]),
    ...mapGetters(["getAccessToken"]),
  },
  methods: {
    async logout() {
      const result = await this.$axios.post("/auth/out", {
        accessToken: this.getAccessToken,
      });
      if (result.status === 200) {
        alert("로그아웃되었습니다.");
        this.$router.push("/index");
      }
    },
  },
};
</script>
