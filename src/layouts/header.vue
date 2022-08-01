<template>
  <div class="bg-success text-white font-weight-bold fs-3">
    <div class="row m-0">
      <div class="col-md-4">This is header section</div>
      <div class="col-md-4 text-warning">Login State [ {{ loginYn }} ]</div>
      <div class="col-md-4 text-primary">User name is [ {{ userNm }} ]</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      loginYn: "isLoggedIn",
    }),
    ...mapGetters({
      userNm: "getUserName",
    }),
  },
};
</script>
