<template>
  <div>
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
