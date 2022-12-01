<template>
  <lottie :options="options" />
</template>

<script>
import Lottie from "vue-lottie";
import animationData from "@/assets/image/loading_white.json";
export default {
  data() {
    return {
      options: { animationData: animationData },
    };
  },
  components: {
    lottie: Lottie,
  },
};
</script>
