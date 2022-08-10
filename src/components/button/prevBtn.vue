<template>
  <button class="btn btn-secondary p-0" @click="back">뒤로가기</button>
</template>

<script>
export default {
  name: "prev-btn",
  methods: {
    back() {
      this.$router.go(-1);
    },
  },
};
</script>
