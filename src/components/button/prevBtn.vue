<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container">
      <a class="navbar-brand"  @click="back">
        <i class="fa-solid fa-angle-left"></i>
      </a>
    </div>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  </nav>
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
