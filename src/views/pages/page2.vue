<template>
  <div class="fs-1">
    This is Page 2<br />
    <router-link :to="{ name: 'main' }">to main</router-link>
    <kakao-map></kakao-map>
  </div>
</template>

<script>
import kakaoMap from "@/components/kakaoMap.vue";
export default {
  components: {
    kakaoMap,
  },
};
</script>
