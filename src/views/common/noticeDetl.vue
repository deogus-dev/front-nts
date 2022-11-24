<template>
  <div>
    <!-- 헤더 공통 레이아웃 (뒤로가기) -->
    <back-component :title="'공지사항'" />
    <p>공지 상세 | {{ id }}</p>
  </div>
</template>

<script>
import backComponent from "@/components/backComponent.vue";
export default {
  components: { backComponent },
  props: ["id"],
};
</script>
