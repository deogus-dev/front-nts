<template>
  <section class='vh-100 bg-image'>
    <div class="text-center my-5">
      <img class="img-fluid rounded-circle mb-4" src="https://dummyimage.com/150x150/6c757d/dee2e6.jpg" alt="..."/>
    </div>
    <section class="">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-6">
            <h2>회원 가입 완료</h2>
            <p class="lead">공구일팔 가입이 완료되었습니다.</p>
            <p class="mb-0">감사합니다.</p>
          </div>
        </div>
      </div>
    </section>
    <div class='d-flex justify-content-center'>
      <button type="button" @click="$router.push('/login')" class="btn btn-secondary" style="width: 80%;">확인</button>
    </div>
  </section>
</template>

<script>
export default {
  name: "signup-finish",
}
</script>

<style scoped>

</style>